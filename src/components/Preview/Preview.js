import React from 'react'
import PropTypes from 'prop-types'

// Ebben a komponensben történik az összeálított oldal-szerkezet megjelenítése
// Ez rekurzív módszerrel történik, így a komponens többször is meghívja saját magát
// Ezzel kirajzolva a megfelelő oldal-szerkezetet
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

// Paraméter validálása és meghatározása
Preview.propTypes = {
    node: PropTypes.object.isRequired
}

export default Preview
