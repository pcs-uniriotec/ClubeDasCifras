(function(){

    const botaoFavoritar   = $(':button[name="favorita-cifra"]')
    const botaoExcluiCifra = $('#exclui-cifra')
    const opcoesCriador    = $('#opcoes-criador')
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

        if(usuario.cifrasCriadas.find(cifra => cifraNome)) {
            opcoesCriador.removeClass('invisible')
        }else{
            opcoesCriador.addClass('invisible')
        }

        let musica = getCifra()

        $.post("/buscaCifra", {musica: musica}, function(data) {
            console.log(data)
            if(typeof data !== "object") {
                window.location = '/'
                console.log(data)
            }else {
                $('#nomeMusica').html(data.nome)
                $('#cifra').html(data.cifra)
                $('#nota').html(data.media)

                $.each(data.comentarios, function(i) {
                    montaComentario(this)
                })
            }
        })
    });

    function montaComentario(comentario) {

        $(`
                <h4 class="usuario-nome">
                <a href="/getVisitaPerfil" 
                   onclick="localStorage.setItem('usuarioVisitado', '${comentario.usuarioNome}')">${comentario.usuarioNome}</a>
                    comentou:
                </h4>
                <br>
                <p class="usuario-coment">${comentario.comentario}</p>
                <p>-----------------------------------------------</p>
          `).appendTo($('#espaco-comentarios'))
    }

})();









