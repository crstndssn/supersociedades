import view from '../views/signup.html'
import Authentication from '../firebase/auth.firebase'
import Modal from '../firebase/modal.firebase'

const auth = new Authentication();
const modal = new Modal;

export default () => {
    const divElement = document.createElement('div');
    divElement.innerHTML = view;

    const modalContainer = divElement.querySelector('.modal-container');


    const signupForm = divElement.querySelector('#form-signup');
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = signupForm['signup-name'].value;
        const email = signupForm['signup-email'].value;
        const password = signupForm['signup-password'].value;
        
        if(password.length < 6) {
            modal.errorModal('Tu contraseña debe tener minimo 6 carácteres', modalContainer)
        } else {
            auth.signUpEmailAndPassword(name, email, password, modalContainer);
            signupForm.reset();
        }

    });

    // const loginGoogle = divElement.querySelector('#signup-google')
    // loginGoogle.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     auth.authGoogle(modalContainer);
    //     console.log('signup google')
    //     firebase.auth().onAuthStateChanged((user) => {
    //         if (user) {
    //             window.location.href = '#/posts'
    //         } else {
    //             console.log('hubo un problema en el logeo')
    //         }
    //     })
    // })


    return divElement;
}