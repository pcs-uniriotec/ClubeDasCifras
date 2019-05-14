(function () {
    window.usuario

    window.getUsuario = function pegaUsuario() {         //busca objeto usuario no backend
        return JSON.parse(localStorage.getItem('usuario'))
    }

    window.setUsuario = function setUser(data) {
        localStorage.setItem('usuario', JSON.stringify(data))
    }

})()