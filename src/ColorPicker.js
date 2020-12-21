import React, { Component } from 'react';
import HueSpectrum from './Components/HueSpectrum';
import SaturationSpectrum from './Components/SaturationSpectrum';
import { toStringValue, toHSV, hexToComplimentary, } from './Components/ColorUtilities';
import DEFAULT_COLOR from "./Components/DefaultColor";
import tinycolor from "tinycolor2";
import "./App.css";
import RelatedColors from './Components/RelatedColors';
import ColorEditor from "./Components/ColorEditor";

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

    handleSubmit(event) {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div style={{ 'background':'lightgray' }}>
                <h1>Color Picker</h1>
                <div style={{display:'flex', alignItems:'center'}} >
                    <SaturationSpectrum value={ toHSV(this.state.curColor) } onChange={ this.handleChange } />
                    <HueSpectrum value={ toHSV(this.state.curColor) } onChange={ this.handleChange } />
                    <div style={{paddingLeft: '10px'}}>
                        <div style={{padding: '5px', borderColor: this.state.curColor, borderWidth: '3px', borderStyle: 'solid' }}>
                            <div>Hex value: { this.state.curColor }</div>
                            <div>HSL value: { tinycolor(this.state.curColor).toHslString().slice(3) }</div>
                            <div>HSV value: { tinycolor(this.state.curColor).toHsvString().slice(3) }</div>
                            <div>RGB value: { tinycolor(this.state.curColor).toRgbString().slice(3) }</div>
                        </div>
                    </div>


                    {/*TODO: Allow user to enter Hex*/}
                    <ColorEditor
                        // style={{ wrap: styles.HEXwrap, input: styles.HEXinput, label: styles.HEXlabel }}
                        // label="hex"
                        // value={ hex }
                        value={ this.state.curColor }
                        onChange={ this.handleChange }
                    />

                </div>
                <div className="colorSwatches" style={{background: this.state.curColor, width:'300px'}}>
                    { this.state.curColor }
                </div>
                <RelatedColors color={this.state.curColor} />
            </div>
        );
    }
}

export default ColorPicker;
