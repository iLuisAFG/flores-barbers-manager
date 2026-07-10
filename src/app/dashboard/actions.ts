'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

async function getBarbershopId() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: barbershop } = await supabase
    .from('barbershops')
    .select('id')
    .eq('owner_id', user.id)
    .single()
    
  return barbershop?.id
}

export async function createBarbershop(formData: FormData) {
  const supabase = createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return { error: 'Debes iniciar sesión para realizar esta acción.' }
  }

  const name = formData.get('name') as string
  const slug = formData.get('slug') as string

  if (!name || !slug) {
    return { error: 'El nombre y el identificador de URL son obligatorios.' }
  }

  const formattedSlug = slug
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

  const { error: insertError } = await supabase
    .from('barbershops')
    .insert({
      owner_id: user.id,
      name,
      slug: formattedSlug,
    })

  if (insertError) {
    if (insertError.code === '23505') {
      return { error: 'El identificador de URL ya está en uso. Por favor, elige otro.' }
    }
    return { error: 'Ocurrió un error al crear la barbería.' }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function createBarber(formData: FormData) {
  const supabase = createClient()
  
  const barbershopId = await getBarbershopId()
  if (!barbershopId) return { error: 'Barbería no encontrada.' }

  const name = formData.get('name') as string
  if (!name) return { error: 'El nombre es obligatorio.' }

  const [firstName, ...lastNameArr] = name.trim().split(' ')
  const lastName = lastNameArr.join(' ') || '.' // SQL require last_name, fallback to '.'

  const { error } = await supabase.from('barbers').insert({
    barbershop_id: barbershopId,
    first_name: firstName,
    last_name: lastName,
  })

  if (error) return { error: 'Error al crear el barbero.' }

  revalidatePath('/dashboard/barbers')
  return { success: true }
}

export async function createService(formData: FormData) {
  const supabase = createClient()
  
  const barbershopId = await getBarbershopId()
  if (!barbershopId) return { error: 'Barbería no encontrada.' }

  const name = formData.get('name') as string
  const price = parseFloat(formData.get('price') as string)
  const duration = parseInt(formData.get('duration') as string)

  if (!name || isNaN(price) || isNaN(duration)) {
    return { error: 'Todos los campos son obligatorios y deben ser válidos.' }
  }

  const { error } = await supabase.from('services').insert({
    barbershop_id: barbershopId,
    name,
    price,
    duration_minutes: duration,
  })

  if (error) return { error: 'Error al crear el servicio.' }

  revalidatePath('/dashboard/services')
  return { success: true }
}

export async function updateService(id: string, formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autorizado' }

  const name = formData.get('name') as string
  const price = parseFloat(formData.get('price') as string)
  const duration = parseInt(formData.get('duration') as string)

  if (!name || isNaN(price) || isNaN(duration)) {
    return { error: 'Datos inválidos' }
  }

  const { error } = await supabase
    .from('services')
    .update({ name, price, duration_minutes: duration })
    .eq('id', id)

  if (error) return { error: 'Error al actualizar' }

  revalidatePath('/dashboard/services')
  return { success: true }
}

export async function deleteService(id: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autorizado' }

  const { error } = await supabase.from('services').delete().eq('id', id)
  if (error) return { error: 'Error al eliminar' }

  revalidatePath('/dashboard/services')
  return { success: true }
}

export async function updateBarber(id: string, formData: FormData, isActive: boolean) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autorizado' }

  const name = formData.get('name') as string
  if (!name) return { error: 'Nombre requerido' }

  const [firstName, ...lastNameArr] = name.trim().split(' ')
  const lastName = lastNameArr.join(' ') || '.'

  const { error } = await supabase
    .from('barbers')
    .update({ first_name: firstName, last_name: lastName, is_active: isActive })
    .eq('id', id)

  if (error) return { error: 'Error al actualizar' }

  revalidatePath('/dashboard/barbers')
  return { success: true }
}

export async function deleteBarber(id: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autorizado' }

  const { error } = await supabase.from('barbers').delete().eq('id', id)
  if (error) return { error: 'Error al eliminar' }

  revalidatePath('/dashboard/barbers')
  return { success: true }
}
export async function updateAppointmentStatus(appointmentId: string, status: string) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Debes iniciar sesión.' }

  const { error } = await supabase
    .from('appointments')
    .update({ status })
    .eq('id', appointmentId)

  if (error) {
    return { error: 'Error al actualizar el estado de la cita.' }
  }

  revalidatePath('/dashboard/appointments')
  revalidatePath('/dashboard')
  return { success: true }
}

export async function upsertOperatingHours(formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autorizado' }
  
  const barbershopId = formData.get('barbershop_id') as string
  const dayOfWeek = parseInt(formData.get('day_of_week') as string)
  const openTime = formData.get('open_time') as string
  const closeTime = formData.get('close_time') as string
  const isClosed = formData.get('is_closed') === 'true'

  if (isNaN(dayOfWeek) || dayOfWeek < 0 || dayOfWeek > 6) return { error: 'Día inválido' }

  // Check if exists
  const { data: existing } = await supabase
    .from('operating_hours')
    .select('id')
    .eq('barbershop_id', barbershopId)
    .eq('day_of_week', dayOfWeek)
    .single()

  let error
  if (existing) {
    const { error: updateError } = await supabase
      .from('operating_hours')
      .update({ open_time: openTime, close_time: closeTime, is_closed: isClosed })
      .eq('id', existing.id)
    error = updateError
  } else {
    const { error: insertError } = await supabase
      .from('operating_hours')
      .insert({ barbershop_id: barbershopId, day_of_week: dayOfWeek, open_time: openTime, close_time: closeTime, is_closed: isClosed })
    error = insertError
  }

  if (error) return { error: 'Error al guardar el horario' }
  revalidatePath('/dashboard/schedule')
  return { success: true }
}

export async function createTimeBlock(formData: FormData) {
  const supabase = createClient()
  
  const barbershopId = formData.get('barbershop_id') as string
  const date = formData.get('date') as string
  const startTime = formData.get('start_time') as string
  const endTime = formData.get('end_time') as string
  const reason = formData.get('reason') as string

  if (!date || !startTime || !endTime) return { error: 'Datos incompletos' }

  const startTimestamp = new Date(`${date}T${startTime}:00`).toISOString()
  const endTimestamp = new Date(`${date}T${endTime}:00`).toISOString()

  const { error } = await supabase
    .from('time_blocks')
    .insert({
      barbershop_id: barbershopId,
      start_time: startTimestamp,
      end_time: endTimestamp,
      reason
    })

  if (error) return { error: 'Error al crear el bloqueo' }
  revalidatePath('/dashboard/schedule')
  return { success: true }
}

export async function deleteTimeBlock(blockId: string) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autorizado' }

  const { error } = await supabase
    .from('time_blocks')
    .delete()
    .eq('id', blockId)

  if (error) return { error: 'Error al eliminar el bloqueo' }
  
  revalidatePath('/dashboard/schedule')
  return { success: true }
}
