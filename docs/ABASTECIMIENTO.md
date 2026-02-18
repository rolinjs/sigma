# Vista de Abastecimiento (index.html)

## Propósito
Esta vista gestiona el proceso de abastecimiento de materia prima (mango) a las líneas de producción/empaque.

## Funcionalidades Actuales
1.  **Filtros de Selección:**
    *   Cliente (Select múltiple)
    *   Tipo (CNV/ORG)
    *   Lote
    *   Calibre (Select múltiple)
    *   Variedad (Kent, Ataulfo, Edward)
    *   Fecha Cosecha
    *   Fecha Tratamiento

2.  **Tabla de Resultados:**
    *   Muestra lotes disponibles con detalles: Cliente, Tipo, Lote, Calibre, Cantidad Jabas, Variedad, Fechas.
    *   Botón "Abastecer" que abre un modal.

3.  **Modal de Abastecimiento:**
    *   **Pestaña Grilla:**
        *   Selección de Tarima y Calibre.
        *   Visualización de "Mapa de Zonas de Reposo de Tarimas" (Grilla visual de ubicaciones).
    *   **Pestaña Filtros:**
        *   Detalle de factura/tarima.
        *   Selección de línea de empaque.
        *   Input para "Cantidad a abastecer".
        *   Botón "Iniciar Abastecimiento".
    *   **Pestaña Otro:**
        *   Visualización gráfica de columnas de parihuelas y conteo de cajas/jabas.
