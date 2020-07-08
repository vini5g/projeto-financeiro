function cadastrar(nome) {
    try {
        const categoria = Categoria(nome, usuarioLogado());
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
    return listar.filter(item => item.usuario.id === usuarioLogado().id);
}

function deletar(id) {
    try {
        const categoria = Categoria();
        const lista = categoria.selectCategoria();
        
        const pos = lista.findIndex(item => item.id == id);

        const listaConta = contas().filter(item => item.categoria.id === id);
        if (listaConta.length > 0) {
            listaConta.map((index) => {
                    listaConta.splice(index, 1);
            });
        }

        lista.splice(pos, 1);
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
            if (item.id === id) item.nome = nome;
        })

        const updatedCategoria = lista.find(item => item.id == id);

        const listaConta = contas();
        if (listaConta !== undefined && listaConta !== null && listaConta.length > 0) {
            listaConta.map(item => {
                if (item.categoria.id == id) {
                    item.categoria = updatedCategoria;
                }
            })
            localStorage.setItem("Contas", JSON.stringify(listaConta));
        }
        categoria.updateCategoria(lista);
        return 0;
    } catch (error) {
        console.log(error);
        return 1;
    }
}

function deslogar(){
    localStorage.removeItem("UsuarioLogado");
    localStorage.removeItem("Receitas");
    localStorage.removeItem("Despesas");
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