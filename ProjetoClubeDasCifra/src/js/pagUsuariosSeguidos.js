(function() {

    $(document).ready(function () {
        usuario = getUsuario()
        console.log('Esse é o usuario')
        console.log(usuario)
        console.log(usuario.usuariosSeguidos)
        listaUsuarios()
    })


    function listaUsuarios() {
        $.each(usuario.usuariosSeguidos, function(i) {
            console.log('TO NA ITERACAO')
            console.log(this)
            $(`
                <a href="/getVisitaPerfil" id="${this}" onclick="localStorage.setItem('usuarioVisitado', '${this}')">${this}</a><br>
            `).appendTo($('#seguidos'))
        })
    }

    // $('#favoritas').children().on('click', function () {
    //     console.log(this)
    //     console.log("Pelo menos entrou")
    // })


})()