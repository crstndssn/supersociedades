import view from '../views/signup.html'
import Authentication from '../firebase/auth.firebase'

const auth = new Authentication();

export default () => {
    const divElement = document.createElement('div');
    divElement.innerHTML = view;

    const signupForm = divElement.querySelector('#form-signup');
    signupForm.addEventListener('submit', (e) => {
        const name = signupForm['signup-name'].value;
        const email = signupForm['signup-email'].value;
        const password = signupForm['signup-password'].value;
        const modalContainer = divElement.querySelector('.modal-container');
        auth.signUpEmailAndPassword(name, email, password, modalContainer);
        location.reload();
        window.location.href = '#/';

    });

    return divElement;
}