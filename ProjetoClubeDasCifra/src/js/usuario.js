(function () {
    window.usuario
    window.usuarioVisitado

    window.getUsuario = function pegaUsuario() {         //busca objeto usuario no backend
        return JSON.parse(localStorage.getItem('usuario'))
    }

    window.setUsuario = function setUser(data) {
        localStorage.setItem('usuario', JSON.stringify(data))
    }

    window.getUsuarioVisitadoNome = function getUsuarioVisitadoNome() {
        return localStorage.getItem('usuarioVisitado')
    }

    window.setUsuarioVisitadoNome = function setUsuarioVisitadoNome(data) {
        localStorage.setItem('usuarioVisitado', data)
    }

})()