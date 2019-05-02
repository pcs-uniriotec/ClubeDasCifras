const db = require('./database')
const Musica = require('./musica')

class Cifra{
    constructor(nomeMusica, cifraMusica, autor){
        this.cifra = cifraMusica
        this.verificaExistenciaMusica(nomeMusica)
        this.musica.setCifra(this)
        this.media 
        this.total = []
        this.usuarioAva = []
        this.usuarioAutor = autor
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

    mediaCifra(usuario, nota){
        if(typeOf(usuarioAva.find(user => user.nome === nome)) == "object")
           fazMedia(total, usuarioAva.length())
        else
           this.usuarioAva = usuario
           this.total = nota
           fazMedia(total, usuarioAva.length())
    }
    fazMedia(total, avaliacoes){
        this.media = total/avaliacoes
        return this.media
    }

    fazComentario(comentario){
        this.comentarios = comentario
    }

    retornaComentarios(){
        return comentarios
    }

    static excluiCifra(cifra){
        Musica.buscaMusica(cifra.nome).cifra = null

    }

}

module.exports = Cifra