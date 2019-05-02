const db = require('./database')
const Musica = require('./musica')

class Cifra{
    constructor(nomeMusica, cifraMusica, autor){
        this.cifra = cifraMusica
        this.autor = autor
        this.verificaExistenciaMusica(nomeMusica)
        this.musica.setCifra(this)
        this.total = parseInt('0')
        this.avaliacoes = []
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

    registraAvaliacoes(usuario, nota){
        //let avaliacao = avaliacoes.find(user => user.nome === usuario.nome)
        console.log(usuario)
        console.log(this.avaliacoes[usuario])
        let avaliacao = this.avaliacoes[usuario]
        console.log(this.avaliacoes)
        console.log("AQUI È AVALIACAO "+ avaliacao)
        if(avaliacao !== null && avaliacao !== undefined) {
            console.log("AQUI ENTRAAAA")
            this.avaliacoes[usuario] = nota
             nota = avaliacao - nota
            console.log(nota)
            this.total -= nota
        }
        else{
            console.log("AQUI ENTRA PRIMEIRO")
            console.log(this.avaliacoes)
            this.avaliacoes[usuario]= nota
            console.log(this.avaliacoes)
            console.log(nota)
            this.total = parseInt(this.total) + parseInt(nota)
            console.log("TOTALLL")
            console.log("Total"+ this.total)
        }

    }

    calculaMedia(){
        console.log("AQUI Ó, TOTAL")
        console.log(this.total)
        console.log(this.avaliacoes)
        console.log(this.avaliacoes.length)
        console.log(Object.keys(this.avaliacoes).length)
        return this.total/Object.keys(this.avaliacoes).length
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