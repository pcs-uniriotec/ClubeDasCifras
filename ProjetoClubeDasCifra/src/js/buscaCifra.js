(function(){

    $(document).ready(function() {

        $.ajax({
            url: '/getCifra',
            type: 'GET',
            dataType: 'json',
            success: (data) => {

                console.log('ajax success!')
                $('#nomeMusica').html(data.nome)
                $('#cifra').html(data.cifra)

            }
        })

    });


})();









