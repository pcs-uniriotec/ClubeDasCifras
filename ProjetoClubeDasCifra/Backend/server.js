let express = require('express');//chamada para o express
let app = express(); //bota o servidor de pé
let port = 3000; //porta do local host, para acessar o server
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

    const Cifra = new cifra(nomeMusica);
    Cifra.criaCifra;

    console.log(nomeMusica);
    console.log(cifra);
})

app.listen(port, () => {
    console.log("Servidor rodando em http://localhost: 3000");
})