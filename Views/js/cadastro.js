document.getElementById("form-cadastrar").onsubmit = (e) => {
    e.preventDefault();

    const inputs = document.getElementsByTagName("input");
    
    switch (cadastrar(inputs)) {
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
            Swal.fire({
                icon: 'error',
                title: 'Este email pertence a outro usuário',
            })
            break;

        case 2:
            Swal.fire({
                icon: 'error',
                title: 'Não foi possível cadastrar o usuário!',
            })
            break;  
    }
    
}