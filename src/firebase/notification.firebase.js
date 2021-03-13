export default class Notification {

    // Get Post
    getUsers(containerUsers) {
        firebase.firestore()
            .collection('users')
            .onSnapshot(querySnapshot => {
                containerUsers.innerHTML = '';
                querySnapshot.forEach(user => {
                    let userHTML = this.getPostTemplate(
                        user.id,
                        user.data().email
                    )
                    containerUsers.innerHTML += userHTML;
                    const deletePostBtn = containerUsers.querySelectorAll('.delete-user')
                    deletePostBtn.forEach(btn => {
                        btn.addEventListener('click', (e) => {
                            console.log(btn.dataset.id)
                            this.deletePost(btn.dataset.id)
                        })
                    })
                })
            })
    }


    getPostTemplate(uid, email) {
        return `
            <div class="w-full p-8 border border-gray-300 shadow-sm rounded-lg cursor-pointer flex justify-between items-start flex-col overflow-auto">  
                <div>
                    <h1 class="md:text-3xl xs:text-2xl font-medium my-1 mr-3">${email}</h1>
                </div>
            </div>
        `;
    }


    deletePost(id) {
        firebase.firestore()
            .collection('posts')
            .doc(id).delete()
    }


}