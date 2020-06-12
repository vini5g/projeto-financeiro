const inputs = [...document.querySelectorAll('.input')];

function Main () {
    const usuarioLogado = JSON.parse(localStorage.getItem("UsuarioLogado"));
    const categorias = JSON.parse(localStorage.getItem("Categorias"))
    document.querySelector("#usuario").innerHTML = usuarioLogado.nome;
    const select = document.querySelector("#categoria");
    select.innerHTML = '';
    if (categorias === undefined || categorias === null || categorias.length == 0) {
        select.innerHTML += '<option id="categoria" value="vazio">Cadastre uma Categoria</option>'
    } else {
        for (const categoria of categorias) {
            select.innerHTML += `<option id="categoria" value="${categoria.id}">${categoria.nome}</option>`
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
                            +       `<td>${conta.idCategoria}</td>`
                            +       `<td>
                                        <button class = "btn btn-outline-warning" onclick = "alterarConta(${conta.id})"><i class = "fa fa-edit"></i></button>
                                        <button class = "btn btn-outline-danger" onclick = "deletarConta(${conta.id})"><i class = "fa fa-trash-o"></i></button>
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
    
    const optionTipo = document.querySelector("select#tipo").value;
    const optionCategoria = document.querySelector("select#categoria").value;

    console.log(optionTipo, optionCategoria);

    let inputsEmpty = false;
    inputs.forEach(input => {
        if (input.value === "") {
            form.classList.add("validate-error");
            inputsEmpty = true;
        } 
    });

    const formError = document.querySelector("form#perfil");

    if (optionCategoria == 'vazio') {
        form.classList.add("validate-error");

        if (formError) 
            formError.addEventListener("animationend", event => {
                if (event.animationName === "nono") formError.classList.remove("validate-error");
            });
    
        return Toast.fire({
            icon: 'error',
            title: 'Cadastre uma categoria'
        });
    }

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

    switch (cadastrar(inputs[0].value, optionTipo, optionCategoria)) {
        case 0:
            Toast.fire({
                icon: 'success',
                title: 'Conta cadastrada'
            });
            inputs[0].value = '';
            break;
    
        case 1:
            Toast.fire({
                icon: 'error',
                title: 'Não foi possível cadastrar a conta'
            });
            break;
    }

    Main();
})

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
        title: 'Selecione a conta que deseja alterar'
    });
})

function alterarConta(id) {
    const lista = listar();
    const conta = lista.find(item => item.id == id);
    inputs.forEach(input => {
        input.parentNode.parentNode.classList.add('focus');
    })

    const selectTipo = document.querySelector("select#tipo");
    
    inputs[0].value = conta.nome;
    selectTipo.value = conta.tipo;

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
    
        const optionTipo = document.querySelector("select#tipo").value;
        const optionCategoria = document.querySelector("select#categoria").value;


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

        if (optionCategoria == 'vazio') {
            form.classList.add("validate-error");
    
            if (formError) 
                formError.addEventListener("animationend", event => {
                    if (event.animationName === "nono") formError.classList.remove("validate-error");
                });
        
            return Toast.fire({
                icon: 'error',
                title: 'Cadastre uma categoria'
            });
        }
    
        switch(alterar(id, inputs[0].value, optionTipo, optionCategoria)) {
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

function deletarConta(id) {
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