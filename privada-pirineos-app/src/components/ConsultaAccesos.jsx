import { useState } from "react";
import "./Sprint3.css";

// HU-6 - Consulta de accesos registrados (datos SIMULADOS).
// Prop opcional: accesos = [{ id, fecha, hora, vivienda, placas, tipo, resultado }]
const ACCESOS_DEMO = [
  { id: 1, fecha: "2026-10-19", hora: "07:42", vivienda: "Casa 3", placas: "JKL-123-A", tipo: "Residente", resultado: "Permitido" },
  { id: 2, fecha: "2026-10-19", hora: "09:15", vivienda: "Casa 12", placas: "MNP-456-B", tipo: "Residente", resultado: "Denegado" },
  { id: 3, fecha: "2026-10-19", hora: "11:30", vivienda: "Casa 8", placas: "RST-789-C", tipo: "Visita", resultado: "Permitido" },
  { id: 4, fecha: "2026-10-20", hora: "08:05", vivienda: "Casa 15", placas: "UVW-321-D", tipo: "Residente", resultado: "Permitido" },
  { id: 5, fecha: "2026-10-20", hora: "13:50", vivienda: "Casa 3", placas: "XYZ-654-E", tipo: "Proveedor", resultado: "Permitido" },
  { id: 6, fecha: "2026-10-21", hora: "06:58", vivienda: "Casa 12", placas: "MNP-456-B", tipo: "Residente", resultado: "Denegado" },
];

export default function ConsultaAccesos({ accesos = ACCESOS_DEMO }) {
  const [busqueda, setBusqueda] = useState("");
  const [resultado, setResultado] = useState("todos");
  const [tipo, setTipo] = useState("todos");

  const texto = busqueda.trim().toLowerCase();
  const filtrados = accesos.filter((a) => {
    const coincideTexto =
      texto === "" ||
      a.placas.toLowerCase().includes(texto) ||
      a.vivienda.toLowerCase().includes(texto);
    const coincideResultado = resultado === "todos" || a.resultado === resultado;
    const coincideTipo = tipo === "todos" || a.tipo === tipo;
    return coincideTexto && coincideResultado && coincideTipo;
  });

  const limpiar = () => {
    setBusqueda("");
    setResultado("todos");
    setTipo("todos");
  };

  return (
    <section className="p3-card">
      <h2>Accesos registrados</h2>

      <div className="p3-filtros">
        <label>Buscar por vivienda o placas
          <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Casa 12 o MNP-456-B" />
        </label>
        <label>Resultado
          <select value={resultado} onChange={(e) => setResultado(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="Permitido">Permitido</option>
            <option value="Denegado">Denegado</option>
          </select>
        </label>
        <label>Tipo
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="Residente">Residente</option>
            <option value="Visita">Visita</option>
            <option value="Proveedor">Proveedor</option>
          </select>
        </label>
        <button type="button" onClick={limpiar}>Limpiar filtros</button>
      </div>

      <p>Mostrando {filtrados.length} de {accesos.length} accesos.</p>

      {filtrados.length === 0 ? (
        <p>No hay accesos que coincidan con los filtros.</p>
      ) : (
        <div className="p3-tabla-scroll">
          <table className="p3-tabla">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Vivienda</th>
                <th>Placas</th>
                <th>Tipo</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((a) => (
                <tr key={a.id}>
                  <td>{a.fecha}</td>
                  <td>{a.hora}</td>
                  <td>{a.vivienda}</td>
                  <td>{a.placas}</td>
                  <td>{a.tipo}</td>
                  <td className={a.resultado === "Denegado" ? "p3-denegado" : "p3-permitido"}>{a.resultado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="p3-nota">Datos simulados. En una fase posterior se leerán del registro real de la caseta.</p>
    </section>
  );
}
