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
      app: {
        Row: {
          created_at: string
          id: string
          title: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          title?: string | null
        }
        Relationships: []
      }
      app_categories: {
        Row: {
          app_id: string
          category_id: string
        }
        Insert: {
          app_id: string
          category_id: string
        }
        Update: {
          app_id?: string
          category_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "app_categories_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "apps"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "app_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["category_id"]
          }
        ]
      }
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
          app_logo: string | null
          app_url: string
          click_count: number | null
          created_at: string | null
          description: string
          introduction: string | null
          last_updated_at: string | null
          likes: number | null
          pricing: string | null
          ratings: number | null
          thumb_nail: string | null
          title: string
          view_count: number | null
        }
        Insert: {
          app_id?: string
          app_logo?: string | null
          app_url: string
          click_count?: number | null
          created_at?: string | null
          description: string
          introduction?: string | null
          last_updated_at?: string | null
          likes?: number | null
          pricing?: string | null
          ratings?: number | null
          thumb_nail?: string | null
          title: string
          view_count?: number | null
        }
        Update: {
          app_id?: string
          app_logo?: string | null
          app_url?: string
          click_count?: number | null
          created_at?: string | null
          description?: string
          introduction?: string | null
          last_updated_at?: string | null
          likes?: number | null
          pricing?: string | null
          ratings?: number | null
          thumb_nail?: string | null
          title?: string
          view_count?: number | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          category_id: string
          category_name: string
          top_ranking_board: string | null
        }
        Insert: {
          category_id?: string
          category_name: string
          top_ranking_board?: string | null
        }
        Update: {
          category_id?: string
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
      images: {
        Row: {
          app_id: string | null
          id: string
          image_url: string | null
        }
        Insert: {
          app_id?: string | null
          id?: string
          image_url?: string | null
        }
        Update: {
          app_id?: string | null
          id?: string
          image_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "images_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "apps"
            referencedColumns: ["app_id"]
          }
        ]
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
      user_app_likes: {
        Row: {
          app_id: string
          user_id: string
        }
        Insert: {
          app_id: string
          user_id: string
        }
        Update: {
          app_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_app_likes_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "apps"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "user_app_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
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
      videos: {
        Row: {
          app_id: string | null
          id: string
          video_url: string | null
        }
        Insert: {
          app_id?: string | null
          id?: string
          video_url?: string | null
        }
        Update: {
          app_id?: string | null
          id?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "videos_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "apps"
            referencedColumns: ["app_id"]
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
