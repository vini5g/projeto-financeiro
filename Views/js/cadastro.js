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
                efetuarCadastro();
            }
            form.classList.add('was-validated');
        }, false);
      });
    }, false);
})();

function efetuarCadastro() {
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
    const [nome, email, senha, telefone, endereco] = document.getElementsByTagName('input');
    switch (cadastrar(nome.value, email.value, senha.value, endereco.value, telefone.value)) {
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
                title: 'Não foi possível cadastrar o usuário'
            })
            break;
        case 2: 
            Toast.fire({
                icon: 'error',
                title: 'Este email pertence a outro usuário'
            })
            email.value = '';
            break;
    }
}
