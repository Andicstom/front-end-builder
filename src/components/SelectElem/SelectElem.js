import React from 'react'
import PropTypes from 'prop-types'

const SelectElem = ({ node, selectElem, selectedNode }) => {
    let children
    if (node.children != null) {
        children = node.children.map(function(node, index) {
            const { id, type } = node.model
            return (
                <li
                    className={
                        id === selectedNode
                            ? 'list-group-item list-group-item-action list-group-item-primary m-1 p-1'
                            : 'list-group-item list-group-item-action list-group-item-secondary m-1 p-1'
                    }
                    id={id}
                    key={index}
                    onClick={e => selectElem(e, node)}
                >
                    <span >
                        {type}#{id}
                    </span>
                    <SelectElem
                        node={node}
                        selectElem={selectElem}
                        selectedNode={selectedNode}
                    />
                </li>
            )
        })
    }

    return <ul className="p-1">{children}</ul>
}

SelectElem.propTypes = {
    node: PropTypes.object.isRequired,
    selectElem: PropTypes.func.isRequired,
    selectedNode: PropTypes.string.isRequired
}

export default SelectElem
