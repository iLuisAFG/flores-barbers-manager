import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import AdminTable from './AdminTable'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'

const SUPERADMIN_EMAIL = 'floresglezluisarturo@gmail.com'

export default async function SuperAdminPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.email !== SUPERADMIN_EMAIL) {
    redirect('/dashboard') // Expulsar intrusos
  }

  // Fetch todas las barberías gracias a la nueva política SQL de superadmin
  const { data: barbershops } = await supabase
    .from('barbershops')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-gold-500/30">
      <header className="border-b border-white/5 bg-charcoal-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-black font-bold">
              SA
            </div>
            <div>
              <h1 className="text-xl font-bold font-playfair tracking-wide text-white">Super Admin</h1>
              <p className="text-xs text-white/50">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
              Ir a mi Barbería
            </Link>
            <div className="w-px h-6 bg-white/10" />
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-900/10 blur-[150px] pointer-events-none rounded-full" />
        
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white font-playfair tracking-wide mb-2">Backoffice SaaS</h2>
          <p className="text-white/50">Gestiona el acceso y suscripción de todos los inquilinos (barberías) del sistema.</p>
        </div>

        <AdminTable barbershops={barbershops || []} />
      </main>
    </div>
  )
}
