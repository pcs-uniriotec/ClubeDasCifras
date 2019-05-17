
const server             = require('./iniciaFirebase.js')

const database = server.firebase
const usuariosRef = database.ref("/Usuarios")

class Usuario{
    constructor(nome, usuario, senha, email) {
        this.nome = nome
        this.usuario = usuario
        this.senha = senha
        this.email = email
        this.cifras = []
        this.cifrasFavoritas = [] 
        Usuario.addUsuario(this)
    }

    setCifra(cifra) {
        this.cifras.push(cifra);

        // usuariosRef.child(key).child('/cifrasCriadas').push(cifra)
        //     .then(function() {
        //
        //     })
        //     .catch(function (erro) {
        //         console.log(erro)
        //     })
    }

    isFavorite(cifra) {
        if(cifrasFavoritas.find(cifra => cifra === cifra) !== null && cifrasFavoritas.find(cifra => cifra === cifra) !== undefined) {
            return true
        }
        return false
    }

    getFavoritas() {

        // usuariosRef.on("value", function (snapshot) {
        //
        //     return snapshot.val()[key].favoritas
        // }, function(erro) {
        //     console.log(erro)
        // })

        return this.cifrasFavoritas
    }

    getCifras() {

        // usuariosRef.on("value", function (snapshot) {
        //
        //     return snapshot.val()[key].cifrasCriadas
        // }, function(erro) {
        //     console.log(erro)
        // })

        return this.cifras
    }

    addFavorita(cifra){
           this.cifrasFavoritas.push(cifra)

        // usuariosRef.child(key).child('/favoritas').push(cifra)
        //     .then(function() {
        //
        //     })
        //     .catch(function (erro) {
        //         console.log(erro)
        //     })


    }

    static addUsuario(usuario) {
        Usuario.usuarios.push(usuario)

        usuariosRef.push(usuario)
            .then( function() {
                console.log("Funciona")
            })
            .catch( function(erro) {
                console.log(erro)
            })
    }

    static removeUsuario(usuarioNome) {
        console.log("USUARIOSSSS")
        console.log(Usuario.usuarios)
        console.log(Usuario.usuarios.indexOf(Usuario.usuarios.find(usu => usu.usuario == usuarioNome)))
        Usuario.usuarios.splice(Usuario.usuarios.indexOf(Usuario.usuarios.find(usu => usu.usuario == usuarioNome)), 1)
        console.log(Usuario.usuarios.find(usu => usu.usuario == usuarioNome))


        // usuariosRef.child(key).remove()
        //     .then(function() {
        //
        //     })
        //     .catch(function (erro) {
        //         console.log(erro)
        //     })

    }

    static verificaUsuario(usuario, senha) {

        usuariosRef.on("value", function (snapshot) {
            let keys = Object.keys(snapshot.val())
            keys.forEach(function (key) {
                if(snapshot.val()[key].nome == usuario && snapshot.val()[key].senha == senha){
                    // return snapshot.val()[key]
                }else{
                    // return undefined
                }
            })
        }, function(erro) {
            console.log(erro)
        })


        return Usuario.usuarios.find(usu => usu.usuario == usuario && usu.senha == senha)
    }

    static buscaUsuario(usuario) {
        console.log("AGORA")
        usuariosRef.on("value", function (snapshot) {
            let keys = Object.keys(snapshot.val())
            keys.forEach(function (key) {
                if(snapshot.val()[key].nome == usuario){
                    // return {usuario: snapshot.val()[key], key: key}
                }else{
                    // return undefined
                }
            })
        }, function(erro) {
            console.log(erro)
        })


        return Usuario.usuarios.find(usu => usu.usuario == usuario)
    }

    static excluiUsuario(usuario){
        Usuario.usuarios.remove(usuario)
    }

}

Usuario.usuarios = []
module.exports = Usuario