document.addEventListener("DOMContentLoaded", function() {

    // Seleccionamos todas las zonas
    const zonas = document.querySelectorAll("#tab2 .zona");
    const cantidadReal = document.getElementById("cantidad_real");
    const tab1 = document.getElementById("tab1");
    const tab1Link = document.getElementById("tab1-tab");
    const iniciarBtn = document.querySelector("#tab1 button.btn-info");
    const inputCantidad = document.getElementById("cantidad-jaba");

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

            // Cambiar a la pestaña Filtros
            document.querySelectorAll("#customTabs .nav-link").forEach(link => link.classList.remove("active"));
            document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.remove("show", "active"));

            tab1Link.classList.add("active");
            tab1.classList.add("show", "active");

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
        const restante = tarimas[zonaNum] - cantidad;

        // Pintar zona como abastecida parcialmente o total
        if (restante <= 0) {
            zonaSeleccionada.classList.remove("bg-secondary");
            zonaSeleccionada.classList.add("bg-primary"); // completado
            tarimas[zonaNum] = 0;
            iniciarBtn.textContent = "Guardar y Salir";
        } else {
            tarimas[zonaNum] = restante;
            zonaSeleccionada.classList.remove("bg-secondary");
            zonaSeleccionada.classList.add("bg-warning"); // parcialmente abastecida
            iniciarBtn.textContent = "Cerrar y Guardar";
        }

        // Volver a la grilla
        irAGrilla();
    });

});