import { useState } from 'react'
import './Cierre.css'

const TIPOS = ['General', 'Mantenimiento', 'Seguridad']

const hoy = () => new Date().toISOString().slice(0, 10)

const AVISOS_INICIALES = [
  {
    id: 1,
    tipo: 'Mantenimiento',
    titulo: 'Corte de agua programado',
    mensaje: 'Se suspenderá el servicio de agua el sábado de 9:00 a 13:00 h por mantenimiento de la cisterna.',
    publicado: '2026-11-18',
    vigencia: '2026-12-20',
  },
  {
    id: 2,
    tipo: 'General',
    titulo: 'Asamblea de residentes',
    mensaje: 'Se invita a la asamblea mensual en el salón de usos múltiples.',
    publicado: '2026-11-02',
    vigencia: '2026-11-10',
  },
]

const formato = (iso) => {
  const [a, m, d] = iso.split('-')
  return d + '/' + m + '/' + a
}

export default function AvisosGenerales() {
  const [avisos, setAvisos] = useState(AVISOS_INICIALES)
  const [tipo, setTipo] = useState(TIPOS[0])
  const [titulo, setTitulo] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [vigencia, setVigencia] = useState('')
  const [error, setError] = useState('')
  const [ok, setOk] = useState('')
  const [soloVigentes, setSoloVigentes] = useState(true)

  function publicar(e) {
    e.preventDefault()
    setOk('')
    if (titulo.trim().length < 4 || mensaje.trim().length < 10) {
      setError('Escribe un título (mínimo 4 caracteres) y un mensaje (mínimo 10).')
      return
    }
    if (!vigencia || vigencia < hoy()) {
      setError('Elige una fecha de vigencia de hoy en adelante.')
      return
    }
    setError('')
    const nuevo = {
      id: Date.now(),
      tipo,
      titulo: titulo.trim(),
      mensaje: mensaje.trim(),
      publicado: hoy(),
      vigencia,
    }
    setAvisos([nuevo, ...avisos])
    setTitulo('')
    setMensaje('')
    setVigencia('')
    setOk('Aviso publicado para todos los residentes.')
  }

  function retirar(id) {
    setAvisos(avisos.filter((a) => a.id !== id))
  }

  const visibles = avisos.filter((a) => !soloVigentes || a.vigencia >= hoy())

  return (
    <section className="cr-seccion">
      <h2 className="cr-titulo">Avisos generales</h2>

      <form className="cr-form" onSubmit={publicar}>
        <label className="cr-label">
          Tipo de aviso
          <select className="cr-input" value={tipo} onChange={(e) => setTipo(e.target.value)}>
            {TIPOS.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="cr-label">
          Título
          <input className="cr-input" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ej. Limpieza de áreas comunes" />
        </label>
        <label className="cr-label">
          Mensaje
          <textarea className="cr-input" rows="3" value={mensaje} onChange={(e) => setMensaje(e.target.value)} placeholder="Escribe el aviso para los residentes" />
        </label>
        <label className="cr-label">
          Vigente hasta
          <input type="date" className="cr-input" min={hoy()} value={vigencia} onChange={(e) => setVigencia(e.target.value)} />
        </label>

        {error && <p className="cr-error">{error}</p>}
        {ok && <p className="cr-ok">{ok}</p>}

        <button type="submit" className="cr-boton">Publicar aviso</button>
      </form>

      <div className="cr-fila">
        <h3 className="cr-subtitulo">Avisos publicados</h3>
        <button type="button" className="cr-boton-sec" onClick={() => setSoloVigentes(!soloVigentes)}>
          {soloVigentes ? 'Ver también vencidos' : 'Ver solo vigentes'}
        </button>
      </div>

      {visibles.length === 0 && <p className="cr-meta">No hay avisos para mostrar.</p>}

      <ul className="cr-lista">
        {visibles.map((a) => {
          const vigente = a.vigencia >= hoy()
          return (
            <li key={a.id} className="cr-card">
              <div className="cr-fila">
                <strong>{a.titulo}</strong>
                <span className={vigente ? 'cr-insignia cr-verde' : 'cr-insignia cr-gris'}>
                  {vigente ? 'Vigente' : 'Vencido'}
                </span>
              </div>
              <p className="cr-meta">{a.tipo} · Publicado {formato(a.publicado)} · Hasta {formato(a.vigencia)}</p>
              <p>{a.mensaje}</p>
              <button type="button" className="cr-boton-sec" onClick={() => retirar(a.id)}>Retirar aviso</button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
