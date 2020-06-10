const inputs = document.querySelectorAll('.input');

function Main(){
    const usuarioLogado = JSON.parse(localStorage.getItem("UsuarioLogado"));
    document.querySelector("#usuario").innerHTML = usuarioLogado.nome;
    const thread = document.querySelector("tbody#conteudo-table");
    thread.innerHTML = '';
    const categorias = listar();
    if (categorias === undefined || categorias === null || categorias.length == 0) {
        thread.innerHTML += '<tr>'
                         +      '<th>Não há categorias cadastradas</th>'
                         +      '<th>#</th>'
                         +      '<th>#</th>'
                         +      '<th>#</th>'
                         +  '</tr>'
    } else {
        for (const categoria of categorias) {
            thread.innerHTML += `<tr>`
                            +       `<th scope="row">${categoria.id}</th>`
                            +       `<td>${categoria.nome}</td>`
                            +       `<td>${categoria.idUsuario}</td>`
                            +       `<td>
                                        <button class = "btn btn-outline-warning" onclick = "alterarCategoria(${categoria.id})"><i class = "fa fa-edit"></i></button>
                                        <button class = "btn btn-outline-danger" onclick = "deletarCategoria(${categoria.id})"><i class = "fa fa-trash-o"></i></button>
                                    </td>`
                            +   `</tr>`
        }
    }
}

function focusFunc(){
    let parent = this.parentNode.parentNode;
    parent.classList.add('focus');
}

function blurFocus(){
    let parent = this.parentNode.parentNode;
    if(this.value == "") parent.classList.remove('focus');
}

inputs.forEach(input => {
    input.addEventListener('focus', focusFunc);
    input.addEventListener('blur', blurFocus);
});

const btnCadastrar = document.querySelector('button#cadastrar');
const btnAlterar = document.querySelector('button#alterar');
const form = document.querySelector('form#perfil');

btnAlterar.addEventListener('click', event => {
    event.preventDefault();

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

    return Toast.fire({
        icon: 'error',
        title: 'Selecione a categoria que deseja alterar'
    });
})

btnCadastrar.addEventListener('click', event => {
    event.preventDefault();

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

    let inputsEmpty = false;
    inputs.forEach(input => {
        if (input.value === "") {
            form.classList.add("validate-error");
            inputsEmpty = true;
        } 
    });

    const formError = document.querySelector("form#perfil");

    if (inputsEmpty == true){
        form.classList.add("validate-error");

        if (formError) 
            formError.addEventListener("animationend", event => {
                if (event.animationName === "nono") formError.classList.remove("validate-error");
            });
    
        return Toast.fire({
            icon: 'error',
            title: 'Preencha todos os campos'
        });
    }

    switch(cadastrar(inputs[0].value)) {
        case 0: 
            Toast.fire({
                icon: 'success',
                title: 'Categoria cadastrada'
            });
            inputs[0].value = '';
            break;
        case 1:
            Toast.fire({
                icon: 'error',
                title: 'Não foi possível cadastrar a categoria'
            });
            break;
    }

    if (formError) {
        formError.addEventListener("animationend", (event) => {
            if (event.animationName === "nono") {
                formError.classList.remove("validate-error");
            }
        });
    }

    Main();
});


function alterarCategoria(id) {
    const lista = listar();
    const categoria = lista.find(item => item.id == id);
    inputs.forEach(input => {
        input.parentNode.parentNode.classList.add('focus');
    })

    inputs[0].value = categoria.nome;

    btnAlterar.addEventListener('click', event => {
        event.preventDefault();
    
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
    
        let inputsEmpty = false;
        inputs.forEach(input => {
            if (input.value === "") {
                form.classList.add("validate-error");
                inputsEmpty = true;
            } 
        });
    
        const formError = document.querySelector("form#perfil");
    
        if (inputsEmpty == true){
            form.classList.add("validate-error");
    
            if (formError) 
                formError.addEventListener("animationend", event => {
                    if (event.animationName === "nono") formError.classList.remove("validate-error");
                });
        
            return Toast.fire({
                icon: 'error',
                title: 'Preencha todos os campos'
            });
        }
    
        switch(alterar(id, inputs[0].value)) {
            case 0: 
                Toast.fire({
                    icon: 'success',
                    title: 'Categoria alterada'
                });
                inputs[0].value = '';
                break;
            case 1:
                Toast.fire({
                    icon: 'error',
                    title: 'Não foi possível alterar a categoria'
                });
                break;
        }
    
        if (formError) {
            formError.addEventListener("animationend", (event) => {
                if (event.animationName === "nono") {
                    formError.classList.remove("validate-error");
                }
            });
        }
    
        Main();
    })
    
}

function deletarCategoria(id){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn-confirmar',
            cancelButton: 'btn-cancelar'
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: 'Deletar a categoria?',
        text: "Você não irá poder recuperá-la depois",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'cancelar!',
    }).then((result) => {
        if (result.dismiss !== Swal.DismissReason.cancel) {
            if (deletar(id) == 0)
            {
                swalWithBootstrapButtons.fire(
                    'Categoria deletada',
                    'A categoria foi deletada com sucesso.',
                    'success'
                );
                
                Main();
            }
            else
            {
                swalWithBootstrapButtons.fire(
                    'ERRO',
                    'Não foi possível deletar a categoria, tente novamente',
                    'warning'
                );
            }
        } 
    });
}


