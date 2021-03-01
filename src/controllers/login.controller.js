import view from '../views/login.html'
import Authentication from '../firebase/auth.firebase'
import Modal from '../firebase/modal.firebase'

const auth = new Authentication();

export default () => {
    const divElement = document.createElement('div');
    divElement.innerHTML = view;

    const modalContainer = divElement.querySelector('.modal-container')
     
    const loginForm = divElement.querySelector('#form-login')
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm['login-email'].value;
        const password = loginForm['login-password'].value;
        console.log(email, password, modalContainer)
        auth.authEmailPassword(email, password, modalContainer);
        // window.location.href = '#/tasks';

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                window.location.href = '#/posts';
            }
        })
       
        console.log(viewTasks)

        var modalContainerTasks = document.createElement('div');
        modalContainerTasks.innerHTML += viewTasks;
        modalContainerTasks.querySelector('.modal-container')
        console.log(modalContainerTasks)

        // let messageWecome = 'Welcome'

        console.log(Modal.successModal())

        debugger

        // let messageWecomeTemplate = Modal.successModal(messageWecome)

        modalContainerTasks.innerHTML += messageWecomeTemplate
        
        debugger
    });

    const loginGoogle = divElement.querySelector('#login-google')
    loginGoogle.addEventListener('click', (e) => {
        e.preventDefault();
        auth.authGoogle(modalContainer);
        console.log('loged google')
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                window.location.href = '#/posts'
            } else {
                console.log('hubo un problema en el logeo')
            }
        })
    })

    return divElement;

}