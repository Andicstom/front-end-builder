import React, { Component } from 'react'
import DesignerInterface from './components/DesignerInterface/DesignerInterface'
import Tools from './components/Tools/Tools'
import ToolsAttributes from './components/ToolsAttributes/ToolsAttributes'
import ToolsHtmlTags from './components/ToolsHtmlTags/ToolsHtmlTags'
import DesignerInterfaceHeader from './components/DesignerInterfaceHeader/DesignerInterfaceHeader'
import Preview from './components/Preview/Preview'
import SelectElem from './components/SelectElem/SelectElem'
import ToolsSelectElemBox from './components/ToolsSelectElemBox/ToolsSelectElemBox'
var TreeModel = require('tree-model')

class App extends Component {
    constructor(props) {
        super(props)

        this.tree = new TreeModel()

        this.state = {
            root: this.tree.parse({
                id: 'html dom tree',
                styles: {},
                children: [
                    {
                        id: 'root',
                        type: 'div',
                        attributes: { id: 'root' },
                        styles: {},
                        children: [
                            /*{
                        id: 11,
                        type: 'div',
                        attributes: {},
                        styles: {},
                        children: [
                            {
                                id: 111,
                                type: 'p',
                                attributes: {},
                                styles: {}
                            }
                        ]
                    },
                    {
                        id: 12,
                        type: 'div',
                        attributes: {},
                        styles: {},
                        children: [
                            {
                                id: 121,
                                type: 'h1',
                                attributes: {},
                                styles: {}
                            },
                            {
                                id: 122,
                                type: 'h2',
                                attributes: {},
                                styles: {}
                            },
                            {
                                id: 123,
                                type: 'div',
                                attributes: {},
                                styles: {},
                                children: [
                                    {
                                        id: 1231,
                                        type: 'p',
                                        attributes: {},
                                        styles: {}
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 13,
                        type: 'div',
                        attributes: {},
                        styles: {
                            border: '5px solid blue',
                            padding: '5px'
                        }
                    },
                    {
                        id: 14,
                        type: 'p',
                        attributes: { href: 'pornhub.com' },
                        styles: { border: '5px solid red' }
                    }*/
                        ]
                    }
                ]
            }),
            selectedNodeId: 'root'
        }
    }

    getStyle = () => {
        return { padding: '40px', border: '2px solid blue' }
    }

    getSelectedStyle = () => {
        return { padding: '40px', border: '2px solid red' }
    }

    selectElem = (e, node) => {
        if (!e) var e = window.event
        e.cancelBubble = true
        if (e.stopPropagation) e.stopPropagation()
        console.log(this.state.selectedNodeId)
        this.setState({ selectedNodeId: node.model.id })
        console.log('selected node: ' + this.state.selectedNodeId)
    }

    addNewElem = (elemType, addType) => {
        let newNode = this.tree.parse({
            id: 11111,
            type: elemType,
            attributes: { id: 11111 },
            styles: {}
        })
        let selectedNode = this.state.selectedNodeId

        if (this.state.selectedNodeId != null) {
            let newRoot = this.state.root
            console.log('selected node id: ' + this.state.selectedNodeId)
            let parentNode = newRoot.first(function(node) {
                return node.model.id === selectedNode
            })

            if (parentNode != null) {
                switch (addType) {
                    case 'append':
                        parentNode.addChild(newNode)
                        break
                    case 'preppend':
                        parentNode.addChildAtIndex(newNode, 0)
                        break
                    default:
                        parentNode.addChild(newNode)
                        break
                }
                console.log(parentNode)
                console.log(newRoot)
                this.setState({ root: newRoot })
            }
        }
    }

    modifyAttribute = attributes => {
        let selectedNodeId = this.state.selectedNodeId

        if (this.state.selectedNodeId != null) {
            let newRoot = this.state.root
            console.log('selected node id: ' + this.state.selectedNodeId)
            let selectedNode = newRoot.first(function(node) {
                return node.model.id === selectedNodeId
            })

            if (selectedNode != null) {
                selectedNode.model.id = attributes.id
                selectedNode.model.attributes = attributes
                this.setState({ root: newRoot })
                console.log(this.state)
            }
        }
    }

