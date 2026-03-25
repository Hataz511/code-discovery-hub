export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          created_at: string
          id: string
          is_read: boolean | null
          message: string
          related_id: string | null
          severity: string
          title: string
          type: Database["public"]["Enums"]["alert_type"]
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message: string
          related_id?: string | null
          severity?: string
          title: string
          type: Database["public"]["Enums"]["alert_type"]
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string
          related_id?: string | null
          severity?: string
          title?: string
          type?: Database["public"]["Enums"]["alert_type"]
        }
        Relationships: []
      }
      audit_log: {
        Row: {
          action: string
          created_at: string
          details: string | null
          id: string
          ip_address: string | null
          module: string
          user_id: string | null
          user_name: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: string | null
          id?: string
          ip_address?: string | null
          module: string
          user_id?: string | null
          user_name?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: string | null
          id?: string
          ip_address?: string | null
          module?: string
          user_id?: string | null
          user_name?: string | null
        }
        Relationships: []
      }
      chemical_requests: {
        Row: {
          chemical_id: string
          created_at: string
          experiment_ref: string | null
          hazard_level: Database["public"]["Enums"]["hazard_level"]
          id: string
          justification: string
          quantity: number
          requester_id: string
          reviewer_comment: string | null
          reviewer_id: string | null
          second_reviewer_id: string | null
          status: Database["public"]["Enums"]["request_status"]
          unit: Database["public"]["Enums"]["chemical_unit"]
          updated_at: string
        }
        Insert: {
          chemical_id: string
          created_at?: string
          experiment_ref?: string | null
          hazard_level?: Database["public"]["Enums"]["hazard_level"]
          id?: string
          justification: string
          quantity: number
          requester_id: string
          reviewer_comment?: string | null
          reviewer_id?: string | null
          second_reviewer_id?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          unit?: Database["public"]["Enums"]["chemical_unit"]
          updated_at?: string
        }
        Update: {
          chemical_id?: string
          created_at?: string
          experiment_ref?: string | null
          hazard_level?: Database["public"]["Enums"]["hazard_level"]
          id?: string
          justification?: string
          quantity?: number
          requester_id?: string
          reviewer_comment?: string | null
          reviewer_id?: string | null
          second_reviewer_id?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          unit?: Database["public"]["Enums"]["chemical_unit"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chemical_requests_chemical_id_fkey"
            columns: ["chemical_id"]
            isOneToOne: false
            referencedRelation: "chemicals"
            referencedColumns: ["id"]
          },
        ]
      }
      chemicals: {
        Row: {
          cas_number: string
          created_at: string
          created_by: string | null
          expiry_date: string
          formula: string
          hazard_level: Database["public"]["Enums"]["hazard_level"]
          id: string
          location: string
          minimum_stock: number
          msds_url: string | null
          name: string
          quantity: number
          supplier: string | null
          unit: Database["public"]["Enums"]["chemical_unit"]
          updated_at: string
        }
        Insert: {
          cas_number: string
          created_at?: string
          created_by?: string | null
          expiry_date: string
          formula: string
          hazard_level?: Database["public"]["Enums"]["hazard_level"]
          id?: string
          location: string
          minimum_stock?: number
          msds_url?: string | null
          name: string
          quantity?: number
          supplier?: string | null
          unit?: Database["public"]["Enums"]["chemical_unit"]
          updated_at?: string
        }
        Update: {
          cas_number?: string
          created_at?: string
          created_by?: string | null
          expiry_date?: string
          formula?: string
          hazard_level?: Database["public"]["Enums"]["hazard_level"]
          id?: string
          location?: string
          minimum_stock?: number
          msds_url?: string | null
          name?: string
          quantity?: number
          supplier?: string | null
          unit?: Database["public"]["Enums"]["chemical_unit"]
          updated_at?: string
        }
        Relationships: []
      }
      equipment: {
        Row: {
          created_at: string
          id: string
          last_calibration: string | null
          location: string | null
          model: string | null
          name: string
          next_calibration: string | null
          status: Database["public"]["Enums"]["equipment_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_calibration?: string | null
          location?: string | null
          model?: string | null
          name: string
          next_calibration?: string | null
          status?: Database["public"]["Enums"]["equipment_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          last_calibration?: string | null
          location?: string | null
          model?: string | null
          name?: string
          next_calibration?: string | null
          status?: Database["public"]["Enums"]["equipment_status"]
          updated_at?: string
        }
        Relationships: []
      }
      experiments: {
        Row: {
          chemicals: Json | null
          created_at: string
          date: string
          description: string | null
          id: string
          status: string
          student_id: string
          supervisor_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          chemicals?: Json | null
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          status?: string
          student_id: string
          supervisor_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          chemicals?: Json | null
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          status?: string
          student_id?: string
          supervisor_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          department: string | null
          email: string
          full_name: string
          hazard_clearance_level:
            | Database["public"]["Enums"]["hazard_level"]
            | null
          id: string
          is_active: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          email: string
          full_name: string
          hazard_clearance_level?:
            | Database["public"]["Enums"]["hazard_level"]
            | null
          id?: string
          is_active?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          department?: string | null
          email?: string
          full_name?: string
          hazard_clearance_level?:
            | Database["public"]["Enums"]["hazard_level"]
            | null
          id?: string
          is_active?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      schedules: {
        Row: {
          created_at: string
          created_by: string | null
          day: string
          end_time: string
          id: string
          level: string
          professor: string
          program: string
          room: string
          semester: number
          start_time: string
          subject: string
          type: string
          updated_at: string
          year: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          day: string
          end_time: string
          id?: string
          level?: string
          professor: string
          program: string
          room: string
          semester?: number
          start_time: string
          subject: string
          type?: string
          updated_at?: string
          year?: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          day?: string
          end_time?: string
          id?: string
          level?: string
          professor?: string
          program?: string
          room?: string
          semester?: number
          start_time?: string
          subject?: string
          type?: string
          updated_at?: string
          year?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      alert_type: "expiry" | "low_stock" | "hazard" | "maintenance" | "anomaly"
      app_role:
        | "admin"
        | "lab_manager"
        | "professor"
        | "lab_technician"
        | "lab_supervisor"
        | "student"
        | "auditor"
      chemical_unit: "mL" | "L" | "g" | "kg" | "mol"
      equipment_status: "available" | "in_use" | "maintenance" | "out_of_order"
      hazard_level: "low" | "medium" | "high" | "critical"
      incident_severity: "minor" | "moderate" | "major" | "critical"
      request_status:
        | "pending"
        | "approved_level1"
        | "approved"
        | "rejected"
        | "dispensed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      alert_type: ["expiry", "low_stock", "hazard", "maintenance", "anomaly"],
      app_role: [
        "admin",
        "lab_manager",
        "professor",
        "lab_technician",
        "lab_supervisor",
        "student",
        "auditor",
      ],
      chemical_unit: ["mL", "L", "g", "kg", "mol"],
      equipment_status: ["available", "in_use", "maintenance", "out_of_order"],
      hazard_level: ["low", "medium", "high", "critical"],
      incident_severity: ["minor", "moderate", "major", "critical"],
      request_status: [
        "pending",
        "approved_level1",
        "approved",
        "rejected",
        "dispensed",
      ],
    },
  },
} as const
