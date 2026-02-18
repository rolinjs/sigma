(function(){
    document.addEventListener('DOMContentLoaded', function () {
        const cantidadJaba = document.querySelector('#cantidad-jaba');
        const cantidadReal = document.querySelector('#cantidad_real');
        const tarimaCompleta = 30;

        cantidadReal.innerHTML = tarimaCompleta;
        cantidadJaba.addEventListener('blur', validar);
        
        //function validar

        function validar(e) {
            e.preventDefault();
            
                        
        }
        
    })
})();