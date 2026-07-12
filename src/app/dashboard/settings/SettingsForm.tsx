'use client'

import { useState } from 'react'
import { updateBarbershopSettings } from '../actions'

export default function SettingsForm({ initialWhatsapp }: { initialWhatsapp: string | null }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null)

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    setMessage(null)
    
    const result = await updateBarbershopSettings(formData)
    
    if (result.error) {
      setMessage({ text: result.error, type: 'error' })
    } else {
      setMessage({ text: 'Configuración guardada exitosamente.', type: 'success' })
    }
    
    setLoading(false)
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-2xl bg-white/5 border border-white/10 p-6 rounded-3xl">
      <div>
        <label htmlFor="whatsapp_number" className="block text-sm font-medium text-white/70 mb-2">
          Número de WhatsApp para Reservas
        </label>
        <p className="text-xs text-white/40 mb-3">
          Ingresa el número completo con código de país, sin el signo + ni espacios (Ej. 5215555555555). A este número llegarán las confirmaciones de cita.
        </p>
        <input 
          type="text" 
          name="whatsapp_number" 
          id="whatsapp_number"
          defaultValue={initialWhatsapp || ''}
          placeholder="Ej: 5215555555555"
          className="block w-full bg-white/5 text-white shadow-sm focus:ring-2 focus:ring-gold-500 focus:border-gold-500 sm:text-sm rounded-xl border-white/10 px-4 py-3" 
        />
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-sm ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
          {message.text}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-gold-500 hover:bg-gold-400 text-black px-6 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
        >
          {loading ? 'Guardando...' : 'Guardar Configuración'}
        </button>
      </div>
    </form>
  )
}
