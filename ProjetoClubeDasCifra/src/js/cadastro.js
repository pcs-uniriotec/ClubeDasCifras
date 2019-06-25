(function () {

    $('#submitbtn').click(function() {
        let username = $('input[name="usuario"]').val()
        let password = $('input[name="senha"]').val()
        let nome     = $('input[name="nome"]').val()
        let email    = $('input[name="email"]').val()

        setUsuario({'nome': nome, 'usuario': username, 'senha': password, 'email': email, 'favoritas': [],
            'cifrasCriadas': [], 'usuariosSeguidos': []})

        var actionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be whitelisted in the Firebase Console.
            url: 'https://www.example.com/finishSignUp?cartId=1234',
            // This must be true.
            handleCodeInApp: true,
            iOS: {
                bundleId: 'com.example.ios'
            },
            android: {
                packageName: 'com.example.android',
                installApp: true,
                minimumVersion: '12'
            },
            dynamicLinkDomain: 'example.page.link'
        };
    })


})();