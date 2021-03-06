import view from '../views/all.post.html'

import Post from '../firebase/posts.firebase'

const post = new Post();

export default () => {

    const divElement = document.createElement('div');
    divElement.innerHTML = view;

    const containerPosts = divElement.querySelector("#container-posts")

    // You're an user?
    firebase.auth().onAuthStateChanged(async (user) => {

            if (user == null) {
                console.log('No tienes permisos');
                window.location.href = "#/login";
                return location.reload();

            } else {
                console.log(user.email);
                post.getPosts(containerPosts, user.email);

            }
        })

    return divElement;
}   