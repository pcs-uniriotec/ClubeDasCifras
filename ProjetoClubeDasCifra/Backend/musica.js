class Musica{
    musicas = []

    constructor (nome){

        this.nome = nome
        console.log('pre push')
        musicas.push(this)
        console.log(musicas)
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
        console.log(musicas)

        let musica = musicas.find(mus => mus.nome === nome)

        return musica;

    }


}
module.exports = Musica