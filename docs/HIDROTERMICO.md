# Vista de Hidrotérmico (hidro.html)

## Propósito
Esta vista permite gestionar y visualizar el estado de las tinas de tratamiento hidrotérmico y asignar canastas a las mismas.

## Funcionalidades Actuales
1.  **Tablero Visual de Tinas:**
    *   Muestra 6 tina/tanques identificados como "TINA 01" a "TINA 06".
    *   Estado inicial: "DISPONIBLE".
    *   Interacción: Las tinas son "droppables" (aceptan elementos arrastrados) y "clickeables".

2.  **Gestión de Canastas:**
    *   Lista de "Canastas disponibles" (ej. Canasta 1, 2, 3) con datos visuales (ID, Tiempo).
    *   Funcionalidad **Drag & Drop**: Las canastas se pueden arrastrar y soltar sobre las tinas para cambiar su estado a "Ocupado/Canasta X".

3.  **Modal "Aperturar Hidrotérmico":**
    *   Se activa al hacer clic en una tina.
    *   **Configuración del Proceso:**
        *   Selección de Canasta y Calibre.
        *   Tiempo de tratamiento fijo (visualización de 75').
    *   **Información del Lote:**
        *   Tabla informativa con: Lote, Nº Tarima, Calibre, Nº Jabas, Posición.
    *   **Tipo de Proceso (Radio Buttons):**
        *   **SIN HIDROCOOLER:** Opción por defecto.
        *   **CON HIDROCOOLER Y REPOSO:** Despliega campos de fecha/hora para: Inicio/Fin Hidrotérmico, Inicio/Fin Reposo, Hora Salida, Inicio/Fin Frío. Calcula tiempos automáticamente base a la hora actual + 75 min.
        *   **CON HIDROCOOLER SIN REPOSO:** Indica el modo seleccionado.
    *   **Registro de Temperaturas:**
        *   Inputs para Temperatura de Pulpa Inicial y Final.
