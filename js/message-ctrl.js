'use strict'

let MessageControl = (() => {

    let $message
    let displayTimeMS = 10000

    let init = () => {
        console.log(`[MessageControl: init] initialize`)
        $message = document.querySelector('#message')
        $message.setAttribute('role', 'alert')
    }

    init()

    let clearMessageInterval = (intervalMS) => {
        setInterval(() => {
            $message.classList = ''
            $message.innerText = ''
        }, intervalMS)
    }

    let displayErrorMessage = (message, msgTimeMS) => {
        if(!message) message = 'Something went wrong'
        if(!msgTimeMS) msgTimeMS = displayTimeMS
        $message.classList = 'alert alert-danger'
        $message.innerText = message
        clearMessageInterval(msgTimeMS)
        
    }

    let displayWarningMessage = (message, msgTimeMS) => {
        if(!message) message = 'Something went on warning'
        if(!msgTimeMS) msgTimeMS = displayTimeMS
        $message.classList = 'alert alert-warning'
        $message.innerText = message
        clearMessageInterval(msgTimeMS)
    }

    let displaySuccessMessage = (message, msgTimeMS) => {
        if(!message) message = 'Something went success'
        if(!msgTimeMS) msgTimeMS = displayTimeMS
        $message.classList = 'alert alert-success'
        $message.innerText = message
        clearMessageInterval(msgTimeMS)
    }

    return {
        
        displayErrorMessage: (message, msgTimeMS) => {
            displayErrorMessage(message, msgTimeMS)
        },

        displayWarningMessage: (message, msgTimeMS) => {
            displayWarningMessage(message, msgTimeMS)
        },

        displaySuccessMessage: (message, msgTimeMS) => {
            displaySuccessMessage(message, msgTimeMS)
        }
    }

})()