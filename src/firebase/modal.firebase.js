export default class Modal {


    successModal(message, modalContainer) {
        let modal = this.successModalTemplate(message)
        modalContainer.innerHTML += modal;
        setTimeout(() => {
            modalContainer.innerHTML = ''; 
        }, 4000)
    }

    successModalTemplate(message) {
        return `
        <div class="bg-green-600 rounded-lg p-5 my-2 shadow"">
            <p class="max-w-64 text-white">
                ${message}
            </p>
        </div>
        `;
    }

    errorModal(message, modalContainer) {
        let modal = this.errorModalTemplate(message)
        modalContainer.innerHTML += modal;
        setTimeout(() => {
            modalContainer.innerHTML = '';
        }, 4000)
    }

    errorModalTemplate(message) {
        return `
        <div class="bg-red-600 rounded-lg p-5 my-2 shadow">
            <p class="text-white">
                ${message}
            </p>
        </div>
        `;
    }

    notificationModalTemplate(message) {
        return `
        <div class="bg-gray-900 rounded-lg p-5 my-2 shadow">
            <p class="text-white">
                ${message}
            </p>
        </div>
        `;
    }

}