-- 0008_superadmin_policy.sql
-- Add RLS policies for Super Admin to access all barbershops

-- Permiso para VER (SELECT) todas las barberías
CREATE POLICY "Superadmin can view all barbershops" 
ON public.barbershops 
FOR SELECT 
USING ( (auth.jwt() ->> 'email') = 'floresglezluisarturo@gmail.com' );

-- Permiso para ACTUALIZAR (UPDATE) todas las barberías (para cambiar el subscription_status)
CREATE POLICY "Superadmin can update all barbershops" 
ON public.barbershops 
FOR UPDATE 
USING ( (auth.jwt() ->> 'email') = 'floresglezluisarturo@gmail.com' )
WITH CHECK ( (auth.jwt() ->> 'email') = 'floresglezluisarturo@gmail.com' );

-- Permiso para ELIMINAR (DELETE) todas las barberías
CREATE POLICY "Superadmin can delete all barbershops" 
ON public.barbershops 
FOR DELETE 
USING ( (auth.jwt() ->> 'email') = 'floresglezluisarturo@gmail.com' );
