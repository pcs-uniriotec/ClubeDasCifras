const Musica = require("./musica.js")

// var exports = module.exports

var musicas = new Array()
class Busca {

    constructor() {
    }

    static buscaMusica(nome) {
        console.log('entra aqui')
        console.log(Musica.musicas)
        Musica.musicas.forEach(function (value) {
            console.log('e aqui? sera q entra? Oi tomas')
            if(value.nome == nome)
                return value

        })
        return null
    }



}
module.exports = Busca
//module.exports.var = musicas

