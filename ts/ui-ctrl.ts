'use strict'

class UICtrl {

    containerEl: any 
    containerRowEl: any
    utilCtrl: UtilCtrl = new UtilCtrl()
    expressionCtrl: ExpressionCtrl = new JsonExpressionCtrl()

    constructor() {
        let app: any = document.querySelector('#app')
        let container = document.createElement('div')
        container.classList.add('container')
        container.id = 'container'
        app.appendChild(container)
    }

    init() {
        console.log(`[UIControls: init] initialize`)
        this.containerEl = document.querySelector('#container')
        this.containerRowEl = document.createElement('div')
        this.containerRowEl.classList = 'row'
        this.containerEl.appendChild(this.containerRowEl)

        this.createExpressionBar()
        this.createInputTextArea()
        this.createOutputTextArea()
        this.createShortHandButtons()
        this.createHelpLink()
    }

    createExpressionBar() {
        let contentDiv = document.createElement('div')
        contentDiv.className = 'col-sm-12'

        let inputGroupDiv = document.createElement('div')
        inputGroupDiv.className += 'input-group autocomplete'

        let inputGrpPrepend = document.createElement('div')
        inputGrpPrepend.className = 'input-group-prepend'

        let inputGrpTextSpan = document.createElement('span')
        inputGrpTextSpan.className = 'input-group-text'
        inputGrpTextSpan.innerText = 'Expression'

        let inputGrpPostPend = document.createElement('div')
        inputGrpPostPend.className = 'input-group-append'

        let inputGrpPPTextSpan = document.createElement('span')
        inputGrpPPTextSpan.className += 'input-group-text expressionInputCopy'
        // inputGrpPPTextSpan.style.cursor = 'pointer'
        inputGrpPPTextSpan.id = 'expressionInputCopy'
        inputGrpPPTextSpan.addEventListener('click', this.utilCtrl.onClickCopyToClipboard)
        inputGrpPPTextSpan.setAttribute('data-toggle', 'tooltip')
        inputGrpPPTextSpan.setAttribute('title', 'Copy to clipboard')
        inputGrpPPTextSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
      </svg>`

        inputGrpPrepend.appendChild(inputGrpTextSpan)
        inputGroupDiv.appendChild(inputGrpPrepend)
        inputGrpPostPend.appendChild(inputGrpPPTextSpan)
        

        let inputText = document.createElement('input')
        inputText.type = 'text'
        inputText.className = 'form-control'
        inputText.id = 'expressionInput'
        inputText.placeholder = 'Expression'
        inputText.addEventListener('keyup', this.utilCtrl.onExpressionChange)

        inputGroupDiv.appendChild(inputText)
        inputGroupDiv.appendChild(inputGrpPostPend)
        contentDiv.appendChild(inputGroupDiv)
        
        this.containerRowEl.appendChild(contentDiv)
    }

    createInputTextArea() {
        let contentDiv = document.createElement('div')
        contentDiv.className = 'col-sm-6'

        let inputGroupDiv = document.createElement('div')
        inputGroupDiv.className = 'input-group'

        let textAreaInput = document.createElement('textarea')
        textAreaInput.className += 'form-control json-render-area'
        textAreaInput.id = 'textAreaInput'
        textAreaInput.style.fontSize = '11px'
        textAreaInput.addEventListener('change', this.utilCtrl.onAddInputValue)

        inputGroupDiv.appendChild(textAreaInput)
        contentDiv.appendChild(inputGroupDiv)
        this.containerRowEl.appendChild(contentDiv)
    }

    createOutputTextArea() {
        let contentDiv = document.createElement('div')
        contentDiv.className = 'col-sm-6'

        let inputGroupDiv = document.createElement('div')
        inputGroupDiv.className = 'input-group'

        let textAreaOutput = document.createElement('textarea')
        textAreaOutput.className += 'form-control json-render-area'
        textAreaOutput.style.fontSize = '11px'
        textAreaOutput.id = 'textAreaOutput'
        textAreaOutput.addEventListener('change', this.utilCtrl.onOutputChange)

        inputGroupDiv.appendChild(textAreaOutput)
        contentDiv.appendChild(inputGroupDiv)
        this.containerRowEl.appendChild(contentDiv)
    }

    createShortHandButtons() {
        let divContent = document.createElement('div')

        let loadSampleButtonJSON = document.createElement('button')
        loadSampleButtonJSON.title = 'Load Sample JSON'
        loadSampleButtonJSON.className += 'btn btn-primary mr-1'
        loadSampleButtonJSON.id = 'loadSampleJSON'
        loadSampleButtonJSON.innerText = 'Load Sample JSON'
        loadSampleButtonJSON.addEventListener('click', this.utilCtrl.onClickLoadSampleJSON)

        let loadSampleButtonXML = document.createElement('button')
        loadSampleButtonXML.title = 'Load Sample XML'
        loadSampleButtonXML.className += 'btn btn-primary mr-1'
        loadSampleButtonXML.id = 'loadSampleXML'
        loadSampleButtonXML.innerText = 'Load Sample XML'
        loadSampleButtonXML.addEventListener('click', this.utilCtrl.onClickLoadSampleXML)

        let beautifyButton = document.createElement('button')
        beautifyButton.title = 'Beautify'
        beautifyButton.className += 'btn btn-primary mr-1'
        beautifyButton.id = 'beautify'
        beautifyButton.innerText = '{ }'
        beautifyButton.addEventListener('click', this.utilCtrl.onClickBeautify)

        let arithmeticValueElmt = document.createElement('p')
        arithmeticValueElmt.title = 'ArithmeticValues'
        arithmeticValueElmt.className = 'mr-1'
        arithmeticValueElmt.id = 'arithmeticValues'
        arithmeticValueElmt.innerText = ''

        divContent.appendChild(arithmeticValueElmt)
        divContent.appendChild(loadSampleButtonJSON)
        divContent.appendChild(loadSampleButtonXML)
        divContent.appendChild(beautifyButton)
        
        this.containerEl.appendChild(divContent)
    }

    createHelpLink() {
        let contentDiv = document.createElement('div')
        let link = document.createElement('a')
        link.target = '_blank'
        link.href = 'https://docs.oracle.com/cd/E60058_01/PDF/8.0.8.x/8.0.8.0.0/PMF_HTML/JsonPath_Expressions.htm'
        link.innerText = 'Need help on json path expression'
        contentDiv.appendChild(link)
        this.containerEl.appendChild(contentDiv)
    }

}

new UICtrl().init()