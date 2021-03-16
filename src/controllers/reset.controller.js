import view from '../views/reset.html'
import Authentication from '../firebase/auth.firebase'

const auth = new Authentication();

export default () => {
    const divElement = document.createElement('div');
    divElement.innerHTML = view;

    // const modalContainer = divElement.querySelector('.modal-container')

    const resetForm = divElement.querySelector('#reset-form');
    resetForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailToReset = resetForm['reset-email'].value;
        auth.resetPassword(emailToReset)

        window.location.href = '#/login';
    })

    return divElement;
}