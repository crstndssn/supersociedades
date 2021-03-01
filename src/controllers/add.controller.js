import view from '../views/add.post.html'

import Posts from '../firebase/posts.firebase'
import Modal from '../firebase/modal.firebase'

// const post = new Post();

export default () => {
    const divElement = document.createElement('div');
    divElement.innerHTML = view;

    return divElement;

}