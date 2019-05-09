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

        // HTML DOM-ot tároló frastruktúra
        // root div elemmel
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
                        children: []
                    }
                ]
            }),
            selectedNodeId: 'root'
        }
    }

    componentWillMount() {
        let bodyStyle = document.body.style
        //document.html.style.height = '100%'
        //bodyStyle.backgroundColor = 'green'
        //bodyStyle.height = '100%'
    }

    componentWillUnmount() {
        document.body.style.backgroundColor = null
    }

    // Elem kiválasztása és ez alapján az alkalmazás állapotának frissítése
    selectElem = (e, node) => {
        if (!e) var e = window.event
        e.cancelBubble = true
        if (e.stopPropagation) e.stopPropagation()
        this.setState({ selectedNodeId: node.model.id })
    }

    // Új elem hozzáadása az adatmodellhez
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

                this.setState({ root: newRoot })
            }
        }
    }

    // Kiválasztott elem attribútumainak módosítása
    modifyAttribute = attributes => {
        let selectedNodeId = this.state.selectedNodeId

        if (this.state.selectedNodeId != null) {
            let newRoot = this.state.root
            let selectedNode = newRoot.first(function(node) {
                return node.model.id === selectedNodeId
            })

            if (selectedNode != null) {
                selectedNode.model.id = attributes.id
                selectedNode.model.attributes = attributes
                this.setState({ root: newRoot })
            }
        }
    }

    // Kiválasztott elem stílusának módosítása
    modifyStyles = styles => {
        let selectedNodeId = this.state.selectedNodeId

        if (this.state.selectedNodeId != null) {
            let newRoot = this.state.root
            let selectedNode = newRoot.first(function(node) {
                return node.model.id === selectedNodeId
            })

            if (selectedNode != null) {
                selectedNode.model.styles = styles
                this.setState({ root: newRoot })
            }
        }
    }

    // Kiválasztott elem törlése az adatmodellből
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

    // A kiválasztott elem attribútumainak lekérése
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

    // A kiválasztott elem stílusának lekérése
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
        // Az alkalmazásban megtalálhatő HTML elemek
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

        // Az alkalmazásban megtalálható stílus elemek
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
            'grid',
            'grid-area',
            'grid-auto-columns',
            'grid-auto-flow',
            'grid-auto-rows',
            'grid-column',
            'grid-column-end',
            'grid-column-gap',
            'grid-column-start',
            'grid-gap',
            'grid-row',
            'grid-row-end',
            'grid-row-gap',
            'grid-row-start',
            'grid-template',
            'grid-template-areas',
            'grid-template-columns',
            'grid-template-rows',
            'height',
            'justify-content',
            'left',
            'letter-spacing',
            'line-break',
            'line-height',
            'line-style',
            'list-style',
            'list-style-image',
            'list-style-position',
            'list-style-type',
            'margin',
            'max-height',
            'max-width',
            'min-height',
            'min-width',
            'mix-blend-mode',
            'object-fit',
            'object-position',
            'opacity',
            'order',
            'outline',
            'outline-offset',
            'overflow',
            'overflow-wrap',
            'overflow-x',
            'overflow-y',
            'padding',
            'position',
            'quotes',
            'resize',
            'right',
            'tab-size',
            'table-layout',
            'text-align',
            'text-decoration',
            'text-decoration-color',
            'text-indent',
            'text-justify',
            'text-overflow',
            'text-shadow',
            'top',
            'transition',
            'vertical-align',
            'visibility',
            'width',
            'word-break',
            'word-spacing',
            'word-wrap',
            'writing-mode',
            'z-index'
        ]

        // Az alkalmazásban megtalálható hozzáadási módszerek
        const addTagOptions = ['append', 'prepend']

        // Az alkalmazásban megtalálható attribútum elemek
        const attributeOptions = [
            'accept',
            'accept-charset',
            'accesskey',
            'action',
            'align',
            'alt',
            'async',
            'autocomplete',
            'autofocus',
            'autoplay',
            'bgcolor',
            'border',
            'checked',
            'cite',
            'class',
            'color',
            'cols',
            'colspan',
            'content',
            'contenteditable',
            'controls',
            'coords',
            'data',
            'datetime',
            'default',
            'dir',
            'dirname',
            'disabled',
            'download',
            'draggable',
            'dropzone',
            'enctype',
            'for',
            'form',
            'formaction',
            'headers',
            'height',
            'hidden',
            'high',
            'hreflang',
            'id',
            'ismap',
            'kind',
            'label',
            'lang',
            'list',
            'loop',
            'low',
            'max',
            'maxlength',
            'media',
            'method',
            'min',
            'multiple',
            'muted',
            'name',
            'novalidate',
            'onabort',
            'onblur',
            'oncanplay',
            'onchange',
            'onclick',
            'oncontextmenu',
            'oncopy',
            'ondblclick',
            'ondrag',
            'ondragenter',
            'ondragleave',
            'ondragover',
            'ondragstart',
            'ondrop',
            'ondurationchange',
            'onended',
            'onerror',
            'onfocus',
            'oninput',
            'oninvalid',
            'onkeydown',
            'onkeypress',
            'onkeyup',
            'onmousedown',
            'onmousemove',
            'onmouseout',
            'onmouseover',
            'onmouseup',
            'onmousewheel',
            'onpaste',
            'onselect',
            'placeholder',
            'rel',
            'required',
            'rows',
            'rowspan',
            'sandbox',
            'scope',
            'selected',
            'shape',
            'size',
            'span',
            'src',
            'start',
            'title',
            'type',
            'value',
            'width'
        ]

        // Az eszköztár bővíthetősége végett itt definiáltam annak részeit
        // A gyermek elemek props-ként kerülnek átadásra
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

        // Komponens által kirajzolt felület megadása
        // A főbb komponensek itt kerülnek megadásra
        // Azok gyermek elemei pedig paraméterként kerülnek átadásra
        return (
            <div className="container-fluid d-flex h-100 flex-column">
                <div className="row flex-grow-1 d-flex justify-content-start">
                    <div className="col-9 h-100">
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
                    <div className="col-3 border border-dark no-gutters">
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
