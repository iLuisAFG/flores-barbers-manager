'use server'

import { createClient } from '@/utils/supabase/server'

export async function createAppointment(formData: FormData) {
  const supabase = createClient()
  
  const barbershopId = formData.get('barbershop_id') as string
  const serviceId = formData.get('service_id') as string
  const barberId = formData.get('barber_id') as string
  const date = formData.get('date') as string
  const time = formData.get('time') as string
  const fullName = formData.get('name') as string
  const phone = formData.get('phone') as string

  if (!barbershopId || !serviceId || !barberId || !date || !time || !fullName || !phone) {
    return { error: 'Por favor, completa todos los campos del formulario.' }
  }

  // 1. Get service details for duration and price
  const { data: service, error: serviceError } = await supabase
    .from('services')
    .select('duration_minutes, price')
    .eq('id', serviceId)
    .single()

  if (serviceError || !service) {
    return { error: 'El servicio seleccionado no es válido.' }
  }

  // 2. Format client name
  const [firstName, ...lastNameArr] = fullName.trim().split(' ')
  const lastName = lastNameArr.join(' ') || '.' 

  let clientId: string

  // Try to find existing client by phone
  const { data: existingClient } = await supabase
    .from('clients')
    .select('id')
    .eq('barbershop_id', barbershopId)
    .eq('phone', phone)
    .single()

  if (existingClient) {
    clientId = existingClient.id
  } else {
    // Create new client
    const { data: newClient, error: clientError } = await supabase
      .from('clients')
      .insert({
        barbershop_id: barbershopId,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
      })
      .select('id')
      .single()

    if (clientError || !newClient) {
      return { error: 'Error al registrar los datos del cliente.' }
    }
    clientId = newClient.id
  }

  // 3. Calculate times
  const startTime = new Date(`${date}T${time}:00`)
  if (isNaN(startTime.getTime())) {
    return { error: 'Fecha u hora de reserva no válida.' }
  }

  const endTime = new Date(startTime.getTime() + service.duration_minutes * 60000)

  // 4. Insert Appointment
  const { error: appointmentError } = await supabase
    .from('appointments')
    .insert({
      barbershop_id: barbershopId,
      barber_id: barberId,
      service_id: serviceId,
      client_id: clientId,
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
      total_price: service.price,
      status: 'scheduled'
    })

  if (appointmentError) {
    return { error: 'Ocurrió un error al confirmar la cita. Por favor, intenta nuevamente.' }
  }

  return { success: true }
}

export async function getAvailableSlots(barbershopId: string, barberId: string, date: string, serviceDurationMinutes: number) {
  const supabase = createClient()
  
  const selectedDate = new Date(`${date}T00:00:00`)
  if (isNaN(selectedDate.getTime())) return { error: 'Fecha inválida' }

  // 1. Get operating hours for the day of the week
  // getDay() returns 0 for Sunday, 6 for Saturday
  const dayOfWeek = selectedDate.getDay() 
  
  const { data: opHours } = await supabase
    .from('operating_hours')
    .select('*')
    .eq('barbershop_id', barbershopId)
    .eq('day_of_week', dayOfWeek)
    .single()

  if (!opHours || opHours.is_closed) {
    return { slots: [] } // Closed this day
  }

  // 2. Get manual time blocks for this day
  const startOfDay = new Date(selectedDate)
  startOfDay.setHours(0,0,0,0)
  const endOfDay = new Date(selectedDate)
  endOfDay.setHours(23,59,59,999)

  const { data: timeBlocks } = await supabase
    .from('time_blocks')
    .select('start_time, end_time')
    .eq('barbershop_id', barbershopId)
    .gte('start_time', startOfDay.toISOString())
    .lte('end_time', endOfDay.toISOString())

  // 3. Get existing appointments for this barber on this day
  const { data: appointments } = await supabase
    .from('appointments')
    .select('start_time, end_time')
    .eq('barbershop_id', barbershopId)
    .eq('barber_id', barberId)
    .in('status', ['scheduled', 'completed']) 
    .gte('start_time', startOfDay.toISOString())
    .lte('end_time', endOfDay.toISOString())

  // 4. Generate slots every 30 mins
  const slots: string[] = []
  
  const [openH, openM] = opHours.open_time.split(':').map(Number)
  const [closeH, closeM] = opHours.close_time.split(':').map(Number)
  
  let currentSlot = new Date(selectedDate)
  currentSlot.setHours(openH, openM, 0, 0)
  
  const closeLimit = new Date(selectedDate)
  closeLimit.setHours(closeH, closeM, 0, 0)

  // helper to check overlaps
  const checkOverlap = (startA: Date, endA: Date, startB: Date, endB: Date) => {
    return startA < endB && endA > startB
  }

  const now = new Date()

  while (currentSlot < closeLimit) {
    const slotStart = new Date(currentSlot)
    const slotEnd = new Date(currentSlot.getTime() + serviceDurationMinutes * 60000)

    let isAvailable = true

    // Check if it exceeds closing time
    if (slotEnd > closeLimit) {
      isAvailable = false
    }

    // Check past time (if booking today)
    if (slotStart <= now) {
      isAvailable = false
    }

    // Check manual blocks
    if (isAvailable && timeBlocks) {
      for (const block of timeBlocks) {
        if (checkOverlap(slotStart, slotEnd, new Date(block.start_time), new Date(block.end_time))) {
          isAvailable = false
          break
        }
      }
    }

    // Check appointments
    if (isAvailable && appointments) {
      for (const apt of appointments) {
        if (checkOverlap(slotStart, slotEnd, new Date(apt.start_time), new Date(apt.end_time))) {
          isAvailable = false
          break
        }
      }
    }

    if (isAvailable) {
      slots.push(`${slotStart.getHours().toString().padStart(2, '0')}:${slotStart.getMinutes().toString().padStart(2, '0')}`)
    }

    currentSlot = new Date(currentSlot.getTime() + 30 * 60000)
  }

  return { slots }
}
