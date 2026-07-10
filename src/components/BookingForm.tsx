'use client'

import { useState, useEffect } from 'react'
import { createAppointment, getAvailableSlots } from '@/app/[slug]/actions'

type Service = { id: string; name: string; price: number; duration_minutes: number }
type Barber = { id: string; first_name: string; last_name: string }

export default function BookingForm({ 
  barbershopId, 
  services, 
  barbers 
}: { 
  barbershopId: string, 
  services: Service[], 
  barbers: Barber[] 
}) {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Selection state
  const [selectedService, setSelectedService] = useState<string>('')
  const [selectedBarber, setSelectedBarber] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  
  // Slots state
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [slotsFetched, setSlotsFetched] = useState(false)

  useEffect(() => {
    if (selectedService && selectedBarber && selectedDate) {
      const service = services.find(s => s.id === selectedService)
      if (service) {
        fetchSlots(selectedBarber, selectedDate, service.duration_minutes)
      }
    } else {
      setAvailableSlots([])
      setSelectedTime('')
      setSlotsFetched(false)
    }
  }, [selectedService, selectedBarber, selectedDate])

  async function fetchSlots(barberId: string, date: string, duration: number) {
    setLoadingSlots(true)
    setSelectedTime('')
    const result = await getAvailableSlots(barbershopId, barberId, date, duration)
    if (result.slots) {
      setAvailableSlots(result.slots)
      setSlotsFetched(true)
    }
    setLoadingSlots(false)
  }

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    formData.append('barbershop_id', barbershopId)
    formData.append('service_id', selectedService)
    formData.append('barber_id', selectedBarber)
    formData.append('date', selectedDate)
    formData.append('time', selectedTime)
    
    const result = await createAppointment(formData)
    
    if (result?.error) {
      setError(result.error)
    } else if (result?.success) {
      setSuccess(true)
    }
    setLoading(false)
  }

  if (success) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-emerald-500/10 mb-8 shadow-sm border border-emerald-500/20">
          <svg className="h-12 w-12 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-4xl font-bold text-white mb-4 tracking-tight font-playfair">¡Cita Confirmada!</h3>
        <p className="text-white/60 mb-10 text-lg">
          Tu reserva ha sido registrada exitosamente. Te esperamos en la barbería.
        </p>
        <button 
          onClick={() => {
            setSuccess(false)
            setSelectedTime('')
            setSelectedDate('')
          }}
          className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl text-black bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
        >
          Agendar otra cita
        </button>
      </div>
    )
  }

  return (
    <form action={handleSubmit} className="space-y-12 relative z-10">
      
      {/* 1. SELECCIÓN BÁSICA - CARDS */}
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-6 font-playfair flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gold-500/20 text-gold-400 text-sm">1</span>
            Elige tu Servicio
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map(s => (
              <div 
                key={s.id}
                onClick={() => setSelectedService(s.id)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                  selectedService === s.id 
                    ? 'bg-gold-500/10 border-gold-500/50 shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
                    : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className={`font-semibold ${selectedService === s.id ? 'text-gold-400' : 'text-white'}`}>{s.name}</h4>
                  <span className="text-white font-medium">${s.price}</span>
                </div>
                <div className="text-sm text-white/50 flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {s.duration_minutes} min
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-6 font-playfair flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gold-500/20 text-gold-400 text-sm">2</span>
            Elige tu Barbero
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {barbers.map(b => (
              <div 
                key={b.id}
                onClick={() => setSelectedBarber(b.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center gap-4 ${
                  selectedBarber === b.id 
                    ? 'bg-gold-500/10 border-gold-500/50 shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
                    : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border transition-colors ${selectedBarber === b.id ? 'bg-gold-500 text-black border-transparent' : 'bg-charcoal-800 text-white/70 border-white/10'}`}>
                  {b.first_name[0]}
                </div>
                <div className="font-medium text-white">
                  {b.first_name} {b.last_name !== '.' ? b.last_name : ''}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-6 font-playfair flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gold-500/20 text-gold-400 text-sm">3</span>
            Selecciona la Fecha
          </h3>
          <input 
            type="date" 
            required 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="block w-full max-w-md py-4 px-5 bg-white/5 text-white shadow-sm focus:ring-2 focus:ring-gold-500 focus:border-gold-500 text-base rounded-2xl border-white/10 transition-all cursor-pointer" 
          />
        </div>
      </div>

      {/* 2. SELECCIÓN DE HORA (DINÁMICA) */}
      <div className="space-y-6 pt-4 border-t border-white/10">
        <h3 className="text-xl font-bold text-white font-playfair flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gold-500/20 text-gold-400 text-sm">4</span>
          Horarios Disponibles
        </h3>
        
        {!selectedService || !selectedBarber || !selectedDate ? (
          <div className="bg-white/5 border border-dashed border-white/20 rounded-2xl p-8 text-center text-white/40">
            Selecciona servicio, barbero y fecha para ver los horarios.
          </div>
        ) : loadingSlots ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center text-white/60 flex flex-col items-center justify-center">
            <svg className="animate-spin h-8 w-8 text-gold-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p>Buscando la mejor hora para ti...</p>
          </div>
        ) : slotsFetched && availableSlots.length === 0 ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center text-red-300">
            <p className="font-medium">No hay horarios disponibles para esta fecha.</p>
            <p className="text-sm mt-2 opacity-80">Por favor, intenta con otro día u otro barbero.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {availableSlots.map(slot => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedTime(slot)}
                className={`py-3.5 px-2 text-center rounded-xl font-bold transition-all duration-300 ${
                  selectedTime === slot 
                    ? 'bg-gold-500 text-black shadow-[0_0_15px_rgba(212,175,55,0.4)] transform scale-105' 
                    : 'bg-white/5 border border-white/10 text-white/80 hover:border-gold-500/50 hover:bg-gold-500/10 hover:text-gold-400'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-white/10">
        <h3 className="text-xl font-bold text-white mb-6 font-playfair flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gold-500/20 text-gold-400 text-sm">5</span>
          Tus Datos
        </h3>
        <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">Nombre Completo</label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              required 
              placeholder="Ej. Juan Pérez"
              className="block w-full bg-white/5 text-white shadow-sm focus:ring-2 focus:ring-gold-500 focus:border-gold-500 text-base rounded-xl border-white/10 py-4 px-5 transition-all placeholder:text-white/30" 
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-white/70 mb-2">Teléfono (WhatsApp)</label>
            <input 
              type="tel" 
              name="phone" 
              id="phone" 
              required 
              placeholder="+123456789"
              className="block w-full bg-white/5 text-white shadow-sm focus:ring-2 focus:ring-gold-500 focus:border-gold-500 text-base rounded-xl border-white/10 py-4 px-5 transition-all placeholder:text-white/30" 
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-red-900/50 p-4 border border-red-500/30">
          <p className="text-sm font-medium text-red-200">{error}</p>
        </div>
      )}

      <div className="pt-8">
        <button
          type="submit"
          disabled={loading || !selectedTime || !selectedService || !selectedBarber || !selectedDate}
          className="w-full flex justify-center py-5 px-4 border border-transparent rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.15)] text-lg font-bold text-black bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 focus:ring-offset-charcoal-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] active:scale-[0.98]"
        >
          {loading ? 'Confirmando Reserva...' : 'Confirmar Reserva de Lujo'}
        </button>
        {(!selectedTime || !selectedService || !selectedBarber || !selectedDate) && (
          <p className="text-center text-sm text-white/30 mt-4 font-medium">
            Completa todos los pasos anteriores para habilitar el botón.
          </p>
        )}
      </div>
    </form>
  )
}
