function cadastrar(nome) {
    try {
        const categoria = Categoria(nome, usuarioLogado().id);
        categoria.insertCategoria(categoria);
        return 0;
    } catch (error) {
        console.log(error);
        return 1;
    }
}

function listar() {
    const categoria = Categoria();
    const listar = categoria.selectCategoria();
    if (listar === null || listar === undefined || listar.length === 0) return null; 
    return listar.filter(item => item.idUsuario == usuarioLogado().id);
}

function deletar(id) {
    try {
        const categoria = Categoria();
        const lista = categoria.selectCategoria();

        const listaConta = contas();
        const contas = listaConta.filter(item => item.categoria.id == id);
        
        const pos = lista.findIndex(item => item.id == id);
        lista.splice(pos, 1);

        if (contas && contas.length > 0) {
            for (const conta of contas) {
                const pos = listaConta.findIndex(item => item.id == conta.id);
                listaConta.splice(pos, 1);
            }
        }

        categoria.updateCategoria(lista);
        localStorage.setItem("Contas", JSON.stringify(listaConta));
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
            if (item.id == id) item.nome = nome;
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

function usuarioLogado() {
    return JSON.parse(localStorage.getItem("UsuarioLogado"));
}

function contas() {
    return JSON.parse(localStorage.getItem("Contas"));
}