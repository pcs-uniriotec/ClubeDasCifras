const db = require('./database')

class cifra{
    constructor(nome, musica /*instrumento, afinacao*/){
        this.nome = nome
        this.musica = musica
        //this.instrumento = instrumento
        //this.afinacao = afinacao
    }
    //cria a cifra no banco refereciando a musica
    criaCifra(){
        if(db.execute(`SELECT * FROM cifra WHERE musica = "${this.nome}"`) == false)
        db.execute(`INSERT INTO cifra (nome,musica) VALUES ("${this.nome}", "${this.musica}")`)
        else
        
    }
    /*adiciona trecho no banco trecho da cifra 
    addTrecho(){

    }*/
    
  }
module.exports = cifra