
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
        this.usuariosSeguidos = []
        this.comentariosPerfil = []
        Usuario.addUsuario(this)
    }

    static rankeiaUsuarios(usuario) {
        //let usuario = Usuario.buscaUsuario(nomeUsuario)

        if(Usuario.rankingQuantidadeCifras.length === 0) {
            Usuario.rankingQuantidadeCifras.push({nome: usuario.usuario, totalCifras: usuario.cifras.length})
        }else {
            console.log("AGORA ELE ENTRA AQUI!!!!!")
            let usuarioLista = Usuario.rankingQuantidadeCifras.find(usu => usu.nome === usuario.usuario)
            console.log(usuarioLista)
            if(usuarioLista) {
                let posicao      = Usuario.rankingQuantidadeCifras.indexOf(usuarioLista)
                console.log("POSICAO"+ posicao)
                Usuario.rankingQuantidadeCifras.splice(posicao, 1)
            }
            console.log(Usuario.rankingQuantidadeCifras)
            let verificaEntrada
            for(let i = Usuario.rankingQuantidadeCifras.length - 1; i >= 0; i--) {
                console.log("RODA?")
                if(Usuario.rankingQuantidadeCifras[i].totalCifras > usuario.cifras.length) {
                    Usuario.rankingQuantidadeCifras.splice(i + 1, 0, {nome: usuario.usuario, totalCifras: usuario.cifras.length})
                    i = -1
                    verificaEntrada = true
                    break
                }
                // if(i == 0) {
                //     Usuario.rankingQuantidadeCifras.splice(0, 0, {nome: usuario.usuario, totalCifras: usuario.cifras.length})
                // }
            }

            if(verificaEntrada !== true) {
                Usuario.rankingQuantidadeCifras.splice(0, 0, {nome: usuario.usuario, totalCifras: usuario.cifras.length})
            }

            if(Usuario.rankingQuantidadeCifras.length > 10) {
                Usuario.rankingQuantidadeCifras.splice(10, 1)
            }
        }
    }

    static getRankingUsuarios() {
        return Usuario.rankingQuantidadeCifras
    }

    setNome(nome) {
        this.nome = nome
    }

    setEmail(email) {
        this.email = email
    }

    setSenha(senha) {
        this.senha = senha
    }

    setCifra(cifra) {
        this.cifras.push(cifra);
        Usuario.rankeiaUsuarios(this)

        // usuariosRef.child(key).child('/cifrasCriadas').push(cifra)
        //     .then(function() {
        //
        //     })
        //     .catch(function (erro) {
        //         console.log(erro)
        //     })
    }

    addComentarioPerfil(usuarioNome, comentario) {
        this.comentariosPerfil.push({usuarioNome: usuarioNome, comentario: comentario})
    }

    getComentariosPerfil() {
        return this.comentariosPerfil
    }

    addUsuarioSeguido(usuario) {
        this.usuariosSeguidos.push(usuario)
    }

    getUsuariosSeguidos() {
        return this.usuariosSeguidos
    }

    removeCifra(cifra) {
        console.log("Indice")
        console.log(this.cifras.indexOf(cifra))
        console.log("ARRAY INTEIRO")
        console.log(this.cifras)

        this.cifras.splice(this.cifras.indexOf(cifra), 1)
        Usuario.rankeiaUsuarios(this)
        // Usuario.usuarios.splice(Usuario.usuarios.indexOf(Usuario.usuarios.find(usu => usu.usuario == usuarioNome)), 1)
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
        console.log("POSICAO")
        console.log(Usuario.usuarios.indexOf(Usuario.usuarios.find(usu => usu.usuario == usuarioNome)))
        console.log("ARRAY TODO")
        console.log(Usuario.usuarios)

        // Usuario.usuarios.splice(Usuario.usuarios.indexOf(Usuario.usuarios.find(usu => usu.usuario == usuarioNome)), 1)
        Usuario.usuarios.splice(Usuario.usuarios.indexOf(Usuario.usuarios.find(usu => usu.usuario == usuarioNome)), 1)



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
        // console.log("AGORA")
        // usuariosRef.on("value", function (snapshot) {
        //     let keys = Object.keys(snapshot.val())
        //     keys.forEach(function (key) {
        //         if(snapshot.val()[key].nome == usuario){
        //             // return {usuario: snapshot.val()[key], key: key}
        //         }else{
        //             // return undefined
        //         }
        //     })
        // }, function(erro) {
        //     console.log(erro)
        // })

        return Usuario.usuarios.find(usu => usu.usuario == usuario)
    }

    static excluiUsuario(usuario){
        Usuario.usuarios.remove(usuario)
    }

}
Usuario.rankingQuantidadeCifras = []
Usuario.usuarios = []
module.exports = Usuario