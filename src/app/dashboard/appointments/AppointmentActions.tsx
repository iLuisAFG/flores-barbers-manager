'use client'
import { useState } from 'react'
import { updateAppointmentStatus } from '../actions'

export default function AppointmentActions({ appointmentId, currentStatus }: { appointmentId: string, currentStatus: string }) {
  const [loading, setLoading] = useState(false)

  async function handleStatusChange(newStatus: string) {
    setLoading(true)
    await updateAppointmentStatus(appointmentId, newStatus)
    setLoading(false)
  }

  if (currentStatus === 'completed' || currentStatus === 'cancelled' || currentStatus === 'no_show') {
    return <span className="text-white/20 text-xs italic">Cerrada</span>
  }

  return (
    <div className="flex gap-2 justify-end">
      {currentStatus === 'pending' && (
        <button
          onClick={() => handleStatusChange('scheduled')}
          disabled={loading}
          className="text-xs font-semibold bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
        >
          Confirmar
        </button>
      )}
      
      {currentStatus === 'scheduled' && (
        <button
          onClick={() => handleStatusChange('completed')}
          disabled={loading}
          className="text-xs font-semibold bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
        >
          Completar
        </button>
      )}

      <div className="relative group inline-block">
        <button className="text-white/40 hover:text-white p-1.5 rounded-full hover:bg-white/5 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
        <div className="absolute right-0 mt-2 w-36 rounded-xl shadow-2xl bg-charcoal-800 border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
          <div className="py-1">
            <button
              onClick={() => handleStatusChange('no_show')}
              disabled={loading}
              className="block w-full text-left px-4 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white"
            >
              No asistió
            </button>
            <button
              onClick={() => handleStatusChange('cancelled')}
              disabled={loading}
              className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300"
            >
              Cancelar Cita
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
