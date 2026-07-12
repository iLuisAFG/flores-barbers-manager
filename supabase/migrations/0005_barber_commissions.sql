-- 0005_barber_commissions.sql
-- Add commission_percentage to barbers table

ALTER TABLE public.barbers 
ADD COLUMN commission_percentage DECIMAL(5, 2) DEFAULT 0.00;

-- Set a default 50% commission for existing barbers if desired (optional)
-- UPDATE public.barbers SET commission_percentage = 50.00 WHERE commission_percentage = 0.00;
