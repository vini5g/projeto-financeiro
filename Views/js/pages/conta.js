const [nome] = document.getElementsByTagName('input');
const [selectTipo, selectCategoria] = document.getElementsByTagName('select');

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
    selectCategoria.innerHTML = '';
    const renderizarCategorias = categorias().filter(item => item.usuario.id == usuarioLogado().id);
    if (renderizarCategorias === null || renderizarCategorias === undefined || renderizarCategorias.length <= 0) {
        selectCategoria.innerHTML += '<option selected disabled value="">Cadastre uma categoria</option>'
    } else {
        for (const categoria of renderizarCategorias) {
            selectCategoria.innerHTML += `<option value="${categoria.id}">${categoria.nome}</option>`
        }
    }
    const thread = document.querySelector("tbody#conteudo-table");
    thread.innerHTML = '';
    const contas = listar();
    if (contas === undefined || contas === null || contas.length == 0) {
        thread.innerHTML += '<tr>'
                         +      '<th>Não há contas cadastradas</th>'
                         +      '<th>#</th>'
                         +      '<th>#</th>'
                         +      '<th>#</th>'
                         +      '<th>#</th>'
                         +  '</tr>'
    } else {
        for (const conta of contas) {
            thread.innerHTML += `<tr>`
                            +       `<th scope="row">${conta.id}</th>`
                            +       `<td>${conta.nome}</td>`
                            +       `<td>${conta.tipo}</td>`
                            +       `<td>${conta.categoria.nome}</td>`
                            +       `<td>
                                        <button class = "btn btn-outline-warning" onclick = "loadConta(${conta.id})"><i class = "fa fa-edit"></i></button>
                                        <button class = "btn btn-outline-danger" onclick = "deletarConta(${conta.id})"><i class = "fa fa-trash-o"></i></button>
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
    if (btn.id = 'cadastrarConta') {
        switch (cadastrar(nome.value, selectTipo.value, selectCategoria.value)) {
            case 0:
                Swal.fire({
                    icon: 'success',
                    title: 'Conta cadastrada'
                })
                nome.value = '';
                selectTipo.value = '';
                break;
            case 1:
                Toast.fire({
                    icon: 'error',
                    title: 'Não foi possível cadastrar a conta'
                })
                break;
        }
    } 
    Main();
}

const btnAlterar = document.querySelector('button#alterarConta');

function loadConta(id) {
    const lista = JSON.parse(localStorage.getItem("Contas"));
    const contas = lista.find(item => item.id == id);
    nome.value = contas.nome;
    selectTipo.value = contas.tipo;
    selectCategoria.value = contas.categoria.id;
    console.log(contas.categoria.nome);
    btnAlterar.disabled = false;
    btnAlterar.onclick = () => {
        if (nome.value == '') {
            btnAlterar.disabled = true;
            return Toast.fire({
                icon: 'error',
                title: 'Digite um nome válido'
            })
        }

        alterarConta(id, nome.value, selectTipo.value, selectCategoria.value);
        nome.value = '';
        selectTipo.value ='';
    };
}

function alterarConta(id, nome, tipo, categoria) {
    if (alterar(id, nome, tipo, categoria) == 0) {
        Swal.fire({
            icon: 'success',
            title: 'Conta alterada'
        })
    } else {
        Toast.fire({
            icon: 'error',
            title: 'Não foi possível alterar a conta'
        })
    }
    btnAlterar.disabled = true;
    Main();
}

function deletarConta(id) {
    Swal.fire({
        title: 'Deletar esta conta?',
        text: "Ela não pode ser recuperada depois!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
        if (result.value) {
            switch (deletar(id)) {
                case 0:
                    Swal.fire({
                        icon: 'success',
                        title: 'Conta deletada',
                    });
                    break;
            
                case 1:
                    Swal.fire({
                        icon: 'error',
                        title: 'Não foi possível deletar esta conta',
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