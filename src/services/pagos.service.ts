import { supabase } from '../lib/supabase';
import type { Database } from '../types/database';

type Pago = Database['public']['Tables']['pagos']['Row'];
type PagoInsert = Database['public']['Tables']['pagos']['Insert'];

export interface PagoWithDetails extends Pago {
  polizas?: {
    id_poliza: number;
    seguros?: {
      tipo_de_seguro: string;
    };
  };
  users?: {
    id_users: number;
    nombre: string;
    apellido: string | null;
  };
}

export class PagosService {
  // Crear nuevo pago
  static async createPago(pagoData: {
    id_user: number;
    id_poliza: number;
    monto: number;
    comprobante?: File;
    soporte_url?: string;
  }): Promise<Pago | null> {
    try {
      let soporte_url = pagoData.soporte_url;

      // Si hay un archivo de comprobante, subirlo a Supabase Storage
      if (pagoData.comprobante) {
        const fileName = `comprobantes/${Date.now()}_${pagoData.comprobante.name}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('comprobantes')
          .upload(fileName, pagoData.comprobante);

        if (uploadError) throw uploadError;

        // Obtener URL pública del archivo
        const { data: urlData } = supabase.storage
          .from('comprobantes')
          .getPublicUrl(fileName);

        soporte_url = urlData.publicUrl;
      }

      const { data, error } = await supabase
        .from('pagos')
        .insert({
          id_user: pagoData.id_user,
          id_poliza: pagoData.id_poliza,
          monto: pagoData.monto,
          fecha_pago: new Date().toISOString(),
          enviado_whatsapp: false,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creando pago:', error);
      throw error;
    }
  }

  // Obtener pagos de un usuario
  static async getUserPagos(userId: number): Promise<PagoWithDetails[]> {
    try {
      const { data, error } = await supabase
        .from('pagos')
        .select(`
          *,
          polizas (
            id_poliza,
            seguros (
              tipo_de_seguro
            )
          )
        `)
        .eq('id_user', userId)
        .order('fecha_pago', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error obteniendo pagos del usuario:', error);
      return [];
    }
  }

  // Obtener todos los pagos (Admin/Vendedor)
  static async getAllPagos(): Promise<PagoWithDetails[]> {
    try {
      const { data, error } = await supabase
        .from('pagos')
        .select(`
          *,
          polizas (
            id_poliza,
            seguros (
              tipo_de_seguro
            )
          ),
          users (
            id_users,
            nombre,
            apellido
          )
        `)
        .order('fecha_pago', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error obteniendo todos los pagos:', error);
      return [];
    }
  }

  // Marcar pago como enviado por WhatsApp
  static async marcarEnviadoWhatsApp(pagoId: number): Promise<Pago | null> {
    try {
      const { data, error } = await supabase
        .from('pagos')
        .update({ enviado_whatsapp: true })
        .eq('id_pagos', pagoId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error marcando pago como enviado por WhatsApp:', error);
      throw error;
    }
  }

  // Generar URL de WhatsApp para envío de comprobante
  static generateWhatsAppURL(phoneNumber: string, pagoId: number, monto: number): string {
    const message = encodeURIComponent(
      `Hola, quiero enviar el comprobante de pago:\n\n` +
      `ID de Pago: ${pagoId}\n` +
      `Monto: $${monto.toLocaleString()}\n\n` +
      `Por favor, confirmen la recepción del pago.`
    );
    
    return `https://wa.me/${phoneNumber}?text=${message}`;
  }
}