const Busca = require('./busca')
class Musica{
    constructor (nome){
        this.nome = nome
        Musica.musicas.push(this)
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
        let musica = Musica.musicas.find(mus => mus.nome === nome)
        return musica;
    }

}

Musica.musicas = []
module.exports = Musica