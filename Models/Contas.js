function Conta(nome, tipo, categoria, usuario){
    const conta = {};

    conta.id = Date.now();
    conta.nome = nome;
    conta.tipo = tipo;
    conta.categoria = categoria;
    conta.usuario = usuario;

    function selectConta() {
        return JSON.parse(localStorage.getItem("Contas"));
    }

    function insertConta(conta) {
        const Conta = JSON.parse(localStorage.getItem("Contas")) || [];
        Conta.push(conta);
        localStorage.setItem("Contas", JSON.stringify(Conta));
    }

    function updateConta(contas) {
        localStorage.setItem("Contas", JSON.stringify(contas));
    }

    conta.insertConta = insertConta;
    conta.selectConta = selectConta;
    conta.updateConta = updateConta;
    return conta;
}