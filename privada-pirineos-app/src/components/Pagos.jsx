import { useState } from 'react'

export default function Pagos({ residentes, setResidentes }) {
  const [residenteId, setResidenteId] = useState('')
  const [monto, setMonto] = useState('')
  const [concepto, setConcepto] = useState('Mantenimiento mensual')

  function registrarPago(e) {
    e.preventDefault()
    if (!residenteId || !monto) return

    const hoy = new Date().toLocaleDateString('es-MX')
    setResidentes((prev) =>
      prev.map((r) =>
        String(r.id) === residenteId
          ? {
              ...r,
              saldo: Math.max(0, r.saldo - Number(monto)),
              pagos: [...r.pagos, { fecha: hoy, concepto, monto: Number(monto) }],
            }
          : r
      )
    )
    setMonto('')
  }

  return (
    <div>
      <h2 className="panel-title">Registro de pagos</h2>
      <p className="panel-sub">
        HU-3 · El administrador registra pagos y el saldo del residente se
        actualiza automáticamente.
      </p>

      <form className="card" onSubmit={registrarPago}>
        <div className="form-grid">
          <div>
            <label htmlFor="residentePago">Residente</label>
            <select
              id="residentePago"
              value={residenteId}
              onChange={(e) => setResidenteId(e.target.value)}
            >
              <option value="">— Elegir —</option>
              {residentes.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.nombre} ({r.vivienda}) · debe ${r.saldo}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="monto">Monto pagado</label>
            <input
              id="monto"
              type="number"
              min="0"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="Ej. 1200"
            />
          </div>
        </div>
        <div className="form-grid full">
          <div>
            <label htmlFor="concepto">Concepto</label>
            <input
              id="concepto"
              value={concepto}
              onChange={(e) => setConcepto(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="primary">Registrar pago</button>
      </form>

      <div className="card" style={{ padding: 0 }}>
        {residentes.length === 0 ? (
          <div className="empty-state">Registra residentes primero para poder capturar pagos.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Residente</th>
                <th>Vivienda</th>
                <th>Saldo pendiente</th>
              </tr>
            </thead>
            <tbody>
              {residentes.map((r) => (
                <tr key={r.id}>
                  <td>{r.nombre}</td>
                  <td>{r.vivienda}</td>
                  <td>
                    <span className={`tag ${r.saldo > 0 ? 'adeudo' : 'al-dia'}`}>
                      ${r.saldo.toLocaleString('es-MX')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
