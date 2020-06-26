$(document).ready(function(){
    $('#sidebarCollapse').on('click',function(){
        $('#sidebar').toggleClass('active');
    });
});

function Main(){
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

    document.querySelector("#usuario").innerHTML = usuarioLogado().nome;

    const receitas = Receitas().selectReceitas();
    const despesas = Despesas().selectDespesas();
    if (receitas != null && receitas) {
        const receita = receitas.find(item => item.usuario.id == usuarioLogado().id);
        document.getElementById('receitas').innerHTML = receita.valor;
    }

    if (despesas != null && despesas) {
        const despesa = despesas.find(item => item.usuario.id == usuarioLogado().id);
        document.getElementById('despesas').innerHTML = despesa.valor;
    }

    let saldo = Number(document.getElementById('receitas').innerHTML) - Number(document.getElementById('despesas').innerHTML)
    document.getElementById('saldo').innerHTML = saldo;

    const cardSaldo = document.getElementById('cardSaldo');
    if (saldo < 0) {
        const bgSucess = document.querySelector('div.bg-success');
        if (bgSucess) {
            bgSucess.classList.remove('bg-success')
        }
        cardSaldo.classList.add('bg-danger');
    } else {
        const bgDanger = document.querySelector('div.bg-danger');
        if (bgDanger) {
            bgDanger.classList.remove('bg-danger')
        }
        cardSaldo.classList.add('bg-success');
    }
}

