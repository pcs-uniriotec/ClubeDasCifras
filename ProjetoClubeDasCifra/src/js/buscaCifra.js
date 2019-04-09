



    console.log("Ola mundo")

    var nomeMusica;
    var cifraMusica;



    $(document).ready(function() {
        // const objeto = JSON(Cifra);
        // console.log(objeto);

        // //cria uma variavel que ira possibilitar fazer requests
        // const xhr = new XMLHttpRequest()
        // //abre uma conexao usando o metodo get, com o endereco passado
        // xhr.open('GET', 'localhost:8082/getCifra')
        // //tipo de resposta
        // xhr.responseType = 'json'
        // //mandou as informacoes para o endereco passado, usando o metodo get
        // xhr.send()
        // //quando voltarem as informacoes, faca algo
        // xhr.addEventListener("load", function(){
        //     //response eh o conteudo inteiro que volta
        //     const objeto = xhr.response
        //     const nomeMusica = objeto.nomeMusica
        //     console.log(xhr.response)
        //     console.log(nomeMusica)
        // })

        // $http.get("localhost:8082/getCifra", function(data, status){
        //     alert("Data: " + data.nomeMusica + "\nStatus: " + status);
        // });

        $.ajax({
            url: '/getCifra',
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                console.log('ajax success!')
                console.log(data.nomeMusica)
                console.log(data.cifraMusica)
                nomeMusica= data.nomeMusica;
                cifraMusica= data.cifraMusica;
                $('.identidade').html(nomeMusica)
                $('#cifraMusicaPage').html(cifraMusica)
                console.log(cifraMusica)
                //$('.cifraMusicaPage').html = cifraMusica;
                console.log("Aqui 2")
            }
        })
        console.log('Aqui');


        // $.get("/getCifra", function(data, status){
        //     alert("Data: " + data.nomeMusica + "\nStatus: " + status);
        // });

        console.log("Ola Mundo")
    });



