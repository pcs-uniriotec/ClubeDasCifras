const Busca = require("./busca.js")

class Musica{
    cifras = []

    constructor (nome){

        this.nome = nome
        console.log('pre push')
        Busca.musicas.push(this)
        console.log(musicas)
        console.log('pos push')
        //criaMusicaBd()
    }

    //cria musica no banco musicas
    criaMusicaBd(){
        db.execute(`INSERT INTO musica (nome) VALUES ("${this.nome}")`)
    }

    addCifra(cifra){
        this.cifras = cifra
    }

    static buscaCifra(nome) {

        console.log('entra aqui')
        console.log(musicas)

        findCifra = cifras.find(cif => cif.nome === nome)

        return findCifra;

    }
}
module.exports = Musica