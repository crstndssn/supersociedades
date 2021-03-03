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
                console.log(`Error creado el post ${error}`)
            })
    }


    // Get Post
    getPosts() {
        firebase.firestore()
            .collection('posts')
            .onSnapshot(querySnapshot => {
                console.log(`los posts: ${querySnapshot}`)
            })
    }

    
    uploadFiles (file, uidUser, uploadBar) {
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