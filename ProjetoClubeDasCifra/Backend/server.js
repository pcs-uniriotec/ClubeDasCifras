const express = require('express'); //chamada para o express

const createDbConnection = require('./database');
const app = express();
const port = 8082;
let Cifra = require('./cifra.js')
let db = null;
let path = require('path');
let caminho = path.join(__dirname, '../src');
const Busca = require('./busca.js')

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
    res.json(cifra);
})



var cifra = null;

app.post('/form', (req, res) => {
    const nomeMusica = req.body.nomeMusica;
    const cifraMusica = req.body.cifra;


    //Cifra.criaCifra;

    cifra = Cifra.buscaCifra(nomeMusica, cifraMusica, res);

    console.log(cifra.nomeMusica);
    console.log(cifra.cifraMusica);
    console.log(cifra)
})

app.post('/buscaCifra', (req, res) => {
    const nomeMusica = req.body.musica
    let musicaAchada = Busca.Busca.buscaMusica(nomeMusica)

    console.log(musicaAchada)

    cifra = musicaAchada.cifra

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


