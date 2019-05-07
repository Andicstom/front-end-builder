import React from 'react'
import PropTypes from 'prop-types'

const ToolsItem = ({  label, value, handleInputChange, deleteAttributes }) => {
    return (
        <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm">
                    {label}
                </span>
            </div>
            <input
                type="text"
                name={label}
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                onChange={(e) => handleInputChange(e)}
                value={value}
            />
            <button type="button" onClick={() => deleteAttributes(label)} className="btn btn-danger btn-sm">
                <i className="fas fa-trash" />
            </button>
        </div>
    )
}

ToolsItem.propType = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    handleInputChange: PropTypes.func.isRequired,
    deleteAttributes: PropTypes.func.isRequired
}

export default ToolsItem
