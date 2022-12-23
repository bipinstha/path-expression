'use strict'
interface ExpressionCtrl {

    beautify(str: string): any

    applyExpression(expr: string, inputValue: any): any

    computeArithmeticOpValues(inpValue: any) : any
}

class JsonExpressionCtrl implements ExpressionCtrl {

    beautify = (str: string) => {
        try {
            let parsedJSONContent = JSON.parse(str)
            return JSON.stringify(parsedJSONContent, undefined, 4)
        } catch (error) {
            throw Error(error.message)
        }
    }

    applyExpression = (expr: string, inputValue: any) => {
        inputValue = JSON.parse(inputValue)
        let filteredJSONContent = jsonPath(inputValue, expr)
        return JSON.stringify(filteredJSONContent, undefined, 4)
    }

    computeArithmeticOpValues = (inpValue: any) => {
        try {
            inpValue = JSON.parse(inpValue)
            for(let item of inpValue) {
                if (!Number(item)) return
            }
            return {
                sum: inpValue.reduce((acc: number, a: number) => { return acc + a }, 0),
                min: Math.min(...inpValue),
                avg: Math.floor(inpValue.reduce((a: number, b: number) => a + b) / inpValue.length),
                max: Math.max(...inpValue)
            }
        } catch(error) {

        }
    }
}

class XmlExpressionCtrl implements ExpressionCtrl {

    beautify = (str: string) => {
        try {
            var xmlDoc = new DOMParser().parseFromString(str, 'application/xml')
            var xsltDoc = new DOMParser().parseFromString([
                // describes how we want to modify the XML - indent everything
                '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
                '  <xsl:strip-space elements="*"/>',
                '  <xsl:template match="para[content-style][not(text())]">', // change to just text() to strip space in text nodes
                '    <xsl:value-of select="normalize-space(.)"/>',
                '  </xsl:template>',
                '  <xsl:template match="node()|@*">',
                '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
                '  </xsl:template>',
                '  <xsl:output indent="yes"/>',
                '</xsl:stylesheet>',
            ].join('\n'), 'application/xml')
            var xsltProcessor = new XSLTProcessor()
            xsltProcessor.importStylesheet(xsltDoc)
            var resultDoc = xsltProcessor.transformToDocument(xmlDoc)
            var resultXml = new XMLSerializer().serializeToString(resultDoc)
            return resultXml
        } catch (error) {
            throw Error(error.message)
        }
    }

    applyExpression = (expr: string, inputValue: any) => {
        var xmlDoc = new DOMParser().parseFromString(inputValue, 'application/xml')
        var xsltDoc = new DOMParser().parseFromString([
            // describes how we want to modify the XML - indent everything
            '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
            '  <xsl:strip-space elements="*"/>',
            '  <xsl:template match="para[content-style][not(text())]">', // change to just text() to strip space in text nodes
            '    <xsl:value-of select="normalize-space(.)"/>',
            '  </xsl:template>',
            '  <xsl:template match="node()|@*">',
            '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
            '  </xsl:template>',
            '  <xsl:output indent="yes"/>',
            '</xsl:stylesheet>',
        ].join('\n'), 'application/xml')
        var xsltProcessor = new XSLTProcessor()
        xsltProcessor.importStylesheet(xsltDoc)
        var xml = xsltProcessor.transformToDocument(xmlDoc)
        console.log(xml)
        let nodes: any = document.evaluate(expr, xml, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)

        console.log(nodes)
        console.log(nodes.singleNodeValue)
        return new XMLSerializer().serializeToString(nodes.singleNodeValue)
    }

    computeArithmeticOpValues = (inpValue: any) => {
        console.log(`method not implemented`)
    }
}

