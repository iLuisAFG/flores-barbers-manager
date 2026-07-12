import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import AppointmentsTable from './AppointmentsTable'

export default async function AppointmentsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: barbershop } = await supabase.from('barbershops').select('id').eq('owner_id', user.id).single()
  if (!barbershop) redirect('/dashboard')

  // Fetch appointments with joins for client, service, and barber names
  const { data: appointments } = await supabase
    .from('appointments')
    .select(`
      id,
      start_time,
      end_time,
      status,
      created_at,
      clients ( first_name, last_name, phone ),
      services ( name, price ),
      barbers ( first_name, last_name )
    `)
    .eq('barbershop_id', barbershop.id)
    .order('start_time', { ascending: false })

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white font-playfair tracking-wide">Registro de Citas</h1>
          <p className="mt-1 text-sm text-white/50">Administra todas las reservas de tus clientes.</p>
        </div>
      </div>

      <AppointmentsTable appointments={appointments || []} />
    </div>
  )
}
