document.addEventListener("DOMContentLoaded", function() {

    // Seleccionamos todas las zonas
    const zonas = document.querySelectorAll("#tab2 .zona");
    const cantidadReal = document.getElementById("cantidad_real");
    const tab1 = document.getElementById("tab1");
    const tab1Link = document.getElementById("tab1-tab");
    const iniciarBtn = document.querySelector("#tab1 button.btn-info");
    const inputCantidad = document.getElementById("cantidad-jaba");

    // Label de Jabas Saldo (último <strong> dentro de <address>)
    const jabasSaldoLabel = document.querySelector("#tab1 .invoice-col address strong:last-of-type");

    // Estado de cada tarima (asumimos 30 jabas por tarima)
    const tarimas = {};
    zonas.forEach(z => tarimas[z.textContent.trim()] = 30);

    // Función para quitar selección de todas
    function limpiarSeleccion() {
        zonas.forEach(z => z.classList.remove("zona-seleccionada"));
    }

    // Función para volver a la grilla
    function irAGrilla() {
        // Quitar "active" de todas las tabs
        document.querySelectorAll("#customTabs .nav-link").forEach(link => link.classList.remove("active"));
        document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.remove("show", "active"));

        // Activar tab2
        document.getElementById("tab2-tab").classList.add("active");
        document.getElementById("tab2").classList.add("show", "active");
    }

    // Añadimos evento click a cada zona
    zonas.forEach(zona => {
        zona.addEventListener("click", function() {

            // Limpiar selección previa
            limpiarSeleccion();

            // Marcar esta zona
            this.classList.add("zona-seleccionada");

            // Poner el número de la zona en "Total Jabas"
            cantidadReal.textContent = this.textContent.trim();

            // Limpiar input
            inputCantidad.value = "";

            // Actualizar label de Jabas Saldo según tarima
            const zonaNum = this.textContent.trim();
            const saldo = tarimas[zonaNum];
            jabasSaldoLabel.textContent = saldo;

            // Cambiar a la pestaña Filtros
            document.querySelectorAll("#customTabs .nav-link").forEach(link => link.classList.remove("active"));
            document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.remove("show", "active"));

            tab1Link.classList.add("active");
            tab1.classList.add("show", "active");

            // Actualizar texto del botón según saldo
            if (saldo === 0) {
                iniciarBtn.textContent = "Guardar y Salir";
            } else {
                iniciarBtn.textContent = "Cerrar y Guardar";
            }

        });
    });

    // Lógica del botón "Iniciar Abastecimiento"
    iniciarBtn.addEventListener("click", function() {
        const cantidad = parseInt(inputCantidad.value);
        const zonaSeleccionada = document.querySelector(".zona-seleccionada");

        if (!zonaSeleccionada || isNaN(cantidad) || cantidad <= 0) {
            alert("Selecciona una zona y escribe una cantidad válida");
            return;
        }

        const zonaNum = zonaSeleccionada.textContent.trim();
        let restante = tarimas[zonaNum] - cantidad;

        if (restante < 0) restante = 0; // no permitir negativos

        tarimas[zonaNum] = restante;

        // Actualizar label de Jabas Saldo
        jabasSaldoLabel.textContent = restante;

        // Pintar zona como abastecida parcialmente o total
        if (restante === 0) {
            zonaSeleccionada.classList.remove("bg-secondary", "bg-warning");
            zonaSeleccionada.classList.add("bg-primary"); // completado
            iniciarBtn.textContent = "Guardar y Salir";
        } else {
            zonaSeleccionada.classList.remove("bg-secondary", "bg-primary");
            zonaSeleccionada.classList.add("bg-warning"); // parcialmente abastecida
            iniciarBtn.textContent = "Cerrar y Guardar";
        }

        // Limpiar input
        inputCantidad.value = "";

        // Volver a la grilla
        irAGrilla();
    });

});