    modifyStyles = styles => {
        let selectedNodeId = this.state.selectedNodeId

        if (this.state.selectedNodeId != null) {
            let newRoot = this.state.root
            console.log('selected node id: ' + this.state.selectedNodeId)
            let selectedNode = newRoot.first(function(node) {
                return node.model.id === selectedNodeId
            })

            if (selectedNode != null) {
                selectedNode.model.styles = styles
                this.setState({ root: newRoot })
                console.log(this.state)
            }
        }
    }

    deletSelectedElem = () => {
        let selectedNode = this.state.selectedNodeId

        if (this.state.selectedNodeId != null) {
            let newRoot = this.state.root
            console.log('selected node id: ' + this.state.selectedNodeId)
            var deletedNode = newRoot.first(function(node) {
                return node.model.id === selectedNode
            })
            console.log(deletedNode)
            if (deletedNode != null) {
                deletedNode.drop()
            }
            this.setState({ root: newRoot })
        }
    }

    getSelectedElemAttributes = () => {
        let selectedNodeId = this.state.selectedNodeId
        if (this.state.selectedNodeId != null) {
            let newRoot = this.state.root
            let selectedNode = newRoot.first(function(node) {
                return node.model.id === selectedNodeId
            })
            if (selectedNode != null) {
                return selectedNode.model.attributes
            }
        }
        return {}
    }

    getSelectedElemStyle = () => {
        let selectedNodeId = this.state.selectedNodeId

        if (this.state.selectedNodeId != null) {
            let newRoot = this.state.root
            var selectedNode = newRoot.first(function(node) {
                return node.model.id === selectedNodeId
            })
            if (selectedNode != null) {
                return selectedNode.model.styles
            }
        }
        return {}
    }

    downloadFile = (filename, text) => {
        var element = document.createElement('a')
        element.setAttribute(
            'href',
            'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
        )
        element.setAttribute('download', filename)

        element.style.display = 'none'
        document.body.appendChild(element)

        element.click()

        document.body.removeChild(element)
    }

    getHtmlFileText = node => {
        let children
        if (node.children != null) {
            children = node.children.map(function(node, index) {
                const { id, type, attributes, style } = node.model
                return (
                    '<${type} ${...attributes} style=${style}>' +
                    //'<' + type + ' ' + {...attributes} +  'style:' + style  +
                    this.getHtmlFileText(node) +
                    '<${type}>'
                )
            })
        }
        console.log(children)
        return children
    }

    getCssFileText = () => {
        let text = ''
        let row = ''
        let styles
        let id
        this.state.root.walk({ strategy: 'pre' }, function(node) {
            if (node.model.id === 'html dom tree') {
                row = ''
            } else {
              id = node.model.attributes.id || node.model.id
                styles = JSON.stringify(node.model.styles)
                    .replace('{', '')
                    .replace('}', '')
                row = '.' + id + ' { ' + styles + ' } \n'
            }
            text += row
        })
        
        return text
            .split(',')
            .join('; ')
            .split('"')
            .join('')
    }

    downloadFiles = (htmlText, cssText) => {
      this.downloadFile('html', htmlText)
      this.downloadFile('css', cssText)
  }

