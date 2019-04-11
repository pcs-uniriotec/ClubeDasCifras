const express = require('express'); //chamada para o express

const createDbConnection = require('./database');
const app = express();
const port = 8082;
let Cifra = require('./cifra.js')
let db = null;
let path = require('path');
let caminho = path.join(__dirname, '../src');
const Busca = require('./busca.js')
const Musica = require('./musica')

app.use(express.static(caminho));
app.use(express.urlencoded());





app.get('/', (req, res) => {
    res.sendFile(caminho + '/html/pagInicial.html');
})

app.get('/form', (req, res) => {
    res.sendFile(caminho + '/html/envCifra.html');
})

app.get('/cifra', (req, res) => {
    res.sendFile(caminho + '/html/pagCifra.html');
})

app.get('/getCifra', (req, res) => {
    res.json({'nome': musica.nome, 'cifra': musica.cifra.cifra});
})



var cifra = null;
var musica = null;

app.post('/form', (req, res) => {
    const nomeMusica = req.body.nomeMusica;
    const cifraMusica = req.body.cifra;

    cifra = new Cifra(nomeMusica, cifraMusica);
    musica = cifra.musica
    //Cifra.criaCifra;

    console.log(cifra.musica.nome);
    console.log(cifra)
    res.redirect('/cifra'); //redireciona para a página de cifra


})

app.post('/buscaCifra', (req, res) => {
    const nomeMusica = req.body.musica
    musica = Musica.buscaMusica(nomeMusica);
    console.log('Entao so pode ser aqui')
    console.log(musica)



    res.redirect('/cifra'); //redireciona para a página de cifra


})

//-------------------------------------------------- banco de daddos -----------------------------
app.get('/api/list', async (req, res) => {
    const result = await db.query('SELECT * FROM `entries`');
    const rows = result[0];

    res.send(rows);
});  //pega tudo da entrada, ou seja, do banco.


app.use(express.static('static'));

app.get('/api/insert/:code', async (req, res) => {
    let code = req.params.code;  //recebe o valor do parametro codigicado.
    let para = req.query.param; // recebe o valor do parametro codificado.

    let noCut = code.substr(4, 6);

    const result = await db.execute(`INSERT INTO entries (code,param) VALUES ("${noCut}", "${para}")`);
//interaçao com o banco de dados

    res.send({status: true});
});

async function startup() {
//    db = await createDbConnection();

    app.listen(port, () => console.log(`app listening on port ${port}!`));
}
//servidor responde na porta x

startup();


