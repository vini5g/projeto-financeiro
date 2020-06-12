function cadastrar(nome, tipo, idCategoria) {
    try {
        const listaCategoria = categorias();
        if (listaCategoria === null || listaCategoria === undefined || listaCategoria.length === 0) return 2;
        const categoria = listaCategoria.find(item => item.id == idCategoria);
        const conta = Conta(nome, tipo, categoria, usuarioLogado());
        conta.insertConta(conta);
        return 0;
    } catch (error) {
        console.log(error);
        return 1;
    }
}

function listar() {
    const conta = Conta();
    const listar = conta.selectConta();
    if(listar === null || listar === undefined || listar.length === 0) return null;
    return listar.filter(item => item.idUsuario == usuarioLogado().id);
}

function deletar(id) {
    try {
        const conta = Conta();
        const lista = conta.selectConta();
        const pos = lista.findIndex(item => item.id == id);
        lista.splice(pos, 1);
        conta.updateConta(lista);
        return 0;
    } catch (error) {
        console.log(error);
        return 1;
    }
}

function alterar(id, nome, tipo, idCategoria) {
    try {
        const conta = Conta();
        const lista = conta.selectConta();

        const listaCategoria = categorias();
        if(listaCategoria === null || listaCategoria === undefined || listaCategoria.length === 0) return 2;
        const categoria = listaCategoria.find(item => item.id == idCategoria);

        lista.map(item => {
            if (item.id == id) {
                item.nome = nome;
                item.tipo = tipo;
                item.categoria = categoria;
            } 
        })
        conta.updateConta(lista);
        return 0;
    } catch (error) {
        console.log(error);
        return 1;
    }
}

function deslogar(){
    localStorage.removeItem("UsuarioLogado");
    const usuario = localStorage.getItem("UsuarioLogado");
    if (usuario == undefined || usuario == null) return 0;
    else return 1;
}

function usuarioLogado() {
    return JSON.parse(localStorage.getItem("UsuarioLogado"));

}

function categorias() {
    return JSON.parse(localStorage.getItem("Categorias"));
}