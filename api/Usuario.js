const usuarios = JSON.parse(localStorage.getItem('listaUsuario')) || [];

function cadastrarUsuario(nome, email, senha, endereco, telefone)
{   
    let id = Date.now();
    let status = 'ATIVO';

    if (verificaEmail(email))
    {
        return 1;
    }

    usuarios.push({ id, nome, senha, email, endereco, telefone, status });
    
    localStorage.setItem('listaUsuario', JSON.stringify(usuarios));
    setarUsuarioLogado(id, nome);
    return 0;
}

function logar(email, senha)
{
    if (!verificaEmail(email))
    {
        return 1;
    }
    else if (!verificaSenha(senha))
    {
        return 2;
    }
    else
    {
        let usuario = usuarios.find((item)=>{
            if (item.email == email && item.senha == senha) 
                return item;
        });
        
        if (usuario.status == 'ATIVO') {
            setarUsuarioLogado(usuario.id, usuario.nome);
            return 0;
        } else {
            return 3;
        }
    }
}

function listar(id)
{
    return usuarios.find((item) => {
        if(item.id == id)
            return item
    })
}

function alterarUsuario(id, nome, email, endereco, telefone)
{
    const usuario = verificarUsuarioPeloId(id);
    if(usuario)
    {
        usuarios.map((item) => {
            if(item.id == usuario.id)
            {
                item.nome = nome;
                item.endereco = endereco;
                item.telefone = telefone;
                item.email = email;
            }
        });
        setarUsuarioLogado(id, nome);
        localStorage.setItem('listaUsuario', JSON.stringify(usuarios));
        return 0;
    }
    else
    {
        return 1;
    }
}

function alterarSenha(id, senha) {
    const usuario = verificarUsuarioPeloId(id);
    if (usuario) {
        const result = usuarios.map((item) => {
            if (item.id == id){
                item.senha = senha;
            }
        });
        localStorage.setItem('listaUsuario', JSON.stringify(usuarios));
        return 0;
    } else {
        return 1;
    }
}

function excluirUsuario(id)
{
    const usuario = verificarUsuarioPeloId(id);
    if(usuario)
    {
        usuarios.map((item) => {
            if(item.id == usuario.id)
            {
                item.status = 'INATIVO';
            }
        });
        localStorage.setItem('listaUsuario', JSON.stringify(usuarios));
        removerUsuarioLogado();
        return 0;
    }
    else
    {
        return 1;
    }
}

function reativarConta(email, senha){
    const usuario = verificaEmail(email);
    if (usuario) {
        usuarios.map((item) => {
            if(item.id == usuario.id)
            {
                item.status = 'ATIVO';
            }
        });
        localStorage.setItem('listaUsuario', JSON.stringify(usuarios));
    
        if(logar(email, senha) == 0){
            return 0;
        }else{
            return 1;
        }
    }else{
        return 1;
    }
}