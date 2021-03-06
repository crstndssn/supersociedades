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
            <div class="w-full p-8 border border-gray-300 shadow-sm rounded-lg cursor-pointer flex justify-between items-start flex-col">  
                <div>
                    <h1 class="md:text-3xl xs:text-2xl font-medium my-1">${email}</h1>
                </div>
                <!--<div class="flex justify-center items-center w-full mt-5">
                    <a data-id="${uid}" class="delete-user md:text-base text-red-500 border xs:text-sm border-red-500 py-1 px-2 mx-1 rounded-full" target="_blank">Borrar</a>
                </div>-->
            </div>
        `;
    }


    deletePost(id) {
        firebase.firestore()
            .collection('posts')
            .doc(id).delete()
    }


}