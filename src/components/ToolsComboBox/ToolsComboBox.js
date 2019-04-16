import React from 'react'
import PropTypes from 'prop-types'

const ToolsComboBox = ({ options }) => {
    return (
        <select
            className="form-control form-control-sm"
            id="exampleFormControlSelect1"
        >
            {options.map(option => (
                <option key={option.key} >{option.value}</option>
            ))}
        </select>
    )
}

ToolsComboBox.propTypes = {
    options: PropTypes.array.isRequired
}

export default ToolsComboBox
