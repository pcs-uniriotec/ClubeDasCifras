const db = require('./database')
const musica = require('./musica')

class cifra{
    constructor(musica, cifraMusica){
        this.nomeMusica = musica
        this.cifraMusica = cifraMusica
        Musica = new musica(nomeMusica)
    }
    //cria a cifra no banco refereciando a musica
    criaCifra(){
        if(db.execute(`SELECT * FROM cifra WHERE musica = "${this.nome}"`) == false){
            Musica.criarMusica()
            db.execute(`INSERT INTO cifra (nome,musica) VALUES ("${Musica.nome}", "${this.cifraMusica}")`)
        }else
        db.execute(`INSERT INTO cifra (nome,musica) VALUES ("${Musica.nome}", "${this.cifraMusica}")`)
    }
  }
module.exports = cifra