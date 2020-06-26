function Despesas(valor, usuario){
    const despesas = {};

    despesas.valor = valor;
    despesas.usuario = usuario;
    
    function selectDespesas() {
        return JSON.parse(localStorage.getItem("Despesas"));
    }

    function insertDespesas(despesa) {
        const Despesas = JSON.parse(localStorage.getItem("Despesas")) || [];
        Despesas.push(despesa);
        localStorage.setItem("Despesas", JSON.stringify(Despesas));
    }

    function updateDespesas(despesas) {
        localStorage.setItem("Despesas", JSON.stringify(despesas));
    }

    despesas.insertDespesas = insertDespesas;
    despesas.selectDespesas = selectDespesas;
    despesas.updateDespesas = updateDespesas;
    return despesas;
}