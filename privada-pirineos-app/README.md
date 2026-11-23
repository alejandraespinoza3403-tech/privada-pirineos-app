# Sistema de Pagos y Control de Accesos - Privada Pirineos

Proyecto desarrollado para la materia Proyecto 2, como parte de la aplicación de la metodología ágil Scrum al proyecto "Sistema Web para la Administración de Pagos y Control de Accesos en la Privada Pirineos".

Tablero de seguimiento (Trello): https://trello.com/b/ezYnRlsO/proyecto-privada-pirineos

## Historias de usuario implementadas

| # | Historia de usuario | Módulo en la app | Sprint |
|---|---|---|---|
| HU-1 | Registrar residentes y viviendas | Pestaña "Residentes" | 1 |
| HU-2 | Consultar estado de cuenta y adeudos | Pestaña "Estado de cuenta" | 1 |
| HU-3 | Registrar pagos de mantenimiento | Pestaña "Pagos" | 1 |
| HU-4 | Administrar controles de acceso vehicular | Pestaña "Accesos" | 1 |
| HU-5 | Notificaciones a residentes (versión simulada) | Pestaña "Notificaciones" | 2 |
| HU-6 | Consulta de accesos registrados (datos simulados) | Pestaña "Consulta de accesos" | 2 |
| HU-7 | Reportes de pagos y adeudos (datos simulados) | Pestaña "Reportes" | Cierre |
| HU-8 | Avisos generales de la privada (versión simulada) | Pestaña "Avisos generales" | Cierre |

Al registrar un residente se le asigna una cuota de mantenimiento pendiente ($1,200). Al registrar un pago desde el módulo de Pagos, el saldo se actualiza y se refleja en su estado de cuenta.

## Sprint 2

- **HU-5:** el administrador elige destinatarios y tipo de notificación (recordatorio, cuota vencida o confirmación de pago) y el envío queda en un historial. No se envían correos, SMS ni notificaciones push reales.
- **HU-6:** tabla de accesos vehiculares con filtros por vivienda o placas, resultado y tipo. Usa datos de ejemplo.

## Sprint de cierre

- **HU-7:** pestaña "Reportes" con resumen de lo cobrado, adeudo total y viviendas con adeudo, y listado de cuotas por vivienda y mes con filtros por mes, vivienda y estado. Usa datos de ejemplo.
- **HU-8:** pestaña "Avisos generales" para publicar avisos por tipo, con título, mensaje y fecha de vigencia. El listado muestra si cada aviso está vigente o vencido y permite retirarlo. No se envían notificaciones reales.

## Pendientes (mejoras sugeridas)

- Bloqueo de acceso por cuotas atrasadas.
- Comprobantes de pago en PDF.

## Cómo ejecutarlo localmente

```bash
npm install
npm run dev
```

Esto levanta la aplicación en http://localhost:5173.

## Tecnologías

- React 18
- Vite

## Relación con el Product Backlog y el Sprint Backlog

El detalle del Product Backlog, las fichas de backlog y la calendarización de los Sprint se encuentran en el documento entregado junto con este repositorio y en el tablero de Trello.
