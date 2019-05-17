(function() {

    const inputCifra      = $('#cifra')
    const botaoEditaCifra = $('#edita-cifra')

    $(document).ready(function() {
        console.log("OLAAAAAAA")
        cifraNome = getCifra()

        $.post("/buscaCifra", {musica: cifraNome}, function(data) {
            console.log(data)
            inputCifra.val(data.cifra)
        })
    })

    botaoEditaCifra.click(function(event) {
        event.preventDefault()
        console.log("Entra")
        let cifra = inputCifra.val()
        $.post('/editaCifra', {cifraNome: cifraNome, cifra: cifra}, function(data) {
            window.location = '/cifra'
        })
    })



})()