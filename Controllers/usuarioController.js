function cadastrar(Nome, Email, Senha, Endereco, Telefone){
    try {
        if (buscarUsuarioPeloEmail(Email)) return 2;

        const usuario = Usuario(
            Nome, 
            Email, 
            Senha, 
            Endereco, 
            Telefone
        );

        usuario.status = 'ATIVO';
        usuario.insertUsuarios(usuario);
        localStorage.setItem("UsuarioLogado", JSON.stringify(usuario));
        return 0;
    } catch (error) {
        console.log(error);
        return 1;
    } 
} 

function logar(Email, Senha){
   try {
        if (!buscarUsuarioPeloEmail(Email)) return 2;

        if (!buscarUsuarioPelaSenha(Senha)) return 3;
    
        const usuario = buscarUsuarioPeloEmail(Email);

        if (usuario.status == 'INATIVO') return 4;
        
        localStorage.setItem("UsuarioLogado", JSON.stringify(usuario));
        return 0;
   } catch (error) {
        console.log(error);
        return 1;
   }
} 

function alterar(Nome, Email, Endereco, Telefone){
    try {
        const usuario = Usuario();
        const lista = usuario.selectUsuarios();

        const resposta = buscarUsuarioPeloEmail(Email)

        if (resposta && resposta.id !== usuarioLogado().id) return 2;

        lista.map(item => {
            if (item.id == usuarioLogado().id) {
                item.nome = Nome;
                item.email = Email;
                item.endereco = Endereco;
                item.telefone = Telefone;
            }
        });

        usuario.updateUsuarios(lista);
        return 0;
    } catch (error) {
        console.log(error);
        return 1;
    }
}

function deletar(){
    try {
        const usuario = Usuario();
        const lista = usuario.selectUsuarios();
        lista.map(item => {
            if (item.id == usuarioLogado().id) {
                item.status = 'INATIVO';
            }
        });

        usuario.updateUsuarios(lista);
        localStorage.removeItem("UsuarioLogado");
        return 0;
    } catch (error) {
        console.log(error);
        return 1;
    }
}

function deslogar(){
    localStorage.removeItem("UsuarioLogado");
    const usuario = localStorage.getItem("UsuarioLogado");
    if (usuario == undefined || usuario == null) return 0;
    else return 1;
}

function reativarConta(email, senha){
    try {
        const resposta = buscarUsuarioPeloEmail(email);
        
        if (resposta) {
            const usuario = Usuario();
            const lista = usuario.selectUsuarios();
            lista.map((item) => {
                if(item.id === resposta.id)
                {
                    item.status = 'ATIVO';
                    return item;
                }
            });

            usuario.updateUsuarios(lista);

            if(logar(email, senha) == 0){
                return 0;
            }
        }
    } catch (error) {
        console.log(error);
        return 1;
    }
}

function usuarioLogado() {
    return JSON.parse(localStorage.getItem("UsuarioLogado"));
}

function alterarSenha(senhaAtual, novaSenha, confirmaSenha) {
    try {
        const logado = usuarioLogado();
        const usuario = Usuario();
        const lista = usuario.selectUsuarios();
        if (logado.senha !== senhaAtual) return 2;
        if (novaSenha !== confirmaSenha) return 3;
        lista.map(item => {
            if (item.id == logado.id) {
                item.senha = confirmaSenha;
            }
        });
        usuario.updateUsuarios(lista);
        return 0;
    } catch (error) {
        console.log(error);
        return 1;
    }
}