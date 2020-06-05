function buscarUsuarioPeloEmail(email) {
    const usuarios = Usuario();
    const lista = usuarios.selectUsuarios();

    if (lista == null){
        return 1;
    }

    const usuario = lista.find((item)=> item.email == email);

    if (usuario != undefined){
        return 0;
    } else {
        return 2;
    }
}