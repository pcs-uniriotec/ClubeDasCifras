(function () {

    $('#submitbtn').click(function() {
        let username = $('input[name="username"]').val()
        let password = $('input[name="password"]').val()
        let nome = $('input[name="nome"]').val()
        let email = $('input[name="email"]').val()
        localStorage.setItem('usuario', JSON.stringify({'nome': nome, 'usuario': username, 'senha': password, 'email': email}))
    })


})();