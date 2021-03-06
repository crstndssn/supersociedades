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
    getPosts(containerPosts, emailUser) {
        firebase.firestore()
            .collection('posts')
            .orderBy('date', 'desc')
            .where('autor', '==', 'edussan@itsoluciones.net')
            .onSnapshot(querySnapshot => {
                console.log(querySnapshot)
                containerPosts.innerHTML = '';
                if (emailUser == 'edussan@itsoluciones.net') {
                    querySnapshot.forEach(post => {
                        let postHTML = this.getPostTemplateAdmin(
                            post.id,
                            post.data().title,
                            Utility.getDate(post.data().date.toDate()),
                            post.data().description,
                            post.data().postLink,
                            post.data().autor
                        )
                        containerPosts.innerHTML += postHTML;
                        const deletePostBtn = containerPosts.querySelectorAll('.delete-post')
                        deletePostBtn.forEach(btn => {
                            btn.addEventListener('click', (e) => {
                                console.log(btn.dataset.id)
                                this.deletePost(btn.dataset.id)
                            })
                        })
                    })
                } else {
                    querySnapshot.forEach(post => {

                        let postHTML = this.getPostTemplatePublic(
                            post.data().uid,
                            post.data().title,
                            Utility.getDate(post.data().date.toDate()),
                            post.data().description,
                            post.data().postLink,
                            post.data().autor
                        )
                        containerPosts.innerHTML += postHTML;

                    })
                }

            })
    }

    getPostTemplateAdmin(uid, title, date, description, linkFile) {
        return `
            <div data-id="${uid}" class="w-full p-8 border border-gray-300 shadow-sm rounded-lg cursor-pointer flex justify-between items-start flex-col">  
                <div>
                    <h1 class="md:text-3xl xs:text-2xl font-medium my-1">${title}</h1>
                    <p class="text-sm text-gray-600 my-2">Subido el ${date}</p>
                    <p class="md:text-xl xs:text-lg">${description}</p>
                </div>
                <div class="flex justify-center items-center w-full mt-5">
                        <a data-id="${uid}" class="delete-post md:text-base text-red-500 border xs:text-sm border-red-500 py-1 px-2 mx-1 rounded-full" target="_blank">Borrar</a>
                        <a href="${linkFile}" class="md:text-base border xs:text-sm border-black py-1 px-2 mx-1 rounded-full" target="_blank">Descargar</a>
                </div>
            </div>
        `;
    }

    getPostTemplatePublic(uid, title, date, description, linkFile) {
        return `
            <div data-id="${uid}" class="w-full p-8 border border-gray-300 shadow-sm rounded-lg cursor-pointer flex justify-between items-start flex-col">  
                <div>
                    <h1 class="md:text-3xl xs:text-2xl font-medium my-1">${title}</h1>
                    <p class="text-sm text-gray-600 my-2">Subido el ${date}</p>
                    <p class="md:text-xl xs:text-lg">${description}</p>
                </div>
                <div class="flex justify-center items-center w-full mt-5">
                        <a href="${linkFile}" class="md:text-base border xs:text-sm border-black py-1 px-2 mx-1 rounded-full" target="_blank">Descargar</a>
                </div>
            </div>
        `;
    }

    deletePost(id) {
        firebase.firestore()
            .collection('posts')
            .doc(id).delete()
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