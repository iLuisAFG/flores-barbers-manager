'use client'

import { useState } from 'react'
import { deleteBarber } from '../actions'

export default function DeleteBarberButton({ barberId }: { barberId: string }) {
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (confirm('¿Estás seguro de que deseas eliminar a este barbero? Todas sus citas asociadas también se verán afectadas.')) {
      setLoading(true)
      await deleteBarber(barberId)
      setLoading(false)
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={loading}
      className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
      title="Eliminar barbero"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  )
}
