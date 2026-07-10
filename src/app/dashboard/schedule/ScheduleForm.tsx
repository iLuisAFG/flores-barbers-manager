'use client'
import { useState } from 'react'
import { upsertOperatingHours } from '../actions'

export default function ScheduleForm({ barbershopId, dayName, dayData }: { barbershopId: string, dayName: string, dayData: any }) {
  const [loading, setLoading] = useState(false)
  const [isClosed, setIsClosed] = useState(dayData.is_closed)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    formData.append('barbershop_id', barbershopId)
    formData.append('day_of_week', dayData.day_of_week.toString())
    formData.append('is_closed', isClosed.toString())
    await upsertOperatingHours(formData)
    setLoading(false)
  }

  const formatTimeInput = (timeString: string) => {
    if (!timeString) return ''
    return timeString.substring(0, 5)
  }

  return (
    <form action={handleSubmit} className="flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="w-28 font-medium text-white">{dayName}</div>
      
      <label className="flex items-center gap-2 cursor-pointer w-24">
        <input 
          type="checkbox" 
          checked={isClosed} 
          onChange={(e) => setIsClosed(e.target.checked)}
          className="rounded border-white/20 bg-charcoal-800 text-gold-500 focus:ring-gold-500 focus:ring-offset-charcoal-900"
        />
        <span className="text-sm text-white/70">Cerrado</span>
      </label>

      {!isClosed ? (
        <div className="flex flex-1 items-center gap-2">
          <input 
            type="time" 
            name="open_time" 
            defaultValue={formatTimeInput(dayData.open_time)} 
            required 
            className="flex-1 text-sm bg-white/5 text-white border-0 ring-1 ring-inset ring-white/10 rounded-lg focus:ring-2 focus:ring-inset focus:ring-gold-500 px-3 py-2 transition-all"
          />
          <span className="text-white/30">-</span>
          <input 
            type="time" 
            name="close_time" 
            defaultValue={formatTimeInput(dayData.close_time)} 
            required 
            className="flex-1 text-sm bg-white/5 text-white border-0 ring-1 ring-inset ring-white/10 rounded-lg focus:ring-2 focus:ring-inset focus:ring-gold-500 px-3 py-2 transition-all"
          />
        </div>
      ) : (
        <div className="flex flex-1 items-center text-sm text-white/30 italic">
          Sin atención al público
        </div>
      )}

      <button 
        type="submit" 
        disabled={loading}
        className="text-xs bg-white/5 hover:bg-white/10 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 border border-white/10"
      >
        {loading ? '...' : 'Guardar'}
      </button>
    </form>
  )
}
