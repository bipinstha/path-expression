class UtilCtrl {

    sampleJSON = {
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

    sampleXML =
        `
<bookstore>

<book category="cooking">
  <title lang="en">Everyday Italian</title>
  <author>Giada De Laurentiis</author>
  <year>2005</year>
  <price>30.00</price>
</book>

<book category="children">
  <title lang="en">Harry Potter</title>
  <author>J K. Rowling</author>
  <year>2005</year>
  <price>29.99</price>
</book>

<book category="web">
  <title lang="en">XQuery Kick Start</title>
  <author>James McGovern</author>
  <author>Per Bothner</author>
  <author>Kurt Cagle</author>
  <author>James Linn</author>
  <author>Vaidyanathan Nagarajan</author>
  <year>2003</year>
  <price>49.99</price>
</book>

<book category="web">
  <title lang="en">Learning XML</title>
  <author>Erik T. Ray</author>
  <year>2003</year>
  <price>39.95</price>
</book>

</bookstore>
        `

    expressionCtrl: ExpressionCtrl
    messageCtrl: MessageCtrl = new MessageCtrl()

    constructor() {

    }

    onClickBeautify = () => {
        let inputEl: any = document.querySelector('#textAreaInput')
        inputEl.value = this.expressionCtrl.beautify(inputEl.value)
    }

    onExpressionChange = () => {
        let expressionInputEl: any = document.querySelector('#expressionInput')
        let expr = expressionInputEl.value
        let inputEl: any = document.querySelector('#textAreaInput')
        let inputValue = inputEl.value
        let textAreaOutput: any = document.querySelector('#textAreaOutput')

        let exprAppliedOp = this.expressionCtrl.applyExpression(expr, inputValue)
        textAreaOutput.value = exprAppliedOp
        this.onOutputChange()
    }

    onOutputChange = () => {
        this.clearArithmeticValueElmnt()
        let textAreaOutput: any = document.querySelector('#textAreaOutput')
        let response: any = this.expressionCtrl.computeArithmeticOpValues(textAreaOutput.value)
        if(response) {
            this.displayOpValues(response)
        }
    }

    private clearArithmeticValueElmnt = () => {
        let arithmeticValuesEl: any = document.querySelector('#arithmeticValues')
        arithmeticValuesEl.innerText = ''
    }

    private displayOpValues = (inpVal: any) => {
        let arithmeticValues = `sum: ${inpVal.sum} min: ${inpVal.min} avg: ${inpVal.avg} max: ${inpVal.max}`
        let arithmeticValuesElmnt: any = document.querySelector('#arithmeticValues')
        arithmeticValuesElmnt.innerText = arithmeticValues
    }

    onClickLoadSampleJSON = () => {
        try {
            let textAreaInput: any = document.querySelector('#textAreaInput')
            textAreaInput.value = JSON.stringify(this.sampleJSON)
            this.onAddInputValue()
        } catch (error) {
            console.log(`[JSONExpressionControl: onClickLoadSample] error `, error.message)
            this.messageCtrl.displayErrorMessage(error.message)
        }
    }

    onClickLoadSampleXML = () => {
        try {
            let textAreaInput: any = document.querySelector('#textAreaInput')
            textAreaInput.value = this.sampleXML
            this.onAddInputValue()
        } catch (error) {
            console.log(`[JSONExpressionControl: onClickLoadSample] error `, error.message)
            this.messageCtrl.displayErrorMessage(error.message)
        }
    }

    displayCopyClipBoardMsg = (message: string) => {
        let expressionInputCopy: any = document.querySelector('#expressionInputCopy')
        expressionInputCopy.innerText = message
        setInterval(() => {
            expressionInputCopy.innerText = ''
            expressionInputCopy.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                </svg>`
        }, 3000)
    }

    onClickCopyToClipboard = () => {
        let expressionInput: any = document.querySelector('#expressionInput')
        window.navigator['clipboard'].writeText(expressionInput.value).then(() => {
            console.log('Async: Copying to clipboard was successful!')
            this.displayCopyClipBoardMsg('Copied')
        }, (error: any) => {
            console.error('Async: Could not copy text: ', error)
            this.displayCopyClipBoardMsg('Could not copy')
        })
        expressionInput.select()
    }

    onAddInputValue = () => {
        console.log(`[UICtrl: onAddJsonValue] called`)
        let beautifyBtn: any = document.querySelector('#beautify')
        let textAreaInputEl: any = document.querySelector('#textAreaInput')
        let inputValue = textAreaInputEl.value
        if (this.isXML(inputValue)) {
            beautifyBtn.innerText = '< >'
            this.expressionCtrl = new XmlExpressionCtrl()
        }
        if (this.isJSON(inputValue)) {
            beautifyBtn.innerText = '{ }'
            this.expressionCtrl = new JsonExpressionCtrl()
        }
    }

    private isJSON = (str: string) => {
        try {
            JSON.parse(str)
            return true
        } catch (e) {
            return false
        }
    }

    private isXML = (str: string) => {
        try {
            str = str.trim()
            if (str[0] == '<' && str[str.length - 1] == '>') return true
            else return false
        } catch (e) {
            return false
        }
    }
}