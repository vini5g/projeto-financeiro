function cadastrar(nome, tipo, categoria) {
    try {
        const idUsuario = JSON.parse(localStorage.getItem("UsuarioLogado"));
        const conta = Conta(nome, tipo, categoria, idUsuario.id);
        conta.insertConta(conta);
        return 0;
    } catch (error) {
        console.log(error);
        return 1;
    }
}

function listar() {
    const conta = Conta();
    const idUsuario = JSON.parse(localStorage.getItem("UsuarioLogado"));
    const listar = conta.selectConta();
    if(listar === null || listar === undefined){
        return null;
    } 
    return listar.filter(item => item.idUsuario == idUsuario.id);
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

function alterar(id, nome, tipo, categoria) {
    try {
        const conta = Conta();
        const lista = conta.selectConta();
        lista.map(item => {
            if (item.id == id) {
                item.nome = nome;
                item.tipo = tipo;
                item.idCategoria = categoria;
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