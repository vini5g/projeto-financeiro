const [nome, email, telefone, endereco] = document.getElementsByTagName('input');

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
                efetuarAcoes(event);
            }
            form.classList.add('was-validated');
        }, false);
      });
    }, false);
})();

function Main() {
    const usuario = listar();
    if (usuario == null) {
        Swal.fire({
            icon: 'error',
            title: 'Erro ao listar o usuário',
            showConfirmButton: true,
        }).then(() => {
            window.location = './index.html';
        });
    }

    document.querySelector("#usuario").innerHTML = usuarioLogado().nome;  

    nome.value = usuario.nome;
    email.value = usuario.email;
    endereco.value = usuario.endereco;
    telefone.value = usuario.telefone;
}

function efetuarAcoes() {
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
   
    switch (alterar(nome.value, email.value, endereco.value, telefone.value)) {
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
    Main();
}

document.getElementById('deletar').addEventListener('click', () => {
    Swal.fire({
        title: 'Deletar esta conta?',
        text: "Ela pode ser recuperada depois!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
        if (result.value) {
            switch (deletar()) {
                case 0:
                    Swal.fire({
                        icon: 'success',
                        title: 'Conta deletada',
                        showConfirmButton: true,
                    }).then(() => {
                        window.location = '../index.html';
                    });
                    break;
            
                case 1:
                    Swal.fire({
                        icon: 'error',
                        title: 'Não foi possível deletar esta conta',
                        })
                        
                    break;
            }
            
        }
    })
})

$(document).ready(function(){
    $('#sidebarCollapse').on('click',function(){
        $('#sidebar').toggleClass('active');
    });
});