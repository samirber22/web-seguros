import { supabase } from '../lib/supabase';
import type { Database } from '../types/database';






type Departamento = Database['public']['Tables']['departamentos']['Row'];
type Ciudad = Database['public']['Tables']['ciudad']['Row'];


export interface CiudadWithDepartamento extends Ciudad {
  departamentos?: Departamento;
}

export class LocationService {
  // Obtener todos los departamentos
  static async getDepartamentos(): Promise<Departamento[]> {
    try {
      const { data, error } = await supabase
        .from('departamentos')
        .select('*')
        .order('nombre');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error obteniendo departamentos:', error);
      return [];
    }
  }

  // Obtener ciudades por departamento
  static async getCiudadesByDepartamento(departamentoId: number): Promise<Ciudad[]> {
    try {
      const { data, error } = await supabase
        .from('ciudad')
        .select('*')
        .eq('id_depar', departamentoId)
        .order('nombre');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error obteniendo ciudades:', error);
      return [];
    }
  }

  // Crear nueva dirección
  
}