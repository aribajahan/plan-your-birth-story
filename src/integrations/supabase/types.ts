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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      birth_plans: {
        Row: {
          completed_at: string | null
          completion_percentage: number
          created_at: string
          data: Json
          exported_at: string | null
          guest_session_id: string | null
          id: string
          status: Database["public"]["Enums"]["birth_plan_status"]
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          completion_percentage?: number
          created_at?: string
          data?: Json
          exported_at?: string | null
          guest_session_id?: string | null
          id?: string
          status?: Database["public"]["Enums"]["birth_plan_status"]
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          completion_percentage?: number
          created_at?: string
          data?: Json
          exported_at?: string | null
          guest_session_id?: string | null
          id?: string
          status?: Database["public"]["Enums"]["birth_plan_status"]
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          chat_session_id: string
          content: string
          created_at: string
          id: string
          message_type: Database["public"]["Enums"]["chat_message_type"]
          metadata: Json | null
          role: Database["public"]["Enums"]["chat_message_role"]
        }
        Insert: {
          chat_session_id: string
          content: string
          created_at?: string
          id?: string
          message_type?: Database["public"]["Enums"]["chat_message_type"]
          metadata?: Json | null
          role: Database["public"]["Enums"]["chat_message_role"]
        }
        Update: {
          chat_session_id?: string
          content?: string
          created_at?: string
          id?: string
          message_type?: Database["public"]["Enums"]["chat_message_type"]
          metadata?: Json | null
          role?: Database["public"]["Enums"]["chat_message_role"]
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_chat_session_id_fkey"
            columns: ["chat_session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          birth_plan_id: string
          created_at: string
          id: string
          session_data: Json
          updated_at: string
        }
        Insert: {
          birth_plan_id: string
          created_at?: string
          id?: string
          session_data?: Json
          updated_at?: string
        }
        Update: {
          birth_plan_id?: string
          created_at?: string
          id?: string
          session_data?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_sessions_birth_plan_id_fkey"
            columns: ["birth_plan_id"]
            isOneToOne: false
            referencedRelation: "birth_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      progress_tracking: {
        Row: {
          birth_plan_id: string
          completed_topics: Json
          completion_percentage: number
          id: string
          last_updated: string
          section_name: string
        }
        Insert: {
          birth_plan_id: string
          completed_topics?: Json
          completion_percentage?: number
          id?: string
          last_updated?: string
          section_name: string
        }
        Update: {
          birth_plan_id?: string
          completed_topics?: Json
          completion_percentage?: number
          id?: string
          last_updated?: string
          section_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "progress_tracking_birth_plan_id_fkey"
            columns: ["birth_plan_id"]
            isOneToOne: false
            referencedRelation: "birth_plans"
            referencedColumns: ["id"]
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
      birth_plan_status: "draft" | "in_progress" | "completed" | "exported"
      chat_message_role: "user" | "assistant"
      chat_message_type: "text" | "reality-check" | "summary" | "script-preview"
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
      birth_plan_status: ["draft", "in_progress", "completed", "exported"],
      chat_message_role: ["user", "assistant"],
      chat_message_type: ["text", "reality-check", "summary", "script-preview"],
    },
  },
} as const
