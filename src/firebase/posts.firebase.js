import Utility from './utility.firebase'

export default class Post {

    // Create Post
    createPost(uid, emailUser, title, description, date, fileLink) {
        return firebase.firestore()
            .collection('posts')
            .add({
                uid: uid,
                autor: emailUser,
                title: title,
                description: description,
                date: date,
                postLink: fileLink,
                // date: firebase.firestore.FieldValue.serverTimestamp()
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
            .where('autor', '==', 'administracion@vsp.com.co')
            .onSnapshot(querySnapshot => {
                console.log(querySnapshot)
                containerPosts.innerHTML = '';
                if (emailUser == 'administracion@vsp.com.co') {
                    querySnapshot.forEach(post => {
                        let postHTML = this.getPostTemplateAdmin(
                            post.id,
                            post.data().title,
                            // Utility.getDate(post.data().date.toDate()),
                            post.data().date,
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
                        // const updatePostBtn = containerPosts.querySelectorAll('.update-post')
                        // updatePostBtn.forEach(btn => {
                        //     btn.addEventListener('click', async (e) => {
                        //         console.log(btn.dataset.id)
                        //         const doc =  await this.getPost(btn.dataset.id)
                        //         const data = doc.data();
                        //         console.log(data)
                        //     })
                        // })
                    })

                } else {
                    querySnapshot.forEach(post => {

                        let postHTML = this.getPostTemplatePublic(
                            post.data().uid,
                            post.data().title,
                            post.data().date,
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
            <div data-id="${uid}" class="w-full p-4 border border-gray-300 shadow-sm rounded-lg flex justify-between md:items-start xs:items-center md:flex-row xs:flex-col">  
                <div class="flex md:justify-start xs:justify-center items-start flex-col md:w-3/4 xs:full">
                    <h1 class="md:text-xl xs:text-2xl font-medium my-1 sm:text-left xs:text-center">${title}</h1>
                    <p class="md:text-lg xs:text-lg">${description}</p>
                </div>
                <p class="text-sm text-gray-600 lg:my-2 xs:mb-4 w-32">${date}</p>
                <div class="flex justify-end items-center lg:w-1/4 md:w-2/4 xs:w-full">
                        <a data-id="${uid}" class="delete-post md:text-base text-red-500 border xs:text-sm border-red-500 py-1 px-2 mx-1 rounded-full cursor-pointer" target="_blank">Borrar</a>
                        <a href="${linkFile}" class="md:text-base border xs:text-sm border-black py-1 px-2 mx-1 rounded-full text-center w-36" target="_blank">Ver Documento</a>
                </div>
            </div>
        `;
    }

    getPostTemplatePublic(uid, title, date, description, linkFile) {
        return `
            <div data-id="${uid}" class="w-full p-4 border border-gray-300 shadow-sm rounded-lg flex justify-between md:items-start xs:items-center md:flex-row xs:flex-col">  
                <div class="flex md:justify-start xs:justify-center items-start flex-col md:w-3/4 xs:w-full">
                    <h1 class="md:text-xl xs:text-2xl font-medium my-1 sm:text-left xs:text-center">${title}</h1>
                    <p class="md:text-lg xs:text-lg">${description}</p>
                </div>
                <p class="text-sm text-gray-600 lg:my-2 xs:mb-4 w-32">${date}</p>
                <div class="flex justify-end items-center lg:w-1/4 md:w-2/4 xs:w-full">
                        <a href="${linkFile}" class="md:text-base border xs:text-sm border-black py-1 px-2 mx-1 rounded-full text-center w-36">Ver Documento</a>
                </div>
            </div>
        `;
    }

    getPost(id) {
        firebase.firestore()
            .collection('posts')
            .doc(id).get();
    }

    updatePost() {
        
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