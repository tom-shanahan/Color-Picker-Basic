import React, { Component } from 'react';
import HueSpectrum from './Components/HueSpectrum';
import SaturationSpectrum from './Components/SaturationSpectrum';
import { toStringValue, toHSV, hexToComplimentary } from './Components/ColorUtilities';
import DEFAULT_COLOR from "./Components/DefaultColor";

class ColorPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            curColor: DEFAULT_COLOR,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(hsv) {
        this.setState({
            curColor: toStringValue(hsv),
        });
    }

    render() {
        let complimentColor = hexToComplimentary(this.state.curColor)
        return (
            <div style={{ 'background':'grey' }}>
                <h1>React Color Picker</h1>
                <SaturationSpectrum value={ toHSV(this.state.curColor) } onChange={ this.handleChange } />
                <HueSpectrum value={ toHSV(this.state.curColor) } onChange={ this.handleChange } />
                <div
                    style={{
                        background: this.state.curColor,
                        width: 100,
                        height: 50,
                        color: 'white',
                    }}
                >
                    { this.state.curColor }
                </div>
                <div
                    style={{
                        background: complimentColor,
                        width: 100,
                        height: 50,
                        color: 'white',
                    }}
                >
                    { complimentColor }
                </div>
            </div>
        );
    }
}

export default ColorPicker;
