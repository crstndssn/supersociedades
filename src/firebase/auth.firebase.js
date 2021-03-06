export default class Authentication {

    // Sign Up
    signUpEmailAndPassword(name, email, password, modalContainer) {
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result)
                result.user.updateProfile({
                    displayName: name
                })
                const message = 'Se ha registrado con éxito';
                let template = this.successModal(message)
                modalContainer.innerHTML += template;
                setTimeout(() => {
                    modalContainer.innerHTML = ``;
                }, 3000)
                this.saveUser(result.user.uid, result.user.email)
            })
            .catch((error) => {
                modalContainer.innerHtml = ``;  
                let template = this.errorModal(error.message)
                console.log(error.message)
                modalContainer.innerHTML += template;
                setTimeout(() => {
                    modalContainer.innerHTML = ``;
                }, 3000)
            })
    }

    // Sign Up Google
    signUpGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then(result => {
                console.log(result)
                this.saveUser(result.user.uid, result.user.email)
            })
            .catch((error) => {
                modalContainer.innerHtml = ``;
                let template = this.errorModal(error.message)
                modalContainer.innerHTML += template;
                setTimeout(() => {
                    modalContainer.innerHTML = ``;
                }, 3000)
            })
    }


    // Login
    authEmailPassword(email, password, modalContainer) {
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(result => {
                console.log(result)
                modalContainer.innerHTML = ``;
                let template = this.successModal(`Welcome <strong>${result.user.displayName}</strong>`)
                modalContainer.innerHTML = template;
                setTimeout(() => {
                    modalContainer.innerHTML = ``;
                }, 3000)
            })
            .catch((error) => {
                modalContainer.innerHtml = ``;
                let template = this.errorModal(error.message)
                modalContainer.innerHTML += template;
                setTimeout(() => {
                    modalContainer.innerHTML = ``;
                }, 3000)
            })
    }


    // Login Google
    authGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then(result => {
                console.log(result)
            })
            .catch((error) => {
                modalContainer.innerHtml = ``;
                let template = this.errorModal(error.message)
                modalContainer.innerHTML += template;
                setTimeout(() => {
                    modalContainer.innerHTML = ``;
                }, 3000)
            })
    }



    saveUser(uid, email) {
        return firebase.firestore()
            .collection('users')
            .add({
                uid: uid,
                email: email
            })
            .then(refDoc => {
                console.log(`Usuario registrado ${refDoc.id}`)
            })
            .catch(error => {
                console.log(`Error creando usuario ${error}`)
            })

    }



    // Templates
    successModal(message) {
        return `
        <div class="bg-green-50 rounded-lg p-5 my-2 shadow"">
            <p class="max-w-64 text-green-600">
                ${message}
            </p>
        </div>
        `;
    }

    errorModal(message) {
        return `
        <div class="bg-red-50 rounded-lg p-5 my-2 shadow">
            <p class="text-red-600">
                ${message}
            </p>
        </div>
        `;
    }

    notificationModal(message) {
        return `
        <div class="bg-gray-900 rounded-lg p-5 my-2 shadow"">
            <p class="text-white">
                ${message}
            </p>
        </div>
        `;
    }

}