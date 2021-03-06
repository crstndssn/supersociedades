import Home from './home.controller';
import Login from './login.controller';
import Signup from './signup.controller';
import Add from './add.controller';
import Posts from './posts.controller';
import Notification from './notification.controller';

const pages = {
    home: Home,
    login: Login,
    signup: Signup,
    add: Add,
    posts: Posts,
    notification: Notification
}

export {pages}