const express = require('express'); //chamada para o express

const createDbConnection = require('./database');
let Cifra = require('./cifra.js')
const Usuario = require('./usuario.js')
const app = express();
const port = 8082;
let db = null;
let path = require('path');
let caminho = path.join(__dirname, '../src');
const Musica = require('./musica')
const bodyParser = require('body-parser')

var cifra = null;
var musica = null;
var usuarioBackend = null;

app.use(bodyParser.json());
app.use(express.static(caminho));
app.use(express.urlencoded());





app.get('/', (req, res) => {
    res.sendFile(caminho + '/html/pagInicial.html');
})

app.get('/enviarCifra', (req, res) => {
    res.sendFile(caminho + '/html/envCifra.html');
})

app.get('/cifra', (req, res) => {
    res.sendFile(caminho + '/html/pagCifra.html');
})

app.get('/cadastro', (req, res) => {
    res.sendFile(caminho + '/html/cadastro.html')
})

// app.get('/getCifra', (req, res) => {
//     console.log("Entra nesse get aqui")
//     let nomeMusica = req.body.musica
//     console.log(nomeMusica)
//     musica = Musica.buscaMusica(nomeMusica)
//     console.log(musica)
//     res.json({'nome': musica.nome, 'cifra': musica.cifra.cifra});
// })

app.get('/getUsuario', (req, res) => [
    //res.json(usuarioBackend)
    res.json({'nome': usuarioBackend.nome, 'usuario': usuarioBackend.usuario, 'email': usuarioBackend.email})
])





app.post('/enviarCifra', (req, res) => {
    const nomeMusica = req.body.nomeMusica;
    const cifraMusica = req.body.cifra;
    const autor = req.body.autor;

    // usuario = req.body.user;

    cifra = new Cifra(nomeMusica, cifraMusica, autor);
    usuarioBackend.setCifra(cifra);
    musica = cifra.musica
    //Cifra.criaCifra;
    res.redirect('/cifra'); //redireciona para a página de cifra
})

app.post('/buscaCifra', (req, res) => {
    const nomeMusica = req.body.musica
    musica = Musica.buscaMusica(nomeMusica);
    console.log('Entao so pode ser aqui')
    console.log(musica)
    res.json({nome: musica.nome, cifra: musica.cifra.cifra, media: musica.cifra.calculaMedia()})
    // res.redirect('/cifra'); //redireciona para a página de cifra
})

app.post('/registro', (req, res) => {
    let nome = req.body.nome
    let usuario = req.body.username
    let senha = req.body.password
    let email = req.body.email

    usuarioBackend = new Usuario(nome, usuario, senha, email)
    res.redirect('/')
})

app.post('/login', (req, res) => {
    console.log("bem aqui")
    console.log(usuarioBackend)
    let usuario = req.body.usuario
    let senha = req.body.senha
    console.log(usuario)

    usuarioBackend = Usuario.verificaUsuario(usuario, senha)

    res.json({'nome': usuarioBackend.nome, 'usuario': usuarioBackend.usuario,'senha': usuarioBackend.password, 'email': usuarioBackend.email}).redirect('/')

})

app.post('/registraNota', (req, res) => {
    let usuarioNome = req.body.usuarioNome
    let cifraNome = req.body.cifraNome
    let nota = req.body.nota

    usuario = Usuario.buscaUsuario(usuarioNome)
    musica = Musica.buscaMusica(cifraNome)

    musica.cifra.registraAvaliacoes(usuarioNome, nota)
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


