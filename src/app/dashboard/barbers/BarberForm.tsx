'use client'
import { useState, useRef } from 'react'
import { createBarber } from '../actions'

export default function BarberForm({ barbershopId }: { barbershopId: string }) {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    formData.append('barbershop_id', barbershopId)
    // Para simplificar, llenamos el apellido con un punto si no se pide
    formData.append('last_name', '.')
    
    await createBarber(formData)
    formRef.current?.reset()
    setLoading(false)
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="first_name" className="block text-sm font-medium text-white/70 mb-2">
          Nombre Completo o Apodo
        </label>
        <input 
          type="text" 
          name="first_name" 
          id="first_name" 
          required 
          className="block w-full rounded-xl border-0 py-3 px-4 bg-white/5 text-white ring-1 ring-inset ring-white/10 placeholder:text-white/30 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gold-500 sm:text-sm sm:leading-6 transition-all"
          placeholder="Ej. Carlos 'El Mago'"
        />
      </div>
      <button 
        type="submit" 
        disabled={loading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-black bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 disabled:opacity-50 transition-all hover:-translate-y-0.5"
      >
        {loading ? 'Añadiendo...' : 'Añadir al Equipo'}
      </button>
    </form>
  )
}
