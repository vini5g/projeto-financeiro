const inputs = document.querySelectorAll('.input');

function focusFunc(){
    let parent = this.parentNode.parentNode;
    parent.classList.add('focus');
}

function blurFocus(){
    let parent = this.parentNode.parentNode;
    if(this.value == ""){
        parent.classList.remove('focus');
    }
}

inputs.forEach(input => {
    input.addEventListener('focus', focusFunc);
    input.addEventListener('blur', blurFocus);
});

const btnLogin = document.querySelector('input#login');
const form = document.querySelector('form#login');

btnLogin.addEventListener("click", event => {
    event.preventDefault();

    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

    let inputsEmpty = false;
    inputs.forEach(input => {
        if (input.value === ""){
            form.classList.add("validate-error");
            inputsEmpty = true;
        } 
    });

    const formError = document.querySelector("form.validate-error");

    let email = inputs[0].value.toString();

    let emailValido = false;
    for (let i = 0; i < email.length; i++){
        if (email[i] == "@") {
            emailValido = true;
        }
    }

    if (inputsEmpty == true){
        form.classList.add("validate-error");

        if (formError) {
            formError.addEventListener("animationend", (event) => {
                if (event.animationName === "nono") {
                    formError.classList.remove("validate-error");
                }
            });
        }

        return Toast.fire({
            icon: 'error',
            title: 'Preencha todos os campos'
        });
    }

    if (emailValido == false){
        form.classList.add("validate-error");

        if (formError) {
            formError.addEventListener("animationend", (event) => {
                if (event.animationName === "nono") {
                    formError.classList.remove("validate-error");
                }
            });
        }
        
        return Toast.fire({
            icon: 'error',
            title: 'Email Inválido'
        });
    }
        
    switch (logar(inputs[0].value, inputs[1].value)) {
        case 0:
            window.location = './pages/index.html';
            break;

        case 1:     
                form.classList.add("validate-error");
    
                Toast.fire({
                icon: 'error',
                title: 'Não foi possível logar'
                })
            break;

        case 2:
                form.classList.add("validate-error");

                Toast.fire({
                icon: 'error',
                title: 'Email não cadastrado'
                })
            break;  
        case 3:
                form.classList.add("validate-error");

                Toast.fire({
                icon: 'error',
                title: 'Senha incorreta'
                })
            break;  
        case 4:
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn',
                  cancelButton: 'btn'
                },
                buttonsStyling: false
              })
              
              swalWithBootstrapButtons.fire({
                title: 'Conta inativa',
                text: "Desseja reativar essa conta?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim, reativar!',
                cancelButtonText: 'Não, cancelar!',
                reverseButtons: true
              }).then((result) => {
                if (result.dismiss !== Swal.DismissReason.cancel) {
                    if (reativarConta(inputs[0].value, inputs[1].value) == 0) {
                        swalWithBootstrapButtons.fire({
                            icon: 'success',
                            title: 'Conta reativada',
                            showConfirmButton: true,
                        }).then(() => {
                            window.location = './pages/index.html';
                        })
                    } else {
                        swalWithBootstrapButtons.fire(
                            'ERRO!',
                            'Não foi possível reativar sua conta',
                            'error'
                        )
                    }
                  }
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
});

