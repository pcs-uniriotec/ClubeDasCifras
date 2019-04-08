// const mysql = require('mysql2/promise');

async function createDbConnection() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'admin',
        database: 'teste'
    });

    return connection;
}
module.exports = createDbConnection;
//codifica como o codigo conectará com o banco