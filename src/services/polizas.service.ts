import { supabase } from '../lib/supabase';
import type { Database } from '../types/database';

type Poliza = Database['public']['Tables']['polizas']['Row'];
type PolizaInsert = Database['public']['Tables']['polizas']['Insert'];

export interface PolizaWithDetails extends Poliza {
  seguros?: {
    id_seguro: number;
    tipo_de_seguro: string;
    descripcion: string | null;
    precio_base: number | null;
  };
  estado_poliza?: {
    id_estpol: number;
    estado: string;
  };
  users?: {
    id_users: number;
    nombre: string;
    apellido: string | null;
  };
}

export class PolizasService {
  // Crear nueva póliza
  static async createPoliza(polizaData: PolizaInsert): Promise<Poliza | null> {
    try {
      const { data, error } = await supabase
        .from('polizas')
        .insert({
          ...polizaData,
          id_estado: 1, // Estado "Activa" por defecto
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creando póliza:', error);
      throw error;
    }
  }

  // Obtener pólizas de un usuario
  static async getUserPolizas(userId: number): Promise<PolizaWithDetails[]> {
    try {
      const { data, error } = await supabase
        .from('polizas')
        .select(`
          *,
          seguros (
            id_seguro,
            tipo_de_seguro,
            descripcion,
            precio_base
          ),
          estado_poliza (
            id_estpol,
            estado
          )
        `)
        .eq('id_user', userId)
        .order('fecha_inicio', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error obteniendo pólizas del usuario:', error);
      return [];
    }
  }

  // Obtener todas las pólizas (Admin/Vendedor)
  static async getAllPolizas(): Promise<PolizaWithDetails[]> {
    try {
      const { data, error } = await supabase
        .from('polizas')
        .select(`
          *,
          seguros (
            id_seguro,
            tipo_de_seguro,
            descripcion,
            precio_base
          ),
          estado_poliza (
            id_estpol,
            estado
          ),
          users (
            id_users,
            nombre,
            apellido
          )
        `)
        .order('fecha_inicio', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error obteniendo todas las pólizas:', error);
      return [];
    }
  }

  // Actualizar póliza
  static async updatePoliza(id: number, updates: Partial<Poliza>): Promise<Poliza | null> {
    try {
      const { data, error } = await supabase
        .from('polizas')
        .update(updates)
        .eq('id_poliza', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error actualizando póliza:', error);
      throw error;
    }
  }

  // Obtener estados de póliza
  static async getEstadosPoliza() {
    try {
      const { data, error } = await supabase
        .from('estado_poliza')
        .select('*')
        .order('id_estpol');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error obteniendo estados de póliza:', error);
      return [];
    }
  }

  // Renovar póliza
  static async renovarPoliza(polizaId: number, nuevaFechaFin: string): Promise<Poliza | null> {
    try {
      const { data, error } = await supabase
        .from('polizas')
        .update({ fecha_fin: nuevaFechaFin })
        .eq('id_poliza', polizaId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error renovando póliza:', error);
      throw error;
    }
  }
}