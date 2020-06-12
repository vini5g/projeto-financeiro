const [senhaAtual, senhaNova, senhaConfirmar] = document.getElementsByTagName('input');

(function() {
    window.addEventListener('load', function() {
      document.querySelector("#usuario").innerHTML = usuarioLogado().nome;  
      let forms = document.getElementsByClassName('form-container');
    
      Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                efetuarAlteracaoSenha();
            }
            form.classList.add('was-validated');
        }, false);
      });
    }, false);
})();

function efetuarAlteracaoSenha() {
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
   
    switch(alterarSenha(senhaAtual.value, senhaNova.value, senhaConfirmar.value)) {
        case 0:
            Swal.fire({
                icon: 'success',
                title: 'Senha alterada com sucesso',
                showConfirmButton: true,
            }).then(() => {
                window.location = './perfil.html';
            });
            break;
        case 1:
            Toast.fire({
                icon: 'error',
                title: 'Não foi possível alterar sua senha'
            })
            senhaAtual.value = '';
            senhaNova.value = '';
            senhaConfirmar.value = '';
            break;
        case 2:
            Toast.fire({
                icon: 'error',
                title: 'Senha atual incorreta'
            })
            senhaAtual.value = '';
            break;
        case 3:
            Toast.fire({
                icon: 'error',
                title: 'As novas senhas não coincidem'
            })
            senhaConfirmar.value = '';
            break;
    }
}

$(document).ready(function(){
    $('#sidebarCollapse').on('click',function(){
        $('#sidebar').toggleClass('active');
    });
});