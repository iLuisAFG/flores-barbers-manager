import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import OnboardingForm from '@/components/OnboardingForm'
import PublicLinkSection from './PublicLinkSection'

export default async function DashboardHome() {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: barbershop } = await supabase
    .from('barbershops')
    .select('*')
    .eq('owner_id', user.id)
    .single()

  if (!barbershop) {
    return <OnboardingForm />
  }

  // Fetch quick stats
  const today = new Date()
  today.setHours(0,0,0,0)
  
  const { data: todayAppointments } = await supabase
    .from('appointments')
    .select('id, status, services(price)')
    .eq('barbershop_id', barbershop.id)
    .gte('start_time', today.toISOString())
    .in('status', ['scheduled', 'completed'])

  const { count: activeBarbers } = await supabase
    .from('barbers')
    .select('*', { count: 'exact', head: true })
    .eq('barbershop_id', barbershop.id)

  const appointmentsCount = todayAppointments?.length || 0
  const expectedRevenue = todayAppointments?.reduce((acc, curr: any) => acc + (curr.services?.price || 0), 0) || 0

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white font-playfair tracking-wide">Bienvenido de vuelta</h1>
        <p className="mt-1 text-sm text-white/50">Resumen de tu negocio para el día de hoy.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {/* Metric 1 */}
        <div className="bg-charcoal-900/50 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/5 relative overflow-hidden group hover:border-gold-500/30 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/10 rounded-full blur-[30px] -mr-8 -mt-8 group-hover:bg-gold-500/20 transition-all" />
          <p className="text-sm font-medium text-white/40 uppercase tracking-widest mb-1">Citas Hoy</p>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-semibold text-white">{appointmentsCount}</p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-charcoal-900/50 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/5 relative overflow-hidden group hover:border-gold-500/30 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-[30px] -mr-8 -mt-8 group-hover:bg-emerald-500/20 transition-all" />
          <p className="text-sm font-medium text-white/40 uppercase tracking-widest mb-1">Ingresos Proyectados</p>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-semibold text-emerald-400">${expectedRevenue}</p>
            <span className="text-sm text-white/30">MXN</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-charcoal-900/50 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/5 relative overflow-hidden group hover:border-gold-500/30 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-[30px] -mr-8 -mt-8 group-hover:bg-blue-500/20 transition-all" />
          <p className="text-sm font-medium text-white/40 uppercase tracking-widest mb-1">Barberos Activos</p>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-semibold text-white">{activeBarbers || 0}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions / Link */}
      <div className="mt-8 bg-charcoal-900/30 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="w-full sm:w-auto text-center sm:text-left">
          <h3 className="text-lg font-medium text-white mb-2">Página Pública de Reservas</h3>
          <p className="text-sm text-white/40">Comparte este enlace con tus clientes para que puedan agendar.</p>
        </div>
        <PublicLinkSection slug={barbershop.slug} />
      </div>
    </div>
  )
}
