(function() {
    const nomePerfil    = $('#nome')
    const usuarioPerfil = $('#usuario')
    const emailPerfil   = $('#email')
   
    $(document).ready(function () {
        usuario = getUsuario()
        atribuiValores(usuario)
    })

    function atribuiValores(usuario) {
        nomePerfil.html(usuario.nome)
        usuarioPerfil.html(usuario.usuario)
        emailPerfil.html(usuario.email)
    }

})()