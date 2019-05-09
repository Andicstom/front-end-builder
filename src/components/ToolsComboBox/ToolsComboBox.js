import React from 'react'
import PropTypes from 'prop-types'

const ToolsComboBox = ({
    options,
    inputName,
    handleInputChange,
    inputValue
}) => {
    return (
        <select
            name={inputName}
            onChange={handleInputChange}
            className="form-control form-control-sm"
            id="exampleFormControlSelect1"
            value={inputValue}
        >
            {options.map(option => (
                <option key={option.toString()} value={option.toString()}>
                    {option.toString()}
                </option>
            ))}
        </select>
    )
}

ToolsComboBox.propTypes = {
    options: PropTypes.array.isRequired,
    inputName: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    inputValue: PropTypes.string
}

export default ToolsComboBox
