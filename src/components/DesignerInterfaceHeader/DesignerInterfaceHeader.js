import React from 'react'
import SimpleButton from '../SimpleButton/SimpleButton'

function getHtmlFileText(node) {
    let children = ''
    if (typeof node.children !== 'undefined' && node.children.length > 0) {
        children += node.children.map(function(node, index) {
            const { id, type, attributes, styles } = node.model
            return (
                '<' +
                type +
                ' id=' +
                id +
                '>' +
                (node.children.length > 0 ? '\n' : ' ') +
                getHtmlFileText(node) +
                '\n' +
                '</' +
                type +
                '>' +
                '\n'
            )
        })
    }
    return children
}

function trimText(text) {
    return text
        .split(',')
        .join('')
        .replace(/^\s*\n/gm, '')
}

function getStandarBeforeText() {
    /*let text = '<!DOCTYPE html>\n' +
    '<html> \n' +
    '<head> \n' +
    '<title>Page Title</title>\n' +
    '</head>\n'*/

    let text = '<html><head><title>Page Title</title></head><body>'

    return text
}

function getStandarAfterText() {
    let text = '</html>'
    return text
}

const DesignerInterfaceHeader = ({ downloadFile, node, getCssFileText}) => {
    let htmlText = getStandarBeforeText() + trimText(getHtmlFileText(node)) + getStandarAfterText()
    let cssText = getCssFileText()
    console.log(cssText)
    return (
        <div className="container">
            <div className="row border border-dark">
                <div className="col-sm">
                    <h4>Tervezőfelület</h4>
                </div>
                <div className="col-sm">
                    <SimpleButton
                        text="Felület letöltése"
                        onClick={() => downloadFile(htmlText, cssText)}
                        className="btn btn-primary btn-sm w-50 mx-auto align-middle"
                        style={{ display: 'block' }}
                    />
                </div>
            </div>
        </div>
    )
}

export default DesignerInterfaceHeader
