const inputs = [...document.querySelectorAll("input")];

function Main() {

    inputs.forEach(input => {
        input.parentNode.parentNode.classList.add('focus');
    })

    const usuario = usuarioLogado();
    inputs[0].value = usuario.nome;
    inputs[1].value = usuario.email;
    inputs[2].value = usuario.endereco;
    inputs[3].value = usuario.telefone;
}

inputs.forEach(input => {
    input.addEventListener('focus', focusFunc);
    input.addEventListener('blur', blurFocus);
});

function focusFunc(){
    let parent = this.parentNode.parentNode;
    parent.classList.add('focus');
}

function blurFocus(){
    let parent = this.parentNode.parentNode;
    if(this.value == "") parent.classList.remove('focus');
}

const btnAlterar = document.querySelector('button#alterar');
const btnDeletar = document.querySelector('button#deletar');

const form = document.querySelector('form#perfil');

btnAlterar.addEventListener('click', event => {
    event.preventDefault();

    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    let inputsEmpty = false;
    inputs.forEach(input => {
        if (input.value === "") {
            form.classList.add("validate-error");
            inputsEmpty = true;
        } 
    });

    const formError = document.querySelector("form#perfil");

    let email = inputs[1].value.toString();

    let emailValido = false;
    for (let i = 0; i < email.length; i++) if (email[i] == "@") emailValido = true;

    if (inputsEmpty == true){
        form.classList.add("validate-error");

        if (formError) 
            formError.addEventListener("animationend", event => {
                if (event.animationName === "nono") formError.classList.remove("validate-error");
            });
        Main();
    
        return Toast.fire({
            icon: 'error',
            title: 'Preencha todos os campos'
        });
    }

    if (emailValido == false){
        form.classList.add("validate-error");

        if (formError) 
            formError.addEventListener("animationend", event => {
                if (event.animationName === "nono") formError.classList.remove("validate-error");
            });
        Main();
        
        return Toast.fire({
            icon: 'error',
            title: 'Email Inválido'
        });
    }

    switch (alterar(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value)) {
        case 0:
            Toast.fire({
                icon: 'success',
                title: 'Usuário alterado com sucesso'
                })
            break;

        case 1:
            Toast.fire({
                icon: 'error',
                title: 'Não foi possível alterar o usuário'
            })
            break;
        
        case 2:
            Toast.fire({
                icon: 'error',
                title: 'Esse email pertence a outro usuário'
            })
            break;
    }
    if (formError) {
        formError.addEventListener("animationend", (event) => {
            if (event.animationName === "nono") {
                formError.classList.remove("validate-error");
            }
        });
    }

    Main();
});

btnDeletar.addEventListener('click', event => {
    event.preventDefault();

    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn-confirmar',
            cancelButton: 'btn-cancelar'
        },
        buttonsStyling: false
        })
        
        swalWithBootstrapButtons.fire({
        title: 'Deseja deletar esta conta?',
        text: "Você pode recuperá-la depois!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true
        }).then((result) => {
        if (result.dismiss !== Swal.DismissReason.cancel) {
            switch (deletar()) {
                case 0:
                    Swal.fire({
                        customClass: {
                            confirmButton: 'btn-confirmar',
                        },
                        icon: 'success',
                        title: 'Conta deletada',
                        showConfirmButton: true,
                    }).then(() => {
                        window.location = '../index.html';
                    });
                    break;
                case 1:
                    Toast.fire({
                        icon: 'error',
                        title: 'Não foi possível deletar'
                    })
                    break;
            }
        } 
    });
});