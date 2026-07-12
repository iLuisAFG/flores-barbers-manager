'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { updateService } from '../actions'

export default function EditServiceModal({ service }: { service: any }) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    const result = await updateService(service.id, formData)
    if (result?.success) {
      setIsOpen(false)
    }
    setLoading(false)
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 text-white/40 hover:text-gold-400 hover:bg-gold-500/10 rounded-lg transition-colors"
        title="Editar servicio"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>

      {mounted && isOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-charcoal-900 border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white p-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-xl font-bold text-white mb-6 font-playfair">Editar Servicio</h3>
            
            <form action={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Nombre</label>
                <input 
                  type="text" 
                  name="name" 
                  defaultValue={service.name}
                  required 
                  className="w-full rounded-xl border-0 py-3 px-4 bg-white/5 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-gold-500 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Precio (MXN)</label>
                <input 
                  type="number" 
                  name="price" 
                  defaultValue={service.price}
                  required 
                  className="w-full rounded-xl border-0 py-3 px-4 bg-white/5 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-gold-500 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Duración (Min)</label>
                <input 
                  type="number" 
                  name="duration" 
                  defaultValue={service.duration_minutes}
                  required 
                  className="w-full rounded-xl border-0 py-3 px-4 bg-white/5 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-gold-500 transition-all text-sm"
                />
              </div>
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl text-black font-bold bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 transition-all disabled:opacity-50"
                >
                  {loading ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
