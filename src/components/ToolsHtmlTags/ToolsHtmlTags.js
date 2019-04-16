import React from 'react'
import ToolsComboBox from '../ToolsComboBox/ToolsComboBox'
import SimpleButton from '../SimpleButton/SimpleButton'
import PropTypes from 'prop-types'

const ToolsHtmlTags = ({ title, tagOptions, addTagOptions }) => {
    return (
        <form className="mt-3 border p-4 border-secondary">
            <h6 className="text-center">{title}</h6>
            <div className="form-group">
                <ToolsComboBox options={tagOptions} />
            </div>
            <div className="form-group">
                <ToolsComboBox options={addTagOptions} />
            </div>
            <SimpleButton
                text="Hozzáadás"
                onClick={null}
                className="btn btn-primary btn-sm w-50 mx-auto"
                style={{ display: 'block' }}
            />
            {' '}
            <SimpleButton
                text="Törlés"
                onClick={null}
                className="btn btn-danger btn-sm w-50 mx-auto"
                style={{ display: 'block' }}
            />
        </form>
    )
}

ToolsHtmlTags.propTypes = {
    title: PropTypes.string.isRequired,
    tagOptions: PropTypes.array.isRequired,
    addTagOptions: PropTypes.array.isRequired
}

export default ToolsHtmlTags
