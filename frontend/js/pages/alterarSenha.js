function Main() 
{
    if (verificaDados() == 1)
    {
        return Swal.fire({
            icon: 'error',
            title: 'Preencha todos os campos',
        });
    }

    const inputs = document.getElementsByTagName("input");
    if (inputs[0].value == inputs[1].value) {
        const idUsuario = pegarIdUsuario();
        const result = alterarSenha(idUsuario, inputs[1].value);
        if(result == 0) {
            Swal.fire({
                icon: 'success',
                title: 'Senha alterada com sucesso',
                showConfirmButton: true,
            }).then(() => {
                window.location = './perfil.html';
            });
        }else {
            return Swal.fire({
                icon: 'error',
                title: 'Não foi possível trocar a senha',
            }); 
        }
    }else{
        return Swal.fire({
            icon: 'error',
            title: 'Senhas não conferem',
        });
    }
}

function voltar()
{
    window.location = 'perfil.html';
}