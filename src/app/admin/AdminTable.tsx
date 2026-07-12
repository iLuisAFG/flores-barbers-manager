'use client'

import { useState } from 'react'
import { toggleBarbershopStatus, deleteBarbershop } from './actions'

type Barbershop = {
  id: string
  name: string
  slug: string
  created_at: string
  subscription_status: string
}

export default function AdminTable({ barbershops }: { barbershops: Barbershop[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleToggle = async (id: string, currentStatus: string) => {
    setLoadingId(id)
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
    const result = await toggleBarbershopStatus(id, newStatus)
    
    if (result.error) {
      alert(result.error)
    }
    setLoadingId(null)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("⚠️ ATENCIÓN: ¿Estás seguro de querer ELIMINAR esta barbería? Se borrarán para siempre sus citas, clientes, barberos y servicios. Esta acción NO se puede deshacer.")) {
      setDeletingId(id)
      const result = await deleteBarbershop(id)
      if (result.error) {
        alert(result.error)
      }
      setDeletingId(null)
    }
  }

  return (
    <div className="bg-charcoal-900/50 backdrop-blur-md rounded-3xl shadow-xl border border-white/5 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/5">
          <thead className="bg-white/[0.01]">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">
                Barbería
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">
                Slug
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">
                Fecha de Creación
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">
                Estado
              </th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-white/40 uppercase tracking-wider">
                Acción
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-transparent">
            {!barbershops || barbershops.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-sm text-white/40">
                  No hay barberías registradas.
                </td>
              </tr>
            ) : (
              barbershops.map((shop) => {
                const dateObj = new Date(shop.created_at)
                const dateStr = dateObj.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
                const isActive = shop.subscription_status === 'active'

                return (
                  <tr key={shop.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-white">{shop.name}</div>
                      <div className="text-xs text-white/40">ID: {shop.id.substring(0, 8)}...</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white/70">/{shop.slug}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white/70">{dateStr}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full border ${isActive ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                        {isActive ? 'Activa' : 'Suspendida'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggle(shop.id, shop.subscription_status)}
                        disabled={loadingId === shop.id || deletingId === shop.id}
                        className={`inline-flex items-center justify-center px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                          isActive 
                            ? 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border border-amber-500/20' 
                            : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border border-emerald-500/20'
                        } disabled:opacity-50`}
                      >
                        {loadingId === shop.id ? 'Cambiando...' : (isActive ? 'Suspender' : 'Activar')}
                      </button>
                      <button
                        onClick={() => handleDelete(shop.id)}
                        disabled={loadingId === shop.id || deletingId === shop.id}
                        className="inline-flex items-center justify-center p-2 text-xs font-bold rounded-xl transition-all bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 disabled:opacity-50"
                        title="Eliminar barbería"
                      >
                        {deletingId === shop.id ? (
                          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        )}
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
