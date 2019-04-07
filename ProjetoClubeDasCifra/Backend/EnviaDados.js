const codeInput = document.getElementById('code');
const paraBox = document.getElementById('prodLineBox');


async function sendCode() {
    let code = codeInput.value;
    let para = paraBox.value;


    if (!code) {
        alert("Não foi capturado nenhum dado, tente novamente");

        return;
    }

    let result = await fetch(`/api/insert/${code}?prodLine=${para}`);
    let data = await result.json();

    alert(data.status);

    codeInput.value = '';
}

document.getElementById('sendBtn').addEventListener('click', sendCode);

//cria os botoes para enviar o parametro code e para