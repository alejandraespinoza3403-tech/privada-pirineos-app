import { useState } from 'react'
import './Cierre.css'

const CUOTA = 800
const MESES = ['Septiembre 2026', 'Octubre 2026', 'Noviembre 2026']
const VIVIENDAS = ['Casa 1', 'Casa 2', 'Casa 3', 'Casa 4', 'Casa 5', 'Casa 6']

// Datos simulados: pagado = true indica cuota cubierta en ese mes
const PAGOS = {
  'Septiembre 2026': [true, true, true, true, true, false],
  'Octubre 2026': [true, true, false, true, true, false],
  'Noviembre 2026': [true, false, false, true, false, false],
}

const REGISTROS = MESES.flatMap((mes) =>
  VIVIENDAS.map((vivienda, i) => ({
    id: mes + vivienda,
    mes,
    vivienda,
    monto: CUOTA,
    estado: PAGOS[mes][i] ? 'Pagado' : 'Adeudo',
  }))
)

const dinero = (n) => '$' + n.toLocaleString('es-MX')

export default function ReportesPagos() {
  const [mes, setMes] = useState('Todos')
  const [vivienda, setVivienda] = useState('Todas')
  const [estado, setEstado] = useState('Todos')

  const filas = REGISTROS.filter(
    (r) =>
      (mes === 'Todos' || r.mes === mes) &&
      (vivienda === 'Todas' || r.vivienda === vivienda) &&
      (estado === 'Todos' || r.estado === estado)
  )

  const cobrado = filas.filter((r) => r.estado === 'Pagado').reduce((s, r) => s + r.monto, 0)
  const adeudo = filas.filter((r) => r.estado === 'Adeudo').reduce((s, r) => s + r.monto, 0)
  const conAdeudo = new Set(filas.filter((r) => r.estado === 'Adeudo').map((r) => r.vivienda)).size

  function limpiar() {
    setMes('Todos')
    setVivienda('Todas')
    setEstado('Todos')
  }

  return (
    <section className="cr-seccion">
      <h2 className="cr-titulo">Reportes de pagos y adeudos</h2>

      <div className="cr-filtros">
        <label className="cr-label">
          Mes
          <select className="cr-input" value={mes} onChange={(e) => setMes(e.target.value)}>
            <option>Todos</option>
            {MESES.map((m) => <option key={m}>{m}</option>)}
          </select>
        </label>
        <label className="cr-label">
          Vivienda
          <select className="cr-input" value={vivienda} onChange={(e) => setVivienda(e.target.value)}>
            <option>Todas</option>
            {VIVIENDAS.map((v) => <option key={v}>{v}</option>)}
          </select>
        </label>
        <label className="cr-label">
          Estado
          <select className="cr-input" value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option>Todos</option>
            <option>Pagado</option>
            <option>Adeudo</option>
          </select>
        </label>
        <button type="button" className="cr-boton-sec" onClick={limpiar}>Limpiar filtros</button>
      </div>

      <div className="cr-resumen">
        <div className="cr-dato cr-dato-verde">
          <span>Cobrado</span>
          <strong>{dinero(cobrado)}</strong>
        </div>
        <div className="cr-dato cr-dato-rojo">
          <span>Adeudo</span>
          <strong>{dinero(adeudo)}</strong>
        </div>
        <div className="cr-dato">
          <span>Viviendas con adeudo</span>
          <strong>{conAdeudo}</strong>
        </div>
      </div>

      {filas.length === 0 && <p className="cr-meta">No hay registros con esos filtros.</p>}

      <ul className="cr-lista">
        {filas.map((r) => (
          <li key={r.id} className="cr-card">
            <div className="cr-fila">
              <strong>{r.vivienda}</strong>
              <span className={r.estado === 'Pagado' ? 'cr-insignia cr-verde' : 'cr-insignia cr-rojo'}>
                {r.estado}
              </span>
            </div>
            <p className="cr-meta">{r.mes} · Cuota de mantenimiento {dinero(r.monto)}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
