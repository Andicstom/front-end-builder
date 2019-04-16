import React from 'react'
import PropTypes from 'prop-types'

const Preview = ({ node, selectElem }) => {
    let childNodes
    if (node.childNodes != null) {
        childNodes = node.childNodes.map(function(node, index) {
            console.log(node.type + ' ' + index + ' ' + node.id)
            let plusStyle = node.style || {}
            let value = node.value || ''
            switch (node.type) {
                case 'div':
                    return (
                        <div
                            id={node.id}
                            onClick={() => selectElem(node)}
                            style={plusStyle}
                            key={index}
                        >
                            <Preview node={node} selectElem={selectElem} />
                        </div>
                    )
                case 'p':
                    return (
                        <p
                            id={node.id}
                            onClick={() => selectElem(node)}
                            style={plusStyle}
                            key={index}
                        >
                            {value}
                            <Preview node={node} selectElem={selectElem} />
                        </p>
                    )
                default:
                    return <Preview node={node} selectElem={selectElem} />
            }
        })
    }

    return <React.Fragment>{childNodes}</React.Fragment>
}

Preview.propTypes = {
    node: PropTypes.object.isRequired,
    selectElem: PropTypes.func.isRequired
}

export default Preview
