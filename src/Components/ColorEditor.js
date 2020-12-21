import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { toHSV } from './ColorUtilities';
import reactCSS from 'reactcss'

class ColorEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: String(props.value).toUpperCase(),
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    static propTypes = {
    }

    static defaultProps = {
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            this.props.value !== this.state.value &&
            (prevProps.value !== this.props.value || prevState.value !== this.state.value)
        ) {
            this.setState({ value: this.props.value })
        }
    }

    componentWillUnmount() {
    const element = this.getContainerRenderWindow()
    element.removeEventListener('mousemove', this.handleChange)
    }

    getContainerRenderWindow() {
        const { container } = this
        let renderWindow = window
        while (!renderWindow.document.contains(container) && renderWindow.parent !== renderWindow) {
            renderWindow = renderWindow.parent
        }
        return renderWindow
    }

    handleKeyDown(event){
        const value = Number(String(event.target.value).replace(/%/g, ''));
        if (!isNaN(value)) {
            this.setUpdatedValue(value, event)
        }
    }

    handleChange(event) {
        this.setUpdatedValue(event.target.value, event)
    }

    setUpdatedValue(color, event) {
        this.props.onChange && this.props.onChange(color, event)
        this.setState({ value: color })
    }


    render() {
        return (
            <div>
                <input
                    ref={ input => this.input = input }
                    value={ this.state.value }
                    onKeyDown={ this.handleKeyDown }
                    onChange={ this.handleChange }
                />
            </div>
        )
    }



}

export default ColorEditor;
