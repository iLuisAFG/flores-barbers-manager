import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function ClientsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: barbershop } = await supabase.from('barbershops').select('id').eq('owner_id', user.id).single()
  if (!barbershop) redirect('/dashboard')

  // Fetch clients and their appointments
  const { data: clientsData } = await supabase
    .from('clients')
    .select(`
      id,
      first_name,
      last_name,
      phone,
      created_at,
      appointments (
        status,
        total_price
      )
    `)
    .eq('barbershop_id', barbershop.id)
    .order('created_at', { ascending: false })

  // Process data for the CRM
  const clients = (clientsData || []).map((client: any) => {
    // Only count completed appointments for revenue and visits
    const completedAppointments = (client.appointments || []).filter((apt: any) => apt.status === 'completed')
    const totalVisits = completedAppointments.length
    const totalSpend = completedAppointments.reduce((sum: number, apt: any) => sum + (Number(apt.total_price) || 0), 0)

    return {
      ...client,
      totalVisits,
      totalSpend
    }
  }).sort((a, b) => b.totalSpend - a.totalSpend) // Sort by most spending

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white font-playfair tracking-wide">Directorio de Clientes</h1>
          <p className="mt-1 text-sm text-white/50">Gestiona y analiza el historial de tus clientes (CRM).</p>
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
                  Teléfono
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">
                  Visitas (Completadas)
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">
                  Gasto Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-transparent">
              {!clients || clients.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-sm text-white/40">
                    Aún no hay clientes registrados en el sistema.
                  </td>
                </tr>
              ) : (
                clients.map((client) => {
                  const dateObj = new Date(client.created_at)
                  const dateStr = dateObj.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })
                  
                  return (
                    <tr key={client.id} className="hover:bg-white/[0.02] transition-colors cursor-pointer group" title="Ver perfil (próximamente)">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-charcoal-800 flex items-center justify-center text-gold-400 font-bold border border-white/10 group-hover:border-gold-500/50 transition-colors">
                            {client.first_name[0]}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">
                              {client.first_name} {client.last_name !== '.' ? client.last_name : ''}
                            </div>
                            <div className="text-xs text-white/30">
                              Cliente desde {dateStr}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white/70">{client.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white bg-white/5 inline-flex px-3 py-1 rounded-full border border-white/10">
                          {client.totalVisits} reservas
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-emerald-400">
                          ${client.totalSpend.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
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
