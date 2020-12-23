import React, { Component } from 'react';
import HueSpectrum from './Components/HueSpectrum';
import SaturationSpectrum from './Components/SaturationSpectrum';
import { toHSV } from './Components/ColorUtilities';
import DEFAULT_COLOR from "./Components/DefaultColor";
import tinycolor from "tinycolor2";
import "./App.css";
import RelatedColors from './Components/RelatedColors';
import ColorEditor from "./Components/ColorEditor";
import reactCSS from 'reactcss';

class ColorPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            curColor: DEFAULT_COLOR,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(color) {
        console.log("Main",color);
        console.log("CUR",tinycolor(this.state.curColor).toHsv());
        if (color.r || color.g || color.b) {
            var { r,g,b } = tinycolor(this.state.curColor).toRgb();
            if (color.r || color.r===0) {
                r = color.r
            }
            if (color.g || color.g===0) {
                g = color.g
            }
            if (color.b || color.b===0) {
                b = color.b
            }
            this.setState({
                curColor: tinycolor({ r:r,g:g,b:b }).toHsv(),
            });
        }

        else if (color.h || color.s ||color.v)  {
            var { h,s,v } = tinycolor(this.state.curColor).toHsv();
            console.log("HSV",{ h,s,v });
            if (color.h || color.h===0) {
                h = color.h
            }
            if (color.s || color.s===0) {
                s = color.s
            }
            if (color.v || color.v===0) {
                v = color.v
            }
            this.setState({
                curColor: tinycolor({ h:h,s:s,v:v }).toHsv(),
            });
        }
        else if (color.hex) {
            if (tinycolor(color.hex).isValid()) {
                this.setState({
                    curColor: tinycolor(color.hex).toHsv(),
                });
            }
        }
    }


    render() {
        const styles = reactCSS({
            'default': {
                fields: {
                    display: 'flex',
                    paddingTop: '4px',
                },
                input: {
                    width: '80%',
                    padding: '4px 10% 3px',
                    border: 'none',
                    boxShadow: 'inset 0 0 0 1px #ccc',
                    fontSize: '11px',
                },
                label: {
                    display: 'block',
                    textAlign: 'center',
                    fontSize: '11px',
                    color: '#222',
                    paddingTop: '3px',
                    paddingBottom: '4px',
                    textTransform: 'capitalize',
                },
            },
        })

        return (
            <div style={{ 'background':'lightgray' }}>
                <h1>Color Picker</h1>
                <div style={{display:'flex', alignItems:'center'}} >
                    <div>
                        <SaturationSpectrum value={ toHSV(this.state.curColor) } onChange={ this.handleChange } />
                    </div>
                    <div>
                        <HueSpectrum value={ toHSV(this.state.curColor) } onChange={ this.handleChange } />
                    </div>
                    {/*<div style={{paddingLeft: '10px'}}>*/}
                    {/*    <div style={{padding: '5px', borderColor: this.state.curColor, borderWidth: '3px', borderStyle: 'solid' }}>*/}
                    {/*        <div>Hex value: { this.state.curColor }</div>*/}
                    {/*        <div>HSL value: { tinycolor(this.state.curColor).toHslString().slice(3) }</div>*/}
                    {/*        <div>HSV value: { tinycolor(this.state.curColor).toHsvString().slice(3) }</div>*/}
                    {/*        <div>RGB value: { tinycolor(this.state.curColor).toRgbString().slice(3) }</div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*TODO: Allow user to enter Hex*/}
                    <div style={ styles.fields }>
                        <div style={{padding: '5px', borderColor: this.state.curColor, borderWidth: '3px', borderStyle: 'solid' }}>
                            <ColorEditor
                                colorFormat="hex"
                                value={ tinycolor(this.state.curColor).toHexString() }
                                onChange={ this.handleChange }
                                style={{ input: styles.input, label: styles.label }}
                            />
                            <ColorEditor
                                colorFormat="r"
                                value={ tinycolor(this.state.curColor).toRgb().r }
                                onChange={ this.handleChange }
                                style={{ input: styles.input, label: styles.label }}
                            />
                            <ColorEditor
                                colorFormat="g"
                                value={ tinycolor(this.state.curColor).toRgb().g }
                                onChange={ this.handleChange }
                                style={{ input: styles.input, label: styles.label }}
                            />
                            <ColorEditor
                                colorFormat="b"
                                value={ tinycolor(this.state.curColor).toRgb().b }
                                onChange={ this.handleChange }
                                style={{ input: styles.input, label: styles.label }}
                            />
                        </div>
                    </div>

                </div>
                <div className="colorSwatches" style={{ background: tinycolor(this.state.curColor).toHexString(), width:'300px' }}>
                    { tinycolor(this.state.curColor).toHexString().toUpperCase() }
                </div>
                <RelatedColors color={ this.state.curColor } />
            </div>
        );
    }
}

export default ColorPicker;
