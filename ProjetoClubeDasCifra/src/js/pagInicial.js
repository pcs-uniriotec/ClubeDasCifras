(function(){
    const elementoLogin       = $('#login')
    const elementoUsuario     = $('#usuario')
    const botaoDeslogar       = $(':button[name="deslogar"]')
    const botaoLogar          = $('#logar')
    const botaoCriarCifra     = $(':button[name="cria-cifra"]')
    const loginOpcoes         = $('#login-opcoes')
    const linkEnviarCifra     = $('#enviar-cifra')
    const linkCadastro        = $('#cadastro')
    const usuarioInputLogin   = $('input[name="usuario"]')
    const senhaInputLogin     = $('input[name="password"]')
    const botaoBuscaCifra     = $('input[name="busca"]')
    const inputBuscaMusica    = $('#musica')
    const botaoLoginComGoogle = $('#google-login')


    $(document).ready(function() {      //roda quando a pagina termina de carregar
        verificaUsuario()
        buscaCifrasRankeadasPorNota()
        buscaCifrasRecentes()
    })

    function verificaUsuario() {                                     //verifica se usuario esta logado e conforme for faz alterações na página
        usuario = getUsuario()

        if(!loginOpcoes.hasClass('invisible')){

            if(usuario !== undefined && usuario !== null) {  //entra no if se usuario tiver logado
                elementoLogin.addClass('invisible')                      //torna o login invisivel, pois usuario ja logou
                linkCadastro.addClass('invisible')                     //torna invisivel link para cadastro
                loginOpcoes.addClass('invisible')
                botaoDeslogar.removeClass('invisible')                   //torna visivel botao de deslogar
                linkEnviarCifra.removeClass('invisible')              //torna visivel link para enviar cifra
                elementoUsuario.html('user: '+ usuario.usuario)     //define conteudo de elemento html com nome de usuario
            }
        }else {
            if(usuario == null) {                                  //entra no if se usuario n tiver logado
                linkEnviarCifra.addClass('invisible')                 //torna invisivel link para enviar cifra
                elementoLogin.removeClass('invisible')                   //torna visivel o login
                linkCadastro.removeClass('invisible')                  //torna visivel link para o cadastro
                loginOpcoes.removeClass('invisible')
                elementoUsuario.html('')                                 //elimina conteudo de elemento hmtl q diz nome do usuario
            }
        }
    }

    botaoDeslogar.click(function(){              //roda quando botao de deslogar é clicado
        botaoDeslogar.addClass('invisible')
        setUsuario(null)
        verificaUsuario()
    })



    botaoLogar.click(function() {                           //roda quando botao de login é clicado
        let user     = usuarioInputLogin.val()                         //pega nome do usuario atraves do input de login
        let password = senhaInputLogin.val()                    //pega senha do usuario atraves do input de login

        $.post("/login", {usuario: user, senha: password}, function(data) { //busca usuario com os respectivos nome e senha recebidos no input
            setUsuario(data)
            verificaUsuario()
        })
    })
    
    botaoBuscaCifra.click(function(e) {
        e.preventDefault()                                  //previne q a página recarregue
        let musica = inputBuscaMusica.val()                     //pega o valor inputado pelo usuário, no campo de nome de música
        setCifra(musica)                                    //seta o valor do elemento cifra do localStorage, com o nome de música passado pelo usuário

        window.location = '/cifra'                          //encaminha usuário para página de cifra
    })

    botaoLoginComGoogle.click( function () {
        var googleAuthProvider = new firebase.auth.GoogleAuthProvider

        return firebase.auth().signInWithPopup(googleAuthProvider)
            .then( function(data) {
                console.log(data)
                var idToken = data.credential.idToken
                var usuarioAux = {nome: data.user.displayName, usuario: data.user.displayName, senha:"",
                                  email: data.user.email, favoritas: [], cifrasCriadas: [], usuariosSeguidos: []}

                verificaExistenciaUsuario(usuarioAux)

            })
            .catch( function(error) {
                console.log(error)
            })
    })

    function verificaExistenciaUsuario(usuarioAux) {

        $.post('/verificaExistenciaUsuario', usuarioAux, function(data) {

            if(typeof data !== "object") {
                $.post("/registro", usuarioAux, function(data) {
                })
                setUsuario(usuarioAux)
            }else {
                setUsuario(data)
            }

            verificaUsuario()
        })
    }

    function buscaCifrasRankeadasPorNota() {
        $.post('/buscaCifrasMelhoresNotas', {}, function(data) {
            if(typeof data !== "object") {
                console.log("undefined")
            }else {
                console.log("ta entranu aqui")
                console.log(data)
                adicionaCifrasRankeadasPorNota(data)
            }
        })
    }

    function adicionaCifrasRankeadasPorNota(data) {
        console.log(data)
        for(let i = 0; i <= 4; i++) {
            $(`
                <br>
                <a href="/cifra"  onclick="localStorage.setItem('cifra', '${data.rankingCifras[i].nome}')">
                ${data.rankingCifras[i].nome}  <br> nota: ${data.rankingCifras[i].nota}</a>
                <br>
            `).appendTo($('#melhores-cifras'))
        }
    }

    function buscaCifrasRecentes() {
        $.post('/buscaCifrasRecentes', {}, function(data) {
            if(typeof data !== "object") {
                console.log("undefined")
            }else {
                console.log(data)
                adicionaCifrasRecentes(data)
            }
        })
    }

    function adicionaCifrasRecentes(data) {
        console.log(data)
        for(let i = 0; i <= 4; i++) {
            $(`
                <br>
                <a href="/cifra"  onclick="localStorage.setItem('cifra', '${data.cifrasRecentes[i].nome}')">
                ${data.cifrasRecentes[i].nome}
                <br>
            `).appendTo($('#cifras-recentes'))
        }
    }
    
    

})();