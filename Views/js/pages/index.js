$(document).ready(function(){
    $('#sidebarCollapse').on('click',function(){
        $('#sidebar').toggleClass('active');
    });
});

function Main(){
    renderizar();
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    Toast.fire({
        icon: 'success',
        title: 'Bem vindo: ' + usuarioLogado().nome
    });

    const receitas = Number(localStorage.getItem("Receitas"));
    const despesas = Number(localStorage.getItem("Despesas"));

    document.querySelector("#usuario").innerHTML = usuarioLogado().nome;

    document.getElementById('receitas').innerHTML = receitas;
    
    document.getElementById('despesas').innerHTML = despesas;

    let saldo = receitas - despesas;
    document.getElementById('saldo').innerHTML = saldo;

    const card = document.getElementById('cardSaldo');
    if (saldo < 0) {
        const bgSucess = document.querySelector('div.bg-success');
        if (bgSucess) {
            bgSucess.classList.remove('bg-success')
        }
        card.classList.add('bg-danger');
    } else {
        const bgDanger = document.querySelector('div.bg-danger');
        if (bgDanger) {
            bgDanger.classList.remove('bg-danger')
        }
        card.classList.add('bg-success');
    }

}

