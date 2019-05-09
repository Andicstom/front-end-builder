import React, { Component } from 'react'
import ToolsComboBox from '../ToolsComboBox/ToolsComboBox'
import ToolsItem from '../ToolsItem/ToolsItem'
import SimpleButton from '../SimpleButton/SimpleButton'
import PropTypes from 'prop-types'

class ToolsAttributes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
    }

    makeArrayFromItems = items => {
        let keys = Object.keys(items)
        let itemArray = []
        keys.map((key, index) => {
            let obj = { [key]: items[key] }
            itemArray.push(obj)
            return itemArray
        })
        return itemArray
    }

    componentWillReceiveProps(props) {
        let selectedElem = { selectedElem: props.options[0]}
        console.log(selectedElem)
        let newState = { ...selectedElem, ...props.items }

        this.setState({ data: newState })
        console.log('components will receive props: ')
        console.log(this.state.data)
    }

    handleInputChange = event => {
        const target = event.target
        const value = target.value
        const name = target.name

        let data = { ...this.state.data }
        data[name] = value
        this.setState({ data })
    }

    handleSubmit = event => {
        let newItems = this.state.data
        let keys = Object.keys(newItems)
        let newElemProps = {}
        keys.map((key, index) => {
            if (key === 'selectedElem') {
                return
            }

            newElemProps[key] = newItems[key]
        })
        console.log(newElemProps)
        this.props.modifyElems(newElemProps)
        event.preventDefault()
    }

    optionIsAlreadyAdded = option => {
        let keys = Object.keys(this.state.data)
        return keys.includes(option)
    }

    getNonSelectedElem = () => {
        console.log(this.props.options)
        let newOptions = this.props.options.filter(
            option => !this.optionIsAlreadyAdded(option)
        )

        let item = newOptions[Math.floor(Math.random() * newOptions.length)]
        console.log(item)
        return item
    }

    addNewAttributes = () => {
        let data = { ...this.state.data }
        data[data.selectedElem] = ''
        data.selectedElem = this.getNonSelectedElem()

        this.setState({ data })
        console.log(this.state.data)
        console.log(this.state)
    }

    deleteAttributes = attribute => {
        let newState = this.state.data
        console.log(newState)
        console.log(attribute)
        delete newState[attribute]
        this.setState(newState)
    }

    render() {
        const { title, options } = this.props
        let keys = Object.keys(this.state.data)

        return (
            <form
                onSubmit={this.handleSubmit}
                className="mt-3 border p-4 border-secondary"
            >
                <h6 className="text-center">{title}</h6>
                <div className="form-group">
                    <ToolsComboBox
                        options={options.filter(
                            option => !this.optionIsAlreadyAdded(option)
                        )}
                        inputName="selectedElem"
                        handleInputChange={this.handleInputChange}
                        inputValue={this.state.data.selectedElem}
                    />
                </div>
                {keys
                    .filter(key => key !== 'selectedElem')
                    .map(key => {
                        console.log('map1')
                        console.log(this.state.data[key])
                        return (
                            <ToolsItem
                                key={key}
                                label={key}
                                value={this.state.data[key]}
                                handleInputChange={this.handleInputChange}
                                deleteAttributes={this.deleteAttributes}
                            />
                        )
                    })}
                <SimpleButton
                    text="Hozzáadás"
                    type="button"
                    onClick={this.addNewAttributes}
                    className="btn btn-primary btn-sm w-50 mx-auto"
                    style={{ display: 'block' }}
                />
                <SimpleButton
                    text="Módosítás"
                    value="Submit"
                    className="btn btn-success btn-sm w-50 mx-auto"
                    style={{ display: 'block' }}
                />
            </form>
        )
    }
}

ToolsAttributes.propTypes = {
    title: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    items: PropTypes.object.isRequired,
    modifyElems: PropTypes.func.isRequired
}

export default ToolsAttributes
