import React from 'react'
import SimpleButton from '../SimpleButton/SimpleButton'

const DesignerInterfaceHeader = props => {
    return (
        <div className="container">
            <div className="row" style={headerStyle}>
                <div className="col-sm">
                    <h4>Tervezőfelület</h4>
                </div>
                <div className="col-sm">
                    <SimpleButton
                        text="Felület letöltése"
                        onClick={null}
                        className="btn btn-primary btn-sm w-50 mx-auto"
                        style={{ display: 'block' }}
                    />
                </div>
            </div>
        </div>
    )
}

const headerStyle = {
    border: '2px solid black'
}

export default DesignerInterfaceHeader
