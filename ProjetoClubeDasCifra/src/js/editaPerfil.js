(function () {
    var usuario

    function pegaUsuario() {         //busca objeto usuario no backend
        return JSON.parse(localStorage.getItem('usuario'))
    }

    function setUser(data) {
        localStorage.setItem('usuario', JSON.stringify(data))
    }

    $('#exclui-conta').click(function() {
        console.log("ENTRA NO EXCLUI CONTA")
        usuario = pegaUsuario()

        $.post("/bloqueiaConta", {usuarioNome: usuario.nome}, function(data) {
            setUser(null)
            window.location = '/'
        })
    })

})()