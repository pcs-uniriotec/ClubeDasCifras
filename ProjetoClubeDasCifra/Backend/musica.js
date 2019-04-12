const Busca = require('./busca')
class Musica{

    constructor (nome){

        this.nome = nome
        console.log('pre push')
        Musica.musicas.push(this)
        console.log(Musica.musicas)
        console.log('pos push')
        //criaMusicaBd()
    }

    //cria musica no banco musicas
    criaMusicaBd(){
        db.execute(`INSERT INTO musica (nome) VALUES ("${this.nome}")`)
    }

    setCifra(cifra){
        this.cifra = cifra
    }

    static buscaMusica(nome) {

        console.log('entra aqui')
        console.log(Musica.musicas)
        // Musica.musicas.forEach(function (value) {
        //     console.log('e aqui? sera q entra? Oi tomas')
        //     if(value.nome == nome) {
        //         console.log("Achei a musica")
        //         console.log(value)
        //          valor = value;
        //
        //     }
        //
        // })

        let musica = Musica.musicas.find(mus => mus.nome === nome)

        return musica;

    }


}

Musica.musicas = []
module.exports = Musica