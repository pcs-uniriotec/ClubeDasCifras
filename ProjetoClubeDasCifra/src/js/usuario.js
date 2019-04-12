(function(){
    var usuario = null
    const elementoLogin = $('#login')
    const elementoUsuario = $('#usuario')
    const botaoDeslogar = $(':button[name="deslogar"]')

    function verificaUsuario() {

        if(!elementoLogin.hasClass('invisible')){

            if(usuario !== null) {

                elementoLogin.addClass('invisible')
                botaoDeslogar.removeClass('invisible')
                $('#cadastro').addClass('invisible')
                $('#enviar-cifra').removeClass('invisible')
                elementoUsuario.html('user: '+usuario.usuario)
            }
        }else {
            if(usuario == null) {
                elementoLogin.removeClass('invisible')
                $('#cadastro').removeClass('invisible')
                $('#enviar-cifra').addClass('invisible')
                elementoUsuario.html('')
            }
        }
    }


    $(document).ready(function() {
        verificaUsuario()
    })

    function setUser(data) {
        console.log('To no set User')
        console.log(data)
        usuario = data
    }


    $(':button[name="login"]').click(function() {
        console.log('entra')

        let user = $('input[name="usuario"]').val()
        let password = $('input[name="password"]').val()


        $.post("/login", {usuario: user, senha: password}, function(data) {
            usuario = data
            console.log(usuario)
            setUser(data)
            verificaUsuario()
        })
        console.log(usuario)
        console.log("chega aqui")
    })

    botaoDeslogar.click(function(){
        botaoDeslogar.addClass('invisible')
        setUser(null)
        verificaUsuario()
    })


})();