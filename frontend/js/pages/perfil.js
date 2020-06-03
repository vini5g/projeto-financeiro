const inputs = document.getElementsByTagName("input");

function Main()
{
    const idUsuario = pegarIdUsuario();
    const { nome, endereco, telefone, email } = listar(idUsuario);
    inputs[0].value = nome;
    inputs[1].value = email;
    inputs[2].value = endereco;
    inputs[3].value = telefone;
}

const btnAlterar = document.getElementById("alterar");
const btnDeletar = document.getElementById("deletar");
const btnAlterarSenha = document.getElementById("alterarSenha");

btnAlterar.onclick = () => {
    const idUsuario = pegarIdUsuario();
    const usuarioAlterado = alterarUsuario(
        idUsuario,
        inputs[0].value,
        inputs[1].value,
        inputs[2].value,
        inputs[3].value,
    );
    if(usuarioAlterado == 0)
    {
        Swal.fire({
            icon: 'success',
            title: 'Usuário alterado com sucesso',
        });
        Main();
    }
}

btnDeletar.onclick = () => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn-confirmar',
          cancelButton: 'btn-cancelar'
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: 'Quer mesmo deletar este Usuário?',
        text: "Você pode recuperá-lo depois",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'cancelar!',
    }).then((result) => {
        if (result.dismiss !== Swal.DismissReason.cancel) 
        {
            const idUsuario = pegarIdUsuario();

            if (excluirUsuario(idUsuario) == 0)
            {
                Swal.fire({
                    icon: 'success',
                    title: 'Usuário deletado com sucesso',
                    showConfirmButton: true,
                }).then(() => {
                    window.location = '../index.html';
                });
            }
        } 
    });
}

btnAlterarSenha.onclick = async() => {
    const { value: password } = await Swal.fire({
        title: 'Digite sua senha atual',
        input: 'password',
        inputAttributes: {
          maxlength: 10,
          autocapitalize: 'off',
          autocorrect: 'off'
        }
      })
      
    if (password) {
        const idUsuario = pegarIdUsuario();
        if (verificarSenhaId(idUsuario, password)) {
            window.location = './alterarSenha.html';
        }else{
            Swal.fire({
                icon: 'error',
                title: `Senha incorreta`,
            });
        }
    }
}
