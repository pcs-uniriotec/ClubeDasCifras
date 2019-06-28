(function(){

    $(document).ready(function () {
        usuarioVisitado = getUsuarioVisitadoNome()

        $.post('/buscaCifrasFavoritasVisitado', {usuarioVisitado: usuarioVisitado}, function(data){
            $.each(data.favoritas, function(){
                listaCifras(this)
            })
        })
    })


    function listaCifras(cifra) {

        $(`
                <a href="/cifra"  onclick="localStorage.setItem('cifra', '${cifra}')">${cifra}</a>
                <br>
            `).appendTo($('#favoritas'))

    }

})()