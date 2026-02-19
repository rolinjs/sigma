document.addEventListener("DOMContentLoaded", function() {

    // Seleccionamos todas las zonas
    const zonas = document.querySelectorAll("#tab2 .zona");
    const cantidadReal = document.getElementById("cantidad_real");
    const tab1 = document.getElementById("tab1");
    const tab1Link = document.getElementById("tab1-tab");
    const iniciarBtn = document.querySelector("#tab1 button.btn-info");
    const inputCantidad = document.getElementById("cantidad-jaba");

    // Usamos directamente el input de Jabas Saldo
    const saldoLabel = document.getElementById("jabas_saldo");

    // Estado de cada tarima (asumimos 30 jabas por tarima)
    const tarimas = {};
    zonas.forEach(z => tarimas[z.textContent.trim()] = 30);

    // Función para quitar selección de todas
    function limpiarSeleccion() {
        zonas.forEach(z => z.classList.remove("zona-seleccionada"));
    }

    // Función para volver a la grilla
    function irAGrilla() {
        document.querySelectorAll("#customTabs .nav-link").forEach(link => link.classList.remove("active"));
        document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.remove("show", "active"));

        document.getElementById("tab2-tab").classList.add("active");
        document.getElementById("tab2").classList.add("show", "active");
    }

    // Función para actualizar el botón y color de zona según saldo
    function actualizarBotonYColor(zona, saldo) {
        if (saldo === 0) {
            zona.classList.remove("bg-secondary", "bg-warning");
            zona.classList.add("bg-primary"); // completada azul
            iniciarBtn.textContent = "Guardar y Salir";
            iniciarBtn.classList.remove("btn-warning");
            iniciarBtn.classList.add("btn-success");
        } else {
            zona.classList.remove("bg-secondary", "bg-primary");
            zona.classList.add("bg-warning"); // parcialmente abastecida amarillo
            iniciarBtn.textContent = "Cerrar y Guardar";
            iniciarBtn.classList.remove("btn-success");
            iniciarBtn.classList.add("btn-warning");
        }
    }

    // ===== Función para repintar todas las zonas completadas =====
    function repintarCompletadas() {
        zonas.forEach(zona => {
            const zonaNum = zona.textContent.trim();
            if (tarimas[zonaNum] === 0) {
                zona.classList.remove("bg-secondary", "bg-warning");
                zona.classList.add("bg-primary"); // azul si completa
            }
        });
    }

    // Añadimos evento click a cada zona
    zonas.forEach(zona => {
        zona.addEventListener("click", function() {

            limpiarSeleccion();
            this.classList.add("zona-seleccionada");

            const zonaNum = this.textContent.trim();

            // Total Jabas siempre 30
            cantidadReal.value = 30;

            // Jabas Saldo según tarima
            saldoLabel.value = tarimas[zonaNum];

            // Limpiar input
            inputCantidad.value = "";

            // Cambiar a pestaña Filtros
            document.querySelectorAll("#customTabs .nav-link").forEach(link => link.classList.remove("active"));
            document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.remove("show", "active"));

            tab1Link.classList.add("active");
            tab1.classList.add("show", "active");

            // Actualizar botón según saldo
            actualizarBotonYColor(this, tarimas[zonaNum]);
        });
    });

    // ===== Lógica del botón =====
    iniciarBtn.addEventListener("click", function() {
        const cantidad = parseInt(inputCantidad.value);
        const zonaSeleccionada = document.querySelector(".zona-seleccionada");

        if (!zonaSeleccionada || isNaN(cantidad) || cantidad <= 0) {
            alert("Selecciona una zona y escribe una cantidad válida");
            return;
        }

        const zonaNum = zonaSeleccionada.textContent.trim();
        let restante = tarimas[zonaNum] - cantidad;

        if (restante < 0) restante = 0;

        tarimas[zonaNum] = restante;

        // Total Jabas siempre 30
        cantidadReal.value = 30;

        // Jabas Saldo dentro del input
        saldoLabel.value = restante;

        // Colores de zona y botón según saldo
        actualizarBotonYColor(zonaSeleccionada, restante);

        inputCantidad.value = "";

        // Volver a la grilla automáticamente
        irAGrilla();

        // Repintar todas las zonas completadas
        repintarCompletadas();
    });

    // ===== Actualización dinámica del botón según cantidad escrita =====
    inputCantidad.addEventListener("input", function() {
        const cantidad = parseInt(this.value);
        const zonaSeleccionada = document.querySelector(".zona-seleccionada");
        if (!zonaSeleccionada) return;

        const zonaNum = zonaSeleccionada.textContent.trim();
        let restante = tarimas[zonaNum] - (isNaN(cantidad) ? 0 : cantidad);
        if (restante < 0) restante = 0;

        // Actualizar saldo dentro del input
        saldoLabel.value = restante;

        // Cambiar botón y color de zona dinámicamente
        actualizarBotonYColor(zonaSeleccionada, restante);
    });

    // ====== Ajustamos el botón para que quede al lado del input ======
    const cantidadTd = document.querySelector("#tab1 table tbody tr:first-child td");
    let flexContainer = cantidadTd.querySelector(".flex-container");
    if (!flexContainer) {
        flexContainer = document.createElement("div");
        flexContainer.classList.add("flex-container");
        flexContainer.style.display = "flex";
        flexContainer.style.alignItems = "center";
        flexContainer.style.gap = "10px";

        const input = cantidadTd.querySelector("input");
        flexContainer.appendChild(input);
        flexContainer.appendChild(iniciarBtn);

        cantidadTd.innerHTML = "";
        cantidadTd.appendChild(flexContainer);
    }

    // ===== Al cargar la página, repintar zonas completadas si hay alguna =====
    repintarCompletadas();

    const rowsPerPage = 10; // filas por página
    const table = document.getElementById("example1");
    const tbody = document.getElementById("table-body");
    const rows = Array.from(tbody.querySelectorAll("tr"));
    const totalPages = Math.ceil(rows.length / rowsPerPage);
    let currentPage = 1;

    const currentPageSpan = document.getElementById("current-page");
    const totalPagesSpan = document.getElementById("total-pages");
    totalPagesSpan.textContent = totalPages;

    function showPage(page) {
        currentPage = page;
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        rows.forEach((row, index) => {
            row.style.display = (index >= start && index < end) ? "" : "none";
        });

        currentPageSpan.textContent = currentPage;

        // Deshabilitar botones si es la primera o última página
        document.getElementById("prev-btn").disabled = currentPage === 1;
        document.getElementById("next-btn").disabled = currentPage === totalPages;
    }

    // Botones
    document.getElementById("prev-btn").addEventListener("click", () => {
        if (currentPage > 1) showPage(currentPage - 1);
    });
    document.getElementById("next-btn").addEventListener("click", () => {
        if (currentPage < totalPages) showPage(currentPage + 1);
    });

    // Mostrar la primera página al cargar
    showPage(1);
    
});
