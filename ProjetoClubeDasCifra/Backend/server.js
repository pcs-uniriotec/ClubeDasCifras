let express = require('express');//chamada para o express
let app = express(); //bota o servidor de pé
let port =3000; //porta do local host, para acessar o server

app.get('/', (req, res) => {
    res.send('<h1>HOME KARALHO</h1>');
})

app.listen(port, () => {
    console.log("Servidor rodando em http://localhost: 3000");
})