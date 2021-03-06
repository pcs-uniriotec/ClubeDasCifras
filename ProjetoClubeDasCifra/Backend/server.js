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
        'email': usuario.email, 'favoritas': usuario.getFavoritas(),
        'cifrasCriadas': usuario.getCifras(), 'usuariosSeguidos': usuario.getUsuariosSeguidos(),
        'comentariosPerfil': usuario.getComentariosPerfil()})
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

app.get('/getEditaCifra', (req, res) => {
    res.sendFile(caminho + '/html/edicaoCifra.html')
})

app.get('/getVisitaPerfil', (req, res) => {
    res.sendFile(caminho + '/html/visitaPerfil.html')
})

app.get('/getUsuariosSeguidos', (req, res) => {
    res.sendFile(caminho + '/html/pagUsuariosSeguidos.html')
})

app.get('/getCifrasUsuarioVisitado', (req, res) => {
    res.sendFile(caminho + '/html/cifrasUsuarioVisitado.html')
})

app.get('/getCifrasFavoritasVisitado', (req, res) => {
    res.sendFile(caminho + '/html/cifrasFavoritasVisitado.html')
})



app.post('/buscaRankingUsuarios', (req, res) => {
    res.json({ranking: Usuario.getRankingUsuarios()})
})

app.post('/buscaCifrasFavoritasVisitado', (req, res) => {
    const usuarioVisitado = req.body.usuarioVisitado

    usuarioBackend = Usuario.buscaUsuario(usuarioVisitado)
    res.json({favoritas: usuarioBackend.getFavoritas()})
})

app.post('/buscaCifrasUsuarioVisitado', (req, res) => {
    const usuarioVisitado = req.body.usuarioVisitado

    usuarioBackend = Usuario.buscaUsuario(usuarioVisitado)
    res.json({listaCifras: usuarioBackend.getCifras()})
})

app.post('/registraComentarioPerfil', (req, res) => {
    const usuarioComenta  = req.body.usuarioComenta
    const perfilComentado = req.body.perfilComentado
    const comentario      = req.body.comentario

    usuarioBackend = Usuario.buscaUsuario(perfilComentado)
    usuarioBackend.addComentarioPerfil(usuarioComenta, comentario)
})

app.post('/segueUsuario', (req, res) => {
    const usuario        = req.body.usuario
    const usuarioSeguido = req.body.usuarioSeguido

    usuarioBackend = Usuario.buscaUsuario(usuario)

    usuarioBackend.addUsuarioSeguido(usuarioSeguido)

    console.log(usuarioBackend)
    enviaUsuario(res, usuarioBackend)

})

app.post('/buscaUsuario', (req, res) => {
    const usuario = req.body.usuario

    usuarioBackend = Usuario.buscaUsuario(usuario)

    enviaUsuario(res, usuarioBackend)
})

app.post('/editaPerfil', (req, res) => {
    const usuario  = req.body.usuario
    const nome     = req.body.nome
    const email    = req.body.email
    const senha    = req.body.senha

    usuarioBackend = Usuario.buscaUsuario(usuario)
    usuarioBackend.setNome(nome)
    usuarioBackend.setEmail(email)
    usuarioBackend.setSenha(senha)

    enviaUsuario(res, usuarioBackend)
})

app.post('/editaCifra', (req, res) => {
    const cifraNome      = req.body.cifraNome
    const cifraNova      = req.body.cifra

    musica = Musica.buscaMusica(cifraNome)
    let cifra = musica.getCifra()
    cifra.alteraCifra(cifraNova)
    res.redirect('/cifra')
})

app.post('/enviarCifra', (req, res) => {
    const nomeMusica  = req.body.nomeMusica;
    const cifraMusica = req.body.cifra;
    const autor       = req.body.autor;

    cifra   = new Cifra(nomeMusica, cifraMusica, autor);

    //busca usuario agora com firebase retorna objeto com usuario e key
    usuario = Usuario.buscaUsuario(autor)
    //passa a ser usuario.usuario
    usuario.setCifra(nomeMusica);

    musica = cifra.musica

    enviaUsuario(res, usuario)
})

app.post('/buscaCifra', (req, res) => {
    const nomeMusica = req.body.musica
    musica = Musica.buscaMusica(nomeMusica);

    if(musica == undefined) {
        res.send(undefined)
    }else {
        res.json({nome: musica.nome, cifra: musica.cifra.cifra, media: musica.cifra.calculaMedia(), comentarios: musica.cifra.getComentarios()})
    }

})

app.post('/buscaCifrasMelhoresNotas', (req, res) => {
    let rankingCifras = Cifra.getCifrasMelhoresNotas();

    if(rankingCifras.length > 0) {
        res.json({rankingCifras: rankingCifras})
    }else {
        res.send(undefined)
    }
})

app.post('/buscaCifrasRecentes', (req, res) => {
    let cifrasRecentes = Cifra.getCifrasCriadasRecentes()
    console.log("EUUUUUUUUUUUUUUUUUUUUUUUUUUU")
    console.log(cifrasRecentes)
    if(cifrasRecentes.length > 0) {
        res.json({cifrasRecentes: cifrasRecentes})
    }else {
        res.send(undefined)
    }
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

    //agr com firebase buscaUsuario passará a retornar um objeto com usuario e key
    usuarioBackend = Usuario.buscaUsuario(usuario)

    console.log(usuarioBackend !== undefined)
    //devo fazer verificacao com usuarioBackend.usuario
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

    //com o firebase vai passar a ser retornado um objeto com usuario e key
    usuarioBackend = Usuario.verificaUsuario(usuario, senha)

    //irei passar a enviar usuarioBackend.usuario
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
    let usuario   = req.body.usuario

    console.log(usuario)

    usuarioBackend = Usuario.buscaUsuario(usuario)
    usuarioBackend.removeCifra(cifraNome)

    Musica.removeMusica(cifraNome)
    // musica.setCifra(null)
    enviaUsuario(res, usuarioBackend)
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



