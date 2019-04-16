import React, { Component } from 'react'
import DesignerInterface from './components/DesignerInterface/DesignerInterface'
import Tools from './components/Tools/Tools'
import ToolsAttributes from './components/ToolsAttributes/ToolsAttributes'
import ToolsHtmlTags from './components/ToolsHtmlTags/ToolsHtmlTags'
import DesignerInterfaceHeader from './components/DesignerInterfaceHeader/DesignerInterfaceHeader'
import Preview from './components/Preview/Preview'

class App extends Component {
    constructor(props) {
        super(props)
        this.selectElem = this.selectElem.bind(this);

        this.state = {
            tree: {
                title: 'howdy',
                childNodes: [
                    {
                        id: '1',
                        type: 'div',
                        style: this.getStyle()
                    },
                    {
                        id: '2',
                        type: 'div',
                        style: this.getStyle(),
                        childNodes: [
                            {
                                id: '3',
                                type: 'div',
                                style: this.getStyle(),
                                childNodes: [
                                    {
                                        id: '4',
                                        type: 'p',
                                        style: this.getStyle(),
                                        value: 'Hello there!'
                                    },
                                    {
                                        id: '5',
                                        type: 'p',
                                        style: this.getStyle(),
                                        value: 'Im a P tag too'
                                    }
                                ]
                            },
                            {
                                id: '6',
                                type: 'div',
                                style: this.getStyle()
                            }
                        ]
                    }
                ]
            },
            activeItem: {
                id: '2'
            }
        }
    }

    searchTree = (childNodes, id) => {
      console.log("searchtree start")
        if (childNodes.id === id) {
            childNodes.style = this.getSelectedStyle()
            console.log("searchtree első if lefutott, megvan")
            return childNodes
        } else if (childNodes.childNodes != null) {
            var i
            var result = null
            for (
                i = 0;
                result == null && i < childNodes.childNodes.length;
                i++
            ) {
                console.log("else if ág, for cikluson belül, result: " + result)
                result = this.searchTree(childNodes.childNodes[i], id)
            }
            console.log("else if ág, for cikluson kívül, result: " + result)
            return result
        }
        return null
    }

    getStyle = () => {
        return { padding: '40px', border: '2px solid blue' }
    }

    getSelectedStyle = () => {
        return { padding: '40px', border: '2px solid red' }
    }

    selectElem(node) {
      console.log('megtörtént?')
      console.log(node)
      this.searchTree(this.state.tree, node.id)
    }

    /*deleteNodeHelper(root, key) {
      if (root === null) {
         // Empty tree return false;
      }
      if (key < root.data) {
         root.left = deleteNodeHelper(root.left, key);
         return root;
      } else if (key > root.data) {
         root.right = deleteNodeHelper(root.right, key);
         return root;
      } else {
         // No children
         //case 1 - a leaf node
         if (root.left === null && root.right === null) {
            root = null; 
            return root;
         }
         // Single Child cases
         if (root.left === null) return root.right;
         if (root.right === null) return root.left;
   
         // Both children, so need to find successor 
         let currNode = root.right;
         while (currNode.left !== null) {
            currNode = currNode.left;
         }
         root.data = currNode.data;
         // Delete the value from right subtree.
         root.right = deleteNodeHelper(root.right, currNode.data);
         return root;
      }
   }*/

    render() {
        const selectedStyle = {
            padding: '40px',
            border: '2px solid red'
        }

        const simpleStyle = {
            padding: '40px',
            border: '2px solid blue'
        }

        const attributeOptions = [
            { key: 'id', value: 'id' },
            { key: 'href', value: 'href' },
            { key: 'type', value: 'type' },
            { key: 'class', value: 'class' }
        ]

        const styleOptions = [
            { key: 'color', value: 'color' },
            { key: 'p', value: 'p' },
            { key: 'margin', value: 'margin' },
            { key: 'padding', value: 'padding' }
        ]

        const tagOptions = [
            { key: 'div', value: 'div' },
            { key: 'p', value: 'p' },
            { key: 'h1', value: 'h1' },
            { key: 'input', value: 'input' }
        ]

        const addTagOptions = [
            { key: 'append', value: 'append' },
            { key: 'preppend', value: 'preppend' },
            { key: 'after', value: 'after' },
            { key: 'befor', value: 'befor' }
        ]

        const attributeItems = [{ id: 'id', label: 'id', value: 'firstItem' }]

        const styleItems = [
            { id: 'margin', label: 'margin', value: '5px' },
            { id: 'padding', label: 'padding', value: '2px' }
        ]

        const toolsSections = [
            {
                key: 'firstSection',
                section: (
                    <ToolsHtmlTags
                        title="HTML címkék"
                        tagOptions={tagOptions}
                        addTagOptions={addTagOptions}
                    />
                )
            },
            {
                key: 'secondSection',
                section: (
                    <ToolsAttributes
                        title="Attribútumok"
                        options={attributeOptions}
                        items={attributeItems}
                    />
                )
            },
            {
                key: 'thirdSection',
                section: (
                    <ToolsAttributes
                        title="Stílus jegyek"
                        options={styleOptions}
                        items={styleItems}
                    />
                )
            }
        ]

        console.log("tree: " + this.searchTree(this.state.tree, 3))
        return (
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <DesignerInterface
                            header={<DesignerInterfaceHeader />}
                            preview={
                                <Preview
                                    node={this.state.tree}
                                    selectElem={this.selectElem}
                                />
                            }
                        />
                    </div>
                    <div className="col-4 border border-dark">
                        <Tools toolsSections={toolsSections} />
                    </div>
                </div>
            </div>
        )
    }
}

export default App
