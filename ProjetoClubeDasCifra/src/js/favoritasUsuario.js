(function() {
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
        console.log(usuario.favoritas)
        listaCifras()

    })

    function fala(){
        console.log("OLA KRALGO")
        console.log()
    }


    function listaCifras() {

        $.each(usuario.favoritas, function(i) {
            console.log("ENTRA AQUEEE")
            console.log(this)
             $(`
            <button><a href="/cifra" id="${this}" onclick="localStorage.setItem('cifra', '${this}')">${this}</a></button><br>
            `).appendTo($('#favoritas'))
        })

    }

    $('#favoritas').children().on('click', function () {
        console.log(this)
        console.log("Pelo menos entrou")
    })

    function chamaCifra() {

        localStorage.setItem('cifra', cifra)

        window.location = '/cifra'
    }


})()