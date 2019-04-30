const Musica = require("./musica.js")
class Busca {

    constructor() {
    }

    static buscaMusica(nome) {
        console.log(Musica.musicas)
        Musica.musicas.forEach(function (value) {
            if(value.nome == nome)
                return value
        })
        return null
    }
}
module.exports = Busca


