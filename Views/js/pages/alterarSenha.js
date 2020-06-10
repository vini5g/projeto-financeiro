const inputs = [...document.querySelectorAll("input")];

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

const btnAlterar = document.querySelector('button#salvar');

const form = document.querySelector('form#login');

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
        
    
        return Toast.fire({
            icon: 'error',
            title: 'Preencha todos os campos'
        });
    }

    
    switch (alterarSenha(inputs[0].value, inputs[1].value, inputs[2].value)) {
        case 0:
            Swal.fire({
                icon: 'success',
                title: 'Senha alterada',
                showConfirmButton: true,
            }).then(() => {
                window.location = './perfil.html';
            });
            break;

        case 1:
            form.classList.add("validate-error");
            Toast.fire({
                icon: 'error',
                title: 'Não foi possível alterar sua senha'
            })
            break;
        
        case 2:
            form.classList.add("validate-error");
            Toast.fire({
                icon: 'error',
                title: 'Senha atual incorreta'
            })
            break;
        case 3:
            form.classList.add("validate-error");
            Toast.fire({
                icon: 'error',
                title: 'Senhas não conferem'
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

