'use strict'

// const JSONExpressionControl = require('./json-expression-ctrl')

let UIControls = (() => {

    let $container, $containerRow
    let init = () => {
        console.log(`[UIControls: init] initialize`)
        $container = document.querySelector('#container')
        $containerRow = document.createElement('div')
        $containerRow.classList = 'row'
        $container.appendChild($containerRow)
        loadUIComponent()
    }

    let loadUIComponent = () => {
        createExpressionBar()
        createInputTextArea()
        createOutputTextArea()
        createShortHandButtons()
        createHelpLink()
    }

    /**
     *  Create expression content
     <div class="col-sm-12">
        <div class="input-group autocomplete">
            <div class="input-group-prepend">
                <span class="input-group-text">Expression</span>
            </div>
            <input type="text" onkeyup="JSONExpressionControl.onExpressionChange()" class="form-control" id="jsonExpression" name="expression" placeholder="Expression">
        </div>
     </div>
     */
    let createExpressionBar = () => {
        let contentDiv = document.createElement('div')
        contentDiv.classList = 'col-sm-12'

        let inputGroupDiv = document.createElement('div')
        inputGroupDiv.classList = 'input-group autocomplete'

        let inputGrpPrepend = document.createElement('div')
        inputGrpPrepend.classList = 'input-group-prepend'

        let inputGrpTextSpan = document.createElement('span')
        inputGrpTextSpan.classList = 'input-group-text'
        inputGrpTextSpan.innerText = 'Expression'

        let inputGrpPostPend = document.createElement('div')
        inputGrpPostPend.classList = 'input-group-append'

        let inputGrpPPTextSpan = document.createElement('span')
        inputGrpPPTextSpan.classList = 'input-group-text expressionInputCopy'
        inputGrpPPTextSpan.style.cursor = 'pointer'
        inputGrpPPTextSpan.id = 'expressionInputCopy'
        inputGrpPPTextSpan.addEventListener('click', JSONExpressionControl.onClickCopyToClipboard)
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
        inputText.classList = 'form-control'
        inputText.id = 'expressionInput'
        inputText.placeholder = 'Expression'
        inputText.addEventListener('keyup', JSONExpressionControl.onExpressionChange)
        // inputText.setAttribute('onkeyup', 'JSONExpressionControl.onExpressionChange()')

        inputGroupDiv.appendChild(inputText)
        inputGroupDiv.appendChild(inputGrpPostPend)
        contentDiv.appendChild(inputGroupDiv)
        
        $containerRow.appendChild(contentDiv)
    }

    /**
     * Create input text
     <div class="col-sm-6">
        <div class="input-group">
            <!--<div class="form-control json-render-area" id="beautifiedResponse"></div>-->
            <textarea class="form-control json-render-area" id="beautifiedResponse" onchange="JSONExpressionControl.onAddJsonValue()"></textarea>
        </div>
     </div>
     * 
     */
    let createInputTextArea = () => {
        let contentDiv = document.createElement('div')
        contentDiv.classList = 'col-sm-6'

        let inputGroupDiv = document.createElement('div')
        inputGroupDiv.classList = 'input-group'

        let textAreaInput = document.createElement('textarea')
        textAreaInput.classList = 'form-control json-render-area'
        textAreaInput.id = 'textAreaInput'
        textAreaInput.style.fontSize = '11px'
        textAreaInput.addEventListener('change', JSONExpressionControl.onAddJsonValue)
        // textAreaInput.setAttribute('onchange', 'JSONExpressionControl.onAddJsonValue()')

        inputGroupDiv.appendChild(textAreaInput)
        contentDiv.appendChild(inputGroupDiv)
        $containerRow.appendChild(contentDiv)
    }

    /**
     * 
     * Create output text area
     <div class="col-sm-6">
        <div class="input-group">
            <textarea class="form-control json-render-area" id="afterAppliedExpression"></textarea>
        </div>
     </div>
     */
    let createOutputTextArea = () => {
        let contentDiv = document.createElement('div')
        contentDiv.classList = 'col-sm-6'

        let inputGroupDiv = document.createElement('div')
        inputGroupDiv.classList = 'input-group'

        let textAreaOutput = document.createElement('textarea')
        textAreaOutput.classList = 'form-control json-render-area'
        textAreaOutput.style.fontSize = '11px'
        textAreaOutput.id = 'textAreaOutput'
        textAreaOutput.addEventListener('change', JSONExpressionControl.onOutputChange)

        inputGroupDiv.appendChild(textAreaOutput)
        contentDiv.appendChild(inputGroupDiv)
        $containerRow.appendChild(contentDiv)
    }

    /**
     * 
     */
    let createShortHandButtons = () => {
        let divContent = document.createElement('div')

        let loadSampleButton = document.createElement('button')
        loadSampleButton.title = 'Load Sample'
        loadSampleButton.classList = 'btn btn-primary mr-1'
        loadSampleButton.id = 'loadSample'
        loadSampleButton.innerText = 'Load Sample'
        loadSampleButton.addEventListener('click', JSONExpressionControl.onClickLoadSample)

        let beautifyButton = document.createElement('button')
        beautifyButton.title = 'Beautify'
        beautifyButton.classList = 'btn btn-primary mr-1'
        beautifyButton.id = 'beautify'
        beautifyButton.innerText = '{ }'
        beautifyButton.addEventListener('click', JSONExpressionControl.onClickBeautify)

        let arithmeticValueElmt = document.createElement('p')
        arithmeticValueElmt.title = 'ArithmeticValues'
        arithmeticValueElmt.classList = 'mr-1'
        arithmeticValueElmt.id = 'arithmeticValues'
        arithmeticValueElmt.innerText = ''

        divContent.append(arithmeticValueElmt)
        divContent.append(loadSampleButton)
        divContent.append(beautifyButton)
        
        $container.append(divContent)
    }

    /**
     * create help link text
     <div>
        <a target="_blank" href="https://docs.oracle.com/cd/E60058_01/PDF/8.0.8.x/8.0.8.0.0/PMF_HTML/JsonPath_Expressions.htm">Need help on <b>json path expression</b></a>
     </div>
     */
    let createHelpLink = () => {
        let contentDiv = document.createElement('div')

        let link = document.createElement('a')
        link.target = '_blank'
        link.href = 'https://docs.oracle.com/cd/E60058_01/PDF/8.0.8.x/8.0.8.0.0/PMF_HTML/JsonPath_Expressions.htm'
        link.innerText = 'Need help on json path expression'

        contentDiv.append(link)
        $container.append(contentDiv)
    }

    return {
        init: init
    }

})()

UIControls.init()