document.addEventListener("DOMContentLoaded", function() {

    // Seleccionamos todas las zonas
    const zonas = document.querySelectorAll("#tab2 .zona");
    const cantidadReal = document.getElementById("cantidad_real");
    const tab1 = document.getElementById("tab1");
    const tab1Link = document.getElementById("tab1-tab");
    const iniciarBtn = document.querySelector("#tab1 button.btn-info");
    const inputCantidad = document.getElementById("cantidad-jaba");

    // Creamos un label dinámico de Jabas Saldo justo después del texto
    let saldoLabel = document.createElement("strong");
    saldoLabel.textContent = "0";
    saldoLabel.id = "jabas_saldo";
    const invoiceCol = document.querySelector("#tab1 .invoice-col:nth-child(2) address");
    invoiceCol.innerHTML = invoiceCol.innerHTML.replace("15", ""); // quitar el 15 estático
    invoiceCol.appendChild(document.createTextNode(" ")); // espacio
    invoiceCol.appendChild(saldoLabel);

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
            cantidadReal.textContent = 30;

            // Jabas Saldo según tarima
            saldoLabel.textContent = tarimas[zonaNum];

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
        cantidadReal.textContent = 30;

        // Jabas Saldo
        saldoLabel.textContent = restante;

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

        saldoLabel.textContent = restante;

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

});
