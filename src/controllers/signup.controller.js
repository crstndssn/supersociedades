import view from '../views/signup.html'
import Authentication from '../firebase/auth.firebase'
import Modal from '../firebase/modal.firebase'

const auth = new Authentication();
const modal = new Modal;

export default () => {
    const divElement = document.createElement('div');
    divElement.innerHTML = view;

    const signupForm = divElement.querySelector('#form-signup');
    signupForm.addEventListener('submit', (e) => {
        const name = signupForm['signup-name'].value;
        const email = signupForm['signup-email'].value;
        const password = signupForm['signup-password'].value;
        const modalContainer = divElement.querySelector('.modal-container');

        if(password.length < 7) {
            modal.errorModal('Contraseña muy corta', modalContainer)
        } else {
            auth.signUpEmailAndPassword(name, email, password, modalContainer);
            window.location.href = "#/posts";
            location.reload();
        }
        
    });

    return divElement;
}