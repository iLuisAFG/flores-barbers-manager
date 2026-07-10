-- 0003_subscription_status.sql
-- Add subscription status to allow manual billing control

ALTER TABLE public.barbershops
ADD COLUMN subscription_status TEXT NOT NULL DEFAULT 'active' CHECK (subscription_status IN ('active', 'inactive'));
