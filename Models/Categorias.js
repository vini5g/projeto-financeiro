function Categoria(nome, idUsuario){
    const categoria = {};

    categoria.id = Date.now();
    categoria.nome = nome;
    categoria.idUsuario = idUsuario;

    function selectCategoria() {
        return JSON.parse(localStorage.getItem("Categorias"));
    }

    function insertCategoria(categoria) {
        const Categoria = JSON.parse(localStorage.getItem("Categorias")) || [];
        Categoria.push(categoria);
        localStorage.setItem("Categorias", JSON.stringify(Categoria));
    }

    function updateCategoria(categorias) {
        localStorage.setItem("Categorias", JSON.stringify(categorias));
    }

    categoria.insertCategoria = insertCategoria;
    categoria.selectCategoria = selectCategoria;
    categoria.updateCategoria = updateCategoria;
    return categoria;
}