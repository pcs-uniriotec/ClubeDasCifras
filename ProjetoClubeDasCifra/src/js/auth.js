//autenticação
import {Auth as auth} from "firebase";

const signupForm = document.querySelector('#submitFormCadastro');
signupForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    //pega as informaçoes do usuario
    const email = signupForm['signupEmail'].value;
    const password = signupForm['signupPassword'].value;

    //criacao do usuario
    auth.createUserWithEmailAndPassword(email,password).then(credencial=>{

    });
});
