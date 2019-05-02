(function(){
    const nota = $('#nota-output-id')
    const notaInput = $('#nota-input-id')


    notaInput.change(function () {
        console.log("Funciona")
        nota.html(notaInput.val())
    })

    $(':button[name="envia-nota"]').click(function() {
        $.post("/registraNota", {'nota': notaInput.val()}, function(data){

        })
    })

    // notaInput.addEventListener("change", function() {
    //     console.log("teste")
    //     nota.html('oi 222')
    // })



})();