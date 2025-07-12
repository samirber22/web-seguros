export interface User {
  id: string;
  email: string;
  nombre_completo: string;
  telefono?: string;
  direccion?: string;
  rol_id: number;
  fecha_registro: Date;
  role?: Role;
}

export interface Role {
  id: number;
  nombre_rol: string;
}

export interface Insurance {
  id: number;
  nombre: string;
  descripcion: string;
  precio_base: number;
  activo: boolean;
}

export interface Quote {
  id: number;
  user_id: string;
  seguro_id: number;
  detalles: string;
  id_estado: number;
  fecha_solicitud: Date;
  insurance?: Insurance;
  user?: User;
  estado?: QuoteStatus;
}

export interface QuoteStatus {
  id: number;
  estado: string;
}

export interface Policy {
  id: number;
  user_id: string;
  seguro_id: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  id_estado: number;
  insurance?: Insurance;
  user?: User;
  estado?: PolicyStatus;
}

export interface PolicyStatus {
  id: number;
  estado: string;
}

export interface PQRS {
  id: number;
  user_id: string;
  id_tipo: number;
  mensaje: string;
  estado_id: number;
  respuesta?: string;
  fecha_envio: Date;
  fecha_respuesta?: Date;
  user?: User;
  tipo?: PQRSType;
}

export interface PQRSType {
  id: number;
  tipo: string;
}

export interface Payment {
  id: number;
  user_id: string;
  poliza_id: number;
  monto: number;
  fecha_pago: Date;
  soporte_url?: string;
  enviado_whatsapp: boolean;
  user?: User;
  policy?: Policy;
}

export interface Message {
  id: number;
  remitente_id_user: string;
  receptor_id_user: string;
  mensaje: string;
  fecha_envio: Date;
  sender?: User;
  receiver?: User;
}

export type UserRole = 'usuario' | 'vendedor' | 'admin';