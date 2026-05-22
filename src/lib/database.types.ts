export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.1';
  };
  public: {
    Tables: {
      admin_tokens: {
        Row: {
          created_at: string;
          created_by: string | null;
          description: string | null;
          environment: string;
          id: string;
          name: string;
          provider: string;
          secret: string;
          status: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          environment?: string;
          id?: string;
          name: string;
          provider: string;
          secret: string;
          status?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          environment?: string;
          id?: string;
          name?: string;
          provider?: string;
          secret?: string;
          status?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [];
      };
      admin_users: {
        Row: {
          created_at: string;
          role: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          role?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          role?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      audit_log: {
        Row: {
          action: string;
          actor_user_id: string | null;
          created_at: string;
          details: Json;
          entity: string;
          entity_id: string | null;
          id: number;
        };
        Insert: {
          action: string;
          actor_user_id?: string | null;
          created_at?: string;
          details?: Json;
          entity: string;
          entity_id?: string | null;
          id?: number;
        };
        Update: {
          action?: string;
          actor_user_id?: string | null;
          created_at?: string;
          details?: Json;
          entity?: string;
          entity_id?: string | null;
          id?: number;
        };
        Relationships: [];
      };
      client_errors: {
        Row: {
          captured_at: string;
          error_data: Json;
          id: number;
          severity: string;
          source: string;
        };
        Insert: {
          captured_at?: string;
          error_data: Json;
          id?: number;
          severity?: string;
          source?: string;
        };
        Update: {
          captured_at?: string;
          error_data?: Json;
          id?: number;
          severity?: string;
          source?: string;
        };
        Relationships: [];
      };
      content_version: {
        Row: {
          id: boolean;
          updated_at: string;
          version: number;
        };
        Insert: {
          id?: boolean;
          updated_at?: string;
          version?: number;
        };
        Update: {
          id?: boolean;
          updated_at?: string;
          version?: number;
        };
        Relationships: [];
      };
      experiences: {
        Row: {
          company: string;
          content: Json;
          created_at: string;
          description: string | null;
          end_date: string | null;
          id: string;
          order: number;
          role: string;
          start_date: string | null;
          status: string;
          updated_at: string;
          visibility: boolean;
        };
        Insert: {
          company: string;
          content?: Json;
          created_at?: string;
          description?: string | null;
          end_date?: string | null;
          id?: string;
          order?: number;
          role: string;
          start_date?: string | null;
          status?: string;
          updated_at?: string;
          visibility?: boolean;
        };
        Update: {
          company?: string;
          content?: Json;
          created_at?: string;
          description?: string | null;
          end_date?: string | null;
          id?: string;
          order?: number;
          role?: string;
          start_date?: string | null;
          status?: string;
          updated_at?: string;
          visibility?: boolean;
        };
        Relationships: [];
      };
      landing_pages: {
        Row: {
          content: Json;
          cover: string | null;
          created_at: string | null;
          id: string;
          slug: string;
          title: string;
        };
        Insert: {
          content?: Json;
          cover?: string | null;
          created_at?: string | null;
          id?: string;
          slug: string;
          title: string;
        };
        Update: {
          content?: Json;
          cover?: string | null;
          created_at?: string | null;
          id?: string;
          slug?: string;
          title?: string;
        };
        Relationships: [];
      };
      portfolio_project_tags: {
        Row: {
          project_id: string;
          tag_id: string;
        };
        Insert: {
          project_id: string;
          tag_id: string;
        };
        Update: {
          project_id?: string;
          tag_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'portfolio_project_tags_project_id_fkey';
            columns: ['project_id'];
            isOneToOne: false;
            referencedRelation: 'portfolio_projects';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'portfolio_project_tags_project_id_fkey';
            columns: ['project_id'];
            isOneToOne: false;
            referencedRelation: 'public_projects_view';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'portfolio_project_tags_tag_id_fkey';
            columns: ['tag_id'];
            isOneToOne: false;
            referencedRelation: 'portfolio_tags';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'portfolio_project_tags_tag_id_fkey';
            columns: ['tag_id'];
            isOneToOne: false;
            referencedRelation: 'public_tags_view';
            referencedColumns: ['id'];
          },
        ];
      };
      portfolio_projects: {
        Row: {
          brand_name: string | null;
          case_body: string | null;
          client_name: string;
          client_slug: string;
          created_at: string;
          description: string | null;
          destination: Json | null;
          featured_home_order: number | null;
          featured_on_home: boolean;
          featured_on_portfolio: boolean;
          featured_portfolio_order: number | null;
          gallery: Json;
          hero_image_path: string | null;
          home_featured: Json;
          id: string;
          is_published: boolean;
          landing_page_id: string | null;
          project_type: string;
          short_label: string | null;
          slug: string;
          thumbnail_path: string | null;
          title: string;
          updated_at: string;
          url_landscape: string | null;
          url_square: string | null;
          year: number | null;
        };
        Insert: {
          brand_name?: string | null;
          case_body?: string | null;
          client_name: string;
          client_slug: string;
          created_at?: string;
          description?: string | null;
          destination?: Json | null;
          featured_home_order?: number | null;
          featured_on_home?: boolean;
          featured_on_portfolio?: boolean;
          featured_portfolio_order?: number | null;
          gallery?: Json;
          hero_image_path?: string | null;
          home_featured?: Json;
          id?: string;
          is_published?: boolean;
          landing_page_id?: string | null;
          project_type: string;
          short_label?: string | null;
          slug: string;
          thumbnail_path?: string | null;
          title: string;
          updated_at?: string;
          url_landscape?: string | null;
          url_square?: string | null;
          year?: number | null;
        };
        Update: {
          brand_name?: string | null;
          case_body?: string | null;
          client_name?: string;
          client_slug?: string;
          created_at?: string;
          description?: string | null;
          destination?: Json | null;
          featured_home_order?: number | null;
          featured_on_home?: boolean;
          featured_on_portfolio?: boolean;
          featured_portfolio_order?: number | null;
          gallery?: Json;
          hero_image_path?: string | null;
          home_featured?: Json;
          id?: string;
          is_published?: boolean;
          landing_page_id?: string | null;
          project_type?: string;
          short_label?: string | null;
          slug?: string;
          thumbnail_path?: string | null;
          title?: string;
          updated_at?: string;
          url_landscape?: string | null;
          url_square?: string | null;
          year?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'portfolio_projects_landing_page_id_fkey';
            columns: ['landing_page_id'];
            isOneToOne: false;
            referencedRelation: 'landing_pages';
            referencedColumns: ['id'];
          },
        ];
      };
      portfolio_tags: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          kind: string;
          label: string;
          slug: string;
          sort_order: number | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          kind?: string;
          label: string;
          slug: string;
          sort_order?: number | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          kind?: string;
          label?: string;
          slug?: string;
          sort_order?: number | null;
        };
        Relationships: [];
      };
      project_config: {
        Row: {
          accessed_by: string | null;
          api_keys: Json | null;
          auth_providers: Json | null;
          created_at: string | null;
          created_by: string | null;
          environment: string | null;
          id: string;
          is_active: boolean | null;
          jwt_expiry: number | null;
          last_accessed: string | null;
          project_description: string | null;
          project_domain: string | null;
          project_name: string;
          public_env_vars: Json | null;
          storage_buckets: Json | null;
          storage_permissions: Json | null;
          updated_at: string | null;
        };
        Insert: {
          accessed_by?: string | null;
          api_keys?: Json | null;
          auth_providers?: Json | null;
          created_at?: string | null;
          created_by?: string | null;
          environment?: string | null;
          id?: string;
          is_active?: boolean | null;
          jwt_expiry?: number | null;
          last_accessed?: string | null;
          project_description?: string | null;
          project_domain?: string | null;
          project_name: string;
          public_env_vars?: Json | null;
          storage_buckets?: Json | null;
          storage_permissions?: Json | null;
          updated_at?: string | null;
        };
        Update: {
          accessed_by?: string | null;
          api_keys?: Json | null;
          auth_providers?: Json | null;
          created_at?: string | null;
          created_by?: string | null;
          environment?: string | null;
          id?: string;
          is_active?: boolean | null;
          jwt_expiry?: number | null;
          last_accessed?: string | null;
          project_description?: string | null;
          project_domain?: string | null;
          project_name?: string;
          public_env_vars?: Json | null;
          storage_buckets?: Json | null;
          storage_permissions?: Json | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          content: Json;
          cover_asset_id: string | null;
          created_at: string;
          featured: boolean;
          id: string;
          order: number;
          slug: string;
          status: string;
          summary: string | null;
          title: string;
          updated_at: string;
          visibility: boolean;
        };
        Insert: {
          content?: Json;
          cover_asset_id?: string | null;
          created_at?: string;
          featured?: boolean;
          id?: string;
          order?: number;
          slug: string;
          status?: string;
          summary?: string | null;
          title: string;
          updated_at?: string;
          visibility?: boolean;
        };
        Update: {
          content?: Json;
          cover_asset_id?: string | null;
          created_at?: string;
          featured?: boolean;
          id?: string;
          order?: number;
          slug?: string;
          status?: string;
          summary?: string | null;
          title?: string;
          updated_at?: string;
          visibility?: boolean;
        };
        Relationships: [];
      };
      site_assets: {
        Row: {
          asset_type: string;
          bucket: string;
          created_at: string;
          description: string | null;
          file_path: string;
          id: string;
          is_active: boolean;
          key: string;
          metadata: Json | null;
          page: string | null;
          sort_order: number | null;
          updated_at: string;
        };
        Insert: {
          asset_type: string;
          bucket: string;
          created_at?: string;
          description?: string | null;
          file_path: string;
          id?: string;
          is_active?: boolean;
          key: string;
          metadata?: Json | null;
          page?: string | null;
          sort_order?: number | null;
          updated_at?: string;
        };
        Update: {
          asset_type?: string;
          bucket?: string;
          created_at?: string;
          description?: string | null;
          file_path?: string;
          id?: string;
          is_active?: boolean;
          key?: string;
          metadata?: Json | null;
          page?: string | null;
          sort_order?: number | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      site_settings: {
        Row: {
          key: string;
          updated_at: string;
          value: Json;
        };
        Insert: {
          key: string;
          updated_at?: string;
          value: Json;
        };
        Update: {
          key?: string;
          updated_at?: string;
          value?: Json;
        };
        Relationships: [];
      };
      storage_access_logs: {
        Row: {
          bucket_id: string | null;
          bytes: number | null;
          created_at: string | null;
          host: string | null;
          id: number;
          ip: unknown;
          method: string | null;
          path: string;
          referer: string | null;
          status: number | null;
          ts: string;
          user_agent: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          bytes?: number | null;
          created_at?: string | null;
          host?: string | null;
          id?: number;
          ip?: unknown;
          method?: string | null;
          path: string;
          referer?: string | null;
          status?: number | null;
          ts: string;
          user_agent?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          bytes?: number | null;
          created_at?: string | null;
          host?: string | null;
          id?: number;
          ip?: unknown;
          method?: string | null;
          path?: string;
          referer?: string | null;
          status?: number | null;
          ts?: string;
          user_agent?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      public_assets_view: {
        Row: {
          asset_type: string | null;
          bucket: string | null;
          created_at: string | null;
          description: string | null;
          file_path: string | null;
          id: string | null;
          is_active: boolean | null;
          key: string | null;
          metadata: Json | null;
          page: string | null;
          sort_order: number | null;
          updated_at: string | null;
        };
        Insert: {
          asset_type?: string | null;
          bucket?: string | null;
          created_at?: string | null;
          description?: string | null;
          file_path?: string | null;
          id?: string | null;
          is_active?: boolean | null;
          key?: string | null;
          metadata?: Json | null;
          page?: string | null;
          sort_order?: number | null;
          updated_at?: string | null;
        };
        Update: {
          asset_type?: string | null;
          bucket?: string | null;
          created_at?: string | null;
          description?: string | null;
          file_path?: string | null;
          id?: string | null;
          is_active?: boolean | null;
          key?: string | null;
          metadata?: Json | null;
          page?: string | null;
          sort_order?: number | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      public_projects_view: {
        Row: {
          brand_name: string | null;
          case_body: string | null;
          client_name: string | null;
          client_slug: string | null;
          created_at: string | null;
          description: string | null;
          destination: Json | null;
          featured_home_order: number | null;
          featured_on_home: boolean | null;
          featured_on_portfolio: boolean | null;
          featured_portfolio_order: number | null;
          gallery: Json | null;
          hero_image_path: string | null;
          home_featured: Json | null;
          id: string | null;
          is_published: boolean | null;
          landing_page_id: string | null;
          landing_page_slug: string | null;
          project_type: string | null;
          short_label: string | null;
          slug: string | null;
          thumbnail_path: string | null;
          title: string | null;
          updated_at: string | null;
          url_landscape: string | null;
          url_square: string | null;
          year: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'portfolio_projects_landing_page_id_fkey';
            columns: ['landing_page_id'];
            isOneToOne: false;
            referencedRelation: 'landing_pages';
            referencedColumns: ['id'];
          },
        ];
      };
      public_tags_view: {
        Row: {
          description: string | null;
          id: string | null;
          kind: string | null;
          label: string | null;
          slug: string | null;
          sort_order: number | null;
        };
        Insert: {
          description?: string | null;
          id?: string | null;
          kind?: string | null;
          label?: string | null;
          slug?: string | null;
          sort_order?: number | null;
        };
        Update: {
          description?: string | null;
          id?: string | null;
          kind?: string | null;
          label?: string | null;
          slug?: string | null;
          sort_order?: number | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      bump_content_version: { Args: never; Returns: undefined };
      cleanup_old_data: { Args: never; Returns: undefined };
      clear_cached_egress: { Args: never; Returns: Json };
      get_orphaned_storage_objects: {
        Args: never;
        Returns: {
          bucket_id: string;
          id: string;
          name: string;
        }[];
      };
      is_admin: { Args: never; Returns: boolean };
      list_orphaned_storage_objects: {
        Args: never;
        Returns: {
          bucket_id: string;
          id: string;
          name: string;
          size_bytes: number;
        }[];
      };
      run_clear_cached_egress_wrapper: { Args: never; Returns: undefined };
      slugify: { Args: { value: string }; Returns: string };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  'public'
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
