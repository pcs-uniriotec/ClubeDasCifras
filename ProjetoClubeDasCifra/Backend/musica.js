
const server             = require('./iniciaFirebase.js')

const database = server.firebase
const musicasRef = database.ref("/Musicas")



class Musica{
    constructor (nome){
        this.nome = nome
        this.addMusicaBanco(this.nome)
        Musica.musicas.push(this)
        this.cifras = []
        //criaMusicaBd()
    }

    //cria musica no banco musicas
    criaMusicaBd(){
        db.execute(`INSERT INTO musica (nome) VALUES ("${this.nome}")`)
    }

    
    setCifra(cifra){
        this.cifra = cifra
        //addCifra(cifra)
    }

    addCifra(cifra){
        this.cifras = cifra
    }

    addMusicaBanco(nomeMusica) {
        musicasRef.push({nome: nomeMusica})
            .then( function() {
                console.log("Funciona")
            })
            .catch( function(erro) {
                console.log(erro)
            })
    }


    static buscaMusica(nome) {

        musicasRef.on("value", function (snapshot) {
            let keys = Object.keys(snapshot.val())
            keys.forEach(function (key) {
                if(snapshot.val()[key].nome == nome){
                    // return {musica: snapshot.val()[key], key: key}
                }else{
                    // return undefined
                }
            })
        }, function(erro) {
            console.log(erro)
        })

        let musica = Musica.musicas.find(mus => mus.nome === nome)
        return musica;
    }

}

Musica.musicas = []
module.exports = Musica