function cadastrar(valor, descricao, idConta) {
    try {
        const listaConta = flamengo();
        if (listaConta === null || listaConta === undefined || listaConta.length === 0) return 2;
        const conta = listaConta.find(item => item.id == idConta);
        const lancamento = Lancamento(valor, descricao, conta, usuarioLogado());

        const lista = lancamento.selectLancamento();
        if (lista != null || lista){
            const listaLancamento = lista.find(item => item.conta.id == idConta);
            if(listaLancamento) return 3;
        }

        let despesas = 0.0;
        let receitas = 0.0;

        if (lista == null) {
            if (conta.tipo == 'Despesas') {
                despesas += Number(lancamento.valor);
                localStorage.setItem("Despesas", JSON.stringify(despesas));
            } else if (conta.tipo == 'Receitas') {
                receitas += Number(lancamento.valor);
                localStorage.setItem("Receitas", `${receitas}`); 
            }
        } else {
            for (const lancamento of lista) {
                if (lancamento.conta.tipo == 'Despesas') {
                    despesas += Number(lancamento.valor);
                    localStorage.setItem("Despesas", JSON.stringify(despesas));
                } else if (lancamento.conta.tipo == 'Receitas') {
                    receitas += Number(lancamento.valor);
                    localStorage.setItem("Receitas", `${receitas}`); 
                }
            }
        }
        console.log(lancamento);
        lancamento.insertLancamento(lancamento);
        return 0;
    } catch (error) {
        console.log(error);
        return 1;
    }
}

function renderizar() {
    const lancamento = Lancamento();
    const listar = lancamento.selectLancamento();
    if(listar === null || listar === undefined || listar.length === 0) return null;
    
    const lista = listar.filter(item => item.usuario.id == usuarioLogado().id);
   
    let despesas = 0.0;
    let receitas = 0.0;
    for (const lancamento of lista) {
        if (lancamento.conta.tipo == 'Despesas') {
            despesas += Number(lancamento.valor);
        } else if (lancamento.conta.tipo == 'Receitas') {
            receitas += Number(lancamento.valor);
             
        }
    }

    if (despesas == NaN) {
        despesas = 0.0;
    } else if (receitas == NaN) {
        receitas = 0.0;
    }

    localStorage.setItem("Despesas", JSON.stringify(despesas));
    localStorage.setItem("Receitas", `${receitas}`);
}

function listar() {
    const lancamento = Lancamento();
    const listar = lancamento.selectLancamento();
    if(listar === null || listar === undefined || listar.length === 0) return null;
    const lista = listar.filter(item => item.usuario.id == usuarioLogado().id);
    return lista;
}

function deletar(id) {
    try {
        const lancamento = Lancamento();
        const lista = lancamento.selectLancamento();
        const lancamentoValor = lista.find(item => item.id == id); 
        const pos = lista.findIndex(item => item.id == id);

        lista.splice(pos, 1);
        
        let despesas = Number(localStorage.getItem("Despesas"));
        let receitas = Number(localStorage.getItem("Receitas"));

        if (lancamentoValor.conta.tipo == 'Despesas') {
            despesas -= Number(lancamentoValor.valor);
            localStorage.setItem("Despesas", `${despesas}`);
        } else if (lancamentoValor.conta.tipo == 'Receitas') {
            receitas -= Number(lancamentoValor.valor);
            localStorage.setItem("Receitas", `${receitas}`);
        }
        
        lancamento.updateLancamento(lista);
        return 0;
    } catch (error) {
        console.log(error);
        return 1;
    }
}

function alterar(id, valor, descricao, idConta) {
    try {
        const lancamento = Lancamento();
        const listaLancamento = lancamento.selectLancamento();

        const listaConta = flamengo();
        if(listaConta === null || listaConta === undefined || listaConta.length === 0) return 2;
        const conta = listaConta.find(item => item.id == idConta);

        listaLancamento.map(item => {
            if (item.id == id) {
                item.valor = valor;
                item.descricao = descricao; 
                item.conta = conta;
            } 
        })

        let despesas = 0.0;
        let receitas = 0.0;

        for (const lancamento of listaLancamento) {
            if (lancamento.conta.tipo == 'Despesas') {
                despesas += Number(lancamento.valor);
                localStorage.setItem("Despesas", `${despesas}`);
                console.log(lancamento.valor);
            } else if (lancamento.conta.tipo == 'Receitas') {
                receitas += Number(lancamento.valor);
                localStorage.setItem("Receitas", `${receitas}`);
                console.log(lancamento.valor);
            }
        }
        
        lancamento.updateLancamento(listaLancamento);
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

function flamengo() {
    return JSON.parse(localStorage.getItem("Contas"));
}