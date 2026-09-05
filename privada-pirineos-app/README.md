# Sistema de Pagos y Control de Accesos — Privada Pirineos

Proyecto desarrollado para la materia **Proyecto II**, como parte de la aplicación
de la metodología ágil Scrum al proyecto "Sistema Web para la Administración de
Pagos y Control de Accesos en la Privada Pirineos".

## Sprint 1 — funcionalidades incluidas

Esta aplicación en React implementa las cuatro historias de usuario de mayor
prioridad seleccionadas para el Sprint 1:

| # | Historia de usuario | Módulo en la app |
|---|---|---|
| HU-1 | Registrar residentes y viviendas | Pestaña "Residentes" |
| HU-2 | Consultar estado de cuenta y adeudos | Pestaña "Estado de cuenta" |
| HU-3 | Registrar pagos de mantenimiento | Pestaña "Pagos" |
| HU-4 | Administrar controles de acceso vehicular | Pestaña "Accesos" |

Al registrar un residente se le asigna automáticamente una cuota de
mantenimiento pendiente ($1,200). Al registrar un pago desde el módulo de
Pagos, el saldo del residente se actualiza automáticamente y se refleja en su
estado de cuenta, cumpliendo con el criterio de aceptación de HU-3.

## Cómo ejecutarlo localmente

```bash
npm install
npm run dev
```

Esto levanta la aplicación en `http://localhost:5173`.

## Tecnologías

- React 18
- Vite

## Relación con el Product Backlog y el Sprint Backlog

El detalle del Product Backlog, las fichas de backlog y la calendarización
del Sprint se encuentran en el documento entregado junto con este
repositorio (Actividad 3).
