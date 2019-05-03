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



function enviaUsuario(res, usuario) {
    res.json({'nome': usuario.nome, 'usuario': usuario.usuario,'senha': usuario.password,
        'email': usuario.email, 'favoritas': usuario.getFavoritas(), 'cifrasCriadas': usuario.getCifras()})
}



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

app.get('/getCifrasUsuario', (req, res) => {
    res.sendFile(caminho + '/html/cifrasUsuario.html')
})

app.get('/getFavoritasUsuario', (req, res) => {
    res.sendFile(caminho + '/html/favoritasUsuario.html')
})

app.get('/getPerfilUsuario', (req, res) => {
    res.sendFile(caminho + '/html/perfilUsuario.html')
})





app.post('/enviarCifra', (req, res) => {
    const nomeMusica = req.body.nomeMusica;
    const cifraMusica = req.body.cifra;
    const autor = req.body.autor;

    // usuario = req.body.user;

    cifra = new Cifra(nomeMusica, cifraMusica, autor);
    usuario = Usuario.buscaUsuario(autor)
    console.log(nomeMusica)
    usuario.setCifra(nomeMusica);
    console.log("EUUUUUOOOOOOOOO")
    console.log(usuario.getCifras())
    musica = cifra.musica
    //Cifra.criaCifra;
    enviaUsuario(res, usuario)
    // res.redirect('/cifra'); //redireciona para a página de cifra
})

app.post('/buscaCifra', (req, res) => {
    const nomeMusica = req.body.musica
    musica = Musica.buscaMusica(nomeMusica);
    console.log('Entao so pode ser aqui')
    console.log(musica)
    res.json({nome: musica.nome, cifra: musica.cifra.cifra, media: musica.cifra.calculaMedia(), comentarios: musica.cifra.getComentarios()})
    // res.redirect('/cifra'); //redireciona para a página de cifra
})

app.post('/registro', (req, res) => {
    let nome = req.body.nome
    let usuario = req.body.username
    let senha = req.body.password
    let email = req.body.email

    usuarioBackend = new Usuario(nome, usuario, senha, email)
    console.log("AQUIIIII")
    console.log(usuarioBackend)
    res.redirect('/')
})

app.post('/login', (req, res) => {
    console.log("bem aqui")
    console.log(usuarioBackend)
    let usuario = req.body.usuario
    let senha = req.body.senha
    console.log(usuario)

    usuarioBackend = Usuario.verificaUsuario(usuario, senha)

    enviaUsuario(res, usuarioBackend)
    // res.json({'nome': usuarioBackend.nome, 'usuario': usuarioBackend.usuario,'senha': usuarioBackend.password,
    //         'email': usuarioBackend.email, 'favoritas': usuarioBackend.getFavoritas(), 'cifrasCriadas': usuarioBackend.getCifras()}).redirect('/')

})

app.post('/registraNota', (req, res) => {
    let usuarioNome = req.body.usuarioNome
    let cifraNome = req.body.cifraNome
    let nota = req.body.nota

    usuario = Usuario.buscaUsuario(usuarioNome)
    musica = Musica.buscaMusica(cifraNome)

    musica.cifra.registraAvaliacoes(usuarioNome, nota)
})

app.post('/registraComentario', (req, res) => {
    let usuarioNome = req.body.usuarioNome
    let cifraNome = req.body.cifraNome
    let comentario = req.body.comentario

    musica = Musica.buscaMusica(cifraNome)
    musica.cifra.addComentario(usuarioNome, comentario)
    console.log("COMENTARIOSSSS")
    console.log(musica.cifra.getComentarios())
})

app.post('/favoritarCifra', (req, res) => {
    let usuarioNome = req.body.usuarioNome
    let cifraNome = req.body.cifraNome
    console.log("Entrou no FAVORITAR CIFRA")
    usuario = Usuario.buscaUsuario(usuarioNome)

    usuario.addFavorita(cifraNome)

    console.log("E o GRAND FINALE")
    console.log(usuario)

    enviaUsuario(res, usuario)
    // res.json({'nome': usuarioBackend.nome, 'usuario': usuarioBackend.usuario,'senha': usuarioBackend.password,
    //     'email': usuarioBackend.email, 'favoritas': usuarioBackend.getFavoritas(), 'cifrasCriadas': usuarioBackend.getCifras()})
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


