import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import AppointmentActions from './AppointmentActions'

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

      <div className="bg-charcoal-900/50 backdrop-blur-md rounded-3xl shadow-xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/5">
            <thead className="bg-white/[0.01]">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">
                  Cliente
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">
                  Fecha y Hora
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">
                  Servicio
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">
                  Barbero
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="relative px-6 py-4">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-transparent">
              {!appointments || appointments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-white/40">
                    Aún no tienes citas registradas.
                  </td>
                </tr>
              ) : (
                appointments.map((apt: any) => {
                  const dateObj = new Date(apt.start_time)
                  const dateStr = dateObj.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
                  const timeStr = dateObj.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
                  
                  return (
                    <tr key={apt.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">
                          {apt.clients?.first_name} {apt.clients?.last_name !== '.' ? apt.clients?.last_name : ''}
                        </div>
                        <div className="text-sm text-white/40">{apt.clients?.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white font-medium capitalize">{dateStr}</div>
                        <div className="text-sm text-gold-400">{timeStr}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">{apt.services?.name}</div>
                        <div className="text-sm text-emerald-400">${apt.services?.price}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white/70">
                          {apt.barbers?.first_name} {apt.barbers?.last_name !== '.' ? apt.barbers?.last_name : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <AppointmentStatusBadge status={apt.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <AppointmentActions appointmentId={apt.id} currentStatus={apt.status} />
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function AppointmentStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    scheduled: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
    no_show: "bg-gray-500/10 text-gray-400 border-gray-500/20"
  }
  
  const labels: Record<string, string> = {
    pending: "Pendiente",
    scheduled: "Confirmada",
    completed: "Completada",
    cancelled: "Cancelada",
    no_show: "No asistió"
  }

  return (
    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full border ${styles[status] || styles.pending}`}>
      {labels[status] || status}
    </span>
  )
}
