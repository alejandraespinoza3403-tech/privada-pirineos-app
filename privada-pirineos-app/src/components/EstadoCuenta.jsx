import { useState } from 'react'

export default function EstadoCuenta({ residentes }) {
  const [seleccionadoId, setSeleccionadoId] = useState('')

  const residente = residentes.find((r) => String(r.id) === seleccionadoId)

  return (
    <div>
      <h2 className="panel-title">Estado de cuenta</h2>
      <p className="panel-sub">
        HU-2 · El residente consulta su saldo, historial de pagos y adeudos.
      </p>

      <div className="card">
        <label htmlFor="residente">Selecciona un residente</label>
        <select
          id="residente"
          value={seleccionadoId}
          onChange={(e) => setSeleccionadoId(e.target.value)}
        >
          <option value="">— Elegir —</option>
          {residentes.map((r) => (
            <option key={r.id} value={r.id}>
              {r.nombre} ({r.vivienda})
            </option>
          ))}
        </select>
      </div>

      {residente ? (
        <>
          <div className="saldo-box">
            <div className="metric">
              <div className="label">Saldo actual</div>
              <div className="value">${residente.saldo.toLocaleString('es-MX')}</div>
            </div>
            <div className="metric">
              <div className="label">Estado</div>
              <div className="value">
                <span className={`tag ${residente.saldo > 0 ? 'adeudo' : 'al-dia'}`}>
                  {residente.saldo > 0 ? 'Con adeudo' : 'Al día'}
                </span>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 0 }}>
            {residente.pagos.length === 0 ? (
              <div className="empty-state">Sin pagos registrados todavía.</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Concepto</th>
                    <th>Monto</th>
                  </tr>
                </thead>
                <tbody>
                  {residente.pagos.map((p, i) => (
                    <tr key={i}>
                      <td>{p.fecha}</td>
                      <td>{p.concepto}</td>
                      <td>${p.monto.toLocaleString('es-MX')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      ) : (
        <div className="empty-state">Selecciona un residente para ver su estado de cuenta.</div>
      )}
    </div>
  )
}
