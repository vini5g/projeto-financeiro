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

const btnLogin = document.querySelector('button#login');
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
    if (formError) {
        formError.addEventListener("animationend", (event) => {
            if (event.animationName === "nono") {
                formError.classList.remove("validate-error");
            }
        });
    }

    let email = inputs[1].value.toString();

    let emailValido = false;
    for (let i = 0; i < email.length; i++){
        if (email[i] == "@") {
            emailValido = true;
        }
    }

    if (inputsEmpty == true){
        return Toast.fire({
            icon: 'error',
            title: 'Preencha todos os campos'
        });
    }

    if (emailValido == false){
        return Toast.fire({
            icon: 'error',
            title: 'Email Inválido'
        });
    }
        
    switch (cadastrar(
        inputs[0].value, 
        inputs[1].value, 
        inputs[2].value, 
        inputs[3].value, 
        inputs[4].value)) {
        case 0:
            Swal.fire({
                icon: 'success',
                title: 'Usuário cadastrado com sucesso',
                showConfirmButton: true,
            }).then(() => {
                window.location = './pages/index.html';
            });
            break;

        case 1:          
                Toast.fire({
                icon: 'error',
                title: 'Este email pertence a outro usuário'
                })
            break;

        case 2:
                Toast.fire({
                icon: 'error',
                title: 'Não foi possível cadastrar o usuário!'
                })
            break;  
    }
});
