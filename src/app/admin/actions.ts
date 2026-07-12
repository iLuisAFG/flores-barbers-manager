'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

const SUPERADMIN_EMAIL = 'floresglezluisarturo@gmail.com'

export async function toggleBarbershopStatus(id: string, newStatus: string) {
  const supabase = createClient()
  
  // Extra layer of security in Server Action
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email !== SUPERADMIN_EMAIL) {
    return { error: 'No autorizado' }
  }

  const { error } = await supabase
    .from('barbershops')
    .update({ subscription_status: newStatus })
    .eq('id', id)

  if (error) {
    console.error('Error al actualizar estado:', error)
    return { error: 'Error al actualizar el estado de la barbería.' }
  }

  revalidatePath('/admin')
  return { success: true }
}

export async function deleteBarbershop(id: string) {
  const supabase = createClient()
  
  // Extra layer of security in Server Action
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email !== SUPERADMIN_EMAIL) {
    return { error: 'No autorizado' }
  }

  const { error } = await supabase
    .from('barbershops')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error al eliminar barbería:', error)
    return { error: 'Error al eliminar la barbería.' }
  }

  revalidatePath('/admin')
  return { success: true }
}
