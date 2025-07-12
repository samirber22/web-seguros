import { supabase } from '../lib/supabase';
import type { Database } from '../types/database';

type Seguro = Database['public']['Tables']['seguros']['Row'];
type SeguroInsert = Database['public']['Tables']['seguros']['Insert'];

export class SegurosService {
  // Obtener todos los seguros
  static async getAllSeguros(): Promise<Seguro[]> {
    try {
      const { data, error } = await supabase
        .from('seguros')
        .select('*')
        .order('tipo_de_seguro');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error obteniendo seguros:', error);
      return [];
    }
  }

  // Obtener seguro por ID
  static async getSeguroById(id: number): Promise<Seguro | null> {
    try {
      const { data, error } = await supabase
        .from('seguros')
        .select('*')
        .eq('id_seguro', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error obteniendo seguro:', error);
      return null;
    }
  }

  // Crear nuevo seguro (Admin)
  static async createSeguro(seguro: SeguroInsert): Promise<Seguro | null> {
    try {
      const { data, error } = await supabase
        .from('seguros')
        .insert(seguro)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creando seguro:', error);
      throw error;
    }
  }

  // Actualizar seguro (Admin)
  static async updateSeguro(id: number, updates: Partial<Seguro>): Promise<Seguro | null> {
    try {
      const { data, error } = await supabase
        .from('seguros')
        .update(updates)
        .eq('id_seguro', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error actualizando seguro:', error);
      throw error;
    }
  }

  // Eliminar seguro (Admin)
  static async deleteSeguro(id: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('seguros')
        .delete()
        .eq('id_seguro', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error eliminando seguro:', error);
      return false;
    }
  }
}