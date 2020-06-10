function cadastrar(Nome, Email, Senha, Endereco, Telefone){
    
    try {
        if (buscarUsuarioPeloEmail(Email) == 0){
            return 1;
        }

        const usuario = Usuario(
            Nome, 
            Email, 
            Senha, 
            Endereco, 
            Telefone
        );

        usuario.status = 'ATIVO';
        usuario.insertUsuario(usuario);
        return 0;

    } catch (error) {
        console.log(error);
        return 2;
    } 
} 

function logar(input){
    const{Email, Senha} = input;
    const lista = usuario.selectLocalStorage();
    lista.find();
} 