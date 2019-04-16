import React from 'react'
import PropTypes from 'prop-types'

const ToolsItem = ({ id, label, value }) => {
    return (
        <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm">
                    {label}
                </span>
            </div>
            <input
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                defaultValue={value}
            />
             <button
                type="submit"
                className="btn btn-danger btn-sm"
            >
                <i className="fas fa-trash"></i>
            </button>
        </div>
    )
}

ToolsItem.propType = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
}

export default ToolsItem
