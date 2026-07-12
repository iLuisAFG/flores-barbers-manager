-- 0007_barbershop_whatsapp.sql
-- Add whatsapp_number to barbershops table for booking notifications

ALTER TABLE public.barbershops ADD COLUMN whatsapp_number TEXT;
