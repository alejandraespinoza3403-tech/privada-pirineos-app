import { useState } from 'react'
import Residentes from './components/Residentes.jsx'
import EstadoCuenta from './components/EstadoCuenta.jsx'
import Pagos from './components/Pagos.jsx'
import Accesos from './components/Accesos.jsx'
import NotificacionesResidentes from './components/NotificacionesResidentes.jsx'
import ConsultaAccesos from './components/ConsultaAccesos.jsx'
import ReportesPagos from './components/ReportesPagos.jsx'
import AvisosGenerales from './components/AvisosGenerales.jsx'

const TABS = [
  { id: 'residentes', label: 'Residentes (HU-1)' },
  { id: 'cuenta', label: 'Estado de cuenta (HU-2)' },
  { id: 'pagos', label: 'Pagos (HU-3)' },
  { id: 'accesos', label: 'Accesos (HU-4)' },
  { id: 'notificaciones', label: 'Notificaciones (HU-5)' },
  { id: 'consulta', label: 'Consulta de accesos (HU-6)' },
  { id: 'reportes', label: 'Reportes (HU-7)' },
  { id: 'avisos', label: 'Avisos generales (HU-8)' },
]

export default function App() {
  const [tab, setTab] = useState('residentes')
  const [residentes, setResidentes] = useState([])
  const [accesos, setAccesos] = useState([])

  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="app-header__eyebrow">Sprints 1, 2 y de cierre · Proyecto Privada Pirineos</p>
        <h1>Sistema de pagos y control de accesos</h1>
        <p>
          Demostración funcional de las historias de usuario del Product
          Backlog: registro de residentes, estado de cuenta, pagos de
          mantenimiento, controles de acceso vehicular, notificaciones a
          residentes, consulta de accesos registrados, reportes de pagos y
          adeudos, y avisos generales de la privada.
        </p>
      </header>

      <nav className="tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`tab ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="content">
        {tab === 'residentes' && (
          <Residentes residentes={residentes} setResidentes={setResidentes} />
        )}
        {tab === 'cuenta' && <EstadoCuenta residentes={residentes} />}
        {tab === 'pagos' && (
          <Pagos residentes={residentes} setResidentes={setResidentes} />
        )}
        {tab === 'accesos' && (
          <Accesos
            residentes={residentes}
            accesos={accesos}
            setAccesos={setAccesos}
          />
        )}
        {tab === 'notificaciones' && <NotificacionesResidentes />}
        {tab === 'consulta' && <ConsultaAccesos />}
        {tab === 'reportes' && <ReportesPagos />}
        {tab === 'avisos' && <AvisosGenerales />}
      </main>
    </div>
  )
}
