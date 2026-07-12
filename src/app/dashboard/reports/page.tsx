import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function ReportsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: barbershop } = await supabase.from('barbershops').select('id').eq('owner_id', user.id).single()
  if (!barbershop) redirect('/dashboard')

  // Date boundaries
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  
  const todayStart = new Date(now)
  todayStart.setHours(0, 0, 0, 0)
  
  const todayEnd = new Date(now)
  todayEnd.setHours(23, 59, 59, 999)

  // Fetch all appointments for the month
  const { data: appointments } = await supabase
    .from('appointments')
    .select(`
      id,
      start_time,
      status,
      total_price,
      services ( id, name ),
      barbers ( id, first_name, last_name, commission_percentage ),
      client_id
    `)
    .eq('barbershop_id', barbershop.id)
    .gte('start_time', startOfMonth.toISOString())

  const validAppointments = (appointments || []).filter(apt => apt.status === 'completed')

  // Calculate Metrics
  let monthRevenue = 0
  let todayRevenue = 0
  const uniqueClients = new Set()
  
  // For top services
  const servicesCount: Record<string, { name: string, count: number, revenue: number }> = {}
  
  // For barber payroll
  const payroll: Record<string, { 
    id: string, 
    name: string, 
    commissionPct: number, 
    generatedRevenue: number, 
    commissionEarned: number,
    appointmentsCount: number
  }> = {}

  validAppointments.forEach(apt => {
    const price = Number(apt.total_price) || 0
    const aptDate = new Date(apt.start_time)
    
    // Revenue
    monthRevenue += price
    if (aptDate >= todayStart && aptDate <= todayEnd) {
      todayRevenue += price
    }

    // Clients
    if (apt.client_id) {
      uniqueClients.add(apt.client_id)
    }

    // Services
    if (apt.services) {
      const service: any = Array.isArray(apt.services) ? apt.services[0] : apt.services
      if (service) {
        const sId = service.id
        if (!servicesCount[sId]) {
          servicesCount[sId] = { name: service.name, count: 0, revenue: 0 }
        }
        servicesCount[sId].count += 1
        servicesCount[sId].revenue += price
      }
    }

    // Payroll
    if (apt.barbers) {
      const barber: any = Array.isArray(apt.barbers) ? apt.barbers[0] : apt.barbers
      if (barber) {
        const bId = barber.id
        if (!payroll[bId]) {
          const pct = Number(barber.commission_percentage) || 0
          payroll[bId] = {
            id: bId,
            name: `${barber.first_name} ${barber.last_name !== '.' ? barber.last_name : ''}`.trim(),
            commissionPct: pct,
            generatedRevenue: 0,
            commissionEarned: 0,
            appointmentsCount: 0
          }
        }
        payroll[bId].generatedRevenue += price
        payroll[bId].commissionEarned += (price * (payroll[bId].commissionPct / 100))
        payroll[bId].appointmentsCount += 1
      }
    }
  })

  // Sort objects into arrays
  const topServices = Object.values(servicesCount).sort((a, b) => b.count - a.count).slice(0, 5)
  const payrollArray = Object.values(payroll).sort((a, b) => b.generatedRevenue - a.generatedRevenue)

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white font-playfair tracking-wide">Reportes y Estadísticas</h1>
          <p className="mt-1 text-sm text-white/50">Analiza el rendimiento de tu negocio del mes actual.</p>
        </div>
      </div>

      {/* Tarjetas de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-charcoal-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg className="w-16 h-16 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
          </div>
          <h3 className="text-sm font-medium text-white/50">Ingresos del Día</h3>
          <p className="mt-2 text-3xl font-bold text-white">
            ${todayRevenue.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-charcoal-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg className="w-16 h-16 text-gold-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>
          </div>
          <h3 className="text-sm font-medium text-white/50">Ingresos del Mes</h3>
          <p className="mt-2 text-3xl font-bold text-gold-400">
            ${monthRevenue.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-charcoal-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg className="w-16 h-16 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
          </div>
          <h3 className="text-sm font-medium text-white/50">Clientes Únicos (Mes)</h3>
          <p className="mt-2 text-3xl font-bold text-white">
            {uniqueClients.size}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Top Servicios */}
        <div className="bg-charcoal-900/50 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5">
            <h2 className="text-xl font-bold text-white font-playfair">Servicios Más Vendidos</h2>
          </div>
          <div className="p-6">
            {topServices.length === 0 ? (
              <p className="text-white/40 text-sm text-center py-4">No hay datos suficientes.</p>
            ) : (
              <ul className="space-y-4">
                {topServices.map((service, idx) => (
                  <li key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-charcoal-800 flex items-center justify-center text-gold-400 font-bold border border-white/10">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-medium text-white">{service.name}</p>
                        <p className="text-xs text-white/40">{service.count} reservas</p>
                      </div>
                    </div>
                    <div className="font-bold text-emerald-400">
                      ${service.revenue.toLocaleString('es-MX')}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Nómina / Comisiones */}
        <div className="bg-charcoal-900/50 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white font-playfair">Nómina y Comisiones</h2>
            <span className="text-xs font-medium bg-gold-500/10 text-gold-400 px-3 py-1 rounded-full border border-gold-500/20">Mes Actual</span>
          </div>
          <div className="p-0">
            {payrollArray.length === 0 ? (
              <p className="text-white/40 text-sm text-center py-8">No hay comisiones generadas en este mes.</p>
            ) : (
              <table className="min-w-full divide-y divide-white/5">
                <thead className="bg-white/[0.01]">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase">Barbero</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase">Generado</th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-white/40 uppercase">A Pagar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {payrollArray.map(p => (
                    <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">{p.name}</div>
                        <div className="text-xs text-gold-400">{p.commissionPct}% comisión</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white/70">${p.generatedRevenue.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</div>
                        <div className="text-xs text-white/30">{p.appointmentsCount} citas</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-bold text-emerald-400">
                          ${p.commissionEarned.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
