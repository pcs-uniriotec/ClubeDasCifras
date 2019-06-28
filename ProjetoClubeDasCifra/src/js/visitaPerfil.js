(function() {
    const elementoNome        = $('#nome')
    const elementoUsuario     = $('#usuario')
    const elementoEmail       = $('#email')
    const botaoSeguir         = $('#seguir')
    const botaoComentar       = $('#botao-comentar')
    const comentarioInput     = $('#comentario-input')

    var usuarioPerfil

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

        $.post('/buscaUsuario', {usuario: usuarioVisitado}, function(data) {
            elementoNome.html(data.nome)
            elementoUsuario.html(data.usuario)
            elementoEmail.html(data.email)

            $.each(data.comentariosPerfil, function(i) {
                montaComentario(this)
            })
        })

    })

    function montaComentario(comentario) {

        $(`
                <h4 class="usuario-nome">
                <a href="/getVisitaPerfil" 
                   onclick="localStorage.setItem('usuarioVisitado', '${comentario.usuarioNome}')">${comentario.usuarioNome}</a>
                    comentou:
                </h4>
                <br>
                <p class="usuario-coment">${comentario.comentario}</p>
                <p>-----------------------------------------------</p>
          `).appendTo($('#espaco-comentarios'))
    }


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

    botaoComentar.click(function (e) {
        e.preventDefault()

        usuario    = getUsuario()
        comentario = comentarioInput.val()

        if(comentario !== null && comentario !== undefined) {
            $.post("/registraComentarioPerfil", {usuarioComenta: usuario.usuario, perfilComentado: usuarioVisitado , comentario: comentario},
                function(data) {
            })
            comentarioInput.val('')
            window.location.reload()
        }
    })



})()