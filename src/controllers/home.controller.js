import view from '../views/home.html'

export default () => {
    const divElement = document.createElement('div')
    divElement.innerHTML += view
    return divElement;
}