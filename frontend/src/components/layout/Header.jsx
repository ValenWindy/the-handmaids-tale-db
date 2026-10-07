import { Link, NavLink } from 'react-router-dom'
import LanguageToggle from './LanguageToggle.jsx'
import useLanguage from '../../hooks/useLanguage.js'

const linkClass = ({ isActive }) =>
  `text-sm uppercase tracking-[0.2em] transition-colors ${
    isActive ? 'text-gilead-bright' : 'text-muted hover:text-bone'
  }`

export default function Header() {
  const { t } = useLanguage()

  return (
    <header className="border-b border-line">
      <div className="mx-auto flex min-h-16 max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
        <Link to="/" className="font-display text-lg tracking-wide sm:text-xl">
          The Handmaid's Tale <span className="text-gilead-bright">·</span> Database
        </Link>
        <div className="flex items-center gap-6">
          <nav className="flex gap-6">
            <NavLink to="/" end className={linkClass}>{t('nav.home')}</NavLink>
            <NavLink to="/characters" className={linkClass}>{t('nav.characters')}</NavLink>
          </nav>
          <LanguageToggle />
        </div>
      </div>
    </header>
  )
}
