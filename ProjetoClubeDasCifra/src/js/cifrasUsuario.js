(function(){
    var usuario
    var cifra


    function setUser(data) {
        localStorage.setItem('usuario', JSON.stringify(data))
    }

    function pegaUsuario() {         //busca objeto usuario no backend
        return JSON.parse(localStorage.getItem('usuario'))
    }

    function setCifra(data) {
        localStorage.setItem('cifra', data)
        console.log(cifra)
    }

    function pegaCifra() {
        return localStorage.getItem('cifra')
    }

    $(document).ready(function () {
        usuario = pegaUsuario()
        console.log("AQUIIIIII")
        console.log(usuario.cifrasCriadas)
        listaCifras()

    })


    function listaCifras() {

        $.each(usuario.cifrasCriadas, function(i) {
            console.log("ENTRA AQUEEE")
            console.log(this)
            console.log('${this}')
            $(`
                <a href="/cifra"  onclick="localStorage.setItem('cifra', '${this}')">${this}</a>
                <br>
            `).appendTo($('#cifras-criadas'))

        })

    }



})()