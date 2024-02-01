export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      app_developers: {
        Row: {
          app_id: string
          developer_id: string
        }
        Insert: {
          app_id: string
          developer_id: string
        }
        Update: {
          app_id?: string
          developer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "app_developers_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "apps"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "app_developers_developer_id_fkey"
            columns: ["developer_id"]
            isOneToOne: false
            referencedRelation: "developers"
            referencedColumns: ["developer_id"]
          }
        ]
      }
      apps: {
        Row: {
          app_id: string
          app_url: string | null
          categories: string | null
          created_at: string | null
          description: string | null
          introduction: string | null
          is_published: boolean | null
          pricing: string | null
          submitted_by: string | null
          submitted_by_user_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          app_id?: string
          app_url?: string | null
          categories?: string | null
          created_at?: string | null
          description?: string | null
          introduction?: string | null
          is_published?: boolean | null
          pricing?: string | null
          submitted_by?: string | null
          submitted_by_user_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          app_id?: string
          app_url?: string | null
          categories?: string | null
          created_at?: string | null
          description?: string | null
          introduction?: string | null
          is_published?: boolean | null
          pricing?: string | null
          submitted_by?: string | null
          submitted_by_user_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "apps_submitted_by_user_id_fkey"
            columns: ["submitted_by_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      apps_categories: {
        Row: {
          app_id: string
          category_name: string
          created_at: string
          id: string
        }
        Insert: {
          app_id: string
          category_name: string
          created_at?: string
          id?: string
        }
        Update: {
          app_id?: string
          category_name?: string
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "apps_categories_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "apps"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "apps_categories_category_name_fkey"
            columns: ["category_name"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["category_name"]
          }
        ]
      }
      categories: {
        Row: {
          category_name: string
          top_ranking_board: string | null
        }
        Insert: {
          category_name: string
          top_ranking_board?: string | null
        }
        Update: {
          category_name?: string
          top_ranking_board?: string | null
        }
        Relationships: []
      }
      developers: {
        Row: {
          developer_email: string | null
          developer_icon: string | null
          developer_id: string
          developer_name: string
          developer_url: string | null
        }
        Insert: {
          developer_email?: string | null
          developer_icon?: string | null
          developer_id?: string
          developer_name: string
          developer_url?: string | null
        }
        Update: {
          developer_email?: string | null
          developer_icon?: string | null
          developer_id?: string
          developer_name?: string
          developer_url?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          data_of_birth: string | null
          full_name: string | null
          id: string
          job: string | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          data_of_birth?: string | null
          full_name?: string | null
          id: string
          job?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          data_of_birth?: string | null
          full_name?: string | null
          id?: string
          job?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_collections: {
        Row: {
          app_id: string
          collection_id: string
          user_id: string
        }
        Insert: {
          app_id: string
          collection_id?: string
          user_id: string
        }
        Update: {
          app_id?: string
          collection_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_collections_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "apps"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "user_collections_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_avatar: {
        Args: {
          avatar_url: string
        }
        Returns: Record<string, unknown>
      }
      delete_storage_object: {
        Args: {
          bucket: string
          object: string
        }
        Returns: Record<string, unknown>
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
