(function () {

    $('#submitbtn').click(function() {
        let username = $('input[name="usuario"]').val()
        let password = $('input[name="senha"]').val()
        let nome     = $('input[name="nome"]').val()
        let email    = $('input[name="email"]').val()

        setUsuario({'nome': nome, 'usuario': username, 'senha': password, 'email': email, 'favoritas': [],
            'cifrasCriadas': [], 'usuariosSeguidos': []})
    })


})();