(function(){
        var usuarioGlobal = null
        var teste = 2
        const elementoLogin = $('#login')
        const elementoUsuario = $('#usuario')
        const botaoDeslogar = $(':button[name="deslogar"]')
        const botaoCriarCifra = $(':button[name="cria-cifra"]')



    function pegaUsuario() {
            var dadoRetorno = null
        $.ajax({
            url: '/getUsuario',
            type: 'GET',
            dataType: 'json',
            success: (data) => {

                dadoRetorno = data
                setUser(data)
                console.log('to no front')
                console.log(data)
                console.log(usuarioGlobal)
                verificaUsuario()
            }
            //console.log("ajax")
            // console.log("fora do ajax")
            // console.log(usuarioGlobal)
        })

    }

    function setUser(data) {
        console.log('To no set User')
        usuarioGlobal = data
        console.log(usuarioGlobal)
    }

    botaoDeslogar.click(function(){
        botaoDeslogar.addClass('invisible')
        setUser(null)
        verificaUsuario()
    })

        function verificaUsuario() {
        console.log("verifica usuario")
        console.log(usuarioGlobal)

        if(!elementoLogin.hasClass('invisible')){
            console.log(teste)

            if(usuarioGlobal !== undefined && usuarioGlobal !== null) {

                elementoLogin.addClass('invisible')
                botaoDeslogar.removeClass('invisible')
                $('#cadastro').addClass('invisible')
                $('#enviar-cifra').removeClass('invisible')
                elementoUsuario.html('user: '+usuarioGlobal.usuario)
            }
        }else {
            if(usuarioGlobal == null) {
                elementoLogin.removeClass('invisible')
                $('#cadastro').removeClass('invisible')
                $('#enviar-cifra').addClass('invisible')
                elementoUsuario.html('')
            }
        }
    }


    $(document).ready(function() {
        pegaUsuario()
        console.log("Esse aqui ó")
        console.log(usuarioGlobal)
        verificaUsuario()
    })




    $(':button[name="login"]').click(function() {
        console.log('entra')

        let user = $('input[name="usuario"]').val()
        let password = $('input[name="password"]').val()

        $.post("/login", {usuario: user, senha: password}, function(data) {
            usuarioGlobal = data
            console.log(usuarioGlobal)
            setUser(data)
            verificaUsuario()
        })

        console.log(usuarioGlobal)
        console.log("chega aqui")
    })





    botaoCriarCifra.click(function() {
        console.log("Entraaaaaaa")
        let musica = $('input[name="nomeMusica"]').val()
        let cifraRecebida = $('#cifra').val()

        console.log(musica)
        console.log(cifraRecebida)

        $.post("/enviarCifra", {nomeMusica: musica, cifra: cifraRecebida, user: usuarioGlobal}, function(data) {
            window.location = data
        })
        // $.post("/login", {usuario: user, senha: password}, function(data) {
        //     usuario = data
        //     console.log(usuario)
        //     setUser(data)
        //     verificaUsuario()
        // })

    })


})();