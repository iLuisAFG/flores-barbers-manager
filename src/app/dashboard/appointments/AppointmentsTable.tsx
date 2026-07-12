'use client'

import { useState } from 'react'
import AppointmentActions from './AppointmentActions'
import { deleteAppointments } from '../actions'

export default function AppointmentsTable({ appointments }: { appointments: any[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isDeleting, setIsDeleting] = useState(false)

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(appointments.map(apt => apt.id))
    } else {
      setSelectedIds([])
    }
  }

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id])
    } else {
      setSelectedIds(prev => prev.filter(selectedId => selectedId !== id))
    }
  }

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return

    if (window.confirm(`¿Estás seguro de que deseas eliminar ${selectedIds.length} cita(s)? Esta acción no se puede deshacer.`)) {
      setIsDeleting(true)
      const result = await deleteAppointments(selectedIds)
      
      if (result?.success) {
        setSelectedIds([]) // Clear selection on success
      } else {
        alert(result?.error || 'Ocurrió un error al eliminar las citas.')
      }
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-4">
      {selectedIds.length > 0 && (
        <div className="flex justify-end animate-fade-in">
          <button
            onClick={handleDeleteSelected}
            disabled={isDeleting}
            className="flex items-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            {isDeleting ? 'Eliminando...' : `Eliminar seleccionadas (${selectedIds.length})`}
          </button>
        </div>
      )}

      <div className="bg-charcoal-900/50 backdrop-blur-md rounded-3xl shadow-xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/5">
            <thead className="bg-white/[0.01]">
              <tr>
                <th scope="col" className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    className="rounded border-white/10 bg-white/5 text-gold-500 focus:ring-gold-500/50 focus:ring-offset-charcoal-900 cursor-pointer"
                    checked={appointments.length > 0 && selectedIds.length === appointments.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">
                  Cliente
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">
                  Fecha y Hora
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">
                  Servicio
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">
                  Barbero
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="relative px-6 py-4">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-transparent">
              {!appointments || appointments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-sm text-white/40">
                    Aún no tienes citas registradas.
                  </td>
                </tr>
              ) : (
                appointments.map((apt: any) => {
                  const dateObj = new Date(apt.start_time)
                  const dateStr = dateObj.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
                  const timeStr = dateObj.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
                  
                  return (
                    <tr 
                      key={apt.id} 
                      className={`transition-colors ${selectedIds.includes(apt.id) ? 'bg-gold-500/5' : 'hover:bg-white/[0.02]'}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="rounded border-white/10 bg-white/5 text-gold-500 focus:ring-gold-500/50 focus:ring-offset-charcoal-900 cursor-pointer"
                          checked={selectedIds.includes(apt.id)}
                          onChange={(e) => handleSelectOne(apt.id, e.target.checked)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">
                          {apt.clients?.first_name} {apt.clients?.last_name !== '.' ? apt.clients?.last_name : ''}
                        </div>
                        <div className="text-sm text-white/40">{apt.clients?.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white font-medium capitalize">{dateStr}</div>
                        <div className="text-sm text-gold-400">{timeStr}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">{apt.services?.name}</div>
                        <div className="text-sm text-emerald-400">${apt.services?.price}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white/70">
                          {apt.barbers?.first_name} {apt.barbers?.last_name !== '.' ? apt.barbers?.last_name : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <AppointmentStatusBadge status={apt.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <AppointmentActions appointmentId={apt.id} currentStatus={apt.status} />
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function AppointmentStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    scheduled: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
    no_show: "bg-gray-500/10 text-gray-400 border-gray-500/20"
  }
  
  const labels: Record<string, string> = {
    pending: "Pendiente",
    scheduled: "Confirmada",
    completed: "Completada",
    cancelled: "Cancelada",
    no_show: "No asistió"
  }

  return (
    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full border ${styles[status] || styles.pending}`}>
      {labels[status] || status}
    </span>
  )
}
