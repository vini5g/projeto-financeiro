function Saldo(valor, usuario){
    const saldos = {};

    saldos.valor = Number(valor);
    saldos.usuario = usuario;
    
    function selectSaldos() {
        return JSON.parse(localStorage.getItem("Saldos"));
    }

    function insertSaldos(saldo) {
        const Saldos = JSON.parse(localStorage.getItem("Saldos")) || [];
        Saldos.push(saldo);
        localStorage.setItem("Saldos", JSON.stringify(Saldos));
    }

    function updateSaldos(saldos) {
        localStorage.setItem("Saldos", JSON.stringify(saldos));
    }

    saldos.insertSaldos = insertSaldos;
    saldos.selectSaldos = selectSaldos;
    saldos.updateSaldos = updateSaldos;
    return receitas;
}