import { atom } from 'nanostores';
import { AuthService, type UserProfile } from '../services/auth.service';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export const isAuthenticated = atom<boolean>(false);
export const currentUser = atom<User | null>(null);
export const userProfile = atom<UserProfile | null>(null);
export const isLoading = atom<boolean>(true);

// Inicializar estado de autenticación
export async function initAuth() {
  try {
    isLoading.set(true);
    const { user, profile } = await AuthService.getCurrentUser();
    
    if (user && profile) {
      isAuthenticated.set(true);
      currentUser.set(user);
      userProfile.set(profile);
    } else {
      isAuthenticated.set(false);
      currentUser.set(null);
      userProfile.set(null);
    }
  } catch (error) {
    console.error('Error inicializando auth:', error);
    isAuthenticated.set(false);
    currentUser.set(null);
    userProfile.set(null);
  } finally {
    isLoading.set(false);
  }
}

// Escuchar cambios de autenticación
supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === 'SIGNED_IN' && session?.user) {
    const profile = await AuthService.getUserProfile(session.user.id);
    if (profile) {
      isAuthenticated.set(true);
      currentUser.set(session.user);
      userProfile.set(profile);
    }
  } else if (event === 'SIGNED_OUT') {
    isAuthenticated.set(false);
    currentUser.set(null);
    userProfile.set(null);
  }
});

// Login
export async function login(email: string, password: string) {
  try {
    console.log('Store login function called with:', email);
    const { user, profile } = await AuthService.signIn(email, password);
    console.log('AuthService returned:', { user: !!user, profile: !!profile });
    
    if (user && profile) {
      isAuthenticated.set(true);
      currentUser.set(user);
      userProfile.set(profile);
      console.log('Auth state updated successfully');
      return { success: true, user, profile };
    } else if (user && !profile) {
      // Usuario autenticado pero sin perfil en la tabla users
      isAuthenticated.set(true);
      currentUser.set(user);
      userProfile.set(null);
      console.log('User authenticated but no profile found');
      return { success: true, user, profile: null };
    }
    
    console.log('Login failed: no user returned');
    return { success: false, error: 'Credenciales inválidas' };
  } catch (error: any) {
    console.error('Error en login:', error);
    return { success: false, error: error.message || error.error_description || 'Error en el login' };
  }
}

// Register
export async function register(email: string, password: string, userData: {
  nombre: string;
  apellido?: string;
  direccion?: string;
  barrio?: string;
  id_ciudad?: number;
  telefono?: number;
  email?: string;
}) {
  try {
    const { user, profile } = await AuthService.signUp(email, password, userData);
    
    if (user && profile) {
      isAuthenticated.set(true);
      currentUser.set(user);
      userProfile.set(profile);
      return { success: true, user, profile };
    }
    
    return { success: false, error: 'Error en el registro' };
  } catch (error: any) {
    console.error('Error en registro:', error);
    return { success: false, error: error.message || 'Error en el registro' };
  }
}

// Logout
export async function logout() {
  try {
    await AuthService.signOut();
    isAuthenticated.set(false);
    currentUser.set(null);
    userProfile.set(null);
    
    // Redirigir a la página principal
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  } catch (error) {
    console.error('Error en logout:', error);
  }
}

// Verificar roles
export function hasRole(requiredRole: string): boolean {
  const profile = userProfile.get();
  return AuthService.hasRole(profile, requiredRole);
}

export function isAdmin(): boolean {
  const profile = userProfile.get();
  return AuthService.isAdmin(profile);
}

export function isSeller(): boolean {
  const profile = userProfile.get();
  return AuthService.isSeller(profile);
}