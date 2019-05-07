import React from 'react'
import PropTypes from 'prop-types'

const Preview = ({ node }) => {
    let children
    if (node.children != null) {
        children = node.children.map(function(node, index) {
            let style = node.model.styles || {}
            let value = node.model.value || ''
            let attributes = node.model.attributes || {}
            let type = node.model.type
            let id = node.model.attributes.id || node.model.id

            return React.createElement(
                type,
                {
                    id: id,
                    ...attributes,
                    key: index,
                    style: style
                },
                <Preview node={node} />
            )
        })
    }

    return <React.Fragment>{children}</React.Fragment>
}

Preview.propTypes = {
    node: PropTypes.object.isRequired
}

export default Preview
