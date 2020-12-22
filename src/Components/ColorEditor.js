import React, {Component} from 'react';
import PropTypes from 'prop-types';
import reactCSS from 'reactcss';
const UP_KEY_CODE = 38
const DOWN_KEY_CODE = 40

class ColorEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: String(props.value).toUpperCase(),
            blurValue: String(props.value).toUpperCase(),
        }
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.setUpdatedValue = this.setUpdatedValue.bind(this);
    }

    static propTypes = {
        onChange: PropTypes.func,
        value: PropTypes.any,
        type: PropTypes.string,
    }

    static defaultProps = {
        onChange: null,
        value: null,
        type: null,
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            this.props.value !== this.state.value &&
            (prevProps.value !== this.props.value || prevState.value !== this.state.value)
        ) {
            if (this.input === document.activeElement) {
                this.setState({ blurValue: String(this.props.value).toUpperCase() })
            } else {
                this.setState({ value: String(this.props.value).toUpperCase(), blurValue: !this.state.blurValue && String(this.props.value).toUpperCase() })
            }
        }
    }

    handleBlur() {
        if (this.state.blurValue) {
            this.setState({ value: this.state.blurValue, blurValue: null })
        }
    }

    handleChange(event) {
        this.setUpdatedValue(event.target.value, event)
    }

    // change RGB values with up/down arrows
    handleKeyDown(event) {
        const value = Number(String(event.target.value).replace(/%/g, ''))
        if (!isNaN(value) && ([UP_KEY_CODE,DOWN_KEY_CODE].includes(event.keyCode))) {
            const updatedValue = event.keyCode === UP_KEY_CODE ? value + 1 : value - 1
            this.setUpdatedValue(updatedValue)
        }
    }

    setUpdatedValue(value) {
        const onChangeValue = this.props.colorFormat ? { [this.props.colorFormat]: value } : value
        this.props.onChange(onChangeValue)
        this.setState({ value })
    }

    render() {
        const styles = reactCSS({
            'default': {
                wrap: {
                    position: 'relative',
                },
            },
        }, this.props.style)

        return (
            <div style={ styles.wrap }>
                <input
                    ref={ input => this.input = input }
                    value={ this.state.value }
                    onKeyDown={ this.handleKeyDown }
                    onChange={ this.handleChange }
                    onBlur={ this.handleBlur }
                />
                <label
                    style={ styles.label }
                    onMouseDown={ this.handleMouseDown }
                >
                    { this.props.colorFormat }
                </label>
            </div>
        )
    }
}

export default ColorEditor;
