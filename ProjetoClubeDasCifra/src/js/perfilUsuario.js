(function() {
    var usuario
   
    $(document).ready(function () {
        usuario = pegaUsuario()

        atribuiValores(usuario)
    })

    function atribuiValores(usuario) {
        $('#nome').html(usuario.nome)
        $('#usuario').html(usuario.usuario)
        $('#email').html(usuario.email)
    }

    function pegaUsuario() {         //busca objeto usuario no backend
        return JSON.parse(localStorage.getItem('usuario'))
    }

    function setUser(data) {
        localStorage.setItem('usuario', JSON.stringify(data))
    }

})()