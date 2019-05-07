import React from 'react'
import PropTypes from 'prop-types'

const Tools = ({ toolsSections, selectedNode }) => {
    console.log(selectedNode)
    return (
        <div className="conatiner">
            <div className="row">
                <div className="col-sm border border-dark">
                    <h4>Eszköztár</h4>
                </div>
            </div>
            {toolsSections.map(toolsSection => (
                <div key={toolsSection.key} className="row">
                    <div className="col-sm">{toolsSection.section}</div>
                </div>
            ))}
        </div>
    )
}

Tools.propTypes = {
    toolsSections: PropTypes.array.isRequired
}

export default Tools
