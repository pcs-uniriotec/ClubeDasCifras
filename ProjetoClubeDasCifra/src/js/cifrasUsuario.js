(function(){

    $(document).ready(function () {
        usuario = getUsuario()
        listaCifras()
    })


    function listaCifras() {

        $.each(usuario.cifrasCriadas, function(i) {
            $(`
                <a href="/cifra"  onclick="localStorage.setItem('cifra', '${this}')">${this}</a>
                <br>
            `).appendTo($('#cifras-criadas'))
        })
    }

})()