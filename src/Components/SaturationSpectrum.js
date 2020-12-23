import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { toHSV, fromRatio } from './ColorUtilities';
import throttle from 'lodash/throttle'
import tinycolor from "tinycolor2";
// import * as _ from underscore;

class SaturationSpectrum extends Component {
  constructor(props) {
    super(props)
    this.state = {
      top: 0,
      left: 0,
      pointerX: 0,
      pointerY: 0,
    }

    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeThrottled = throttle(this.handleChange, 25)
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.updateColor = this.updateColor.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.getContainerRenderWindow = this.getContainerRenderWindow.bind(this);
    this.getPointerPosition = this.getPointerPosition.bind(this);
  }

  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    height: PropTypes.number,
    width: PropTypes.number,
    pointerSize: PropTypes.number,
  }

  static defaultProps = {
    // onChange: (),
    value: null,
    height: 300,
    width: 300,
    pointerSize: 7,
  }

  componentWillUnmount() {
    this.throttle.cancel()
    const element = this.getContainerRenderWindow()
    element.removeEventListener('mousemove', this.handleChangeThrottled)
    element.removeEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseDown(event) {
    this.handleChangeThrottled(event)
    const element = this.getContainerRenderWindow()
    element.addEventListener("mousemove", this.handleChangeThrottled)
    element.addEventListener("mouseup", this.handleMouseUp)
  }

  handleChange(event) {
    this.handleMouseMove(event)
    this.updateColor()
    this.hsv.h = null;
    console.log("Sat change",this.hsv)
    this.props.onChange(this.hsv)
  }

  handleMouseMove(event) {
    let bounds = document.getElementById('saturationSquare').getBoundingClientRect()
    this.setState({ pointerX: (event.clientX - bounds.left), pointerY: (event.clientY - bounds.top) });
  }

  updateColor() {
    let curX = Math.max(Math.min(this.state.pointerX, this.props.width),0)
    let curY = Math.max(Math.min(this.state.pointerY, this.props.height),0)
    this.hsv.s = curX / this.props.width;
    this.hsv.v = (this.props.height - curY) / this.props.height;
  }

  handleMouseUp() {
    const element = this.getContainerRenderWindow()
    element.removeEventListener('mousemove', this.handleChangeThrottled)
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
    const { pointerSize,width, height } = this.props;
    const xPos = this.hsv.s * width;
    const yPos = height - (this.hsv.v * height);
    const diff = Math.floor(pointerSize / 2);
    return {
      left: xPos - diff,
      top: yPos - diff,
    };
  }

  render() {
    const { value, pointerSize, height, width } = this.props;
    this.hsv = tinycolor(value).toHsv();
    const spectrumSquareStyle = {
      height: height,
      width: width,
      backgroundColor: tinycolor(this.hsv).toRgbString(),
    };

    const pointerPos = this.getPointerPosition();
    const pointerStyle = {
      width: pointerSize,
      height: pointerSize,
      top: pointerPos.top,
      left: pointerPos.left,
      display: 'block',
    };

    return (
      <div
        className="saturation-spectrum"
        id="saturationSquare"
        style={spectrumSquareStyle}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
      >
        {/* Saturation gradient  */}
        <div className="saturation-white">
          <div className="saturation-black" />
        </div>
        {/* Pointer */}
        <div className="saturation-drag" style={pointerStyle}>
        </div>
      </div>
    );
  }
}

export default SaturationSpectrum;
