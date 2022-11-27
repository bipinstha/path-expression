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

        inputGrpPrepend.appendChild(inputGrpTextSpan)
        inputGroupDiv.appendChild(inputGrpPrepend)

        let inputText = document.createElement('input')
        inputText.type = 'text'
        inputText.classList = 'form-control'
        inputText.id = 'expressionInput'
        inputText.placeholder = 'Expression'
        inputText.addEventListener('keyup', JSONExpressionControl.onExpressionChange)
        // inputText.setAttribute('onkeyup', 'JSONExpressionControl.onExpressionChange()')

        inputGroupDiv.appendChild(inputText)
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

        init: () => {
            init()
        }
    }

})()

UIControls.init()