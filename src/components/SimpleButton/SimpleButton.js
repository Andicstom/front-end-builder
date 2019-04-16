import React from 'react'
import PropTypes from 'prop-types'

const SimpleButton = ({ text, onClick, className, style, type }) => {
    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
            style={style}
        >
            {text}
        </button>
    )
}

SimpleButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    type: PropTypes.string
}

SimpleButton.defaultProps = {
    className: 'btn btn-primary btn-sm',
    style: {},
    type: "submit"
}

export default SimpleButton
