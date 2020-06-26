const [valor, descricao] = document.getElementsByTagName('input');
const [selectConta] = document.getElementsByTagName('select');

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
                efetuarAcoes(event);
            }
            form.classList.add('was-validated');
        }, false);
      });
    }, false);
})();

function Main() {
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
    selectConta.innerHTML = '';
    const renderizarContas = flamengo().filter(item => item.usuario.id == usuarioLogado().id);
    console.log(renderizarContas)       
    if (renderizarContas === null || renderizarContas === undefined || renderizarContas.length <= 0) {
        selectConta.innerHTML += '<option selected disabled value="">Cadastre uma conta</option>'
    } else {
        for (const contas  of renderizarContas) {
            selectConta.innerHTML += `<option value="${contas.id}">${contas.nome}</option>`
        }
    }
    const thread = document.querySelector("tbody#conteudo-table");
    thread.innerHTML = '';
    const listaLancamento = listar();
    if (listaLancamento === undefined || listaLancamento === null || listaLancamento.length == 0) {
        thread.innerHTML += '<tr>'
                         +      '<th>Não há contas cadastradas</th>'
                         +      '<th>#</th>'
                         +      '<th>#</th>'
                         +      '<th>#</th>'
                         +      '<th>#</th>'
                         +      '<th>#</th>'
                         +      '<th>#</th>'
                         +  '</tr>'
    } else {
        for (const lancamento of listaLancamento) {
            thread.innerHTML += `<tr>`
                            +       `<th scope="row">${lancamento.id}</th>`
                            +       `<td>${lancamento.valor}</td>`
                            +       `<td>${lancamento.conta.nome}</td>`
                            +       `<td>${lancamento.conta.tipo}</td>`
                            +       `<td>${lancamento.data}</td>`
                            +       `<td>${lancamento.hora}</td>`
                            +       `<td>${lancamento.descricao}</td>`
                            +       `<td>
                                        <button class = "btn btn-outline-warning" onclick = "loadLancamento(${lancamento.id})"><i class = "fa fa-edit"></i></button>
                                        <button class = "btn btn-outline-danger" onclick = "deletarLancamento(${lancamento.id})"><i class = "fa fa-trash-o"></i></button>
                                    </td>`
                            +   `</tr>`
        }
    }
}

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


function efetuarAcoes(event) {
    const btn = event.submitter;
    if (btn.id = 'cadastrarLancamento') {
        switch (cadastrar(valor.value, descricao.value, selectConta.value)) {
            case 0:
                Swal.fire({
                    icon: 'success',
                    title: 'Lançamento realizado'
                })
                valor.value = '';
                selectConta.value = '';
                break;
            case 1:
                Toast.fire({
                    icon: 'error',
                    title: 'Não foi possível realizar o lançamento'
                })
                break;
            case 2:
                Toast.fire({
                    icon: 'error',
                    title: 'Cadastre uma conta antes de fazer o lançamento'
                })
                break;
            case 3:
                Toast.fire({
                    icon: 'error',
                    title: 'Esse lançamento já foi realizado'
                })
                break;
        }
    } 
    Main();
}

const btnAlterar = document.querySelector('button#alterarLancamento');

function loadLancamento(id) {
    const lista = listar();
    console.log(lista)
    const lancamento = lista.find(item => item.id == id);
    
    valor.value = lancamento.valor;
    selectConta.value = lancamento.conta.id;
    descricao.value = lancamento.descricao;
    btnAlterar.disabled = false;
    btnAlterar.onclick = () => {
        if (valor.value == '') {
            btnAlterar.disabled = true;
            return Toast.fire({
                icon: 'error',
                title: 'Digite um valor válido'
            })
        }

        alterarLancamento(id, valor.value, descricao.value, selectConta.value);
        valor.value = '';
        descricao.value = '';  
        selectConta.value ='';
    };
}

function alterarLancamento(id, valor, descricao, conta) {
    if (alterar(id, valor, descricao, conta) == 0) {
        Swal.fire({
            icon: 'success',
            title: 'Lançamento alterada'
        })
    } else {
        Toast.fire({
            icon: 'error',
            title: 'Não foi possível alterar o lançamento'
        })
    }
    btnAlterar.disabled = true;
    Main();
}

function deletarLancamento(id) {
    Swal.fire({
        title: 'Deletar este lançamento?',
        text: "Ele não pode ser recuperada depois!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
        if (result.value) {
            switch (deletar(id)) {
                case 0:
                    Swal.fire({
                        icon: 'success',
                        title: 'Lançamento deletada',
                    });
                    break;
            
                case 1:
                    Swal.fire({
                        icon: 'error',
                        title: 'Não foi possível deletar este lançamento',
                        })
                        
                    break;
            }
            Main();  
        }
    })
}

$(document).ready(function(){
    $('#sidebarCollapse').on('click',function(){
        $('#sidebar').toggleClass('active');
    });
});