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



    return {

        onExpressionChange: () => {
            loadFilteredJSONOutput()
        },

        onAddJsonValue: () => {
            onAddJsonValue()
        },

        onClickBeautify: () => {
            onClickBeautify()
        },

        onClickLoadSample: () => {
            onClickLoadSample()
        },

        onOutputChange: () => {
            onOutputChange()
        }
    }

})()