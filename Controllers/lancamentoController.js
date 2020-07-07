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

        switch (conta.tipo) {
            case "Despesas":
                const listaDespesa = Despesas().selectDespesas();
                if (listaDespesa != null || listaDespesa) {
                    const despesaValor = listaDespesa.find(item => item.usuario.id == usuarioLogado().id);
                    const value = Number(despesaValor.valor);
                    const newValue = value + Number(valor);
                    listaDespesa.map(item => {
                        if (item.usuario.id === usuarioLogado().id) {
                            item.valor = newValue;
                        }
                    })
                    const despesa = Despesas();
                    despesa.updateDespesas(listaDespesa);
                } else {
                    const despesa = Despesas(valor, usuarioLogado());
                    despesa.insertDespesas(despesa);
                }
                break;
            case "Receitas":
                const listaReceita = Receitas().selectReceitas();
                if (listaReceita != null || listaReceita) {
                    const receitaValor = listaReceita.find(item => item.usuario.id == usuarioLogado().id);
                    const value = Number(receitaValor.valor);
                    const newValue = value + Number(valor);
                    listaReceita.map(item => {
                        if (item.usuario.id === usuarioLogado().id) {
                            item.valor = newValue;
                        }
                    })
                    const receita = Receitas();
                    receita.updateReceitas(listaReceita);
                } else {
                    const receita = Receitas(valor, usuarioLogado());
                    receita.insertReceitas(receita);
                }
                break;
        }

        lancamento.insertLancamento(lancamento);
        return 0;
    } catch (error) {
        console.log(error);
        return 1;
    }
}

function listar() {
    const lancamento = Lancamento();
    const listar = lancamento.selectLancamento();
    if(listar === null || listar === undefined || listar.length === 0) return null;
    return listar.filter(item => item.usuario.id == usuarioLogado().id);
}

function deletar(id) {
    try {
        const lancamento = Lancamento();
        const lista = lancamento.selectLancamento();
        const lancamentoConta = lista.find(item => item.id == id);
        const pos = lista.findIndex(item => item.id == id);
        const conta = flamengo().find(item => item.id == lancamentoConta.conta.id);
        switch (conta.tipo) {
            case "Despesas":
                const listaDespesa = Despesas().selectDespesas();
                if (listaDespesa != null || listaDespesa) {
                    const despesaValor = listaDespesa.find(item => item.usuario.id == usuarioLogado().id);
                    const value = Number(despesaValor.valor);
                    const newValue = value - Number(lancamentoConta.valor);
                    listaDespesa.map(item => {
                        if (item.usuario.id === usuarioLogado().id) {
                            item.valor = newValue;
                        }
                    })
                    const despesa = Despesas();
                    despesa.updateDespesas(listaDespesa);
                } 
                break;
            case "Receitas":
                const listaReceita = Receitas().selectReceitas();
                if (listaReceita != null || listaReceita) {
                    const receitaValor = listaReceita.find(item => item.usuario.id == usuarioLogado().id);
                    const value = Number(receitaValor.valor);
                    const newValue = value - Number(lancamentoConta.valor);
                    listaReceita.map(item => {
                        if (item.usuario.id === usuarioLogado().id) {
                            item.valor = newValue;
                        }
                    })
                    const receitas = Receitas();
                    receitas.updateReceitas(listaReceita);
                } 
                break;
        }

        lista.splice(pos, 1);
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
        
        let receitas = 0.0;
        let despesas = 0.0;

        for (const lancamento of listaLancamento) {
            if (lancamento.conta.tipo == 'Despesas') {
                despesas += Number(lancamento.valor);
                console.log(lancamento.valor);
            } 
            if (lancamento.conta.tipo == 'Receitas') {
                receitas += Number(lancamento.valor);
                console.log(lancamento.valor);
            }
        }

        const listaDespesa = Despesas().selectDespesas();
        if (listaDespesa != null || listaDespesa) {
            listaDespesa.map(item => {
                if (item.usuario.id === usuarioLogado().id) {
                    item.valor = despesas;
                }
            })
            const Despesa = Despesas();
            Despesa.updateDespesas(listaDespesa);
        } 

        const listaReceita = Receitas().selectReceitas();
        if (listaReceita != null || listaReceita) {
            listaReceita.map(item => {
                if (item.usuario.id === usuarioLogado().id) {
                    item.valor = receitas;
                }
            })
            const receita = Receitas();
            receita.updateReceitas(listaReceita);
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