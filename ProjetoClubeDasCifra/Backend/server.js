const express = require('express');//chamada para o express
const app = express(); //bota o servidor de pé
const port = 3000; //porta do local host, para acessar o server
const path = require('path');
const caminho = path.join(__dirname, '../src');


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


    console.log(nomeMusica);
    console.log(cifra);
})

app.listen(port, () => {
    console.log("Servidor rodando em http://localhost: 3000");
})