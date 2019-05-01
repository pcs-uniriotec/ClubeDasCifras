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

    addFavorita(cifra){
        if(typeOf(cifrasFavoritas.find(cifra => cifra === cifra)) == "object")
           break
        else
           this.cifrasFavoritas = cifra
    }

    static addUsuario(usuario) {
        Usuario.usuarios.push(usuario)
    }

    static verificaUsuario(usuario, senha) {
        return Usuario.usuarios.find(usu => usu.usuario == usuario && usu.senha == senha)
    }

    static buscaUsuario(usuario) {
        return Usuario.usuarios.find(usu => usu.usuario == usuario)
    }

    static excluiUsuario(usuario){
        Usuario.buscaUsuario(usuario) = null
    }

}

Usuario.usuarios = []
module.exports = Usuario