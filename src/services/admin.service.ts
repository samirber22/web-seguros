import { supabase } from '../lib/supabase';
import type { UserProfile } from './auth.service';

export class AdminService {
  // Obtener estadísticas del dashboard
  static async getDashboardStats() {
    try {
      const [
        { count: totalUsers },
        { count: totalPolizas },
        { count: totalCotizaciones },
        { count: totalPQRS }
      ] = await Promise.all([
        supabase.from('users').select('*', { count: 'exact', head: true }),
        supabase.from('polizas').select('*', { count: 'exact', head: true }),
        supabase.from('cotizaciones').select('*', { count: 'exact', head: true }),
        supabase.from('pqrs').select('*', { count: 'exact', head: true })
      ]);

      return {
        totalUsers: totalUsers || 0,
        totalPolizas: totalPolizas || 0,
        totalCotizaciones: totalCotizaciones || 0,
        totalPQRS: totalPQRS || 0
      };
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      return {
        totalUsers: 0,
        totalPolizas: 0,
        totalCotizaciones: 0,
        totalPQRS: 0
      };
    }
  }

  // Obtener todos los usuarios
  static async getAllUsers(): Promise<UserProfile[]> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          roles (
            id_rol,
            roles
          ),
          estado_users (
            id_estuser,
            estado_user
          )
        `)
        .order('fecha_registro', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
      return [];
    }
  }

  // Actualizar rol de usuario
  static async updateUserRole(userId: number, roleId: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('users')
        .update({ id_rol: roleId })
        .eq('id_users', userId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error actualizando rol de usuario:', error);
      return false;
    }
  }

  // Obtener roles disponibles
  static async getRoles() {
    try {
      const { data, error } = await supabase
        .from('roles')
        .select('*')
        .order('id_rol');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error obteniendo roles:', error);
      return [];
    }
  }

  // Activar/Desactivar usuario
  static async toggleUserStatus(userId: number, statusId: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('users')
        .update({ id_estado_user: statusId })
        .eq('id_users', userId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error cambiando estado de usuario:', error);
      return false;
    }
  }
}