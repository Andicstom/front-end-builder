import React, { Component } from 'react'
import Preview from '../Preview/Preview'
var TreeModel = require('tree-model')

class Test extends Component {
    constructor(props) {
        super(props)

        this.tree = new TreeModel()

        this.root = this.tree.parse({
            id: 1,
            type: 'div',
            children: [
                {
                    id: 11,
                    type: 'div',
                    children: [{ id: 111, type: 'p' }]
                },
                {
                    id: 12,
                    type: 'div',
                    children: [
                        { id: 121, type: 'h1' },
                        { id: 122, type: 'h2' },
                        {
                            id: 123,
                            type: 'div',
                            children: [{ id: 111, type: 'p' }]
                        }
                    ]
                },
                {
                    id: 13,
                    type: 'div'
                },
                {
                    id: 14,
                    type: 'p'
                }
            ]
        })

        this.state = { root: this.root }
    }

    selectElem = (e, node) => {
        if (node != null) {
            console.log('click: ' + node.model.id)
            console.log('e: ' + e.currentTarget)
            node.drop()
            let newRoot = this.setState({ root: this.root })
        }
    }

    render() {
        /* console.log(root)
        root.walk(function (node) {
            console.log(node.model.id + " " + node.model.type)
            if (node.model.id === 13) return false;
        });

        console.log("bejárás teszt1")
        root.walk(function (node) {
            console.log(node.model.id + " " + node.model.type)
            if (!node.model.children) {
                console.log("nincs gyereke: " + node.model.id)
                return false;
            }
        });
        
        var node13 = root.first(function (node) {
            return node.model.id === 13;
        });
        console.log(node13)

        console.log("törlés")
        node13.drop();
        root.walk(function (node) {
            console.log(node.model.id + " " + node.model.type)
            if (node.model.id === 13) return false;
        });

        console.log("bejárás teszt2")
        var node12 = root.first(function (node) {
            return node.model.id === 12;
        });
        node12.walk(function (node) {
            console.log(node.model.id + " " + node.model.type)
            if (node.model.id === 13) return false;
        });*/

        /*root.children.map(function(node, index) {
            console.log('tree children: ' + node.model.id)
        })

        var node12 = root.first(function (node) {
            return node.model.id === 12;
        });

        node12.children.map(function(node, index) {
            console.log('tree children: ' + node.model.id)
        })*/

        return <Preview node={this.state.root} selectElem={this.selectElem} />
    }
}

export default Test
