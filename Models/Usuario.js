function Usuario(nome, email, senha, endereco, telefone){
    const usuario = {};

    usuario.id = Date.now();
    usuario.nome = nome;
    usuario.email = email;
    usuario.senha = senha;
    usuario.endereco = endereco;
    usuario.telefone = telefone;
    usuario.status = '';

    function selectUsuarios() {
        return JSON.parse(localStorage.getItem("Usuarios"));
    }

    function insertUsuarios(user) {
        const Usuarios = JSON.parse(localStorage.getItem("Usuarios")) || [];
        Usuarios.push(user);
        localStorage.setItem("Usuarios", JSON.stringify(Usuarios));
    }

    function updateUsuarios(users) {
        localStorage.setItem("Usuarios", JSON.stringify(users));
    }

    usuario.insertUsuarios = insertUsuarios;
    usuario.selectUsuarios = selectUsuarios;
    usuario.updateUsuarios = updateUsuarios;
    return usuario;
}