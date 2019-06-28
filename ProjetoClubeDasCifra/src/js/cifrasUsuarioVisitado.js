(function(){

    $(document).ready(function () {
        usuarioVisitado = getUsuarioVisitadoNome()

        $.post('/buscaCifrasUsuarioVisitado', {usuarioVisitado: usuarioVisitado}, function(data){
            $.each(data.listaCifras, function(){
                listaCifras(this)
            })
        })
    })


    function listaCifras(cifra) {

            $(`
                <a href="/cifra"  onclick="localStorage.setItem('cifra', '${cifra}')">${cifra}</a>
                <br>
            `).appendTo($('#cifras-criadas'))

    }

})()