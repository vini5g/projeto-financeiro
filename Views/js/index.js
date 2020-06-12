(function() {
    window.addEventListener('load', function() {
      
      let forms = document.getElementsByClassName('form-container');
    
      Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                efetuarLogin();
            }
            form.classList.add('was-validated');
        }, false);
      });
    }, false);
})();

function efetuarLogin() {
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
    const [email, senha] = document.getElementsByTagName('input');
    switch (logar(email.value, senha.value)) {
        case 0:
            window.location = './pages/index.html'
            break;
        case 1:
            Toast.fire({
                icon: 'error',
                title: 'Não foi possível efetuar o login'
            });
            break;
        case 2:
            Toast.fire({
                icon: 'error',
                title: 'Email incorreto ou não cadastrado'
            });
            email.value = '';
            break;
        case 3:
            Toast.fire({
                icon: 'error',
                title: 'Senha incorreta'
            });
            senha.value = '';
            break;
        case 4:
              Swal.fire({
                title: 'Recuperar esta conta?',
                text: "Todos os seus dados serão recuperados!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim, reativar!'
            }).then((result) => {
                if (result.value) {
                    if (reativarConta(email.value, senha.value) == 0) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Conta reativada',
                            showConfirmButton: true,
                        }).then(() => {
                            window.location = './pages/index.html';
                        })
                    } else {
                        Swal.fire({
                            icon: 'success',
                            title: 'Erro ao reativar conta',
                        })
                    }
                }
            })
            break;
    }
}
