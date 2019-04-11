const Musica = require("./musica.js")

var musicas = new Array()
class Busca {

    constructor() {
    }

    static buscaMusica(nome) {
        console.log('entra aqui')
        musicas.forEach(function (value) {
            console.log('e aqui? sera q entra? Oi tomas')
            if(value.nome == nome)
                return value

        })
        return null
    }



}
module.export = Busca
module.export.var = musicas

