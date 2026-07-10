import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import ServiceForm from './ServiceForm'
import EditServiceModal from './EditServiceModal'
import DeleteServiceButton from './DeleteServiceButton'

export default async function ServicesPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: barbershop } = await supabase.from('barbershops').select('id').eq('owner_id', user.id).single()
  if (!barbershop) redirect('/dashboard')

  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('barbershop_id', barbershop.id)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white font-playfair tracking-wide">Servicios</h1>
          <p className="mt-1 text-sm text-white/50">Gestiona los servicios y precios que ofreces.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Formulario Lateral */}
        <div className="lg:col-span-1">
          <div className="bg-charcoal-900/50 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/5 sticky top-8">
            <h2 className="text-lg font-semibold text-white mb-6 font-playfair">Crear Servicio</h2>
            <ServiceForm barbershopId={barbershop.id} />
          </div>
        </div>

        {/* Lista Principal */}
        <div className="lg:col-span-2">
          <div className="bg-charcoal-900/50 backdrop-blur-md rounded-3xl shadow-xl border border-white/5 overflow-hidden">
            <div className="px-6 py-5 border-b border-white/5 bg-white/[0.02]">
              <h2 className="text-lg font-semibold text-white font-playfair">Servicios Disponibles</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/5">
                <thead className="bg-white/[0.01]">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">
                      Servicio
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">
                      Precio
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">
                      Duración
                    </th>
                    <th scope="col" className="relative px-6 py-4">
                      <span className="sr-only">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-transparent">
                  {!services || services.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-sm text-white/40">
                        No hay servicios registrados. Añade tu primer servicio para comenzar.
                      </td>
                    </tr>
                  ) : (
                    services.map((service) => (
                      <tr key={service.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{service.name}</div>
                          {service.description && (
                            <div className="text-sm text-white/40">{service.description}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-emerald-400">${service.price} MXN</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white/60">
                          {service.duration_minutes} min
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <EditServiceModal service={service} />
                            <DeleteServiceButton serviceId={service.id} />
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
