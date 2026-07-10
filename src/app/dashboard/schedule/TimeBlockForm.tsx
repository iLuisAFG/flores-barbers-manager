'use client'
import { useState, useRef } from 'react'
import { createTimeBlock } from '../actions'

export default function TimeBlockForm({ barbershopId }: { barbershopId: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string|null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    formData.append('barbershop_id', barbershopId)
    
    const result = await createTimeBlock(formData)
    if (result?.error) {
      setError(result.error)
    } else {
      formRef.current?.reset()
    }
    setLoading(false)
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-white/70 mb-1">Fecha</label>
        <input type="date" name="date" required min={new Date().toISOString().split('T')[0]} className="block w-full text-sm bg-white/5 text-white border-0 ring-1 ring-inset ring-white/10 rounded-xl focus:ring-2 focus:ring-inset focus:ring-gold-500 px-4 py-3 transition-all" />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">Hora Inicio</label>
          <input type="time" name="start_time" required className="block w-full text-sm bg-white/5 text-white border-0 ring-1 ring-inset ring-white/10 rounded-xl focus:ring-2 focus:ring-inset focus:ring-gold-500 px-4 py-3 transition-all" />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">Hora Fin</label>
          <input type="time" name="end_time" required className="block w-full text-sm bg-white/5 text-white border-0 ring-1 ring-inset ring-white/10 rounded-xl focus:ring-2 focus:ring-inset focus:ring-gold-500 px-4 py-3 transition-all" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/70 mb-1">Motivo (Opcional)</label>
        <input type="text" name="reason" placeholder="Ej. Hora de comida" className="block w-full text-sm bg-white/5 text-white border-0 ring-1 ring-inset ring-white/10 rounded-xl focus:ring-2 focus:ring-inset focus:ring-gold-500 px-4 py-3 transition-all placeholder:text-white/30" />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button 
        type="submit" 
        disabled={loading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-black bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 disabled:opacity-50 transition-all hover:-translate-y-0.5"
      >
        {loading ? 'Creando...' : 'Crear Bloqueo'}
      </button>
    </form>
  )
}
