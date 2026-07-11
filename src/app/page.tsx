import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col font-sans selection:bg-amber-500/30">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <span className="text-black font-bold text-lg">F</span>
              </div>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white">
                Flores Barbers <span className="hidden sm:inline font-light text-white/50">Manager</span>
              </span>
            </div>
            <div className="flex items-center gap-3 sm:gap-6">
              <Link href="/login" className="hidden sm:block text-sm font-medium text-white/70 hover:text-white transition-colors">
                Iniciar Sesión
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-full text-black bg-white hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                Comenzar Gratis
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

        {/* Hero Section */}
        <section className="relative pt-24 pb-32 sm:pt-32 lg:pt-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-amber-400 mb-8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              El software de gestión premium
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Digitaliza tu Barbería <br className="hidden md:block" />
              en <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600">5 Minutos</span>
            </h1>
            
            <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/60 mx-auto mb-12 leading-relaxed">
              La plataforma definitiva para dueños de barberías. Gestiona tus citas, controla los ingresos y ofrece a tus clientes una experiencia de reserva nivel mundial las 24 horas del día.
            </p>
            
            <div className="flex justify-center gap-4">
              <Link href="/login" className="px-8 py-4 text-base font-semibold rounded-full text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] transition-all transform hover:-translate-y-1">
                Crear mi Cuenta Ahora
              </Link>
            </div>
          </div>
        </section>

        {/* Bento Grid Features Section */}
        <section className="py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-4">
                Todo lo que necesitas, <span className="font-light text-white/60">en un solo lugar</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              
              {/* Feature 1 (Large) */}
              <div className="md:col-span-2 p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-amber-400 mb-6 border border-white/10">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Reservas Inteligentes 24/7</h3>
                  <p className="text-white/60 leading-relaxed max-w-md">
                    Tus clientes podrán agendar citas en cualquier momento desde tu propia página web personalizada. Adiós a los mensajes de WhatsApp perdidos y llamadas interrumpidas.
                  </p>
                </div>
              </div>

              {/* Feature 2 (Small) */}
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400 mb-6 border border-white/10">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Gestión de Equipo</h3>
                  <p className="text-white/60 leading-relaxed text-sm">
                    Administra barberos, servicios y horarios. El flujo perfecto.
                  </p>
                </div>
              </div>

              {/* Feature 3 (Small) */}
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-emerald-400 mb-6 border border-white/10">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Panel de Ingresos</h3>
                  <p className="text-white/60 leading-relaxed text-sm">
                    Toma el control financiero con métricas en tiempo real.
                  </p>
                </div>
              </div>

              {/* Feature 4 (Large) */}
              <div className="md:col-span-2 p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tl from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-purple-400 mb-6 border border-white/10">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Control de Accesos</h3>
                  <p className="text-white/60 leading-relaxed max-w-md">
                    Tu sistema blindado. Bloqueos manuales de horario y protección de base de datos a nivel de negocio. Todo seguro y privado.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#0A0A0A] relative z-10">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:order-2 space-x-6">
              <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Términos</a>
              <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Privacidad</a>
            </div>
            <div className="mt-8 md:mt-0 md:order-1 flex items-center gap-2 justify-center md:justify-start">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center">
                <span className="text-black font-bold text-xs">F</span>
              </div>
              <p className="text-center text-sm text-white/40">
                &copy; {new Date().getFullYear()} Flores Barbers Manager.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
