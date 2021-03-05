import view from '../views/add.post.html'

import Posts from '../firebase/posts.firebase'
import Modal from '../firebase/modal.firebase'

const post = new Posts();

export default () => {

    let userSession;

    // You're an user?
    firebase.auth().onAuthStateChanged((user) => {

        if (user.email == 'edussan@itsoluciones.net') {

            userSession = user;

        } else {

            alert('No tienes permisos');
            window.location.href = "#/"
            return location.reload()
        }
        
    })
    

    const divElement = document.createElement('div');
    divElement.innerHTML = view;

    const postForm = divElement.querySelector('#form-post');
    const uploadBar = divElement.querySelector('.upload-file');
    postForm.addEventListener('submit', (e) => {

        e.preventDefault();

        const title = postForm['title-post'].value;
        const description = postForm['description-post'].value;
        const postLink = sessionStorage.getItem('imgNewPost') == 'null'
            ? null
            : sessionStorage.getItem('imgNewPost')
        console.log(title, description);
        
        console.log(userSession.email)
        post.createPost(
            userSession.uid,
            userSession.email,
            title,
            description,
            postLink
        )
        .then(resp => {
            console.log('post creado')
        })
        .catch(err => {
            console.log(err)
        })

        postForm.reset();
        uploadBar.style.width = '0%';
        window.location.href = '#/posts'

    })


    const inputFileBtn = divElement.querySelector('#input-file');
    inputFileBtn.addEventListener('change', (e)=>{
        e.preventDefault();
        const file = e.target.files[0];
        const user = userSession;
        console.log(uploadBar)
        post.uploadFiles(file, user.uid, uploadBar)
        inputFileBtn.value = null
    })

    uploadBar.style.width = '0%';

    return divElement;







}