import { useState } from 'react'

export default function Accesos({ residentes, accesos, setAccesos }) {
  const [residenteId, setResidenteId] = useState('')
  const [codigo, setCodigo] = useState('')

  function asignar(e) {
    e.preventDefault()
    if (!residenteId || !codigo) return
    setAccesos((prev) => [
      ...prev,
      { id: Date.now(), residenteId, codigo, activo: true },
    ])
    setCodigo('')
  }

  function alternar(id) {
    setAccesos((prev) =>
      prev.map((a) => (a.id === id ? { ...a, activo: !a.activo } : a))
    )
  }

  function nombreDe(residenteId) {
    const r = residentes.find((r) => String(r.id) === String(residenteId))
    return r ? `${r.nombre} (${r.vivienda})` : 'Residente eliminado'
  }

  return (
    <div>
      <h2 className="panel-title">Controles de acceso</h2>
      <p className="panel-sub">
        HU-4 · Asignar, consultar y desactivar controles vehiculares por vivienda.
      </p>

      <form className="card" onSubmit={asignar}>
        <div className="form-grid">
          <div>
            <label htmlFor="residenteAcceso">Residente</label>
            <select
              id="residenteAcceso"
              value={residenteId}
              onChange={(e) => setResidenteId(e.target.value)}
            >
              <option value="">— Elegir —</option>
              {residentes.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.nombre} ({r.vivienda})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="codigo">Código del control</label>
            <input
              id="codigo"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="Ej. CTRL-014"
            />
          </div>
        </div>
        <button type="submit" className="primary">Asignar control</button>
      </form>

      <div className="card" style={{ padding: 0 }}>
        {accesos.length === 0 ? (
          <div className="empty-state">Aún no hay controles asignados.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Residente</th>
                <th>Código</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {accesos.map((a) => (
                <tr key={a.id}>
                  <td>{nombreDe(a.residenteId)}</td>
                  <td>{a.codigo}</td>
                  <td>
                    <span className={`tag ${a.activo ? 'activo' : 'inactivo'}`}>
                      {a.activo ? 'Activo' : 'Desactivado'}
                    </span>
                  </td>
                  <td>
                    <button className="ghost" onClick={() => alternar(a.id)}>
                      {a.activo ? 'Desactivar' : 'Reactivar'}
                    </button>
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
