var MessageCtrl = (function () {
    function MessageCtrl() {
        var _this = this;
        this.displayTimeMS = 10000;
        this.init = function () {
            console.log("[MessageCtrl init] initialize");
            _this.messageEl = document.querySelector('#message');
        };
        this.clearMessageInterval = function (intervalMS) {
            setInterval(function () {
                _this.messageEl.classList = '';
                _this.messageEl.innerText = '';
            }, intervalMS);
        };
        this.displayErrorMessage = function (message, msgTimeMS) {
            if (!message)
                message = 'Something went wrong';
            if (!msgTimeMS)
                msgTimeMS = _this.displayTimeMS;
            _this.messageEl.classList = 'alert alert-danger';
            _this.messageEl.innerText = message;
            _this.clearMessageInterval(msgTimeMS);
        };
        this.displayWarningMessage = function (message, msgTimeMS) {
            if (!message)
                message = 'Something went on warning';
            if (!msgTimeMS)
                msgTimeMS = _this.displayTimeMS;
            _this.messageEl.classList = 'alert alert-warning';
            _this.messageEl.innerText = message;
            _this.clearMessageInterval(msgTimeMS);
        };
        this.displaySuccessMessage = function (message, msgTimeMS) {
            if (!message)
                message = 'Something went success';
            if (!msgTimeMS)
                msgTimeMS = _this.displayTimeMS;
            _this.messageEl.classList = 'alert alert-success';
            _this.messageEl.innerText = message;
            _this.clearMessageInterval(msgTimeMS);
        };
        var app = document.querySelector('#app');
        var message = document.createElement('div');
        message.id = 'message';
        message.setAttribute('role', 'alert');
        app.appendChild(message);
        this.init();
    }
    return MessageCtrl;
}());
var UtilCtrl = (function () {
    function UtilCtrl() {
        var _this = this;
        this.sampleJSON = {
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
        };
        this.sampleXML = "\n<bookstore>\n\n<book category=\"cooking\">\n  <title lang=\"en\">Everyday Italian</title>\n  <author>Giada De Laurentiis</author>\n  <year>2005</year>\n  <price>30.00</price>\n</book>\n\n<book category=\"children\">\n  <title lang=\"en\">Harry Potter</title>\n  <author>J K. Rowling</author>\n  <year>2005</year>\n  <price>29.99</price>\n</book>\n\n<book category=\"web\">\n  <title lang=\"en\">XQuery Kick Start</title>\n  <author>James McGovern</author>\n  <author>Per Bothner</author>\n  <author>Kurt Cagle</author>\n  <author>James Linn</author>\n  <author>Vaidyanathan Nagarajan</author>\n  <year>2003</year>\n  <price>49.99</price>\n</book>\n\n<book category=\"web\">\n  <title lang=\"en\">Learning XML</title>\n  <author>Erik T. Ray</author>\n  <year>2003</year>\n  <price>39.95</price>\n</book>\n\n</bookstore>\n        ";
        this.messageCtrl = new MessageCtrl();
        this.onClickBeautify = function () {
            var inputEl = document.querySelector('#textAreaInput');
            inputEl.value = _this.expressionCtrl.beautify(inputEl.value);
        };
        this.onExpressionChange = function () {
            var expressionInputEl = document.querySelector('#expressionInput');
            var expr = expressionInputEl.value;
            var inputEl = document.querySelector('#textAreaInput');
            var inputValue = inputEl.value;
            var textAreaOutput = document.querySelector('#textAreaOutput');
            var exprAppliedOp = _this.expressionCtrl.applyExpression(expr, inputValue);
            textAreaOutput.value = exprAppliedOp;
            _this.onOutputChange();
        };
        this.onOutputChange = function () {
            _this.clearArithmeticValueElmnt();
            var textAreaOutput = document.querySelector('#textAreaOutput');
            var response = _this.expressionCtrl.computeArithmeticOpValues(textAreaOutput.value);
            if (response) {
                _this.displayOpValues(response);
            }
        };
        this.clearArithmeticValueElmnt = function () {
            var arithmeticValuesEl = document.querySelector('#arithmeticValues');
            arithmeticValuesEl.innerText = '';
        };
        this.displayOpValues = function (inpVal) {
            var arithmeticValues = "sum: " + inpVal.sum + " min: " + inpVal.min + " avg: " + inpVal.avg + " max: " + inpVal.max;
            var arithmeticValuesElmnt = document.querySelector('#arithmeticValues');
            arithmeticValuesElmnt.innerText = arithmeticValues;
        };
        this.onClickLoadSampleJSON = function () {
            try {
                var textAreaInput = document.querySelector('#textAreaInput');
                textAreaInput.value = JSON.stringify(_this.sampleJSON);
                _this.onAddInputValue();
            }
            catch (error) {
                console.log("[JSONExpressionControl: onClickLoadSample] error ", error.message);
                _this.messageCtrl.displayErrorMessage(error.message);
            }
        };
        this.onClickLoadSampleXML = function () {
            try {
                var textAreaInput = document.querySelector('#textAreaInput');
                textAreaInput.value = _this.sampleXML;
                _this.onAddInputValue();
            }
            catch (error) {
                console.log("[JSONExpressionControl: onClickLoadSample] error ", error.message);
                _this.messageCtrl.displayErrorMessage(error.message);
            }
        };
        this.displayCopyClipBoardMsg = function (message) {
            var expressionInputCopy = document.querySelector('#expressionInputCopy');
            expressionInputCopy.innerText = message;
            setInterval(function () {
                expressionInputCopy.innerText = '';
                expressionInputCopy.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-clipboard\" viewBox=\"0 0 16 16\">\n                <path d=\"M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z\"/>\n                <path d=\"M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z\"/>\n                </svg>";
            }, 3000);
        };
        this.onClickCopyToClipboard = function () {
            var expressionInput = document.querySelector('#expressionInput');
            window.navigator['clipboard'].writeText(expressionInput.value).then(function () {
                console.log('Async: Copying to clipboard was successful!');
                _this.displayCopyClipBoardMsg('Copied');
            }, function (error) {
                console.error('Async: Could not copy text: ', error);
                _this.displayCopyClipBoardMsg('Could not copy');
            });
            expressionInput.select();
        };
        this.onAddInputValue = function () {
            console.log("[UICtrl: onAddJsonValue] called");
            var beautifyBtn = document.querySelector('#beautify');
            var textAreaInputEl = document.querySelector('#textAreaInput');
            var inputValue = textAreaInputEl.value;
            if (_this.isXML(inputValue)) {
                beautifyBtn.innerText = '< >';
                _this.expressionCtrl = new XmlExpressionCtrl();
            }
            if (_this.isJSON(inputValue)) {
                beautifyBtn.innerText = '{ }';
                _this.expressionCtrl = new JsonExpressionCtrl();
            }
        };
        this.isJSON = function (str) {
            try {
                JSON.parse(str);
                return true;
            }
            catch (e) {
                return false;
            }
        };
        this.isXML = function (str) {
            try {
                str = str.trim();
                if (str[0] == '<' && str[str.length - 1] == '>')
                    return true;
                else
                    return false;
            }
            catch (e) {
                return false;
            }
        };
    }
    return UtilCtrl;
}());
var JsonExpressionCtrl = (function () {
    function JsonExpressionCtrl() {
        this.beautify = function (str) {
            try {
                var parsedJSONContent = JSON.parse(str);
                return JSON.stringify(parsedJSONContent, undefined, 4);
            }
            catch (error) {
                throw Error(error.message);
            }
        };
        this.applyExpression = function (expr, inputValue) {
            inputValue = JSON.parse(inputValue);
            var filteredJSONContent = jsonPath(inputValue, expr);
            return JSON.stringify(filteredJSONContent, undefined, 4);
        };
        this.computeArithmeticOpValues = function (inpValue) {
            try {
                inpValue = JSON.parse(inpValue);
                for (var _i = 0, inpValue_1 = inpValue; _i < inpValue_1.length; _i++) {
                    var item = inpValue_1[_i];
                    if (!Number(item))
                        return;
                }
                return {
                    sum: inpValue.reduce(function (acc, a) { return acc + a; }, 0),
                    min: Math.min.apply(Math, inpValue),
                    avg: Math.floor(inpValue.reduce(function (a, b) { return a + b; }) / inpValue.length),
                    max: Math.max.apply(Math, inpValue)
                };
            }
            catch (error) {
            }
        };
    }
    return JsonExpressionCtrl;
}());
var XmlExpressionCtrl = (function () {
    function XmlExpressionCtrl() {
        var _this = this;
        this.xsltDoc = new DOMParser().parseFromString([
            '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
            '  <xsl:strip-space elements="*"/>',
            '  <xsl:template match="para[content-style][not(text())]">',
            '    <xsl:value-of select="normalize-space(.)"/>',
            '  </xsl:template>',
            '  <xsl:template match="node()|@*">',
            '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
            '  </xsl:template>',
            '  <xsl:output indent="yes"/>',
            '</xsl:stylesheet>',
        ].join('\n'), 'application/xml');
        this.beautify = function (str) {
            try {
                var xmlDoc = new DOMParser().parseFromString(str, 'application/xml');
                var xsltProcessor = new XSLTProcessor();
                xsltProcessor.importStylesheet(_this.xsltDoc);
                var resultDoc = xsltProcessor.transformToDocument(xmlDoc);
                var resultXml = new XMLSerializer().serializeToString(resultDoc);
                return resultXml;
            }
            catch (error) {
                throw Error(error.message);
            }
        };
        this.applyExpression = function (expr, inputValue) {
            var xmlDoc = new DOMParser().parseFromString(inputValue, 'application/xml');
            var xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(_this.xsltDoc);
            var xml = xsltProcessor.transformToDocument(xmlDoc);
            var nodes = document.evaluate(expr, xml, null, XPathResult.ANY_TYPE, null);
            console.log(nodes);
            var node, nodeArray = [];
            var xmlSerilizer = new XMLSerializer();
            while (node = nodes.iterateNext()) {
                nodeArray.push(xmlSerilizer.serializeToString(node));
            }
            return nodeArray.join('\n');
        };
        this.computeArithmeticOpValues = function (inpValue) {
            console.log("method not implemented");
        };
    }
    return XmlExpressionCtrl;
}());
'use strict';
var UICtrl = (function () {
    function UICtrl() {
        this.utilCtrl = new UtilCtrl();
        this.expressionCtrl = new JsonExpressionCtrl();
        var app = document.querySelector('#app');
        var container = document.createElement('div');
        container.classList.add('container');
        container.id = 'container';
        app.appendChild(container);
    }
    UICtrl.prototype.init = function () {
        console.log("[UIControls: init] initialize");
        this.containerEl = document.querySelector('#container');
        this.containerRowEl = document.createElement('div');
        this.containerRowEl.classList = 'row';
        this.containerEl.appendChild(this.containerRowEl);
        this.createExpressionBar();
        this.createInputTextArea();
        this.createOutputTextArea();
        this.createShortHandButtons();
        this.createHelpLink();
    };
    UICtrl.prototype.createExpressionBar = function () {
        var contentDiv = document.createElement('div');
        contentDiv.className = 'col-sm-12';
        var inputGroupDiv = document.createElement('div');
        inputGroupDiv.className += 'input-group autocomplete';
        var inputGrpPrepend = document.createElement('div');
        inputGrpPrepend.className = 'input-group-prepend';
        var inputGrpTextSpan = document.createElement('span');
        inputGrpTextSpan.className = 'input-group-text';
        inputGrpTextSpan.innerText = 'Expression';
        var inputGrpPostPend = document.createElement('div');
        inputGrpPostPend.className = 'input-group-append';
        var inputGrpPPTextSpan = document.createElement('span');
        inputGrpPPTextSpan.className += 'input-group-text expressionInputCopy';
        inputGrpPPTextSpan.id = 'expressionInputCopy';
        inputGrpPPTextSpan.addEventListener('click', this.utilCtrl.onClickCopyToClipboard);
        inputGrpPPTextSpan.setAttribute('data-toggle', 'tooltip');
        inputGrpPPTextSpan.setAttribute('title', 'Copy to clipboard');
        inputGrpPPTextSpan.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-clipboard\" viewBox=\"0 0 16 16\">\n        <path d=\"M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z\"/>\n        <path d=\"M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z\"/>\n      </svg>";
        inputGrpPrepend.appendChild(inputGrpTextSpan);
        inputGroupDiv.appendChild(inputGrpPrepend);
        inputGrpPostPend.appendChild(inputGrpPPTextSpan);
        var inputText = document.createElement('input');
        inputText.type = 'text';
        inputText.className = 'form-control';
        inputText.id = 'expressionInput';
        inputText.placeholder = 'Expression';
        inputText.addEventListener('keyup', this.utilCtrl.onExpressionChange);
        inputGroupDiv.appendChild(inputText);
        inputGroupDiv.appendChild(inputGrpPostPend);
        contentDiv.appendChild(inputGroupDiv);
        this.containerRowEl.appendChild(contentDiv);
    };
    UICtrl.prototype.createInputTextArea = function () {
        var contentDiv = document.createElement('div');
        contentDiv.className = 'col-sm-6';
        var inputGroupDiv = document.createElement('div');
        inputGroupDiv.className = 'input-group';
        var textAreaInput = document.createElement('textarea');
        textAreaInput.className += 'form-control json-render-area';
        textAreaInput.id = 'textAreaInput';
        textAreaInput.style.fontSize = '11px';
        textAreaInput.addEventListener('change', this.utilCtrl.onAddInputValue);
        inputGroupDiv.appendChild(textAreaInput);
        contentDiv.appendChild(inputGroupDiv);
        this.containerRowEl.appendChild(contentDiv);
    };
    UICtrl.prototype.createOutputTextArea = function () {
        var contentDiv = document.createElement('div');
        contentDiv.className = 'col-sm-6';
        var inputGroupDiv = document.createElement('div');
        inputGroupDiv.className = 'input-group';
        var textAreaOutput = document.createElement('textarea');
        textAreaOutput.className += 'form-control json-render-area';
        textAreaOutput.style.fontSize = '11px';
        textAreaOutput.id = 'textAreaOutput';
        textAreaOutput.addEventListener('change', this.utilCtrl.onOutputChange);
        inputGroupDiv.appendChild(textAreaOutput);
        contentDiv.appendChild(inputGroupDiv);
        this.containerRowEl.appendChild(contentDiv);
    };
    UICtrl.prototype.createShortHandButtons = function () {
        var divContent = document.createElement('div');
        var loadSampleButtonJSON = document.createElement('button');
        loadSampleButtonJSON.title = 'Load Sample JSON';
        loadSampleButtonJSON.className += 'btn btn-primary mr-1';
        loadSampleButtonJSON.id = 'loadSampleJSON';
        loadSampleButtonJSON.innerText = 'Load Sample JSON';
        loadSampleButtonJSON.addEventListener('click', this.utilCtrl.onClickLoadSampleJSON);
        var loadSampleButtonXML = document.createElement('button');
        loadSampleButtonXML.title = 'Load Sample XML';
        loadSampleButtonXML.className += 'btn btn-primary mr-1';
        loadSampleButtonXML.id = 'loadSampleXML';
        loadSampleButtonXML.innerText = 'Load Sample XML';
        loadSampleButtonXML.addEventListener('click', this.utilCtrl.onClickLoadSampleXML);
        var beautifyButton = document.createElement('button');
        beautifyButton.title = 'Beautify';
        beautifyButton.className += 'btn btn-primary mr-1';
        beautifyButton.id = 'beautify';
        beautifyButton.innerText = '{ }';
        beautifyButton.addEventListener('click', this.utilCtrl.onClickBeautify);
        var arithmeticValueElmt = document.createElement('p');
        arithmeticValueElmt.title = 'ArithmeticValues';
        arithmeticValueElmt.className = 'mr-1';
        arithmeticValueElmt.id = 'arithmeticValues';
        arithmeticValueElmt.innerText = '';
        divContent.appendChild(arithmeticValueElmt);
        divContent.appendChild(loadSampleButtonJSON);
        divContent.appendChild(loadSampleButtonXML);
        divContent.appendChild(beautifyButton);
        this.containerEl.appendChild(divContent);
    };
    UICtrl.prototype.createHelpLink = function () {
        var contentDiv = document.createElement('div');
        var link = document.createElement('a');
        link.target = '_blank';
        link.href = 'https://docs.oracle.com/cd/E60058_01/PDF/8.0.8.x/8.0.8.0.0/PMF_HTML/JsonPath_Expressions.htm';
        link.innerText = 'Need help on json path expression';
        contentDiv.appendChild(link);
        this.containerEl.appendChild(contentDiv);
    };
    return UICtrl;
}());
new UICtrl().init();
//# sourceMappingURL=main.js.map