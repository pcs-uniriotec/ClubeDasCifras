(function() {
    const botaoCriarCifra = $('#cria-cifra-id')
    const inputNomeMusica = $('input[name="nome-musica"]')
    const inputCifra      = $('#cifra')


    botaoCriarCifra.click(function(event) {
        usuario = getUsuario()
        let nomeMusica = inputNomeMusica.val()
        let cifra      = inputCifra.val()

        setCifra(nomeMusica)

        $.post("/enviarCifra", {nomeMusica: nomeMusica, cifra: cifra, autor: usuario.usuario}, function(data) {
            setUsuario(data)
            window.location = '/cifra'
        })

    })


})()