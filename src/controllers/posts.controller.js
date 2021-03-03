import viewAllPosts from '../views/all.post.html'
import viewPost from '../views/view.post.html'

import Post from '../firebase/posts.firebase'

const post = new Post();

export default () => {



    // You're an user?
    firebase.auth().onAuthStateChanged((user) => {

        if (user == null) {

            alert('No tienes permisos');
            window.location.href = "#/"
            return location.reload()

        }
    })

    const divElement = document.createElement('div');
    divElement.innerHTML = viewAllPosts; 

    const containerPosts = divElement.querySelector("#container-posts")

    post.getPosts(containerPosts);
    
    console.log()

    return divElement;

}   