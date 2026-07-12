'use client'

import { useState, useEffect } from 'react'

export default function PublicLinkSection({ slug }: { slug: string }) {
  const [origin, setOrigin] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  const fullUrl = origin ? `${origin}/${slug}` : `/${slug}`

  const handleCopy = () => {
    if (!origin) return
    navigator.clipboard.writeText(fullUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
      <code className="bg-black/50 px-4 py-3 rounded-xl text-gold-400 text-sm font-mono border border-white/10 w-full text-center sm:text-left overflow-x-auto whitespace-nowrap">
        {fullUrl}
      </code>
      <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full sm:w-auto mt-2 sm:mt-0">
        <button 
          onClick={handleCopy}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-white text-sm font-medium hover:bg-white/10 transition-colors border border-white/10"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copiado
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copiar Enlace
            </>
          )}
        </button>
        <a 
          href={`/${slug}`} 
          target="_blank"
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gold-500 text-black text-sm font-bold hover:bg-gold-400 transition-colors shadow-lg shadow-gold-500/20"
        >
          Ver Página
        </a>
      </div>
    </div>
  )
}
