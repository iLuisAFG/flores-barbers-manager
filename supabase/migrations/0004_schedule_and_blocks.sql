-- 0004_schedule_and_blocks.sql
-- Create scheduling tables for Barbershops

-- 1. Operating Hours
CREATE TABLE public.operating_hours (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    barbershop_id UUID NOT NULL REFERENCES public.barbershops(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
    open_time TIME NOT NULL,
    close_time TIME NOT NULL,
    is_closed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(barbershop_id, day_of_week)
);

-- 2. Time Blocks (Manual overrides/blocks)
CREATE TABLE public.time_blocks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    barbershop_id UUID NOT NULL REFERENCES public.barbershops(id) ON DELETE CASCADE,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CHECK (start_time < end_time)
);

-- RLS POLICIES FOR operating_hours
ALTER TABLE public.operating_hours ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can manage their operating hours"
ON public.operating_hours FOR ALL
USING (barbershop_id IN (SELECT id FROM public.barbershops WHERE owner_id = auth.uid()));

CREATE POLICY "Public can view operating hours"
ON public.operating_hours FOR SELECT
USING (true);

-- RLS POLICIES FOR time_blocks
ALTER TABLE public.time_blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can manage their time blocks"
ON public.time_blocks FOR ALL
USING (barbershop_id IN (SELECT id FROM public.barbershops WHERE owner_id = auth.uid()));

CREATE POLICY "Public can view time blocks"
ON public.time_blocks FOR SELECT
USING (true);
