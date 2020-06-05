document.getElementById("logar").onsubmit = (e) => {
    e.preventDefault();

    const inputs = document.getElementByTagName("input");
    logar(inputs);
}