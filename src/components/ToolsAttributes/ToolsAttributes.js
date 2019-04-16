import React from 'react'
import ToolsComboBox from '../ToolsComboBox/ToolsComboBox'
import ToolsItem from '../ToolsItem/ToolsItem'
import SimpleButton from '../SimpleButton/SimpleButton'
import PropTypes from 'prop-types'

const ToolsAttributes = ({ title, options, items }) => {
    return (
        <form className="mt-3 border p-4 border-secondary">
            <h6 className="text-center">{title}</h6>
            <div className="form-group">
                <ToolsComboBox options={options} />
            </div>
            {items.map(item => (
                <ToolsItem
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    value={item.value}
                />
            ))}
            <SimpleButton
                text="Hozzáadás"
                onClick={null}
                className="btn btn-primary btn-sm w-50 mx-auto"
                style={{ display: 'block' }}
            />
            <SimpleButton
                text="Módosítás"
                onClick={null}
                className="btn btn-success btn-sm w-50 mx-auto"
                style={{ display: 'block' }}
            />
        </form>
    )
}

ToolsAttributes.propTypes = {
    title: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired
}

export default ToolsAttributes
