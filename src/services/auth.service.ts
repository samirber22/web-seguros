import { supabase } from '../lib/supabase';
import { LocationService } from './location.service';
import type { User } from '@supabase/supabase-js';

export interface UserProfile {
  id?: number;
  nombre: string;
  apellido: string | null;
  id_direction?: number | null;
  id_rol?: number | null;
  fecha_registro: string | null;
  id_estado_user?: number | null;
  direction?: string | null;
  email?: string | null;
  telefono?: number | null;
  id_ciudad?: number | null;
  role?: {
    id: number;
    nombre_rol: string;
  };
  ciudad?: {
    id_ciudad: number;
    nombre: string;
    departamento?: {
      id_depar: number;
      nombre: string;
    } | null;
  } | null;
}


export class AuthService {
  static async signUp(
    email: string,
    password: string,
    userData: {
      nombre: string;
      apellido?: string;
      direccion?: string;
      barrio?: string;
      id_ciudad?: number;
      telefono?: number;
      email?: string;
    }
  ) {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nombre: userData.nombre,
            apellido: userData.apellido || '',
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .insert({
            nombre: userData.nombre,
            apellido: userData.apellido || null,
            direccion: userData.direccion || null,
            barrio: userData.barrio || null,
            id_ciudad: userData.id_ciudad || null,
            telefono: userData.telefono || null,
            rol_id: 1, // Usuario por defecto
            id_auth: authData.user.id,
          })
          .select(
            `*,
            roles(id, nombre_rol),
            ciudad(id_ciudad, nombre, departamentos(id_depar, nombre))`
          )
          .single();

        if (profileError) throw profileError;

        return { user: authData.user, profile: profileData };
      }

      return { user: null, profile: null };
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  }

  static async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const profile = await this.getUserProfile(data.user.id);
        return { user: data.user, profile };
      }

      return { user: null, profile: null };
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    }
  }

  static async getCurrentUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const profile = await this.getUserProfile(user.id);
        return { user, profile };
      }
      return { user: null, profile: null };
    } catch (error) {
      console.error('Error obteniendo usuario actual:', error);
      return { user: null, profile: null };
    }
  }

  static async getUserProfile(authId: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        roles (
          id,
          nombre_rol
        ),
        ciudad (
          id_ciudad,
          nombre,
          departamentos (
            id_depar,
            nombre
          )
        )
      `)
      .eq('id_auth', authId)
      .single();

    if (error) throw error;

    return {
  id: data.id,
  nombre: data.nombre,
  apellido: data.apellido || '',
  fecha_registro: data.fecha_registro || '',
  id_rol: data.rol_id,
  id_ciudad: data.id_ciudad,
  telefono: data.telefono,
  direction: data.direccion,
  //email: data.email,
  role: data.roles ? {
    id: data.roles.id,
    nombre_rol: data.roles.nombre_rol
  } : undefined,
  ciudad: data.ciudad ? {
    id_ciudad: data.ciudad.id_ciudad,
    nombre: data.ciudad.nombre,
    departamento: data.ciudad.departamentos ? {
      id_depar: data.ciudad.departamentos.id_depar,
      nombre: data.ciudad.departamentos.nombre
    } : undefined
  } : undefined
};

  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    return null;
  }
}


  static async updateProfile(userId: number, updates: Partial<UserProfile>) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select(`
          *,
          roles(id, nombre_rol),
          ciudad(id_ciudad, nombre, departamentos(id_depar, nombre))
        `)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      throw error;
    }
  }

  static hasRole(profile: UserProfile | null, requiredRole: string): boolean {
    if (!profile || !profile.role) return false;
    return profile.role.nombre_rol.toLowerCase() === requiredRole.toLowerCase();
  }

  static isAdmin(profile: UserProfile | null): boolean {
    return this.hasRole(profile, 'admin');
  }

  static isSeller(profile: UserProfile | null): boolean {
    return this.hasRole(profile, 'vendedor');
  }
}
