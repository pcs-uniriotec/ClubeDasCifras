class musica{
    constructor(nome){
        this.nome = nome   
    }

    //cria musica no banco musicas
    criaMusica(){
        db.execute(`INSERT INTO musica (nome) VALUES ("${this.nome}")`)
    }
}
module.exports = musica