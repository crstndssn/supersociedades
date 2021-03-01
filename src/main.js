import './css/styles.css'

import {router} from './router/index.routes'

router(window.location.hash)

window.addEventListener('hashchange', () => {
    router(window.location.hash)
})

// navigation auth
const navigationPublic = document.getElementById('navigationPublic');
const navigationPrivate = document.getElementById('navigationPrivate');

const logout = document.getElementById('logout');

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        navigationPublic.style.display = 'none'
        navigationPrivate.style.display = 'flex'
        console.log(user.displayName)
        if (user.photoURL) {
            userAvatar.setAttribute('src', user.photoURL);
        } else {
            userAvatar.setAttribute('src', 'src/resources/profile-user.png')
        }
    } else {
        navigationPublic.style.display = 'flex'
        navigationPrivate.style.display = 'none'
    }
})

logout.addEventListener('click', (e) => {
    firebase.auth().signOut().then(() => {
        window.location.href = '#/';
        location.reload();
    })
})

