import React from 'react'
import PropTypes from 'prop-types'

const DesignerInterface = ({ header, preview }) => {
    return (
        <div>
            {header}
            <div className="container">
            <div className="row">
                <div className="col-sm" style={style}>
                    {preview}
                </div>
            </div>
        </div>
        </div>
    )
}

const style = {
    border: '2px solid black'
}

DesignerInterface.propTypes = {
    header: PropTypes.object.isRequired,
    preview: PropTypes.object.isRequired
}

export default DesignerInterface