    render() {
        const selectedStyle = {
            padding: '40px',
            border: '2px solid red'
        }

        const simpleStyle = {
            padding: '40px',
            border: '2px solid blue'
        }

        /*const attributeOptions = [
            { key: 'id', value: 'id' },
            { key: 'href', value: 'href' },
            { key: 'type', value: 'type' },
            { key: 'class', value: 'class' }
        ]

        const addTagOptions = [
            { key: 'append', value: 'append' },
            { key: 'preppend', value: 'preppend' },
            { key: 'after', value: 'after' },
            { key: 'befor', value: 'before' }
        ]

        const styleOptions = [
            { key: 'color', value: 'color' },
            { key: 'border', value: 'border' },
            { key: 'margin', value: 'margin' },
            { key: 'padding', value: 'padding' }
        ]*/

        /*const tagOptions = [
            { key: 'div', value: 'div' },
            { key: 'p', value: 'p' },
            { key: 'h1', value: 'h1' },
            { key: 'h1', value: 'h1' },
            { key: 'input', value: 'input' },
            { key: 'input', value: 'input' },
            { key: 'input', value: 'input' },
            { key: 'input', value: 'input' },
            { key: 'input', value: 'input' },
            { key: 'input', value: 'input' },
            { key: 'input', value: 'input' },
        ]*/

        const tagOptions = [
            'div',
            'p',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'a',
            'abbr',
            'address',
            'area',
            'article',
            'aside',
            'audio',
            'b',
            'button',
            'canvas',
            'caption',
            'code',
            'col',
            'colgroup',
            'dd',
            'del',
            'dl',
            'dt',
            'em',
            'footer',
            'form',
            'head',
            'header',
            'hr',
            'i',
            'iframe',
            'img',
            'input',
            'label',
            'li',
            'link',
            'map',
            'nav',
            'ol',
            'pre',
            'q',
            'select',
            'section',
            'smoll',
            'span',
            'table',
            'tbody',
            'td',
            'textarea',
            'tfoot',
            'th',
            'thead',
            'tr',
            'u',
            'ul'
        ]

        const styleOptions = [
            'align-content',
            'align-items',
            'align-self',
            'all',
            'background',
            'background-attachment',
            'background-blend-mode',
            'background-clip',
            'background-color',
            'background-image',
            'background-origin',
            'background-position',
            'background-repeat',
            'background-size',
            'border',
            'border-radius',
            'border-image',
            'border-collapse',
            'border-spacing',
            'bottom',
            'box-shadow',
            'box-sizing',
            'caption-side',
            'caret-color',
            'clear',
            'clip',
            'color',
            'column-count',
            'column-fill',
            'column-gap',
            'column-rule',
            'column-span',
            'column-width',
            'columns',
            'cursor',
            'direction',
            'display',
            'empty-cells',
            'filter',
            'flex',
            'flex-flow',
            'float',
            'font',
            'font-family',
            'font-size',
            'font-size-adjust',
            'font-style',
            'font-variant',
            'font-weight',
            'padding',
            'margin',
            'width'
        ]

        const addTagOptions = ['append', 'prepend']

        const attributeOptions = ['id', 'href', 'type', 'class']

        const styleItems = [
            { id: 'margin', label: 'margin', value: '5px' },
            { id: 'padding', label: 'padding', value: '2px' }
        ]

        const toolsSections = [
            {
                key: 'fourthSection',
                section: (
                    <ToolsSelectElemBox
                        title="HTML DOM fa"
                        deleteSelectedElem={this.deletSelectedElem}
                        addNewElem={this.addNewElem}
                        children={
                            <SelectElem
                                node={this.state.root}
                                selectElem={this.selectElem}
                                selectedNode={this.state.selectedNodeId}
                            />
                        }
                    />
                )
            },
            {
                key: 'firstSection',
                section: (
                    <ToolsHtmlTags
                        title="HTML címkék"
                        tagOptions={tagOptions}
                        addTagOptions={addTagOptions}
                        addNewElem={this.addNewElem}
                    />
                )
            },
            {
                key: 'secondSection',
                section: (
                    <ToolsAttributes
                        title="Attribútumok"
                        options={attributeOptions}
                        items={this.getSelectedElemAttributes()}
                        modifyElems={this.modifyAttribute}
                        selectedNode={this.state.selectedNodeId}
                    />
                )
            },
            {
                key: 'thirdSection',
                section: (
                    <ToolsAttributes
                        title="Stílus jegyek"
                        options={styleOptions}
                        items={this.getSelectedElemStyle()}
                        modifyElems={this.modifyStyles}
                        selectedNode={this.state.selectedNodeId}
                    />
                )
            }
        ]

        return (
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <DesignerInterface
                            header={
                                <DesignerInterfaceHeader
                                    downloadFile={this.downloadFiles}
                                    getHtmlFileText={this.getHtmlFileText}
                                    getCssFileText={this.getCssFileText}
                                    node={this.state.root}
                                />
                            }
                            preview={<Preview node={this.state.root} />}
                        />
                    </div>
                    <div className="col-4 border border-dark">
                        <Tools
                            toolsSections={toolsSections}
                            selectedNode={this.state.selectedNodeId}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default App
