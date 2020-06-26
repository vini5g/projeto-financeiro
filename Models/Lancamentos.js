function Lancamento( valor, descricao, conta, usuario){
    const lancamento = {};

    let data = new Date();

    lancamento.id = Date.now();
    lancamento.descricao = descricao;
    lancamento.valor = valor;
    lancamento.conta = conta;
    lancamento.data = `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`;
    lancamento.hora = `${data.getHours()}:${data.getMinutes()}`;
    lancamento.usuario = usuario;

    function selectLancamento() {
        return JSON.parse(localStorage.getItem("Lancamentos"));
    }

    function insertLancamento(lancamento) {
        const Lancamento = JSON.parse(localStorage.getItem("Lancamentos")) || [];
        Lancamento.push(lancamento);
        localStorage.setItem("Lancamentos", JSON.stringify(Lancamento));
    }

    function updateLancamento(lancamentos) {
        localStorage.setItem("Lancamentos", JSON.stringify(lancamentos));
    }

    lancamento.insertLancamento= insertLancamento;
    lancamento.selectLancamento= selectLancamento;
    lancamento.updateLancamento = updateLancamento;
    return lancamento;
}