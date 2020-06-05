function cadastrar(dados){
    const { Nome, Email, Senha, Endereco, Telefone } = dados;

    try {
        if (buscarUsuarioPeloEmail(Email.value) == 0 ){
            return 1;
        }

        const usuario = Usuario(
            Nome.value, 
            Email.value, 
            Senha.value, 
            Endereco.value, 
            Telefone.value
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