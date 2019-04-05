let express = require('express');//chamada para o express
let app = express(); //bota o servidor de pé
let port = 3000; //porta do local host, para acessar o server
let path = require('path');
let caminho = path.join(__dirname, '../src');

app.get('/', (req, res) => {
    res.sendFile(caminho + '/pagInicial.html');
})

app.listen(port, () => {
    console.log("Servidor rodando em http://localhost: 3000");
})