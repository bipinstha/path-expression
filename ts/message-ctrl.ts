class MessageCtrl {

    messageEl: any
    displayTimeMS: number = 10000

    constructor() {
        let app: any = document.querySelector('#app')
        let message = document.createElement('div')
        message.id = 'message'
        message.setAttribute('role', 'alert')
        app.appendChild(message)
        this.init()
    }

    init = (): void => {
        console.log(`[MessageCtrl init] initialize`)
        this.messageEl = document.querySelector('#message')
    }

    clearMessageInterval = (intervalMS: number) =>  {
        setInterval(() => {
            this.messageEl.classList = ''
            this.messageEl.innerText = ''
        }, intervalMS)
    }

    displayErrorMessage = (message: string, msgTimeMS?: number) => {
        if (!message) message = 'Something went wrong'
        if (!msgTimeMS) msgTimeMS = this.displayTimeMS
        this.messageEl.classList = 'alert alert-danger'
        this.messageEl.innerText = message
        this.clearMessageInterval(msgTimeMS)

    }

    displayWarningMessage = (message: string, msgTimeMS: number) => {
        if (!message) message = 'Something went on warning'
        if (!msgTimeMS) msgTimeMS = this.displayTimeMS
        this.messageEl.classList = 'alert alert-warning'
        this.messageEl.innerText = message
        this.clearMessageInterval(msgTimeMS)
    }

    displaySuccessMessage = (message: string, msgTimeMS: number) => {
        if (!message) message = 'Something went success'
        if (!msgTimeMS) msgTimeMS = this.displayTimeMS
        this.messageEl.classList = 'alert alert-success'
        this.messageEl.innerText = message
        this.clearMessageInterval(msgTimeMS)
    }

}