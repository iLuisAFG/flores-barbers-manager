import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import ScheduleForm from './ScheduleForm'
import TimeBlockForm from './TimeBlockForm'
import DeleteBlockButton from './DeleteBlockButton'

export default async function SchedulePage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: barbershop } = await supabase.from('barbershops').select('id').eq('owner_id', user.id).single()
  if (!barbershop) redirect('/dashboard')

  const { data: hours } = await supabase
    .from('operating_hours')
    .select('*')
    .eq('barbershop_id', barbershop.id)
    .order('day_of_week', { ascending: true })

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const { data: blocks } = await supabase
    .from('time_blocks')
    .select('*')
    .eq('barbershop_id', barbershop.id)
    .gte('start_time', today.toISOString())
    .order('start_time', { ascending: true })

  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white font-playfair tracking-wide">Gestión de Horarios</h1>
          <p className="mt-1 text-sm text-white/50">Configura cuándo estás disponible para tus clientes.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Operating Hours Configuration */}
        <div className="bg-charcoal-900/50 backdrop-blur-md rounded-3xl shadow-xl border border-white/5 overflow-hidden">
          <div className="px-6 py-5 border-b border-white/5 bg-white/[0.02]">
            <h2 className="text-lg font-semibold text-white font-playfair">Horario de Atención</h2>
          </div>
          <div className="p-6 divide-y divide-white/5">
            {days.map((dayName, index) => {
              const dayData = hours?.find(h => h.day_of_week === index) || {
                day_of_week: index,
                open_time: '09:00:00',
                close_time: '18:00:00',
                is_closed: index === 0 
              }
              return (
                <div key={index} className="py-4 first:pt-0 last:pb-0">
                  <ScheduleForm barbershopId={barbershop.id} dayName={dayName} dayData={dayData} />
                </div>
              )
            })}
          </div>
        </div>

        {/* Manual Time Blocks */}
        <div className="space-y-8">
          <div className="bg-charcoal-900/50 backdrop-blur-md rounded-3xl shadow-xl border border-white/5 overflow-hidden">
            <div className="px-6 py-5 border-b border-white/5 bg-white/[0.02]">
              <h2 className="text-lg font-semibold text-white font-playfair">Añadir Bloqueo Manual</h2>
              <p className="text-sm text-white/40 mt-1">Bloquea horas para eventos, comida o imprevistos.</p>
            </div>
            <div className="p-6">
              <TimeBlockForm barbershopId={barbershop.id} />
            </div>
          </div>

          <div className="bg-charcoal-900/50 backdrop-blur-md rounded-3xl shadow-xl border border-white/5 overflow-hidden">
            <div className="px-6 py-5 border-b border-white/5 bg-white/[0.02]">
              <h2 className="text-lg font-semibold text-white font-playfair">Bloqueos Activos</h2>
            </div>
            <div className="p-0">
              {!blocks || blocks.length === 0 ? (
                <p className="text-white/40 text-sm text-center py-8">No hay bloqueos activos.</p>
              ) : (
                <ul className="divide-y divide-white/5">
                  {blocks.map(block => {
                    const startDate = new Date(block.start_time)
                    const endDate = new Date(block.end_time)
                    const dateFormatted = new Intl.DateTimeFormat('es-ES', { weekday: 'short', day: '2-digit', month: 'short' }).format(startDate)
                    const timeFormatted = `${startDate.getHours().toString().padStart(2, '0')}:${startDate.getMinutes().toString().padStart(2, '0')} - ${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`
                    
                    return (
                      <li key={block.id} className="px-6 py-4 flex justify-between items-center hover:bg-white/[0.02] transition-colors">
                        <div>
                          <p className="font-medium text-white text-sm capitalize">{dateFormatted} <span className="font-normal text-gold-400 ml-2">{timeFormatted}</span></p>
                          {block.reason && <p className="text-xs text-white/40 mt-1">{block.reason}</p>}
                        </div>
                        <div className="flex items-center">
                          <span className="px-2 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-md text-xs font-medium">Bloqueado</span>
                          <DeleteBlockButton blockId={block.id} />
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
