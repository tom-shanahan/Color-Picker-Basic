import React, {Component} from 'react';
import PropTypes from 'prop-types';
import tinycolor from "tinycolor2";
import { toHSV } from './ColorUtilities';

class HueSpectrum extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hue: 0,
        }
        this.getPointerPosition = this.getPointerPosition.bind(this);
        this.updateHue = this.updateHue.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.getContainerRenderWindow = this.getContainerRenderWindow.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this)
    }

    static propTypes = {
        onChange: PropTypes.func,
        value: PropTypes.any,
        height: PropTypes.number,
        width: PropTypes.number,
        pointerSize: PropTypes.array,
    }

    static defaultProps = {
        onChange: null,
        value: null,
        height: 300,
        width: 30,
        pointerSize: [4,28],
    }

    componentWillUnmount() {
        const element = this.getContainerRenderWindow()
        element.removeEventListener('mousemove', this.handleChange)
        element.removeEventListener('mouseup', this.handleMouseUp)
    }

    handleMouseDown(event) {
        this.handleChange(event)
        const element = this.getContainerRenderWindow()
        element.addEventListener("mousemove", this.handleChange)
        element.addEventListener("mouseup", this.handleMouseUp)
    }

    handleChange(event) {
        console.log("HUE TRIGGERED")
        const yPos = this.handleMouseMove(event);
        this.updateHue(yPos);
        this.props.onChange(this.hsv)
    }

    handleMouseMove(event) {
        let bounds = document.getElementById('hueBar').getBoundingClientRect()
        return (event.clientY - bounds.top);
    }

    updateHue(yPos) {
        let curY = Math.max(Math.min(yPos, this.props.height),0)
        this.hsv.h = Math.round((curY / this.props.height) * 360);
        const newHsv = {
            ...this.hsv,
        };
        this.setState({
            hue: this.hsv.h,
        });
        this.hsv = newHsv;
    }

    handleMouseUp() {
        const element = this.getContainerRenderWindow()
        element.removeEventListener('mousemove', this.handleChange)
        element.removeEventListener('mouseup', this.handleMouseUp)
    }

    getContainerRenderWindow() {
        const { container } = this
        let renderWindow = window
        while (!renderWindow.document.contains(container) && renderWindow.parent !== renderWindow) {
            renderWindow = renderWindow.parent
        }
        return renderWindow
    }

    getPointerPosition() {
        const { height, pointerSize } = this.props;
        const position = Math.round(this.hsv.h * height / 360);
        const diff = Math.round(pointerSize[0] / 2);
        return position - diff;
    }

    render() {
        const { value, pointerSize, height, width } = this.props;
        const { hue } = this.state;
        this.hsv = tinycolor(value).toHsv();
        // Prevents pointer from returning to top after max hue
        if (hue === 360 && this.hsv.h === 0) {
            this.hsv.h = 360;
        }
        const hueBarStyle = {
            height: height,
            width: width,
        };

        const pointerStyle = {
            height: pointerSize[0],
            width: pointerSize[1],
            top: this.getPointerPosition(),
            display: 'block',
        };

        return (
            <div
                className="hue-spectrum"
                id="hueBar"
                style={hueBarStyle}
                onMouseDown={this.handleMouseDown}
                onMouseMove={this.handleMouseMove}
                onMouseUp={this.handleMouseUp}
            >
                {/*TODO: change pointer class*/}
                <div className="saturation-drag" style={pointerStyle} >
                </div>
            </div>
        );
    }
}

export default HueSpectrum;
