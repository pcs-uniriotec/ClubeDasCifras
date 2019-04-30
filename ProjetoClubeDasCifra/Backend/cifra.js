const db = require('./database')
const Musica = require('./musica')

class Cifra{

    constructor(nomeMusica, cifraMusica/*, usuarioAutor*/){

        this.cifra = cifraMusica
        //this.autor = usuarioAutor

        console.log('chega aqui')
        let musicaAchada = Musica.buscaMusica(nomeMusica);
        console.log('passouuuuuu')

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
  }
module.exports = Cifra