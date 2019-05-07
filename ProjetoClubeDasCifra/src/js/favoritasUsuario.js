(function() {

    $(document).ready(function () {
        usuario = getUsuario()
        listaCifras()
    })


    function listaCifras() {
        $.each(usuario.favoritas, function(i) {

             $(`
                <a href="/cifra" id="${this}" onclick="localStorage.setItem('cifra', '${this}')">${this}</a><br>
            `).appendTo($('#favoritas'))
        })
    }

    $('#favoritas').children().on('click', function () {
        console.log(this)
        console.log("Pelo menos entrou")
    })


})()