function cadastrar(nome) {
    try {
        const idUsuario = JSON.parse(localStorage.getItem("UsuarioLogado"));
        const categoria = Categoria(nome, idUsuario.id);
        categoria.insertCategoria(categoria);
        return 0;
    } catch (error) {
        console.log(error);
        return 1;
    }
}

function listar() {
    const categoria = Categoria();
    const idUsuario = JSON.parse(localStorage.getItem("UsuarioLogado"));
    const listar = categoria.selectCategoria();
    if(listar === null || listar === undefined){
        return null;
    } 
    return listar.filter(item => item.idUsuario == idUsuario.id);
}

function deletar(id) {
    try {
        const categoria = Categoria();
        const lista = categoria.selectCategoria();
        const pos = lista.findIndex(item => item.id == id);
        lista.splice(pos, 1);
        categoria.updateCategoria(lista);
        return 0;
    } catch (error) {
        console.log(error);
        return 1;
    }
}

function alterar(id, nome) {
    try {
        const categoria = Categoria();
        const lista = categoria.selectCategoria();
        lista.map(item => {
            if (item.id == id) {
                item.nome = nome;
            } 
        })
        categoria.updateCategoria(lista);
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