const [nome] = document.getElementsByTagName('input');

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
    const thread = document.querySelector("tbody#conteudo-table");
    thread.innerHTML = '';
    const renderizarCategorias = listar();
    if (renderizarCategorias === null) {
        thread.innerHTML += '<tr>'
                         +      '<th scope="row">Não há categorias cadastradas</th>'
                         +      '<td>#</th>'
                         +      '<td>#</th>'
                         +  '</tr>'
    } else {
        for (const categoria of renderizarCategorias) {
            thread.innerHTML += '<tr>'
                             +      `<th scope="row">${categoria.id}</th>`
                             +      `<td>${categoria.nome}</th>`
                             +      `<td>
                                        <button class="btn btn-outline-warning" onclick="loadCategoria(${categoria.id})"><i class = "fa fa-edit"></i></button>
                                        <button class="btn btn-outline-danger" onclick="deletarCategoria(${categoria.id})"><i class = "fa fa-trash-o"></i></button>
                                    </td>`
                             +  '</tr>'
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
    if (btn.id = 'cadastrarCategoria') {
        switch (cadastrar(nome.value)) {
            case 0:
                Swal.fire({
                    icon: 'success',
                    title: 'Categoria cadastrada'
                })
                nome.value = '';
                break;
            case 1:
                Toast.fire({
                    icon: 'error',
                    title: 'Não foi possível cadastrar a categoria'
                })
                break;
        }
    } 
    Main();
    
}

const btnAlterar = document.querySelector('button#alterarCategoria');

function loadCategoria(id) {
    const lista = JSON.parse(localStorage.getItem("Categorias"));
    const categoria = lista.find(item => item.id == id);
    nome.value = categoria.nome;
    btnAlterar.disabled = false;
    btnAlterar.onclick = () => {

        if (nome.value == '') {
            btnAlterar.disabled = true;
            return Toast.fire({
                icon: 'error',
                title: 'Digite um nome válido'
            })
        }
        alterarCategoria(id, nome.value);
        nome.value = '';
    };
}

function alterarCategoria(id, nome) {
    if (alterar(id, nome) == 0) {
        Swal.fire({
            icon: 'success',
            title: 'Categoria alterada'
        })
    } else {
        Toast.fire({
            icon: 'error',
            title: 'Não foi possível alterar a categoria'
        })
    }
    btnAlterar.disabled = true;
    Main();
}

function deletarCategoria(id) {
    Swal.fire({
        title: 'Deletar esta categoria?',
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
                        title: 'Categoria deletada',
                    });
                    break;
            
                case 1:
                    Swal.fire({
                        icon: 'error',
                        title: 'Não foi possível deletar esta categoria',
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