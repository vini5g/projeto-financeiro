function buscarUsuarioPeloEmail(email) {
    const usuarios = Usuario();
    const lista = usuarios.selectUsuarios();

    if (lista !== null) return lista.find((item)=> item.email == email);
}

function buscarUsuarioPelaSenha(senha) {
    const usuarios = Usuario();
    const lista = usuarios.selectUsuarios();

    if (lista !== null) return lista.find((item)=> item.senha == senha);
}