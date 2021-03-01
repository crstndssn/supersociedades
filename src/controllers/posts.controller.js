import viewAllPosts from '../views/all.post.html'
import viewPost from '../views/view.post.html'

import Post from '../firebase/posts.firebase'

const post = new Post();

export default () => {

    const divElement = document.createElement('div');
    divElement.innerHTML = viewAllPosts; 

    const modalContainer = divElement.querySelector('.modal-container');

    const postForm = divElement.querySelector('#form-note');
    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = postForm['title-post'].value;
        const description = postForm['title-description'].value;
        const postLink = sessionStorage.getItem('imgNewPost') == 'null'
            ? null
            : sessionStorage.getItem('imgNewPost')
        console.log(title, description) 
    })

    post.createPost(
        user.uid,
        user.displayName,
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
    document.querySelector('.upload-image').style.width = '0%'

    return divElement;

}   