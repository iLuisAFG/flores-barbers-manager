-- 0002_public_access_rls.sql
-- Estas políticas permiten que la página pública pueda consultar y escribir 
-- datos de manera anónima (sin login) para que los clientes finales puedan reservar.

-- Allow public read access to barbershops
CREATE POLICY "Public can view all barbershops" 
ON public.barbershops FOR SELECT 
USING (true);

-- Allow public read access to active barbers
CREATE POLICY "Public can view active barbers" 
ON public.barbers FOR SELECT 
USING (is_active = true);

-- Allow public read access to active services
CREATE POLICY "Public can view active services" 
ON public.services FOR SELECT 
USING (is_active = true);

-- Allow public to insert clients (for booking)
CREATE POLICY "Public can insert clients" 
ON public.clients FOR INSERT 
WITH CHECK (true);

-- Allow public to insert appointments (for booking)
CREATE POLICY "Public can insert appointments" 
ON public.appointments FOR INSERT 
WITH CHECK (true);
