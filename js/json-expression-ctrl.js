'use strict'

let JSONExpressionControl = (() => {

    let $expressionInput, $textAreaInput, $textAreaOutput
    let $sampleJSON = {
        points: [
            {
                minPoint: {
                    x: 9,
                    y: 9
                }
            },
            {
                midPoint: {
                    x: 5,
                    y: 8
                }
            },
            {
                maxPoint: {
                    x: 2,
                    y: 4
                }
            }
        ],
        cancel: {
            btn: false
        },
        load: {
            btn: true
        }
    }

    let init = () => {
        console.log(`[JSONExpressionControl: init] initialize`)
    }

    init()

    let loadFilteredJSONOutput = () => {
        $expressionInput = document.querySelector('#expressionInput')
        $textAreaInput = document.querySelector('#textAreaInput')
        $textAreaOutput = document.querySelector('#textAreaOutput')

        let jsonExpression = $expressionInput.value
        let inputJsonContent = JSON.parse($textAreaInput.value)
        $textAreaOutput.value = ''
        let filteredJSONContent = jsonPath(inputJsonContent, jsonExpression)
        $textAreaOutput.value = JSON.stringify(filteredJSONContent, undefined, 4)
        onOutputChange()
    }

    /**
     * TODO generate possible expressions and display as autocomplete.
     */
    let displayExpressionAutoComplete = () => {

    }

    let onAddJsonValue = () => {
        console.log(`[JSONExpressionControl: onAddJsonValue] called`)
    }

    let onClickBeautify = () => {
        try {
            $textAreaInput = document.querySelector('#textAreaInput')
            let parsedJSONContent = JSON.parse($textAreaInput.value)
            $textAreaInput.value = ''
            $textAreaInput.value = JSON.stringify(parsedJSONContent, undefined, 4)
        } catch (error) {
            console.log(`[JSONExpressionControl: onClickBeautify] error `, error.message)
            MessageControl.displayErrorMessage(error.message)
        }
    }

    let onClickLoadSample = () => {
        try {
            $textAreaInput = document.querySelector('#textAreaInput')
            $textAreaInput.value = JSON.stringify($sampleJSON)
        } catch (error) {
            console.log(`[JSONExpressionControl: onClickLoadSample] error `, error.message)
            MessageControl.displayErrorMessage(error.message)
        }
    }

    let onOutputChange = () => {
        clearArithmeticValueElmnt()
        $textAreaOutput = document.querySelector('#textAreaOutput')
        let outputItems = JSON.parse($textAreaOutput.value)
        try {
            for (let item of outputItems) {
                if (!Number(item)) return
            }
            createArithmeticOperations()
        } catch (error) {

        }
    }

    let clearArithmeticValueElmnt = () => {
        document.querySelector('#arithmeticValues').innerText = ''
    }

    let createArithmeticOperations = () => {
        $textAreaOutput = document.querySelector('#textAreaOutput')
        let outputItems = JSON.parse($textAreaOutput.value)
        let sum = outputItems.reduce((acc, a) => { return acc + a }, 0)
        let min = Math.min(...outputItems)
        let avg = Math.floor(outputItems.reduce((a, b) => a + b) / outputItems.length)
        let max = Math.max(...outputItems)
        let arithmeticValues = `sum: ${sum} min: ${min} avg: ${avg} max: ${max}`
        let arithmeticValuesElmnt = document.querySelector('#arithmeticValues')
        arithmeticValuesElmnt.innerText = arithmeticValues
    }

    let onClickCopyToClipboard = () => {
        let expressionInput = document.querySelector('#expressionInput')
        navigator.clipboard.writeText(expressionInput.value).then(() => {
            console.log('Async: Copying to clipboard was successful!')
            displayCopyClipBoardMsg('Copied')
        }, (err) => {
            console.error('Async: Could not copy text: ', err)
            displayCopyClipBoardMsg('Could not copy')
        })
        expressionInput.select()
    }

    let displayCopyClipBoardMsg = (message) => {
        let expressionInputCopy = document.querySelector('#expressionInputCopy')
        expressionInputCopy.innerText = message
        setInterval(() => {
            expressionInputCopy.innerText = ''
            expressionInputCopy.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
      </svg>`
        }, 3000)
    }


    return {
        onExpressionChange: loadFilteredJSONOutput,
        onAddJsonValue: onAddJsonValue,
        onClickBeautify: onClickBeautify,
        onClickLoadSample: onClickLoadSample,
        onOutputChange: onOutputChange,
        onClickCopyToClipboard: onClickCopyToClipboard
    }

})()