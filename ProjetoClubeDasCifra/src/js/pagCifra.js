(function(){
    const nota             = $('#nota-output-id')                   //nota q aparece na tela
    const notaInput        = $('#nota-input-id')                    //input pro usuario dar nota
    const comentarioInput  = $('#comentario-input')
    const botaoFavoritar   = $(':button[name="favorita-cifra"]')    //botao de favoritar
    const botaoAvaliar     = $(':button[name="envia-nota"]')
    const botaoComentar    = $(':button[name="cria-comentario"]')
    const botaoExcluiCifra = $('#exclui-cifra')


    notaInput.change(function () {
        nota.html(notaInput.val())
    })

    botaoAvaliar.click(function(e) {
        e.preventDefault()
        usuario     = getUsuario()
        cifraNome   = getCifra()
        $.post("/registraNota", {usuarioNome: usuario.usuario, cifraNome: cifraNome, nota: notaInput.val()}, function(data){
        })
        window.location.reload()
    })

    botaoComentar.click(function(e) {
        e.preventDefault()
        usuario   = getUsuario()
        cifraNome = getCifra()
        let comentario = comentarioInput.val()

        if(comentario !== null && comentario !== undefined) {
            $.post("/registraComentario", {usuarioNome: usuario.usuario, cifraNome: cifraNome, comentario: comentario}, function(data) {
            })
            comentarioInput.val('')
            window.location.reload()
        }
    })

     botaoFavoritar.click(function(e) {
        e.preventDefault()
        botaoFavoritar.addClass('invisible')

        $.post("/favoritarCifra", {usuarioNome: usuario.usuario, cifraNome: getCifra()}, function(data) {
            setUsuario(data)
        })
    })

    botaoExcluiCifra.click(function () {
        usuario = getUsuario()
        cifraNome = getCifra()
        $.post('/excluiCifra', {cifraNome: cifraNome, usuario: usuario.usuario}, function(data) {
            console.log(data)
            setUsuario(data)
            window.location = '/'
        })
    })


})();