(function() {
   const botaoCriaCifra = $('#cria-cifra-id')
    var usuario = null

    function pegaUsuario() {         //busca objeto usuario no backend
        return JSON.parse(localStorage.getItem('usuario'))
    }

    $(document).ready(function() {
        console.log("Carregou a pagina")
        console.log(pegaUsuario())
    })

    botaoCriaCifra.click(function(event) {
        event.preventDefault()
        usuario = pegaUsuario()
        let nomeMusica = $('input[name="nome-musica"]').val()
        let cifra = $('#cifra').val()
        console.log("verifica cifra")


        localStorage.setItem('cifra', nomeMusica)
        console.log(localStorage.getItem('cifra'))
        $.post("/enviarCifra", {nomeMusica: nomeMusica, cifra: cifra, autor: usuario.nome}, function(data) {
            console.log("Entra")
            window.location = '/cifra'
        })

    })



})()