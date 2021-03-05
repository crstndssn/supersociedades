import './css/styles.css'
import './css/main.css'

import {router} from './router/index.routes'

router(window.location.hash)

window.addEventListener('hashchange', () => {
    router(window.location.hash)
})


//img
// const homeImg = document.getElementById('home');
// const addImg = document.getElementById('add');
// const notificationImg = document.getElementById('notification');
// const logoutImg = document.getElementById('out');

// homeImg.setAttribute('src', 'src/resources/home.svg')
// addImg.setAttribute('src', 'src/resources/plus.svg')
// notificationImg.setAttribute('src', 'src/resources/bell.svg')
// logoutImg.setAttribute('src', 'src/resources/logout.svg')


// navigation auth
const navigationPublic = document.getElementById('navigationPublic');
const navigationPrivate = document.getElementById('navigationPrivate');

const logout = document.getElementById('logout');

firebase.auth().onAuthStateChanged((user) => {
    if (user) {

        //photo
        navigationPublic.style.display = 'none'
        navigationPrivate.style.display = 'flex'
        if (user.photoURL) {
            userAvatar.setAttribute('src', user.photoURL);
        } else {
            userAvatar.setAttribute('src', 'https://firebasestorage.googleapis.com/v0/b/supersociedadeselkindussan.appspot.com/o/filesPosts%2FUnGSW1qHgUetWbC6aTAYJRmSm9o2%2Fprofile-user.svg?alt=media&token=10105958-ac90-4071-9a08-db40462a7dc5')
        }
        
        // navigation
        const onlyAdminAdd = document.querySelector('.only-admin-add')
        const onlyAdminNotification = document.querySelector('.only-admin-notification')
        if (user.email == 'edussan@itsoluciones.net') {
            onlyAdminAdd.style.display = 'flex'
            onlyAdminNotification.style.display = 'flex'
        } else {
            onlyAdminAdd.style.display = 'none'
            onlyAdminNotification.style.display = 'none'
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

