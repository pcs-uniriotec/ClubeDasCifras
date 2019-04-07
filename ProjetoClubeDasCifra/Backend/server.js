const express = require('express'); //chamada para o express

const createDbConnection = require('./database');
const app = express();
const port = 8082;
let db = null;
let cifraClass = require('./cifra')


let path = require('path');
let caminho = path.join(__dirname, '../src');

app.get('/', (req, res) => {
    res.sendFile(caminho + '/pagInicial.html');
})

app.get('/form', (req, res) => {
    res.sendFile(caminho + '/envCifra.html');
})

app.use(express.urlencoded());

app.post('/form', (req, res) => {
    const nomeMusica = req.body.nomeMusica;
    const cifra = req.body.cifra;

    let cifraObject = new cifraClass(nomeMusica, cifra)
    cifraObject.criaCifra()

    console.log(nomeMusica);
    console.log(cifra);
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
    db = await createDbConnection();

    app.listen(port, () => console.log(`app listening on port ${port}!`));
}
//servidor responde na porta x

startup();


