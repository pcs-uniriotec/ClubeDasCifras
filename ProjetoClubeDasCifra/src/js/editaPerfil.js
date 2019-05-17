(function () {
    var usuario
    const botaoEditaPerfil = $('#conclui-edicoes')
    const botaoExcluiConta = $('#exclui-conta')
    const inputNome        = $('#edita-nome')
    const inputemail       = $('#edita-email')
    const inputsenha       = $('#edita-senha')

    function pegaUsuario() {         //busca objeto usuario no backend
        return JSON.parse(localStorage.getItem('usuario'))
    }

    function setUser(data) {
        localStorage.setItem('usuario', JSON.stringify(data))
    }

    botaoExcluiConta.click(function() {
        console.log("ENTRA NO EXCLUI CONTA")
        usuario = pegaUsuario()

        $.post("/bloqueiaConta", {usuarioNome: usuario.usuario}, function(data) {
            setUsuario(null)
            window.location = '/'
        })
    })

    botaoEditaPerfil.click(function() {
        usuario  = getUsuario()
        let nome  = inputNome.val()
        let email = inputemail.val()
        let senha = inputsenha.val()

        $.post('/editaPerfil', {usuario: usuario.usuario, nome: nome,email: email, senha: senha}, function(data) {
            setUsuario(data)
            console.log("Usuario Novo")
            console.log(data)
            window.location = ('/getPerfilUsuario')
        })
    })

})()