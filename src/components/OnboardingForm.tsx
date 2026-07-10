'use client'

import { useState } from 'react'
import { createBarbershop } from '@/app/dashboard/actions'

export default function OnboardingForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    const result = await createBarbershop(formData)
    if (result?.error) {
      setError(result.error)
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gold-500/10 blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-lg space-y-8 bg-charcoal-900/50 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/10 relative z-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white font-playfair">
            ¡Bienvenido a la Plataforma!
          </h2>
          <p className="mt-3 text-base text-white/50">
            Para comenzar, necesitamos configurar tu barbería.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" action={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/80">
                Nombre de la Barbería
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-2 block w-full rounded-xl border-0 py-3 px-4 bg-white/5 text-white ring-1 ring-inset ring-white/10 placeholder:text-white/30 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gold-500 sm:text-sm sm:leading-6 transition-all"
                placeholder="Ej. The Gentleman's Club"
              />
            </div>
            
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-white/80">
                Identificador de URL
              </label>
              <div className="mt-2 flex rounded-xl shadow-sm ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gold-500 bg-white/5 overflow-hidden">
                <span className="flex select-none items-center pl-4 text-white/40 sm:text-sm">
                  barberapp.com/
                </span>
                <input
                  id="slug"
                  name="slug"
                  type="text"
                  required
                  className="block flex-1 border-0 bg-transparent py-3 pl-1 pr-4 text-white placeholder:text-white/30 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="the-gentlemans-club"
                />
              </div>
              <p className="mt-2 text-xs text-white/40">
                Este será el enlace que compartirás con tus clientes para que agenden.
              </p>
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-red-900/50 border border-red-500/30 p-4">
              <p className="text-sm font-medium text-red-200">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-black bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 disabled:opacity-50 transition-all hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            {loading ? 'Configurando...' : 'Crear Mi Negocio'}
          </button>
        </form>
      </div>
    </div>
  )
}
