import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import BarberForm from './BarberForm'
import EditBarberModal from './EditBarberModal'
import DeleteBarberButton from './DeleteBarberButton'

export default async function BarbersPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: barbershop } = await supabase.from('barbershops').select('id').eq('owner_id', user.id).single()
  if (!barbershop) redirect('/dashboard')

  const { data: barbers } = await supabase
    .from('barbers')
    .select('*')
    .eq('barbershop_id', barbershop.id)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white font-playfair tracking-wide">Equipo de Trabajo</h1>
          <p className="mt-1 text-sm text-white/50">Gestiona los barberos que trabajan en tu negocio.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Formulario Lateral */}
        <div className="lg:col-span-1">
          <div className="bg-charcoal-900/50 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/5 sticky top-8">
            <h2 className="text-lg font-semibold text-white mb-6 font-playfair">Añadir Barbero</h2>
            <BarberForm barbershopId={barbershop.id} />
          </div>
        </div>

        {/* Lista Principal */}
        <div className="lg:col-span-2">
          <div className="bg-charcoal-900/50 backdrop-blur-md rounded-3xl shadow-xl border border-white/5 overflow-hidden">
            <div className="px-6 py-5 border-b border-white/5 bg-white/[0.02]">
              <h2 className="text-lg font-semibold text-white font-playfair">Barberos Activos</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/5">
                <thead className="bg-white/[0.01]">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">
                      Comisión
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
                  {!barbers || barbers.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-sm text-white/40">
                        No hay barberos registrados. Añade tu primer barbero para comenzar.
                      </td>
                    </tr>
                  ) : (
                    barbers.map((barber) => (
                      <tr key={barber.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-charcoal-800 flex items-center justify-center text-gold-400 font-bold border border-white/10">
                              {barber.first_name[0]}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">
                                {barber.first_name} {barber.last_name !== '.' ? barber.last_name : ''}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gold-400">
                            {barber.commission_percentage || 0}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {barber.is_active ? (
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 mt-1.5"></span>
                              Activo
                            </span>
                          ) : (
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-2 mt-1.5"></span>
                              Inactivo
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <EditBarberModal barber={barber} />
                            <DeleteBarberButton barberId={barber.id} />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
