import React, { Component } from 'react'
import ToolsComboBox from '../ToolsComboBox/ToolsComboBox'
import SimpleButton from '../SimpleButton/SimpleButton'
import PropTypes from 'prop-types'

class ToolsHtmlTags extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedElem: 'div',
            selectedElemAddOptions: 'before'
        }
    }

    handleInputChange = event => {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) => {
        this.props.addNewElem(this.state.selectedElem, this.state.selectedElemAddOptions)
        event.preventDefault();
    }

    render() {
        const {
            title,
            tagOptions,
            addTagOptions
        } = this.props

        return (
            <form
                onSubmit={this.handleSubmit}
                className="mt-3 border p-4 border-secondary"
            >
                <h6 className="text-center">{title}</h6>
                <div className="form-group">
                    <ToolsComboBox
                        options={tagOptions}
                        inputName="selectedElem"
                        handleInputChange={this.handleInputChange}
                        inputValue={this.state.selectedElem}
                    />
                </div>
                <div className="form-group">
                    <ToolsComboBox
                        options={addTagOptions}
                        inputName="selectedElemAddOptions"
                        handleInputChange={this.handleInputChange}
                        inputValue={this.state.selectedElemAddOptions}
                    />
                </div>
                <SimpleButton
                    text="Hozzáadás"
                    value="Submit"
                    className="btn btn-primary btn-sm w-50 mx-auto"
                    style={{ display: 'block' }}
                />
            </form>
        )
    }
}

ToolsHtmlTags.propTypes = {
    title: PropTypes.string.isRequired,
    tagOptions: PropTypes.array.isRequired,
    addTagOptions: PropTypes.array.isRequired,
}

export default ToolsHtmlTags
