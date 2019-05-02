(function(){
    var usuario = null
    const elementoLogin = $('#login')
    const elementoUsuario = $('#usuario')
    const botaoDeslogar = $(':button[name="deslogar"]')
    const botaoCriarCifra = $(':button[name="cria-cifra"]')





    $(document).ready(function() {      //roda quando a pagina termina de carregar
        verificaUsuario()
    })

    function pegaUsuario() {         //busca objeto usuario no backend
        return JSON.parse(localStorage.getItem('usuario'))
    }

    function setUser(data) {
        localStorage.setItem('usuario', JSON.stringify(data))
    }


    function verificaUsuario() {                                     //verifica se usuario esta logado e conforme for faz alterações na página
        usuario = pegaUsuario()

        if(!elementoLogin.hasClass('invisible')){

            if(usuario !== undefined && usuario !== null) {  //entra no if se usuario tiver logado
                elementoLogin.addClass('invisible')                      //torna o login invisivel, pois usuario ja logou
                botaoDeslogar.removeClass('invisible')                   //torna visivel botao de deslogar
                $('#cadastro').addClass('invisible')                     //torna invisivel link para cadastro
                $('#enviar-cifra').removeClass('invisible')              //torna visivel link para enviar cifra
                elementoUsuario.html('user: '+ usuario.usuario)     //define conteudo de elemento html com nome de usuario
            }
        }else {
            if(usuario == null) {                                  //entra no if se usuario n tiver logado
                elementoLogin.removeClass('invisible')                   //torna visivel o login
                $('#cadastro').removeClass('invisible')                  //torna visivel link para o cadastro
                $('#enviar-cifra').addClass('invisible')                 //torna invisivel link para enviar cifra
                elementoUsuario.html('')                                 //elimina conteudo de elemento hmtl q diz nome do usuario
            }
        }
    }

    botaoDeslogar.click(function(){              //roda quando botao de deslogar é clicado
        botaoDeslogar.addClass('invisible')
        setUser(null)
        verificaUsuario()
    })



    $(':button[name="login"]').click(function() {                           //roda quando botao de login é clicado

        let user = $('input[name="usuario"]').val()                         //pega nome do usuario atraves do input de login
        let password = $('input[name="password"]').val()                    //pega senha do usuario atraves do input de login

        // console.log(JSON.parse(localStorage.getItem('usuario')))
        // localStorage.setItem('nome', data.nome)
        // localStorage.setItem('usuario', data.usuario)
        // localStorage.setItem('email', data.email)
        //setUser(data)
        // verificaUsuario()

        $.post("/login", {usuario: user, senha: password}, function(data) { //busca usuario com os respectivos nome e senha recebidos no input
            setUser(data)
            verificaUsuario()
        })
    })


    $('input[name="busca"]').click(function(e) {
        e.preventDefault()
        let musica = $('#musica').val()
        localStorage.setItem('cifra', musica)

        console.log(musica)
        // $.post("/buscaCifra", {musica: musica}, function(data) {
        //     console.log(data)
        //     console.log(cifra)
        //     window.location = '/cifra'
        // })

        window.location = '/cifra'

        // $.post("/buscaCifra", {musica: musica}, function(data) {
        //     console.log(data)
        //     console.log(cifra)
        //     window.location = '/cifra'
        // })
    })



    // botaoCriarCifra.click(function() {
    //     let musica = $('input[name="nomeMusica"]').val()      //recebe por input nome da musica
    //     let cifraRecebida = $('#cifra').val()                 //recebe cifra pelo input de textarea
    //
    //     $.post("/enviarCifra", {nomeMusica: musica, cifra: cifraRecebida, user: usuarioGlobal}, function(data) {
    //         window.location = data
    //     })
        // $.post("/login", {usuario: user, senha: password}, function(data) {
        //     usuario = data
        //     console.log(usuario)
        //     setUser(data)
        //     verificaUsuario()
        // })

    // })


})();