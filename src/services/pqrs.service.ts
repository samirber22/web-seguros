import { supabase } from '../lib/supabase';
import type { Database } from '../types/database';

type PQRS = Database['public']['Tables']['pqrs']['Row'];
type PQRSInsert = Database['public']['Tables']['pqrs']['Insert'];

export interface PQRSWithDetails extends PQRS {
  tipo_pqrs?: {
    id_tipqr: number;
    tipo_pqrs: string;
  };
  estado_pqrs?: {
    id_estpqr: number;
    estado: string;
  };
  users?: {
    id_users: number;
    nombre: string;
    apellido: string | null;
  };
}

export class PQRSService {
  // Crear nuevo PQRS
  static async createPQRS(pqrsData: {
    id_user: number;
    id_tipqr: number;
    mesaje: string;
    asunto?: string;
  }): Promise<PQRS | null> {
    try {
      const { data, error } = await supabase
        .from('pqrs')
        .insert({
          id_user: pqrsData.id_user,
          id_tipqr: pqrsData.id_tipqr,
          mesaje: pqrsData.mesaje,
          id_estado: 1, // Estado "Pendiente" por defecto
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creando PQRS:', error);
      throw error;
    }
  }

  // Obtener PQRS de un usuario
  static async getUserPQRS(userId: number): Promise<PQRSWithDetails[]> {
    try {
      const { data, error } = await supabase
        .from('pqrs')
        .select(`
          *,
          tipo_pqrs (
            id_tipqr,
            tipo_pqrs
          ),
          estado_pqrs (
            id_estpqr,
            estado
          )
        `)
        .eq('id_user', userId)
        .order('fecha_envio', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error obteniendo PQRS del usuario:', error);
      return [];
    }
  }

  // Obtener todos los PQRS (Admin/Vendedor)
  static async getAllPQRS(): Promise<PQRSWithDetails[]> {
    try {
      const { data, error } = await supabase
        .from('pqrs')
        .select(`
          *,
          tipo_pqrs (
            id_tipqr,
            tipo_pqrs
          ),
          estado_pqrs (
            id_estpqr,
            estado
          ),
          users (
            id_users,
            nombre,
            apellido
          )
        `)
        .order('fecha_envio', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error obteniendo todos los PQRS:', error);
      return [];
    }
  }

  // Responder PQRS
  static async responderPQRS(id: number, respuesta: string): Promise<PQRS | null> {
    try {
      const { data, error } = await supabase
        .from('pqrs')
        .update({
          // respuesta: respuesta, // Nota: necesitarías agregar este campo a la tabla
          id_estado: 2, // Estado "Respondido"
          fecha_respuesta: new Date().toISOString()
        })
        .eq('id_pqrs', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error respondiendo PQRS:', error);
      throw error;
    }
  }

  // Obtener tipos de PQRS
  static async getTiposPQRS() {
    try {
      const { data, error } = await supabase
        .from('tipo_pqrs')
        .select('*')
        .order('id_tipqr');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error obteniendo tipos de PQRS:', error);
      return [];
    }
  }

  // Obtener estados de PQRS
  static async getEstadosPQRS() {
    try {
      const { data, error } = await supabase
        .from('estado_pqrs')
        .select('*')
        .order('id_estpqr');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error obteniendo estados de PQRS:', error);
      return [];
    }
  }
}