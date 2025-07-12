import { supabase } from '../lib/supabase';
import type { Database } from '../types/database';

type Cotizacion = Database['public']['Tables']['cotizaciones']['Row'];
type CotizacionInsert = Database['public']['Tables']['cotizaciones']['Insert'];

export interface CotizacionWithDetails extends Cotizacion {
  seguros?: {
    id_seguro: number;
    tipo_de_seguro: string;
    descripcion: string | null;
    precio_base: number | null;
  };
  estado_cotizaciones?: {
    id_estado: number;
    estados: string;
  };
  users?: {
    id_users: number;
    nombre: string;
    apellido: string | null;
  };
}

export class CotizacionesService {
  // Crear nueva cotización
  static async createCotizacion(cotizacionData: {
    id_user: number;
    id_seguro: number;
    detalles: string;
    nombre?: string;
    email?: string;
    telefono?: string;
    direccion?: string;
  }): Promise<Cotizacion | null> {
    try {
      const { data, error } = await supabase
        .from('cotizaciones')
        .insert({
          id_user: cotizacionData.id_user,
          id_seguro: cotizacionData.id_seguro,
          detalles: cotizacionData.detalles,
          id_estado: 1, // Estado "Pendiente" por defecto
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creando cotización:', error);
      throw error;
    }
  }

  // Obtener cotizaciones de un usuario
  static async getUserCotizaciones(userId: number): Promise<CotizacionWithDetails[]> {
    try {
      const { data, error } = await supabase
        .from('cotizaciones')
        .select(`
          *,
          seguros (
            id_seguro,
            tipo_de_seguro,
            descripcion,
            precio_base
          ),
          estado_cotizaciones (
            id_estado,
            estados
          )
        `)
        .eq('id_user', userId)
        .order('fecha_solicitud', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error obteniendo cotizaciones del usuario:', error);
      return [];
    }
  }

  // Obtener todas las cotizaciones (Admin/Vendedor)
  static async getAllCotizaciones(): Promise<CotizacionWithDetails[]> {
    try {
      const { data, error } = await supabase
        .from('cotizaciones')
        .select(`
          *,
          seguros (
            id_seguro,
            tipo_de_seguro,
            descripcion,
            precio_base
          ),
          estado_cotizaciones (
            id_estado,
            estados
          ),
          users (
            id_users,
            nombre,
            apellido
          )
        `)
        .order('fecha_solicitud', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error obteniendo todas las cotizaciones:', error);
      return [];
    }
  }

  // Actualizar estado de cotización
  static async updateCotizacionEstado(id: number, estadoId: number): Promise<Cotizacion | null> {
    try {
      const { data, error } = await supabase
        .from('cotizaciones')
        .update({ id_estado: estadoId })
        .eq('id_coti', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error actualizando estado de cotización:', error);
      throw error;
    }
  }

  // Obtener estados de cotización
  static async getEstadosCotizacion() {
    try {
      const { data, error } = await supabase
        .from('estado_cotizaciones')
        .select('*')
        .order('id_estado');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error obteniendo estados de cotización:', error);
      return [];
    }
  }
}