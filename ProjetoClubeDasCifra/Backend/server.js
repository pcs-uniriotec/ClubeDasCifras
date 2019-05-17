const express            = require('express'); //chamada para o express
const createDbConnection = require('./database');
const Cifra              = require('./cifra.js')
const Usuario            = require('./usuario.js')
let path                 = require('path');
const Musica             = require('./musica')
const bodyParser         = require('body-parser')

const app  = express();
const port = 8082;
let db     = null;


let caminho        = path.join(__dirname, '../src');
var cifra          = null;
var musica         = null;
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

app.get('/getEditaPerfil', (req, res) => {
    res.sendFile(caminho + '/html/editaPerfil.html')
})





app.post('/enviarCifra', (req, res) => {
    const nomeMusica  = req.body.nomeMusica;
    const cifraMusica = req.body.cifra;
    const autor       = req.body.autor;

    cifra   = new Cifra(nomeMusica, cifraMusica, autor);

    usuario = Usuario.buscaUsuario(autor)
    usuario.setCifra(nomeMusica);

    musica = cifra.musica

    enviaUsuario(res, usuario)
})

app.post('/buscaCifra', (req, res) => {
    const nomeMusica = req.body.musica
    musica = Musica.buscaMusica(nomeMusica);

    res.json({nome: musica.nome, cifra: musica.cifra.cifra, media: musica.cifra.calculaMedia(), comentarios: musica.cifra.getComentarios()})
})

app.post('/registro', (req, res) => {
    let nome           = req.body.nome
    let usuario        = req.body.usuario
    let senha          = req.body.senha
    let email          = req.body.email

    usuarioBackend = new Usuario(nome, usuario, senha, email)

    res.redirect('/')
})

app.post('/verificaExistenciaUsuario', (req, res) => {
    let usuario = req.body.usuario

    usuarioBackend = Usuario.buscaUsuario(usuario)

    console.log(usuarioBackend !== undefined)
    if(usuarioBackend !== undefined) {
        console.log("ENVIA USUARIO")
        enviaUsuario(res, usuarioBackend)
    }else{
        console.log("ENVIA UNDEFINED")
        res.send(undefined)
    }

})

app.post('/login', (req, res) => {
    let usuario = req.body.usuario
    let senha   = req.body.senha

    usuarioBackend = Usuario.verificaUsuario(usuario, senha)

    enviaUsuario(res, usuarioBackend)
})

app.post('/registraNota', (req, res) => {
    let usuarioNome = req.body.usuarioNome
    let cifraNome   = req.body.cifraNome
    let nota        = req.body.nota

    usuario = Usuario.buscaUsuario(usuarioNome)
    musica  = Musica.buscaMusica(cifraNome)

    musica.cifra.registraAvaliacoes(usuarioNome, nota)
})

app.post('/registraComentario', (req, res) => {
    let usuarioNome = req.body.usuarioNome
    let cifraNome   = req.body.cifraNome
    let comentario  = req.body.comentario

    musica = Musica.buscaMusica(cifraNome)
    musica.cifra.addComentario(usuarioNome, comentario)
})

app.post('/favoritarCifra', (req, res) => {
    let usuarioNome = req.body.usuarioNome
    let cifraNome   = req.body.cifraNome

    usuario = Usuario.buscaUsuario(usuarioNome)
    usuario.addFavorita(cifraNome)

    enviaUsuario(res, usuario)
})

app.post('/bloqueiaConta', (req, res) => {
    let usuarioNome = req.body.usuarioNome
    Usuario.removeUsuario(usuarioNome)

    res.redirect('/')
})

app.post('/excluiCifra', (req,res) => {
    let cifraNome = req.body.cifraNome

    musica = Musica.buscaMusica(cifraNome)
    musica.setCifra(null)

    res.redirect('/')
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



