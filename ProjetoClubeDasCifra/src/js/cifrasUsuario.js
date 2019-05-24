(function(){

    $(document).ready(function () {
        usuario = getUsuario()
        listaCifras()
        console.log(getCifra())
        // localStorage.setItem('cifra', 'I Don care')
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