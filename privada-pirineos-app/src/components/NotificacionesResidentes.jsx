import { useState } from "react";
import "./Sprint3.css";

// HU-5 - Notificaciones a residentes (SIMULADAS, sin correo, SMS ni push reales).
// Props opcionales: residentes = [{ vivienda, nombre, adeudo }]
const RESIDENTES_DEMO = [
  { vivienda: "Casa 3", nombre: "Familia Torres", adeudo: 1200 },
  { vivienda: "Casa 8", nombre: "Familia Ramírez", adeudo: 0 },
  { vivienda: "Casa 12", nombre: "Familia Núñez", adeudo: 2400 },
  { vivienda: "Casa 15", nombre: "Familia Ortega", adeudo: 1200 },
];

const PLANTILLAS = {
  recordatorio: "Le recordamos que su cuota de mantenimiento vence próximamente. Puede registrar su pago en la pestaña Pagos.",
  vencida: "Su cuota de mantenimiento se encuentra vencida. Le pedimos regularizar su pago para evitar el bloqueo de acceso vehicular.",
  confirmacion: "Hemos registrado su pago de mantenimiento. Gracias por mantener su cuenta al corriente.",
};

const ETIQUETAS = {
  recordatorio: "Recordatorio de pago",
  vencida: "Cuota vencida",
  confirmacion: "Confirmación de pago",
};

export default function NotificacionesResidentes({ residentes = RESIDENTES_DEMO }) {
  const [destino, setDestino] = useState("todos-adeudo");
  const [tipo, setTipo] = useState("recordatorio");
  const [mensaje, setMensaje] = useState(PLANTILLAS.recordatorio);
  const [historial, setHistorial] = useState([]);
  const [error, setError] = useState("");

  const cambiarTipo = (e) => {
    setTipo(e.target.value);
    setMensaje(PLANTILLAS[e.target.value]);
  };

  const obtenerDestinatarios = () => {
    if (destino === "todos") return residentes;
    if (destino === "todos-adeudo") return residentes.filter((r) => r.adeudo > 0);
    return residentes.filter((r) => r.vivienda === destino);
  };

  const enviar = (e) => {
    e.preventDefault();
    const destinatarios = obtenerDestinatarios();
    if (!mensaje.trim()) {
      setError("Escribe el mensaje que recibirán los residentes.");
      return;
    }
    if (destinatarios.length === 0) {
      setError("No hay residentes que cumplan con el destino elegido.");
      return;
    }
    setError("");
    const envio = {
      id: Date.now(),
      tipo: ETIQUETAS[tipo],
      mensaje: mensaje.trim(),
      destinatarios: destinatarios.map((d) => d.vivienda),
      fecha: new Date().toLocaleString("es-MX"),
    };
    setHistorial([envio, ...historial]);
  };

  return (
    <div className="p3-grid">
      <section className="p3-card">
        <h2>Notificar a residentes</h2>
        <form onSubmit={enviar} className="p3-form">
          <label>Destinatarios
            <select value={destino} onChange={(e) => setDestino(e.target.value)}>
              <option value="todos-adeudo">Residentes con adeudo</option>
              <option value="todos">Todos los residentes</option>
              {residentes.map((r) => (
                <option key={r.vivienda} value={r.vivienda}>{r.vivienda} - {r.nombre}</option>
              ))}
            </select>
          </label>
          <label>Tipo de notificación
            <select value={tipo} onChange={cambiarTipo}>
              {Object.entries(ETIQUETAS).map(([clave, texto]) => (
                <option key={clave} value={clave}>{texto}</option>
              ))}
            </select>
          </label>
          <label>Mensaje
            <textarea rows={4} value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
          </label>
          {error && <p className="p3-error" role="alert">{error}</p>}
          <button type="submit">Enviar notificación</button>
        </form>
        <p className="p3-nota">Envío simulado: la notificación solo se registra en el historial de esta pantalla.</p>
      </section>

      <section className="p3-card">
        <h2>Historial de envíos ({historial.length})</h2>
        {historial.length === 0 && <p>Aún no se han enviado notificaciones.</p>}
        <ul className="p3-lista">
          {historial.map((h) => (
            <li key={h.id}>
              <strong>{h.tipo}</strong>
              <p>{h.mensaje}</p>
              <small>Para: {h.destinatarios.join(", ")} · {h.fecha}</small>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
