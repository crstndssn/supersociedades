import view from '../views/notifications.html'

import Notification from '../firebase/notification.firebase'

const notification = new Notification();

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
    divElement.innerHTML = view; 

    const containerPosts = divElement.querySelector("#container-posts")

    notification.getUsers(containerPosts);

    return divElement;

}   