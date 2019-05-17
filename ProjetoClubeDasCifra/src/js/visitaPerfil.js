(function() {
    const elementoNome        = $('#nome')
    const elementoUsuario     = $('#usuario')
    const elementoEmail       = $('#email')
    const botaoSeguir = $('#seguir')

    $(document).ready(function() {
        usuario = getUsuario()
        usuarioVisitado = getUsuarioVisitadoNome()

        if(usuario.usuariosSeguidos.find(usuarioSeguido => usuarioSeguido === usuarioVisitado) !== null && usuario.usuariosSeguidos.find(usuarioSeguido => usuarioSeguido === usuarioVisitado) !== undefined) {
            botaoSeguir.addClass('invisible')

        }else{
            botaoSeguir.removeClass('invisible')
        }

        if(usuario.usuario == usuarioVisitado) {
            botaoSeguir.addClass('invisible')
        }

        console.log("NOME")
        console.log(usuarioVisitado)
        $.post('/buscaUsuario', {usuario: usuarioVisitado}, function(data) {
            elementoNome.html(data.nome)
            elementoUsuario.html(data.usuario)
            elementoEmail.html(data.email)
        })

    })


    botaoSeguir.click(function () {
        usuario = getUsuario()
        botaoSeguir.addClass('invisible')
        $.post('/segueUsuario', {usuario: usuario.usuario, usuarioSeguido: usuarioVisitado}, function (data) {
            setUsuario(data)
            console.log('Sera q foi?')
            console.log(data)
            console.log(getUsuario())
        })
    })



})()