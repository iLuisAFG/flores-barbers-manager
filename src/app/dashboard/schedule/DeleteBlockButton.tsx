'use client'
import { useState } from 'react'
import { deleteTimeBlock } from '../actions'

export default function DeleteBlockButton({ blockId }: { blockId: string }) {
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm('¿Estás seguro de que deseas eliminar este bloqueo?')) return
    
    setLoading(true)
    await deleteTimeBlock(blockId)
    setLoading(false)
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={loading}
      className="ml-4 p-1.5 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors disabled:opacity-50"
      title="Eliminar bloqueo"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  )
}
