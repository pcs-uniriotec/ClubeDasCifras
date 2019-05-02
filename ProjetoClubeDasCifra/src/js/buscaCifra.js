(function(){

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


    let musica = localStorage.getItem('cifra')
    console.log(musica)
    $.post("/buscaCifra", {musica: musica}, function(data) {
        $('#nomeMusica').html(data.nome)
        $('#cifra').html(data.cifra)
        $('#nota').html(data.media)
    })

    });

})();









