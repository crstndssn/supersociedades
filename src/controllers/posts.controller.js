import viewAllPosts from '../views/all.post.html'
import viewPost from '../views/view.post.html'

import Post from '../firebase/posts.firebase'

const post = new Post();

export default () => {

    let userSession;

    // You're an user?
    firebase.auth().onAuthStateChanged((user) => {

        if (user == null) {

            console.log('No tienes permisos');
            window.location.href = "#/login"
            return location.reload()

        } else {
            userSession = user.uid
        }
    })


    const divElement = document.createElement('div');
    divElement.innerHTML = viewAllPosts; 

    const containerPosts = divElement.querySelector("#container-posts")

    post.getPosts(containerPosts, userSession);
    
    console.log()

    return divElement;

}   