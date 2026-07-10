import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import BookingForm from '@/components/BookingForm'

export default async function PublicBarbershopPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()

  // Find barbershop by slug
  const { data: barbershop } = await supabase
    .from('barbershops')
    .select('id, name')
    .eq('slug', params.slug)
    .single()

  if (!barbershop) {
    notFound()
  }

  // Fetch active services and barbers
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('barbershop_id', barbershop.id)
    .eq('is_active', true)
    .order('name', { ascending: true })

  const { data: barbers } = await supabase
    .from('barbers')
    .select('*')
    .eq('barbershop_id', barbershop.id)
    .eq('is_active', true)
    .order('first_name', { ascending: true })

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans selection:bg-gold-500/30 text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold-500/10 blur-[150px] pointer-events-none rounded-full" />
      
      <main className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-gold-400 to-gold-600 flex items-center justify-center shadow-xl shadow-gold-500/20 mb-8 border border-gold-400/20">
            <span className="text-black font-bold text-3xl font-playfair">{barbershop.name.charAt(0)}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-playfair tracking-tight">
            {barbershop.name}
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Selecciona el servicio, elige a tu barbero y reserva tu cita en segundos.
          </p>
        </div>

        <div className="bg-charcoal-900/50 backdrop-blur-xl rounded-[2rem] shadow-2xl p-6 md:p-12 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 blur-[100px] pointer-events-none" />
          
          <BookingForm 
            barbershopId={barbershop.id} 
            services={services || []} 
            barbers={barbers || []} 
          />
        </div>

        <footer className="mt-16 text-center">
          <p className="text-sm text-white/30">
            Powered by <span className="font-medium text-white/50">Flores Barbers Manager</span>
          </p>
        </footer>
      </main>
    </div>
  )
}
