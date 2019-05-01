const db = require('./database')
const Musica = require('./musica')

class Cifra{

    constructor(nomeMusica, cifraMusica/*, usuarioAutor*/){

        this.cifra = cifraMusica
        //this.autor = usuarioAutor
        //this.media = 5

        this.musicaAchada = Musica.buscaMusica(nomeMusica);

        if(musicaAchada == Object) {
            this.musica = musicaAchada
        }else{
            this.musica = new Musica(nomeMusica)
        }

        this.musica.setCifra(this)

        // if(db.execute(`SELECT * FROM musica WHERE nome = "${this.nome}"`) == false){
        //     Musica = new musica(this.nome)
        // }

        //criaCifraBd()
    }
    //cria a cifra no banco refereciando a musica
    criaCifraBd(){
        db.execute(`INSERT INTO cifra (nome,musica) VALUES ("${this.nome}", "${this.cifra}")`)
    }

    media(nota){
        this.media = (media + nota)/2
        return media
    }

    media(){
        return media
    }

    static buscaMusica(nomeMusica){
        let musica
        musica = musicas.find(mus => mus.nome === nomeMusica)
        return musica
    }

  }

module.exports = Cifra