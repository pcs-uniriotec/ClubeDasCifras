(function(){

    const botaoFavorita = $(':button[name="favorita-cifra"]')
    var usuario


    function setUser(data) {
        localStorage.setItem('usuario', JSON.stringify(data))
    }

    function pegaUsuario() {         //busca objeto usuario no backend
        return JSON.parse(localStorage.getItem('usuario'))
    }

    function pegaCifra() {
        return localStorage.getItem('cifra')
    }

    $(document).ready(function() {

    //     $.ajax({
    //         url: '/getCifra',
    //         type: 'GET',
    //         dataType: 'json',
    //         success: (data) => {
    //
    //             console.log('ajax success!')
    //             console.log(data.nome)
    //             console.log(data.cifra)
    //             $('#nomeMusica').html(data.nome)
    //             $('#cifra').html(data.cifra)
    //
    //         }
    //     })
    //

        usuario = pegaUsuario()

        console.log(usuario)

        if(usuario.favoritas.find(cifra => cifra === pegaCifra()) !== null && usuario.favoritas.find(cifra => cifra === pegaCifra()) !== undefined) {
            console.log("Entro no if")
            botaoFavorita.addClass('invisible')
        }else{
            console.log("Entro no else")
            botaoFavorita.removeClass('invisible')
        }


    let musica = localStorage.getItem('cifra')
    console.log(musica)
    $.post("/buscaCifra", {musica: musica}, function(data) {
        $('#nomeMusica').html(data.nome)
        $('#cifra').html(data.cifra)
        $('#nota').html(data.media)

        console.log(data.nome)
        console.log(data.cifra)

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









