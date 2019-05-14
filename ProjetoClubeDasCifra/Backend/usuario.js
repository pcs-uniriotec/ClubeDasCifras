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
    }

    isFavorite(cifra) {
        if(cifrasFavoritas.find(cifra => cifra === cifra) !== null && cifrasFavoritas.find(cifra => cifra === cifra) !== undefined) {
            return true
        }
        return false
    }

    getFavoritas() {
        return this.cifrasFavoritas
    }

    getCifras() {
        return this.cifras
    }

    addFavorita(cifra){
           this.cifrasFavoritas.push(cifra)
    }

    static addUsuario(usuario) {
        Usuario.usuarios.push(usuario)
    }

    static removeUsuario(usuarioNome) {
        console.log("USUARIOSSSS")
        console.log(Usuario.usuarios)
        console.log(Usuario.usuarios.indexOf(Usuario.usuarios.find(usu => usu.usuario == usuarioNome)))
        Usuario.usuarios.splice(Usuario.usuarios.indexOf(Usuario.usuarios.find(usu => usu.usuario == usuarioNome)), 1)
        console.log(Usuario.usuarios.find(usu => usu.usuario == usuarioNome))
    }

    static verificaUsuario(usuario, senha) {
        return Usuario.usuarios.find(usu => usu.usuario == usuario && usu.senha == senha)
    }

    static buscaUsuario(usuario) {
        return Usuario.usuarios.find(usu => usu.usuario == usuario)
    }

    static excluiUsuario(usuario){
        Usuario.usuarios.remove(usuario)
    }

}

Usuario.usuarios = []
module.exports = Usuario