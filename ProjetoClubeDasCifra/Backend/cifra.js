const db = require('./database')
const Musica = require('./musica')

const server             = require('./iniciaFirebase.js')

const database = server.firebase
const musicasRef   = database.ref("/Musicas")

class Cifra{
    constructor(nomeMusica, cifraMusica, autor){
        this.cifra = cifraMusica
        this.autor = autor
        this.total = parseInt('0')
        this.avaliacoes = []
        this.comentarios = []
        this.verificaExistenciaMusica(nomeMusica)//inverti a ordem mas acho q n vai legar
        this.musica.setCifra(this)
        Cifra.atualizacifrasCriadasRecentes(this.musica.nome)
    }

    alteraCifra(cifra) {
        this.cifra = cifra
    }

    verificaExistenciaMusica(nomeMusica) {//verifica se a musica da cifra sendo instanciada ja existe no sistema
        //com o firebase sera retornado um objeto musica key
        let musicaAchada = Musica.buscaMusica(nomeMusica);

        if(musicaAchada == Object) {
            this.musica = musicaAchada
        }else{
            this.musica = new Musica(nomeMusica) //caso nao exista cria uma musica com aquele nome
        }

        // if(typeof musicaAchada !== "object") {
        //     musicaAchada = Musica.buscaMusica(nomeMusica);
        // }
        //
        // let key = musicaAchada.key
        // musicasRef.child(key).child('/cifras').push(this)
    }

    static getCifrasCriadasRecentes() {
        return Cifra.cifrasCriadasRecentes
    }

    static atualizacifrasCriadasRecentes(nomeMusica) {
        Cifra.cifrasCriadasRecentes.splice(0, 0, {nome: nomeMusica})

        if(Cifra.cifrasCriadasRecentes.length > 10) {
            Cifra.cifrasCriadasRecentes.splice(10, 0)
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
        Cifra.rankeiaCifras(this.musica.nome, this.calculaMedia())
    }

    static rankeiaCifras(nomeMusica, total) {
        if(Cifra.rankingCifrasNota.length === 0) {
            Cifra.rankingCifrasNota.push({nome: nomeMusica, nota: total})
        }else {
            let cifra = Cifra.rankingCifrasNota.find(cifra => cifra.nome === nomeMusica)
            if(cifra) {
                let posicao = Cifra.rankingCifrasNota.indexOf(cifra)
                Cifra.rankingCifrasNota.splice(posicao, 1)
            }
            let verificaEntrada
            for(let i = Cifra.rankingCifrasNota.length - 1; i >= 0; i--) {

                if(Cifra.rankingCifrasNota[i].nota > total) {
                    Cifra.rankingCifrasNota.splice(i + 1, 0, {nome: nomeMusica, nota: total})
                    i = -1
                    verificaEntrada = true
                    break;
                }
            }
            if(!verificaEntrada) {
                Cifra.rankingCifrasNota.splice(0, 0, {nome: nomeMusica, nota: total})
            }
            if(Cifra.rankingCifrasNota.length > 10) {
                Cifra.rankingCifrasNota.splice(10, 1)
            }
        }
    }

    static getCifrasMelhoresNotas() {
        return Cifra.rankingCifrasNota
    }

    calculaMedia(){
        console.log("AQUI Ó, TOTAL")
        console.log(this.total)
        console.log(this.avaliacoes)
        console.log(this.avaliacoes.length)
        console.log(Object.keys(this.avaliacoes).length)
        return this.total/Object.keys(this.avaliacoes).length
    }

    addComentario(usuarioNome, comentario){
        this.comentarios.push({usuarioNome: usuarioNome, comentario: comentario})
    }

    getComentarios() {
        return this.comentarios
    }

    retornaComentarios(){
        return comentarios
    }

    static excluiCifra(cifra){
        Musica.buscaMusica(cifra.musica.nome).cifra = null

    }

}
Cifra.rankingCifrasNota = []
Cifra.cifrasCriadasRecentes = []
module.exports = Cifra