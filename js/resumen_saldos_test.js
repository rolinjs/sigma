document.addEventListener('DOMContentLoaded', function (){
    // =============================
    // MOCK DATA - RESUMEN DE SALDOS
    // =============================

    const resumenSaldos = [
        {
            id: 1,
            codigo: "00214510",
            fecha: "2024-12-01",
            n_saldo: "S-01001",
            n_lote: "L-2401",
            variedad: "KENT",
            tipo_prod: "ORGANICO",
            tipo_emp: "EMP-01 / MARCA: SOLFRUT",
            calibre: 6,
            cajas: 180
        },
        {
            id: 2,
            codigo: "00214511",
            fecha: "2024-12-01",
            n_saldo: "S-01002",
            n_lote: "L-2402",
            variedad: "KEITT",
            tipo_prod: "CONVENCIONAL",
            tipo_emp: "EMP-02 / MARCA: TROPICAL",
            calibre: 7,
            cajas: 150
        },
        {
            id: 3,
            codigo: "00214512",
            fecha: "2024-12-02",
            n_saldo: "S-01003",
            n_lote: "L-2403",
            variedad: "EDWARD",
            tipo_prod: "ORGANICO",
            tipo_emp: "EMP-03 / MARCA: SUNFRUIT",
            calibre: 8,
            cajas: 95
        },
        {
            id: 4,
            codigo: "00214513",
            fecha: "2024-12-02",
            n_saldo: "S-01004",
            n_lote: "L-2404",
            variedad: "KENT",
            tipo_prod: "CONVENCIONAL",
            tipo_emp: "EMP-01 / MARCA: SOLFRUT",
            calibre: 9,
            cajas: 210
        },
        {
            id: 5,
            codigo: "00214514",
            fecha: "2024-12-03",
            n_saldo: "S-01005",
            n_lote: "L-2405",
            variedad: "ATAULFO",
            tipo_prod: "ORGANICO",
            tipo_emp: "EMP-04 / MARCA: AGROEXPORT",
            calibre: 5,
            cajas: 120
        },
        {
            id: 6,
            codigo: "00214515",
            fecha: "2024-12-03",
            n_saldo: "S-01006",
            n_lote: "L-2406",
            variedad: "KEITT",
            tipo_prod: "CONVENCIONAL",
            tipo_emp: "EMP-02 / MARCA: TROPICAL",
            calibre: 6,
            cajas: 175
        },
        {
            id: 7,
            codigo: "00214516",
            fecha: "2024-12-04",
            n_saldo: "S-01007",
            n_lote: "L-2407",
            variedad: "KENT",
            tipo_prod: "ORGANICO",
            tipo_emp: "EMP-05 / MARCA: FRESHMANGO",
            calibre: 7,
            cajas: 160
        },
        {
            id: 8,
            codigo: "00214517",
            fecha: "2024-12-04",
            n_saldo: "S-01008",
            n_lote: "L-2408",
            variedad: "EDWARD",
            tipo_prod: "CONVENCIONAL",
            tipo_emp: "EMP-03 / MARCA: SUNFRUIT",
            calibre: 8,
            cajas: 140
        },
        {
            id: 9,
            codigo: "00214518",
            fecha: "2024-12-05",
            n_saldo: "S-01009",
            n_lote: "L-2409",
            variedad: "ATAULFO",
            tipo_prod: "ORGANICO",
            tipo_emp: "EMP-04 / MARCA: AGROEXPORT",
            calibre: 5,
            cajas: 130
        },
        {
            id: 10,
            codigo: "00214519",
            fecha: "2024-12-05",
            n_saldo: "S-01010",
            n_lote: "L-2410",
            variedad: "KEITT",
            tipo_prod: "CONVENCIONAL",
            tipo_emp: "EMP-06 / MARCA: EXPORTPERU",
            calibre: 9,
            cajas: 220
        }
    ];

    // =============================
    // RENDERIZAR TABLA DINÁMICAMENTE
    // =============================

    function renderizarTabla() {

        const tbody = document.getElementById('tablaResumenSaldos');
        tbody.innerHTML = ""; // limpiar tabla

        resumenSaldos.forEach(saldo => {

            const fila = `
                <tr>
                    <td>${saldo.codigo}</td>
                    <td>${saldo.fecha}</td>
                    <td>${saldo.n_saldo}</td>
                    <td>${saldo.n_lote}</td>
                    <td>${saldo.variedad}</td>
                    <td>${saldo.tipo_prod}</td>
                    <td>${saldo.tipo_emp}</td>
                    <td>${saldo.calibre}</td>
                    <td>${saldo.cajas}</td>
                    <td>
                        <button class="btn btn-primary btn-xs btn-editar" data-id="${saldo.id}">EDITAR</button>
                        <button class="btn btn-danger btn-xs btn-eliminar" data-id="${saldo.id}">
                            <i class="fa fa-trash"></i>
                        </button>
                        <button class="btn btn-info btn-xs btn-transferir" data-id="${saldo.id}">TRANSFERIR</button>
                        <button class="btn btn-danger btn-xs btn-baja" data-id="${saldo.id}">BAJA</button>
                        <button class="btn btn-info btn-xs">
                            <i class="fa fa-print"></i>
                        </button>
                    </td>
                </tr>
            `;

            tbody.innerHTML += fila;
        });

    }


    // =============================
    // FUNCIONES DE PRUEBA
    // =============================

    // Obtener todos los saldos
    function obtenerResumenSaldos() {
        return resumenSaldos;
    }

    // Buscar saldo por ID
    function obtenerSaldoPorId(id) {
        return resumenSaldos.find(s => s.id === id);
    }

    // Exportar si luego quieres modularizar
    window.resumenSaldos = resumenSaldos;
    window.obtenerResumenSaldos = obtenerResumenSaldos;
    window.obtenerSaldoPorId = obtenerSaldoPorId;

    renderizarTabla();

    // =============================
    // DETALLE DE PALLET DINÁMICO
    // =============================

    const btnAgregarPallet = document.getElementById('btnAgregarPallet');

    // Primer tbody = DETALLE DE PALLET
    const tablaDetalleBody = document.querySelectorAll('.card-outline.card-secondary table tbody')[0];


    // =============================
    // INSERTAR DEBAJO DE LA ÚLTIMA FILA
    // =============================
    function insertarDebajoDeUltimaFila(fila) {

        const filasDinamicas = tablaDetalleBody.querySelectorAll('.fila-dinamica');

        if (filasDinamicas.length > 0) {
            filasDinamicas[filasDinamicas.length - 1].after(fila);
        } else {
            tablaDetalleBody.prepend(fila);
        }
    }


    // =============================
    // CREAR FILA EDITABLE (BOTON +)
    // =============================
    function crearFilaEditable() {

        const fila = document.createElement('tr');
        fila.classList.add('text-center', 'fila-dinamica');

        fila.innerHTML = `
            <td><input type="checkbox"></td>
            <td></td>
            <td><input type="date" class="form-control form-control-sm"></td>
            <td>
                <select class="form-control form-control-sm">
                    <option>SELECCIONE..</option>
                </select>
            </td>
            <td></td>
            <td></td>
            <td>
                <select class="form-control form-control-sm">
                    <option>SELECCIONE..</option>
                </select>
            </td>
            <td><input type="text" class="form-control form-control-sm" placeholder="CALIBRE"></td>
            <td><input type="text" class="form-control form-control-sm" placeholder="CAJAS"></td>
            <td><input type="text" class="form-control form-control-sm" placeholder="COD. CAJA"></td>
            <td><input type="text" class="form-control form-control-sm" placeholder="LOTE CJ"></td>
            <td><input type="text" class="form-control form-control-sm" placeholder="COD. PLU"></td>
            <td><input type="text" class="form-control form-control-sm" placeholder="COD. PAR."></td>
            <td>
                <button class="btn btn-primary btn-xs btn-guardar-pallet">Guardar Pallet</button>
                <button class="btn btn-success btn-xs btn-cerrar-saldo">Guardar Saldo</button>
            </td>
        `;

        insertarDebajoDeUltimaFila(fila);
    }


    // =============================
    // CREAR FILA NORMAL (TRANSFERIR)
    // =============================
    function crearFilaNormal(data) {

        const fila = document.createElement('tr');
        fila.classList.add('text-center', 'fila-dinamica');

        fila.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${data.codigo}</td>
            <td>${data.fecha}</td>
            <td>${data.n_lote}</td>
            <td>${data.variedad}</td>
            <td>${data.tipo_prod}</td>
            <td>${data.tipo_emp}</td>
            <td>${data.calibre}</td>
            <td>${data.cajas}</td>
            <td>CJ-001</td>
            <td>LCJ-2024</td>
            <td>PLU-7890</td>
            <td>PAR-456</td>
            <td>
                <button class="btn btn-primary btn-xs">EDITAR</button>
            </td>
        `;

        insertarDebajoDeUltimaFila(fila);
    }


    // =============================
    // EVENTO BOTON +
    // =============================
    btnAgregarPallet.addEventListener('click', function () {
        crearFilaEditable();
    });


    // =============================
    // DELEGACIÓN DE EVENTOS
    // =============================
    document.addEventListener('click', function (e) {

        // TRANSFERIR
        if (e.target.classList.contains('btn-transferir')) {

            const id = parseInt(e.target.dataset.id);
            const saldo = obtenerSaldoPorId(id);

            if (saldo) {
                crearFilaNormal(saldo);
            }
        }

        // GUARDAR → elimina solo esa fila editable
        if (e.target.classList.contains('btn-guardar-pallet') ||
            e.target.classList.contains('btn-cerrar-saldo')) {

            const fila = e.target.closest('tr');
            if (fila) {
                fila.remove();
            }
        }

    });

})