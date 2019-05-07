import React from 'react'
import PropTypes from 'prop-types'
var TreeModel = require('tree-model')

const Preview = ({ node, selectElem }) => {
    let children
    if (node.model.children != null) {
        console.log('preview node: ' + node)
        node.walk(function(node) {
            console.log(node.model.type + ' ' + node.model.id)
            let plusStyle = node.model.style || {}
            let value = node.model.value || ''
            switch (node.model.type) {
                case 'div':
                    console.log('ez egy div')
                    children = (
                        <div
                            id={node.model.id}
                            onClick={() => selectElem(node)}
                            style={plusStyle}
                            key={node.model.id}
                        >
                            <Preview node={node} selectElem={selectElem} />
                        </div>
                    )
                    return;
                case 'p':
                    console.log('ez egy p')
                    children = (
                        <p
                            id={node.model.id}
                            onClick={() => selectElem(node)}
                            style={plusStyle}
                            key={node.model.id}
                        >
                            {value}
                            <Preview node={node} selectElem={selectElem} />
                        </p>
                    )
                    return;
                case 'h1':
                    console.log('ez egy h1')
                    children = (
                        <h1
                            id={node.model.id}
                            onClick={() => selectElem(node)}
                            style={plusStyle}
                            key={node.model.id}
                        >
                            {value}
                            <Preview node={node} selectElem={selectElem} />
                        </h1>
                    )
                    return;
                case 'h2':
                console.log('ez egy h2')
                    children = (
                        <h2
                            id={node.model.id}
                            onClick={() => selectElem(node)}
                            style={plusStyle}
                            key={node.model.id}
                        >
                            {value}
                            <Preview node={node} selectElem={selectElem} />
                        </h2>
                    )
                    return;
                case 'h3':
                console.log('ez egy h3')
                    children = (
                        <h3
                            id={node.model.id}
                            onClick={() => selectElem(node)}
                            style={plusStyle}
                            key={node.model.id}
                        >
                            {value}
                            <Preview node={node} selectElem={selectElem} />
                        </h3>
                    )
                    return;
                default:
                    children = <Preview node={node} selectElem={selectElem} />
                    console.log("szar default lefut?")
                    return;
            }
            return;
        })
    }
    console.log("vége van a ciklusoknak")

    return <React.Fragment>{children}</React.Fragment>
}

Preview.propTypes = {
    node: PropTypes.object.isRequired,
    selectElem: PropTypes.func.isRequired
}

export default Preview
