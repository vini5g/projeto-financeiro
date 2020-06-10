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

    function insertUsuario(user) {
        const Usuarios = JSON.parse(localStorage.getItem("Usuarios")) || [];
        Usuarios.push(user);
        localStorage.setItem("Usuarios", JSON.stringify(Usuarios));
    }

    usuario.insertUsuario = insertUsuario;
    usuario.selectUsuarios = selectUsuarios;
    return usuario;
}