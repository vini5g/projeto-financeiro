function Receitas(valor, usuario){
    const receitas = {};

    receitas.valor = Number(valor);
    receitas.usuario = usuario;
    
    function selectReceitas() {
        return JSON.parse(localStorage.getItem("Receitas"));
    }

    function insertReceitas(receita) {
        const Receitas = JSON.parse(localStorage.getItem("Receitas")) || [];
        Receitas.push(receita);
        localStorage.setItem("Receitas", JSON.stringify(Receitas));
    }

    function updateReceitas(receitas) {
        localStorage.setItem("Receitas", JSON.stringify(receitas));
    }

    receitas.insertReceitas = insertReceitas;
    receitas.selectReceitas = selectReceitas;
    receitas.updateReceitas = updateReceitas;
    return receitas;
}