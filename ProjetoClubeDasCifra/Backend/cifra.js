const db = require('./database')
const Musica = require('./musica')

class Cifra{
    constructor(nomeMusica, cifraMusica, autor){
        this.cifra = cifraMusica
        this.autor = autor
        this.verificaExistenciaMusica(nomeMusica)
        this.musica.setCifra(this)
        this.total
        this.avaliacoes = {}
        this.comentarios = []

        // if(db.execute(`SELECT * FROM musica WHERE nome = "${this.nome}"`) == false){
        //     Musica = new musica(this.nome)
        // }

        //criaCifraBd()
    }

    //cria a cifra no banco refereciando a musica
    criaCifraBd(){
        db.execute(`INSERT INTO cifra (nome,musica) VALUES ("${this.nome}", "${this.cifra}")`)
    }

    verificaExistenciaMusica(nomeMusica) {//verifica se a musica da cifra sendo instanciada ja existe no sistema
        let musicaAchada = Musica.buscaMusica(nomeMusica);

        if(musicaAchada == Object) {
            this.musica = musicaAchada
        }else{
            this.musica = new Musica(nomeMusica) //caso nao exista cria uma musica com aquele nome
        }
    }

    // mediaCifra(usuario, nota){
    //     let avaliacao = avaliacoes.find(user => user.nome === usuario.nome)
    //     if(avaliacao !== null && avaliacao !== undefined) {
    //         let nota =
    //     }
    //     else{
    //         this.avaliacoes.push({usuario.nome: nota})
    //         this.total += nota
    //     }
    //     calculaMedia(total, avaliacoes.length())
    // }

    calculaMedia(total, avaliacoes){
        return total/avaliacoes
    }

    addComentario(comentario){
        this.comentarios.push(comentario)
    }

    retornaComentarios(){
        return comentarios
    }

    static excluiCifra(cifra){
        Musica.buscaMusica(cifra.musica.nome).cifra = null

    }

}

module.exports = Cifra