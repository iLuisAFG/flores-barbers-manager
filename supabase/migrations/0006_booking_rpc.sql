-- 0006_booking_rpc.sql
-- Función SECURITY DEFINER para crear reservas públicas sin ser bloqueado por RLS

CREATE OR REPLACE FUNCTION public.book_appointment(
  p_barbershop_id UUID,
  p_service_id UUID,
  p_barber_id UUID,
  p_first_name TEXT,
  p_last_name TEXT,
  p_phone TEXT,
  p_start_time TIMESTAMPTZ,
  p_end_time TIMESTAMPTZ,
  p_price NUMERIC
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_client_id UUID;
  v_appointment_id UUID;
BEGIN
  -- Intentar buscar al cliente existente por teléfono y barbería
  SELECT id INTO v_client_id 
  FROM public.clients 
  WHERE barbershop_id = p_barbershop_id AND phone = p_phone 
  LIMIT 1;

  -- Si no existe, crearlo
  IF v_client_id IS NULL THEN
    INSERT INTO public.clients (barbershop_id, first_name, last_name, phone)
    VALUES (p_barbershop_id, p_first_name, p_last_name, p_phone)
    RETURNING id INTO v_client_id;
  END IF;

  -- Insertar la cita
  INSERT INTO public.appointments (barbershop_id, barber_id, service_id, client_id, start_time, end_time, total_price, status)
  VALUES (p_barbershop_id, p_barber_id, p_service_id, v_client_id, p_start_time, p_end_time, p_price, 'scheduled')
  RETURNING id INTO v_appointment_id;

  RETURN jsonb_build_object('success', true, 'appointment_id', v_appointment_id);
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;
