function sair() {
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

    switch (deslogar()) {
        case 0:
            window.location = '../index.html'
            break;
    
        case 1:
            Toast.fire({
                icon: 'error',
                title: 'Não foi possível deslogar'
            })
            break;
    }
}