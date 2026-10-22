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
| HU-5 | Notificaciones a residentes (versión simulada) | Pestaña "Notificaciones" | 3 |
| HU-6 | Consulta de accesos registrados (datos simulados) | Pestaña "Consulta de accesos" | 3 |

Al registrar un residente se le asigna una cuota de mantenimiento pendiente ($1,200). Al registrar un pago desde el módulo de Pagos, el saldo se actualiza y se refleja en su estado de cuenta.

## Sprint 3

- **HU-5:** el administrador elige destinatarios y tipo de notificación (recordatorio, cuota vencida o confirmación de pago) y el envío queda en un historial. No se envían correos, SMS ni notificaciones push reales.
- **HU-6:** tabla de accesos vehiculares con filtros por vivienda o placas, resultado y tipo. Usa datos de ejemplo.

## Pendientes (Sprint 4)

- HU-7 Reportes de pagos y adeudos
- HU-8 Avisos generales de la privada

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
