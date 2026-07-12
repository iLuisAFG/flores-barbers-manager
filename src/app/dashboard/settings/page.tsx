import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import SettingsForm from './SettingsForm'

export default async function SettingsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: barbershop } = await supabase
    .from('barbershops')
    .select('whatsapp_number')
    .eq('owner_id', user.id)
    .single()

  if (!barbershop) redirect('/dashboard')

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white font-playfair tracking-wide">Configuración</h1>
        <p className="mt-1 text-sm text-white/50">Administra los ajustes generales de tu barbería.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 max-w-4xl">
        <section>
          <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/10 pb-2">Notificaciones</h2>
          <SettingsForm initialWhatsapp={barbershop.whatsapp_number} />
        </section>
      </div>
    </div>
  )
}
