import React, { Component } from 'react';
import HueSpectrum from './Components/HueSpectrum';
import SaturationSpectrum from './Components/SaturationSpectrum';
import { toStringValue, toHSV, hexToComplimentary, hexToMonochrome } from './Components/ColorUtilities';
import DEFAULT_COLOR from "./Components/DefaultColor";
import tinycolor from "tinycolor2";

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
        let complimentColor = hexToComplimentary(this.state.curColor);
        let mono10 = tinycolor(this.state.curColor).lighten(10).toString();
        let mono20 = tinycolor(this.state.curColor).lighten(20).toString();
        let mono30 = tinycolor(this.state.curColor).lighten(30).toString();

        return (
            <div style={{ 'background':'grey' }}>
                <h1>React Color Picker</h1>
                <SaturationSpectrum value={ toHSV(this.state.curColor) } onChange={ this.handleChange } />
                <HueSpectrum value={ toHSV(this.state.curColor) } onChange={ this.handleChange } />
                //    TODO: Display HSL, RGB, etc
                //    TODO: Allow user to enter Hex
                <h4>Selected Color:</h4>
                <div>
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
                </div>
                <h4>Complimentary Color:</h4>
                <div>
                    <div
                        style={{
                            background: this.state.curColor,
                            width: 100,
                            height: 50,
                            color: 'white',
                            float: 'left',
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
                            marginLeft: 100,
                        }}
                    >
                        { complimentColor }
                    </div>
                </div>
                <h4>Monochromatic Color:</h4>
                <div>
                    <div
                        style={{
                            background: this.state.curColor,
                            width: 100,
                            height: 50,
                            color: 'white',
                            display: 'inline-block',
                        }}
                    >
                        { this.state.curColor }
                    </div>
                    <div
                        style={{
                            background: mono10,
                            width: 100,
                            height: 50,
                            color: 'white',
                            display: 'inline-block',
                        }}
                    >
                        { mono10 }
                    </div>
                    <div
                        style={{
                            background: mono20,
                            width: 100,
                            height: 50,
                            color: 'white',
                            display: 'inline-block',
                        }}
                    >
                        { mono20 }
                    </div>
                    <div
                        style={{
                            background: mono30,
                            width: 100,
                            height: 50,
                            color: 'white',
                            display: 'inline-block',
                        }}
                    >
                        { mono30 }
                    </div>
                </div>
            </div>
            //    TODO: Analogous
            //    TODO: Triadic
            //    TODO: Tetradic

        );
    }
}

export default ColorPicker;
