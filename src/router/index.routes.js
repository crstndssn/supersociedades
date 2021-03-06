import { pages } from '../controllers/index'

const content = document.getElementById('root');

const router = (route) => {
    content.innerHTML = '';
    switch(route) {
        case '': 
            return content.appendChild(pages.home());
        case '#/': 
            return content.appendChild(pages.home());
        case '#/login': 
            return content.appendChild(pages.login());
        case '#/signup': 
            return content.appendChild(pages.signup());
        case '#/add': 
            return content.appendChild(pages.add());
        case '#/posts': 
            return content.appendChild(pages.posts());
        case '#/notifications': 
            return content.appendChild(pages.notification());
        case '#/reset-password': 
            return content.appendChild(pages.reset());
    }
}

export { router };