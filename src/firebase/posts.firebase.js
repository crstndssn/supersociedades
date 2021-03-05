import Utility from './utility.firebase'

export default class Post {

    // Create Post
    createPost(uid, emailUser, title, description, fileLink) {
        return firebase.firestore()
            .collection('posts')
            .add({
                uid: uid,
                autor: emailUser,
                title: title,
                description: description,
                postLink: fileLink,
                date: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(refDoc => {
                console.log(`Id del post => ${refDoc.id}`)
            })
            .catch(error => {
                console.log(`Error creado el post fit ${error}`)
            })
    }


    // Get Post
    getPosts(containerPosts) {
        firebase.firestore()
            .collection('posts')
            .orderBy('date', 'desc')
            .where('autor', '==', 'edussan@itsoluciones.net')
            .onSnapshot(querySnapshot => {
                console.log(querySnapshot)
                containerPosts.innerHTML = '';
                querySnapshot.forEach(post => {
                    // debugger
                    let postHTML = this.getPostTemplate(
                        post.data().uid,
                        post.data().title,
                        Utility.getDate(post.data().date.toDate()),
                        post.data().description,
                        post.data().postLink
                    )
                    containerPosts.innerHTML += postHTML;
                })
            })
    }

    getPostTemplate(uid, title, date, description, linkFile) {
        return `
            <div data-id="${uid}" class="w-full p-8 border border-gray-300 shadow-sm rounded-lg cursor-pointer flex justify-between items-start flex-col">  
                <div>
                    <h1 class="md:text-3xl xs:text-2xl font-medium my-1">${title}</h1>
                    <p class="text-sm text-gray-600 my-2">Subido el ${date}</p>
                    <p class="md:text-xl xs:text-lg">${description}</p>
                </div>
                <div class="mt-5 w-full flex justify-center">
                    <a href="${linkFile}" class="md:text-base border xs:text-sm border-black py-1 px-2 rounded-full" target="_blank">Ver Comprobante</a>
                </div>
            </div>
        `;
    }

    viewPost() {
        console.log('click')
    }


    uploadFiles(file, uidUser, uploadBar) {
        const refStorage = firebase.storage().ref(`filesPosts/${uidUser}/${file.name}`)
        const post = refStorage.put(file)

        post.on(
            'state_changed',
            snapshot => {
                const porcentaje = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                console.log(porcentaje)
                uploadBar.style.width = `${porcentaje}%`
            },
            err => {
                console.log(err)
            },
            () => {
                post.snapshot.ref
                    .getDownloadURL()
                    .then(url => {
                        console.log(url)
                        sessionStorage.setItem('imgNewPost', url)
                    })
                    .catch(err => {
                        console.log(`Error Obteniendo id ${err}`)
                    })
            }
        )
    }



}