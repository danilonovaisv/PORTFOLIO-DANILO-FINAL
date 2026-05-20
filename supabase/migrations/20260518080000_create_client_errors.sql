-- Migration: create_client_errors
-- Created: 2026-05-18
-- Purpose: Sentinel Prime telemetry — persist client-side runtime failures from all error boundaries

CREATE TABLE IF NOT EXISTS public.client_errors (
    id BIGSERIAL PRIMARY KEY,
    error_data JSONB NOT NULL,
    captured_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    severity VARCHAR(50) NOT NULL DEFAULT 'high',
    source VARCHAR(50) NOT NULL DEFAULT 'browser'
);

-- Enable Row Level Security
ALTER TABLE public.client_errors ENABLE ROW LEVEL SECURITY;

-- Allow anonymous + authenticated inserts (required for unauthenticated telemetry route)
CREATE POLICY "Allow anonymous insert for errors"
ON public.client_errors
FOR INSERT
TO anon, authenticated
WITH CHECK (
    severity IN ('low', 'medium', 'high', 'critical') AND 
    source IN ('browser', 'server', 'edge') AND 
    error_data IS NOT NULL
);

-- Table documentation
COMMENT ON TABLE public.client_errors IS 'Sentinel Prime audit log — captures client-side runtime failures from all error boundaries.';
