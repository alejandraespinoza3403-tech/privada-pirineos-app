import { useState } from 'react'

export default function Residentes({ residentes, setResidentes }) {
  const [form, setForm] = useState({ nombre: '', vivienda: '', telefono: '' })

  function actualizar(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }))
  }

  function registrar(e) {
    e.preventDefault()
    if (!form.nombre || !form.vivienda) return
    setResidentes((prev) => [
      ...prev,
      { id: Date.now(), ...form, saldo: 1200, pagos: [] },
    ])
    setForm({ nombre: '', vivienda: '', telefono: '' })
  }

  function eliminar(id) {
    setResidentes((prev) => prev.filter((r) => r.id !== id))
  }

  return (
    <div>
      <h2 className="panel-title">Residentes y viviendas</h2>
      <p className="panel-sub">
        HU-1 · Registrar, consultar y eliminar residentes de la privada. Al
        registrarse, se asigna automáticamente la cuota de mantenimiento
        mensual ($1,200) como saldo pendiente.
      </p>

      <form className="card" onSubmit={registrar}>
        <div className="form-grid">
          <div>
            <label htmlFor="nombre">Nombre del residente</label>
            <input
              id="nombre"
              value={form.nombre}
              onChange={(e) => actualizar('nombre', e.target.value)}
              placeholder="Ej. Ana López"
            />
          </div>
          <div>
            <label htmlFor="vivienda">Número de vivienda</label>
            <input
              id="vivienda"
              value={form.vivienda}
              onChange={(e) => actualizar('vivienda', e.target.value)}
              placeholder="Ej. Casa 14"
            />
          </div>
        </div>
        <div className="form-grid full">
          <div>
            <label htmlFor="telefono">Teléfono de contacto</label>
            <input
              id="telefono"
              value={form.telefono}
              onChange={(e) => actualizar('telefono', e.target.value)}
              placeholder="Ej. 33 1234 5678"
            />
          </div>
        </div>
        <button type="submit" className="primary">Registrar residente</button>
      </form>

      <div className="card" style={{ padding: 0 }}>
        {residentes.length === 0 ? (
          <div className="empty-state">Aún no hay residentes registrados.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Residente</th>
                <th>Vivienda</th>
                <th>Teléfono</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {residentes.map((r) => (
                <tr key={r.id}>
                  <td>{r.nombre}</td>
                  <td>{r.vivienda}</td>
                  <td>{r.telefono || '—'}</td>
                  <td>
                    <button className="ghost" onClick={() => eliminar(r.id)}>
                      Eliminar
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
