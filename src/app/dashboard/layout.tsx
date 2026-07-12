import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton'
import { signOutAction } from './actions'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: barbershop } = await supabase
    .from('barbershops')
    .select('id, name, subscription_status')
    .eq('owner_id', user.id)
    .single()

  // Bloqueo manual de la plataforma por falta de pago
  if (barbershop && barbershop.subscription_status === 'inactive') {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] rounded-full bg-red-900/20 blur-[120px] pointer-events-none" />
        <div className="max-w-md w-full bg-charcoal-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 text-center border border-red-500/20 relative z-10">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-500/10 mb-8 border border-red-500/20">
            <svg className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 font-playfair tracking-wide">Suscripción Inactiva</h2>
          <p className="text-white/60 mb-10 leading-relaxed">
            Tu acceso al panel de administración ha sido suspendido. Por favor, comunícate con soporte técnico para renovar tu membresía y reactivar los servicios.
          </p>
          <a
            href="https://wa.me/5529156160" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full px-6 py-4 text-base font-semibold rounded-xl text-black bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:-translate-y-1 mb-4"
          >
            <svg className="w-5 h-5 mr-3 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Contactar a Soporte VIP
          </a>
          
          <form action={signOutAction}>
            <button
              type="submit"
              className="w-full px-6 py-4 text-sm font-semibold rounded-xl text-white/50 border border-white/10 hover:bg-white/5 hover:text-white transition-all"
            >
              Cerrar sesión e ir al inicio
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col md:flex-row text-white selection:bg-gold-500/30">
      {barbershop && (
        <aside className="w-full md:w-64 bg-charcoal-900 border-r border-white/5 md:shrink-0 flex md:flex-col shadow-2xl relative z-20">
          <div className="p-8 border-b border-white/5 hidden md:block">
            <h1 className="text-2xl font-bold tracking-tight text-white font-playfair leading-tight">
              Flores <span className="text-gold-500">Barbers</span>
            </h1>
            <p className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em] mt-2">Manager</p>
          </div>
          <nav className="flex-1 px-4 py-8 space-y-2 flex md:flex-col overflow-x-auto">
            <Link href="/dashboard" className="px-4 py-3 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white rounded-xl transition-all whitespace-nowrap flex items-center gap-3">
              <svg className="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              Inicio
            </Link>
            <Link href="/dashboard/appointments" className="px-4 py-3 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white rounded-xl transition-all whitespace-nowrap flex items-center gap-3">
              <svg className="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Citas
            </Link>
            <Link href="/dashboard/barbers" className="px-4 py-3 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white rounded-xl transition-all whitespace-nowrap flex items-center gap-3">
              <svg className="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              Equipo
            </Link>
            <Link href="/dashboard/services" className="px-4 py-3 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white rounded-xl transition-all whitespace-nowrap flex items-center gap-3">
              <svg className="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" /></svg>
              Servicios
            </Link>
            <Link href="/dashboard/schedule" className="px-4 py-3 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white rounded-xl transition-all whitespace-nowrap flex items-center gap-3">
              <svg className="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Horarios
            </Link>
            <Link href="/dashboard/clients" className="px-4 py-3 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white rounded-xl transition-all whitespace-nowrap flex items-center gap-3">
              <svg className="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              Clientes CRM
            </Link>
            <Link href="/dashboard/reports" className="px-4 py-3 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white rounded-xl transition-all whitespace-nowrap flex items-center gap-3">
              <svg className="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              Reportes
            </Link>
            <Link href="/dashboard/settings" className="px-4 py-3 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white rounded-xl transition-all whitespace-nowrap flex items-center gap-3">
              <svg className="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Configuración
            </Link>
            
            <div className="flex-1 hidden md:block"></div>
            
            <LogoutButton />
          </nav>
        </aside>
      )}

      <div className="flex-1 overflow-auto relative">
        {/* Subtle background glow for the main dashboard area */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="relative z-10 p-4 md:p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
