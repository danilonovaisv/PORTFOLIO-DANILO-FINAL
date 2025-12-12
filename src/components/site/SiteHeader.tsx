'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

type NavItem = {
  label: 'home' | 'sobre' | 'portfolio showcase' | 'contato'
  href: string
  ariaLabel: string
}

const navItems: NavItem[] = [
  { label: 'home', href: '/#hero', ariaLabel: 'Ir para Home' },
  { label: 'sobre', href: '/sobre', ariaLabel: 'Ir para página Sobre' },
  {
    label: 'portfolio showcase',
    href: '/portfolio',
    ariaLabel: 'Ir para página Portfolio Showcase',
  },
  { label: 'contato', href: '/#contact', ariaLabel: 'Ir para Contato' },
]

export default function SiteHeader() {
  const pathname = usePathname()
  const [isCondensed, setIsCondensed] = useState(false)

  const isHome = pathname === '/' || pathname === ''

  useEffect(() => {
    const onScroll = () => setIsCondensed(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const headerClassName = useMemo(() => {
    const base =
      'fixed top-0 left-0 right-0 z-50 border-b border-black/5 transition-all'
    const padding = isCondensed ? 'py-2 px-4' : 'py-4 px-4'
    const bg = isCondensed ? 'bg-white/95 backdrop-blur' : 'bg-white'
    return `${base} ${padding} ${bg}`
  }, [isCondensed])

  const handleAnchorNav = (href: string) => (e: React.MouseEvent) => {
    // mantém comportamento de âncora suave apenas quando estiver na Home
    if (!isHome) return

    const hashIndex = href.indexOf('#')
    if (hashIndex === -1) return

    const id = href.slice(hashIndex + 1)
    const el = document.getElementById(id)
    if (!el) return

    e.preventDefault()
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <motion.header
      className={headerClassName}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" aria-label="Voltar para Home" className="flex items-center gap-3">
          {/* Logo Light */}
          <img
            src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon-02.svg"
            alt="Danilo"
            className="h-9 w-auto"
            onError={(e) => {
              const img = e.currentTarget
              img.style.display = 'none'
            }}
          />
          <span className="sr-only">Danilo Novais</span>
          <span className="hidden text-base font-medium text-gray-700 md:inline">
            Danilo Novais
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden md:block">
          <ul className="flex items-center space-x-6">
            {navItems.map((item) => {
              const isActive =
                (item.href === '/#hero' && isHome) ||
                (item.href === '/sobre' && pathname === '/sobre') ||
                (item.href === '/portfolio' && pathname === '/portfolio')

              return (
                <li key={item.label} className="relative">
                  <Link
                    href={item.href}
                    aria-label={item.ariaLabel}
                    onClick={handleAnchorNav(item.href)}
                    className={[
                      'relative inline-flex items-center text-base font-normal transition-colors',
                      isActive ? 'text-[#0057FF]' : 'text-gray-700 hover:text-[#0057FF]',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-white',
                    ].join(' ')}
                    data-event="header_nav_click"
                    data-label={item.label}
                    data-destination={item.href}
                  >
                    {item.label}
                    <motion.span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-[#0057FF]"
                      initial={{ scaleX: isActive ? 1 : 0 }}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </motion.header>
  )
}
