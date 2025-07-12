export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      ciudades: {
        Row: {
          id_ciudad: number
          id_depa: number
          nombre_ciu: string
        }
        Insert: {
          id_ciudad?: number
          id_depa: number
          nombre_ciu: string
        }
        Update: {
          id_ciudad?: number
          id_depa?: number
          nombre_ciu?: string
        }
        Relationships: [
          {
            foreignKeyName: "ciudades_id_depa_fkey"
            columns: ["id_depa"]
            isOneToOne: false
            referencedRelation: "departamentos"
            referencedColumns: ["id_depa"]
          },
        ]
      }
      cotizaciones: {
        Row: {
          detalles: string | null
          fecha_solicitud: string | null
          id_coti: number
          id_estado: number | null
          id_seguro: number | null
          id_user: number
        }
        Insert: {
          detalles?: string | null
          fecha_solicitud?: string | null
          id_coti?: number
          id_estado?: number | null
          id_seguro?: number | null
          id_user: number
        }
        Update: {
          detalles?: string | null
          fecha_solicitud?: string | null
          id_coti?: number
          id_estado?: number | null
          id_seguro?: number | null
          id_user?: number
        }
        Relationships: [
          {
            foreignKeyName: "cotizaciones_id_estado_fkey"
            columns: ["id_estado"]
            isOneToOne: false
            referencedRelation: "estado_cotizaciones"
            referencedColumns: ["id_estado"]
          },
          {
            foreignKeyName: "cotizaciones_id_seguro_fkey"
            columns: ["id_seguro"]
            isOneToOne: false
            referencedRelation: "seguros"
            referencedColumns: ["id_seguro"]
          },
        ]
      }
      departamentos: {
        Row: {
          id_depa: number
          nombre_depa: string
        }
        Insert: {
          id_depa?: number
          nombre_depa: string
        }
        Update: {
          id_depa?: number
          nombre_depa?: string
        }
        Relationships: []
      }
      directions: {
        Row: {
          direction: string
          id_ciudad: number | null
          id_direction: number
        }
        Insert: {
          direction: string
          id_ciudad?: number | null
          id_direction?: number
        }
        Update: {
          direction?: string
          id_ciudad?: number | null
          id_direction?: number
        }
        Relationships: [
          {
            foreignKeyName: "directions_id_ciudad_fkey"
            columns: ["id_ciudad"]
            isOneToOne: false
            referencedRelation: "ciudades"
            referencedColumns: ["id_ciudad"]
          },
        ]
      }
      estado_cotizaciones: {
        Row: {
          estados: string
          id_estado: number
        }
        Insert: {
          estados: string
          id_estado?: number
        }
        Update: {
          estados?: string
          id_estado?: number
        }
        Relationships: []
      }
      estado_poliza: {
        Row: {
          estado: string
          id_estpol: number
        }
        Insert: {
          estado: string
          id_estpol?: number
        }
        Update: {
          estado?: string
          id_estpol?: number
        }
        Relationships: []
      }
      estado_pqrs: {
        Row: {
          estado: string
          id_estpqr: number
        }
        Insert: {
          estado: string
          id_estpqr?: number
        }
        Update: {
          estado?: string
          id_estpqr?: number
        }
        Relationships: []
      }
      estado_users: {
        Row: {
          estado_user: string
          id_estuser: number
        }
        Insert: {
          estado_user: string
          id_estuser?: number
        }
        Update: {
          estado_user?: string
          id_estuser?: number
        }
        Relationships: []
      }
      pagos: {
        Row: {
          enviado_whatsapp: boolean | null
          fecha_pago: string | null
          id_pagos: number
          id_poliza: number | null
          id_user: number
          monto: number | null
        }
        Insert: {
          enviado_whatsapp?: boolean | null
          fecha_pago?: string | null
          id_pagos?: number
          id_poliza?: number | null
          id_user: number
          monto?: number | null
        }
        Update: {
          enviado_whatsapp?: boolean | null
          fecha_pago?: string | null
          id_pagos?: number
          id_poliza?: number | null
          id_user?: number
          monto?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pagos_id_poliza_fkey"
            columns: ["id_poliza"]
            isOneToOne: false
            referencedRelation: "polizas"
            referencedColumns: ["id_poliza"]
          },
        ]
      }
      polizas: {
        Row: {
          fecha_fin: string | null
          fecha_inicio: string
          id_estado: number | null
          id_poliza: number
          id_seguro: number | null
          id_user: number
        }
        Insert: {
          fecha_fin?: string | null
          fecha_inicio: string
          id_estado?: number | null
          id_poliza?: number
          id_seguro?: number | null
          id_user: number
        }
        Update: {
          fecha_fin?: string | null
          fecha_inicio?: string
          id_estado?: number | null
          id_poliza?: number
          id_seguro?: number | null
          id_user?: number
        }
        Relationships: [
          {
            foreignKeyName: "polizas_id_estado_fkey"
            columns: ["id_estado"]
            isOneToOne: false
            referencedRelation: "estado_poliza"
            referencedColumns: ["id_estpol"]
          },
          {
            foreignKeyName: "polizas_id_seguro_fkey"
            columns: ["id_seguro"]
            isOneToOne: false
            referencedRelation: "seguros"
            referencedColumns: ["id_seguro"]
          },
        ]
      }
      pqrs: {
        Row: {
          fecha_envio: string
          fecha_respuesta: string | null
          id_estado: number | null
          id_pqrs: number
          id_tipqr: number | null
          id_user: number
          mesaje: string
        }
        Insert: {
          fecha_envio?: string
          fecha_respuesta?: string | null
          id_estado?: number | null
          id_pqrs?: number
          id_tipqr?: number | null
          id_user: number
          mesaje: string
        }
        Update: {
          fecha_envio?: string
          fecha_respuesta?: string | null
          id_estado?: number | null
          id_pqrs?: number
          id_tipqr?: number | null
          id_user?: number
          mesaje?: string
        }
        Relationships: [
          {
            foreignKeyName: "pqrs_id_estado_fkey"
            columns: ["id_estado"]
            isOneToOne: false
            referencedRelation: "estado_pqrs"
            referencedColumns: ["id_estpqr"]
          },
          {
            foreignKeyName: "pqrs_id_tipqr_fkey"
            columns: ["id_tipqr"]
            isOneToOne: false
            referencedRelation: "tipo_pqrs"
            referencedColumns: ["id_tipqr"]
          },
        ]
      }
      roles: {
        Row: {
          id_rol: number
          roles: string
        }
        Insert: {
          id_rol?: number
          roles: string
        }
        Update: {
          id_rol?: number
          roles?: string
        }
        Relationships: []
      }
      seguros: {
        Row: {
          descripcion: string | null
          id_seguro: number
          precio_base: number | null
          tipo_de_seguro: string
        }
        Insert: {
          descripcion?: string | null
          id_seguro?: number
          precio_base?: number | null
          tipo_de_seguro: string
        }
        Update: {
          descripcion?: string | null
          id_seguro?: number
          precio_base?: number | null
          tipo_de_seguro?: string
        }
        Relationships: []
      }
      tipo_pqrs: {
        Row: {
          id_tipqr: number
          tipo_pqrs: string
        }
        Insert: {
          id_tipqr?: number
          tipo_pqrs: string
        }
        Update: {
          id_tipqr?: number
          tipo_pqrs?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          apellido: string
          barrio: string | null
          direction: string | null
          email: string
          fecha_registro: string | null
          id: string
          id_ciudad: number | null
          id_estado_user: number | null
          id_rol: number | null
          nombre: string
          telefono: number | null
        }
        Insert: {
          apellido: string
          barrio?: string | null
          direction?: string | null
          email: string
          fecha_registro?: string | null
          id: string
          id_ciudad?: number | null
          id_estado_user?: number | null
          id_rol?: number | null
          nombre: string
          telefono?: number | null
        }
        Update: {
          apellido?: string
          barrio?: string | null
          direction?: string | null
          email?: string
          fecha_registro?: string | null
          id?: string
          id_ciudad?: number | null
          id_estado_user?: number | null
          id_rol?: number | null
          nombre?: string
          telefono?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_ciudad_fkey"
            columns: ["id_ciudad"]
            isOneToOne: false
            referencedRelation: "ciudades"
            referencedColumns: ["id_ciudad"]
          },
          {
            foreignKeyName: "users_id_estado_user_fkey"
            columns: ["id_estado_user"]
            isOneToOne: false
            referencedRelation: "estado_users"
            referencedColumns: ["id_estuser"]
          },
          {
            foreignKeyName: "users_id_rol_fkey"
            columns: ["id_rol"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id_rol"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
