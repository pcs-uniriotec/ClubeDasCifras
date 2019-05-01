const Cifra = 
class Busca {
    static musicas = []

    constructor() {

    }

    static buscaMusica(nome) {
        console.log(musicas)
        findMusica = musicas.find(mus => mus.nome === nome)
        if(typeof(findMusica) == "object" )
        return findMusica
        else
        return cifra = new Cifra(nomeMusica = null, cifraMusica = "Cifra não encontrada");
    }
}
module.exports = Busca


