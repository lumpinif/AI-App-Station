export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      app_analytics: {
        Row: {
          app_slug: string
          created_at: string
          id: string
          updated_at: string | null
          view_count: number
        }
        Insert: {
          app_slug: string
          created_at?: string
          id?: string
          updated_at?: string | null
          view_count?: number
        }
        Update: {
          app_slug?: string
          created_at?: string
          id?: string
          updated_at?: string | null
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "app_analytics_app_slug_fkey"
            columns: ["app_slug"]
            isOneToOne: true
            referencedRelation: "apps"
            referencedColumns: ["app_slug"]
          },
        ]
      }
      app_bookmarks: {
        Row: {
          app_id: string
          created_at: string
          like_id: string
          user_id: string
        }
        Insert: {
          app_id: string
          created_at?: string
          like_id?: string
          user_id: string
        }
        Update: {
          app_id?: string
          created_at?: string
          like_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "app_bookmarks_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "apps"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "app_bookmarks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      app_comment_likes: {
        Row: {
          comment_id: string
          created_at: string
          like_id: string
          user_id: string
        }
        Insert: {
          comment_id: string
          created_at?: string
          like_id?: string
          user_id: string
        }
        Update: {
          comment_id?: string
          created_at?: string
          like_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_comment_likes_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "app_comments"
            referencedColumns: ["comment_id"]
          },
          {
            foreignKeyName: "public_comment_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      app_comments: {
        Row: {
          app_id: string
          comment: string
          comment_id: string
          created_at: string
          likes_count: number
          parent_id: string | null
          rating: number | null
          updated_at: string | null
          user_id: string
          views_count: number | null
        }
        Insert: {
          app_id: string
          comment?: string
          comment_id?: string
          created_at?: string
          likes_count?: number
          parent_id?: string | null
          rating?: number | null
          updated_at?: string | null
          user_id: string
          views_count?: number | null
        }
        Update: {
          app_id?: string
          comment?: string
          comment_id?: string
          created_at?: string
          likes_count?: number
          parent_id?: string | null
          rating?: number | null
          updated_at?: string | null
          user_id?: string
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_comments_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "apps"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "public_comments_reply_to_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "app_comments"
            referencedColumns: ["comment_id"]
          },
        ]
      }
      app_likes: {
        Row: {
          app_id: string
          created_at: string
          like_id: string
          user_id: string
        }
        Insert: {
          app_id: string
          created_at?: string
          like_id?: string
          user_id: string
        }
        Update: {
          app_id?: string
          created_at?: string
          like_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "app_likes_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "apps"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "public_app_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      apps: {
        Row: {
          app_icon_src: string | null
          app_id: string
          app_image_src: string | null
          app_publish_status: Database["public"]["Enums"]["publish_status"]
          app_slug: string
          app_title: string
          app_url: string | null
          comments_count: number
          copy_right: string | null
          created_at: string
          description: string | null
          introduction: Json | null
          is_featured: boolean | null
          is_gpt: boolean
          likes_count: number
          pricing: Database["public"]["Enums"]["pricing"] | null
          submitted_by_user_id: string
          updated_at: string | null
          views_count: number
        }
        Insert: {
          app_icon_src?: string | null
          app_id?: string
          app_image_src?: string | null
          app_publish_status?: Database["public"]["Enums"]["publish_status"]
          app_slug: string
          app_title: string
          app_url?: string | null
          comments_count?: number
          copy_right?: string | null
          created_at?: string
          description?: string | null
          introduction?: Json | null
          is_featured?: boolean | null
          is_gpt?: boolean
          likes_count?: number
          pricing?: Database["public"]["Enums"]["pricing"] | null
          submitted_by_user_id: string
          updated_at?: string | null
          views_count?: number
        }
        Update: {
          app_icon_src?: string | null
          app_id?: string
          app_image_src?: string | null
          app_publish_status?: Database["public"]["Enums"]["publish_status"]
          app_slug?: string
          app_title?: string
          app_url?: string | null
          comments_count?: number
          copy_right?: string | null
          created_at?: string
          description?: string | null
          introduction?: Json | null
          is_featured?: boolean | null
          is_gpt?: boolean
          likes_count?: number
          pricing?: Database["public"]["Enums"]["pricing"] | null
          submitted_by_user_id?: string
          updated_at?: string | null
          views_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_apps_submitted_by_user_id_fkey"
            columns: ["submitted_by_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      apps_categories: {
        Row: {
          app_id: string
          category_id: string
          submitted_by_user_id: string | null
        }
        Insert: {
          app_id: string
          category_id: string
          submitted_by_user_id?: string | null
        }
        Update: {
          app_id?: string
          category_id?: string
          submitted_by_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "apps_categories_submitted_by_user_id_fkey"
            columns: ["submitted_by_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_apps_categories_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "apps"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "public_apps_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["category_id"]
          },
        ]
      }
      apps_developers: {
        Row: {
          app_id: string
          developer_id: string
          submitted_by_user_id: string | null
        }
        Insert: {
          app_id: string
          developer_id: string
          submitted_by_user_id?: string | null
        }
        Update: {
          app_id?: string
          developer_id?: string
          submitted_by_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_app_developers_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "apps"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "public_app_developers_developer_id_fkey"
            columns: ["developer_id"]
            isOneToOne: false
            referencedRelation: "developers"
            referencedColumns: ["developer_id"]
          },
          {
            foreignKeyName: "public_apps_developers_submitted_by_user_id_fkey"
            columns: ["submitted_by_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      categories: {
        Row: {
          category_description: string | null
          category_icon_name: string | null
          category_id: string
          category_name: string
          category_slug: string
          created_at: string
          submitted_by_user_id: string | null
        }
        Insert: {
          category_description?: string | null
          category_icon_name?: string | null
          category_id?: string
          category_name: string
          category_slug: string
          created_at?: string
          submitted_by_user_id?: string | null
        }
        Update: {
          category_description?: string | null
          category_icon_name?: string | null
          category_id?: string
          category_name?: string
          category_slug?: string
          created_at?: string
          submitted_by_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_submitted_by_user_id_fkey"
            columns: ["submitted_by_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      daily_app: {
        Row: {
          created_at: string
          created_on: string
          dapp_id: string
          submitted_by: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          created_on?: string
          dapp_id?: string
          submitted_by: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          created_on?: string
          dapp_id?: string
          submitted_by?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "daily_app_dapp_id_fkey"
            columns: ["dapp_id"]
            isOneToOne: true
            referencedRelation: "apps"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "daily_app_submitted_by_fkey"
            columns: ["submitted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_name"]
          },
        ]
      }
      daily_post: {
        Row: {
          created_at: string
          created_on: string
          dpost_id: string
          is_archived: boolean
          posted_by: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          created_on?: string
          dpost_id?: string
          is_archived?: boolean
          posted_by?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          created_on?: string
          dpost_id?: string
          is_archived?: boolean
          posted_by?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "daily_post_dpost_id_fkey"
            columns: ["dpost_id"]
            isOneToOne: true
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "daily_post_posted_by_fkey"
            columns: ["posted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_name"]
          },
        ]
      }
      developers: {
        Row: {
          developer_email: string | null
          developer_icon_src: string | null
          developer_id: string
          developer_name: string
          developer_slug: string
          developer_url: string | null
          submitted_by_user_id: string | null
        }
        Insert: {
          developer_email?: string | null
          developer_icon_src?: string | null
          developer_id?: string
          developer_name: string
          developer_slug: string
          developer_url?: string | null
          submitted_by_user_id?: string | null
        }
        Update: {
          developer_email?: string | null
          developer_icon_src?: string | null
          developer_id?: string
          developer_name?: string
          developer_slug?: string
          developer_url?: string | null
          submitted_by_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_developers_submitted_by_user_id_fkey"
            columns: ["submitted_by_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      email_subscriptions: {
        Row: {
          created_at: string
          email: string | null
          esub_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          esub_id?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          esub_id?: string
        }
        Relationships: []
      }
      post_analytics: {
        Row: {
          created_at: string
          id: string
          post_id: string
          updated_at: string | null
          view_count: number
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          updated_at?: string | null
          view_count?: number
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          updated_at?: string | null
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "post_analytics_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
        ]
      }
      post_bookmarks: {
        Row: {
          created_at: string
          like_id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          like_id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          like_id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_bookmarks_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_bookmarks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      post_comment_likes: {
        Row: {
          comment_id: string
          created_at: string
          like_id: string
          user_id: string
        }
        Insert: {
          comment_id: string
          created_at?: string
          like_id?: string
          user_id: string
        }
        Update: {
          comment_id?: string
          created_at?: string
          like_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comment_likes_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "post_comments"
            referencedColumns: ["comment_id"]
          },
          {
            foreignKeyName: "post_comment_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      post_comments: {
        Row: {
          comment: string
          comment_id: string
          created_at: string
          likes_count: number
          parent_id: string | null
          post_id: string
          rating: number | null
          updated_at: string | null
          user_id: string
          views_count: number | null
        }
        Insert: {
          comment?: string
          comment_id?: string
          created_at?: string
          likes_count?: number
          parent_id?: string | null
          post_id: string
          rating?: number | null
          updated_at?: string | null
          user_id: string
          views_count?: number | null
        }
        Update: {
          comment?: string
          comment_id?: string
          created_at?: string
          likes_count?: number
          parent_id?: string | null
          post_id?: string
          rating?: number | null
          updated_at?: string | null
          user_id?: string
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "post_comments"
            referencedColumns: ["comment_id"]
          },
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string
          like_id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          like_id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          like_id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      post_of_the_day: {
        Row: {
          created_at: string
          created_on: string
          pod_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          created_on?: string
          pod_id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          created_on?: string
          pod_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_of_the_day_pod_id_fkey"
            columns: ["pod_id"]
            isOneToOne: true
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
        ]
      }
      posts: {
        Row: {
          comments_count: number
          created_at: string
          created_on: string
          is_hero_featured: boolean | null
          likes_count: number
          post_author_id: string
          post_content: Json | null
          post_description: string | null
          post_id: string
          post_image_src: string | null
          post_label: string | null
          post_publish_status:
            | Database["public"]["Enums"]["publish_status"]
            | null
          post_slug: string
          post_title: string
          posts_categories_id: string | null
          updated_at: string | null
          views_count: number
        }
        Insert: {
          comments_count?: number
          created_at?: string
          created_on?: string
          is_hero_featured?: boolean | null
          likes_count?: number
          post_author_id: string
          post_content?: Json | null
          post_description?: string | null
          post_id?: string
          post_image_src?: string | null
          post_label?: string | null
          post_publish_status?:
            | Database["public"]["Enums"]["publish_status"]
            | null
          post_slug?: string
          post_title?: string
          posts_categories_id?: string | null
          updated_at?: string | null
          views_count?: number
        }
        Update: {
          comments_count?: number
          created_at?: string
          created_on?: string
          is_hero_featured?: boolean | null
          likes_count?: number
          post_author_id?: string
          post_content?: Json | null
          post_description?: string | null
          post_id?: string
          post_image_src?: string | null
          post_label?: string | null
          post_publish_status?:
            | Database["public"]["Enums"]["publish_status"]
            | null
          post_slug?: string
          post_title?: string
          posts_categories_id?: string | null
          updated_at?: string | null
          views_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_posts_author_id_fkey"
            columns: ["post_author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      posts_categories: {
        Row: {
          category_id: string
          post_id: string
          submitted_by_user_id: string | null
        }
        Insert: {
          category_id: string
          post_id: string
          submitted_by_user_id?: string | null
        }
        Update: {
          category_id?: string
          post_id?: string
          submitted_by_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "posts_categories_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "posts_categories_submitted_by_user_id_fkey"
            columns: ["submitted_by_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      posts_topics: {
        Row: {
          post_id: string
          submitted_by_user_id: string | null
          topic_id: string
        }
        Insert: {
          post_id: string
          submitted_by_user_id?: string | null
          topic_id: string
        }
        Update: {
          post_id?: string
          submitted_by_user_id?: string | null
          topic_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_topics_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "posts_topics_submitted_by_user_id_fkey"
            columns: ["submitted_by_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "posts_topics_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["topic_id"]
          },
        ]
      }
      profile_role: {
        Row: {
          created_at: string
          role: Database["public"]["Enums"]["user_role_enum"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          role?: Database["public"]["Enums"]["user_role_enum"]
          updated_at?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          role?: Database["public"]["Enums"]["user_role_enum"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_role_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          updated_at: string | null
          user_bio: string | null
          user_id: string
          user_location: string | null
          user_name: string
          user_pronouns: string | null
          user_website: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          updated_at?: string | null
          user_bio?: string | null
          user_id: string
          user_location?: string | null
          user_name: string
          user_pronouns?: string | null
          user_website?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          updated_at?: string | null
          user_bio?: string | null
          user_id?: string
          user_location?: string | null
          user_name?: string
          user_pronouns?: string | null
          user_website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          created_at: string
          report_description: string | null
          report_id: string
          report_title: string
          report_type: Database["public"]["Enums"]["report_type"] | null
          report_url: string
          submitted_by_user_id: string
        }
        Insert: {
          created_at?: string
          report_description?: string | null
          report_id?: string
          report_title: string
          report_type?: Database["public"]["Enums"]["report_type"] | null
          report_url: string
          submitted_by_user_id: string
        }
        Update: {
          created_at?: string
          report_description?: string | null
          report_id?: string
          report_title?: string
          report_type?: Database["public"]["Enums"]["report_type"] | null
          report_url?: string
          submitted_by_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_submitted_by_user_id_fkey"
            columns: ["submitted_by_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      topics: {
        Row: {
          submitted_by_user_id: string | null
          topic_description: string | null
          topic_icon_name: string | null
          topic_id: string
          topic_name: string
          topic_slug: string
        }
        Insert: {
          submitted_by_user_id?: string | null
          topic_description?: string | null
          topic_icon_name?: string | null
          topic_id?: string
          topic_name: string
          topic_slug: string
        }
        Update: {
          submitted_by_user_id?: string | null
          topic_description?: string | null
          topic_icon_name?: string | null
          topic_id?: string
          topic_name?: string
          topic_slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "topics_submitted_by_user_id_fkey"
            columns: ["submitted_by_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
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
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_app_rating_data: {
        Args: {
          app_id_param: string
        }
        Returns: {
          rating_score: number
          rating_count: number
          rating_5_count: number
          rating_4_count: number
          rating_3_count: number
          rating_2_count: number
          rating_1_count: number
        }[]
      }
      increment_app_view_count: {
        Args: {
          p_app_slug: string
        }
        Returns: undefined
      }
      increment_post_view_count: {
        Args: {
          p_post_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      post_type: "normal" | "daily post" | "post of the day" | "editor choice"
      pricing: "Free" | "In-app purchases" | "Free & In-app purchases" | "Paid"
      publish_status: "pending" | "published" | "draft" | "unpublished"
      report_type: "app" | "post" | "comment" | "feedback"
      user_role_enum: "user" | "super_user" | "admin" | "super_admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
