import React from 'react'
import PropTypes from 'prop-types'

const DesignerInterface = ({ header, preview }) => {
    return (
        <div>
            {header}
            <div className="container-fluid h-100">
            <div className="row border border-dark justify-content-center h-100">
                <div className="col h-100">
                    {preview}
                </div>
            </div>
        </div>
        </div>
    )
}

// Paraméter validálása és meghatározása
DesignerInterface.propTypes = {
    header: PropTypes.object.isRequired,
    preview: PropTypes.object.isRequired
}

export default DesignerInterface
