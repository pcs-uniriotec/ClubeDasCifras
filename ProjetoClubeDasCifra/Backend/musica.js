const busca = require('./busca')
class Musica{

    constructor (nome){

        this.nome = nome
        busca.push(this)
        //criaMusicaBd()
    }

    //cria musica no banco musicas
    criaMusicaBd(){
        db.execute(`INSERT INTO musica (nome) VALUES ("${this.nome}")`)
    }

    setCifra(cifra){
        this.cifra = cifra
    }


}
module.exports = Musica