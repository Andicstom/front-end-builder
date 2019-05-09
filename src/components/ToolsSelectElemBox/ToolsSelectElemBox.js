import React from 'react'
import SimpleButton from '../SimpleButton/SimpleButton'
import PropTypes from 'prop-types'

const ToolsSelectElemBox = ({ title, children, deleteSelectedElem }) => {
    return (
        <div className="mt-3 border p-1 border-secondary align-middle pr-3">
            <h6 className="text-center">{title}</h6>
            <div className="list-group m-1">{children}</div>
            <SimpleButton
                text="Törlés"
                onClick={deleteSelectedElem}
                className="btn btn-danger btn-sm w-50 mx-auto"
                style={{ display: 'block' }}
            />
        </div>
    )
}

ToolsSelectElemBox.propTypes = {
    children: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    deleteSelectedElem: PropTypes.func.isRequired
}

export default ToolsSelectElemBox
