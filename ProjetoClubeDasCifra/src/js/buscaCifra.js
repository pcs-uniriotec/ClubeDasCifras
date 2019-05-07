(function(){

    const botaoFavoritar = $(':button[name="favorita-cifra"]')
    window.usuario
    var cifraNome



    $(document).ready(function() {

        usuario   = getUsuario()
        cifraNome = getCifra()

        if(usuario.favoritas.find(cifra => cifra === cifraNome) !== null && usuario.favoritas.find(cifra => cifra === cifraNome) !== undefined) {
            botaoFavoritar.addClass('invisible')
        }else{
            botaoFavoritar.removeClass('invisible')
        }

        let musica = getCifra()

        $.post("/buscaCifra", {musica: musica}, function(data) {
            $('#nomeMusica').html(data.nome)
            $('#cifra').html(data.cifra)
            $('#nota').html(data.media)

            $.each(data.comentarios, function(i) {
                montaComentario(this)
            })
        })
    });

    function montaComentario(comentario) {

        $(`
                <h4 class="usuario-nome">${comentario.usuarioNome} comentou:</h4>
                <br>
                <p class="usuario-coment">${comentario.comentario}</p>
                <p>-----------------------------------------------</p>
          `).appendTo($('#espaco-comentarios'))
    }

})();









