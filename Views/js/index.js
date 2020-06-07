const inputs = document.querySelectorAll('.input');

function focusFunc(){
    let parent = this.parentNode.parentNode;
    parent.classList.add('focus');
}

function blurFocus(){
    let parent = this.parentNode.parentNode;
    if(this.value == ""){
        parent.classList.remove('focus');
    }
}

inputs.forEach(input => {
    input.addEventListener('focus', focusFunc);
    input.addEventListener('blur', blurFocus);
});

const btnLogin = document.querySelector('input#login');
const form = document.querySelector('form#login');

btnLogin.addEventListener("click", event => {
    event.preventDefault();

    const fields = [...document.querySelectorAll("input#input")];

    fields.forEach(field => {
        if (field.value === "") form.classList.add("validate-error");
    });

    const formError = document.querySelector("form.validate-error");
    if (formError) {
        formError.addEventListener("animationend", (event) => {
            if (event.animationName === "nono") {
                formError.classList.remove("validate-error");
            }
        });
    }
});

