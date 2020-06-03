function Main()
{
    if (verificaDados() == 1)
        return Swal.fire({
            icon: 'error',
            title: 'Preencha todos os campos',
        });

    let inputs = document.getElementsByTagName("input");

    let verificarlogin = logar(inputs[0].value, inputs[1].value);

    if (verificarlogin == 1)
    {
        limpar(inputs[0]);
        return Swal.fire({
            icon: 'error',
            title: 'Email não cadastrado',
        });
    }

    if (verificarlogin == 2)
    {
        limpar(inputs[1]);
        return Swal.fire({
            icon: 'error',
            title: 'Senha incorreta',
        });
    }

    if (verificarlogin == 3)
    {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn-confirmar',
              cancelButton: 'btn-cancelar'
            },
            buttonsStyling: false
          })
          
          return swalWithBootstrapButtons.fire({
            title: 'Usuário Inativo',
            text: "Deseja reativar sua conta?",
            icon: 'error',
            showCancelButton: true,
            confirmButtonText: 'Sim, reativar!',
            cancelButtonText: 'Não, cancelar!',
            reverseButtons: true
          }).then((result) => {
            if (result.dismiss !== Swal.DismissReason.cancel) {
                if(reativarConta(inputs[0].value, inputs[1].value) == 0){
                    Swal.fire({
                        icon: 'success',
                        title: 'Conta reativada com sucesso',
                        showConfirmButton: true,
                    }).then(() => {
                        window.location = './pages/index.html';
                    });
                }else{
                    swalWithBootstrapButtons.fire({
                        icon: 'error',
                        title: `Não foi possível reativar essa conta`,
                    });
                } 
                console.log(reativarConta(inputs[0].value, inputs[1].value));
            }     
        });
    }
    
    if (verificarlogin == 0)
    {
        window.location = './pages/index.html';
    }
}

function telaCadastro()
{
    window.location = 'cadastro.html';
}