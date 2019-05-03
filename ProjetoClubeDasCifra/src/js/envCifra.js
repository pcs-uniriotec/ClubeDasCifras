(function() {
   const botaoCriaCifra = $('#cria-cifra-id')
    var usuario = null

    function pegaUsuario() {         //busca objeto usuario no backend
        return JSON.parse(localStorage.getItem('usuario'))
    }

    function setUser(data) {
        localStorage.setItem('usuario', JSON.stringify(data))
    }


    botaoCriaCifra.click(function(event) {
        usuario = pegaUsuario()
        let nomeMusica = $('input[name="nome-musica"]').val()
        let cifra = $('#cifra').val()

        localStorage.setItem('cifra', nomeMusica)

        $.post("/enviarCifra", {nomeMusica: nomeMusica, cifra: cifra, autor: usuario.nome}, function(data) {
            setUser(data)
            window.location = '/cifra'
        })

    })



})()