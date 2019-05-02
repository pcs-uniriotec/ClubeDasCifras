(function(){
    const nota = $('#nota-output-id')
    const notaInput = $('#nota-input-id')
    var usuario
    var cifra


    function pegaUsuario() {         //busca objeto usuario no backend
        return JSON.parse(localStorage.getItem('usuario'))
    }

    function pegaCifra() {
        return localStorage.getItem('cifra')
    }

    notaInput.change(function () {
        console.log("Funciona")
        nota.html(notaInput.val())
    })

    $(':button[name="envia-nota"]').click(function(e) {
        e.preventDefault()
        usuario = pegaUsuario()
        cifraNome   = pegaCifra()
        $.post("/registraNota", {usuarioNome: usuario.nome, cifraNome: cifraNome, nota: notaInput.val()}, function(data){

        })
    })



    // notaInput.addEventListener("change", function() {
    //     console.log("teste")
    //     nota.html('oi 222')
    // })



})();