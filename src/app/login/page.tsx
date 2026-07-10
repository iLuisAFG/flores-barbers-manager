'use client'

import { useState } from 'react'
import { logIn, signUp } from './actions'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  async function handleLogin(formData: FormData) {
    setLoading(true)
    setError(null)
    const result = await logIn(formData)
    if (result?.error) {
      setError(result.error)
    }
    setLoading(false)
  }

  async function handleSignup(formData: FormData) {
    setLoading(true)
    setError(null)
    const result = await signUp(formData)
    if (result?.error) {
      setError(result.error)
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gold-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md space-y-8 bg-charcoal-900/50 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/10 relative z-10">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-tr from-gold-400 to-gold-600 flex items-center justify-center shadow-lg shadow-gold-500/20 mb-6">
            <span className="text-black font-bold text-2xl">F</span>
          </div>
          <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-white font-playfair">
            Acceso Exclusivo
          </h2>
          <p className="mt-2 text-center text-sm text-white/50">
            El sistema operativo de tu barbería
          </p>
        </div>
        
        <form className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 relative block w-full rounded-xl border-0 py-3 px-4 bg-white/5 text-white ring-1 ring-inset ring-white/10 placeholder:text-white/30 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gold-500 sm:text-sm sm:leading-6 transition-all"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/80">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 relative block w-full rounded-xl border-0 py-3 px-4 bg-white/5 text-white ring-1 ring-inset ring-white/10 placeholder:text-white/30 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gold-500 sm:text-sm sm:leading-6 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-red-900/50 border border-red-500/30 p-4 backdrop-blur-sm">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-200">{error}</h3>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4 pt-2">
            <button
              formAction={handleLogin}
              disabled={loading}
              className="group relative flex w-full justify-center rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 px-3 py-3.5 text-sm font-bold text-black hover:from-gold-300 hover:to-gold-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 disabled:opacity-70 transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:-translate-y-0.5"
            >
              {loading ? 'Procesando...' : 'Iniciar Sesión'}
            </button>
            
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-charcoal-900 px-4 text-white/40">o</span>
              </div>
            </div>
            
            <button
              formAction={handleSignup}
              disabled={loading}
              className="group relative flex w-full justify-center rounded-xl bg-white/5 px-3 py-3.5 text-sm font-semibold text-white ring-1 ring-inset ring-white/10 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-70 transition-all"
            >
              {loading ? 'Procesando...' : 'Crear Nueva Barbería'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
