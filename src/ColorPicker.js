import React, { Component } from 'react';
import HueSpectrum from './Components/HueSpectrum';
import SaturationSpectrum from './Components/SaturationSpectrum';
import DEFAULT_COLOR from "./Components/DefaultColor";
import tinycolor from "tinycolor2";
import "./App.css";
import './CSS/title.css'
import RelatedColors from './Components/RelatedColors';
import ColorEditor from "./Components/ColorEditor";
import reactCSS from 'reactcss';
import { toFullColor } from './Components/ColorUtilities'
import { clone } from 'lodash';
import {blue} from "@material-ui/core/colors";


class ColorPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            curColor: DEFAULT_COLOR,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(color) {
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
        const baseColor = toFullColor(this.state.curColor);

        let complement = clone(baseColor).complement().toHexString().toUpperCase();
        let analogArray = tinycolor(this.props.color).analogous();
        let triadArray = tinycolor(this.props.color).triad();
        let tetradArray = tinycolor(this.props.color).tetrad();

        // color2 = tetradArray[1].toHexString().toUpperCase();
        // color3 = tetradArray[2].toHexString().toUpperCase();
        // color4 = tetradArray[3].toHexString().toUpperCase();

        const mono = clone(baseColor).lighten(40).desaturate(40).toHexString().toUpperCase();
        const triad1 = clone(baseColor).triad()[1].toHexString().toUpperCase();
        const triad2 = clone(baseColor).triad()[2].toHexString().toUpperCase();

        const tetrad1 = clone(baseColor).tetrad()[1].toHexString().toUpperCase();
        const tetrad2 = clone(baseColor).tetrad()[2].toHexString().toUpperCase();
        const tetrad3 = clone(baseColor).tetrad()[3].toHexString().toUpperCase();


        const styles = {
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
        }

        return (
            <div style={{ 'background':mono }}>
                <h1 className="vectro">
                    <span className="vectro-body" style={{ '--color':complement }}>
                        Color Picker
                    </span>
                    <span className="vectro-bar bar-one" style={{ '--color':tetrad1 }}>I</span>
                    <span className="vectro-bar bar-two" style={{ '--color':tetrad2 }}>I</span>
                    <span className="vectro-bar bar-three" style={{ '--color':tetrad3 }}>I</span>
                </h1>
                <div className='container'>
                    <div style={{ display:'flex', alignItems:'center', marginLeft:'flex'}} >
                        <div>
                            <SaturationSpectrum value={ tinycolor(this.state.curColor).toHsv() } onChange={ this.handleChange } />
                        </div>
                        <div>
                            <HueSpectrum value={ tinycolor(this.state.curColor).toHsv() } onChange={ this.handleChange } />
                        </div>
                        <div style={ styles.fields }>
                            {/*<div style={{padding: '5px', borderColor: this.state.curColor, borderWidth: '3px', borderStyle: 'solid' }}>*/}
                            <div>
                                <ColorEditor
                                    colorFormat="hex"
                                    value={ tinycolor(this.state.curColor).toHexString() }
                                    onChange={ this.handleChange }
                                    style={{ input: styles.input, label: styles.label }}
                                />
                                <div>
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
                    </div>
                </div>
                <div className='container'>
                    <div className="colorSwatches" style={{ background: tinycolor(this.state.curColor).toHexString(), width:'300px' }}>
                        { tinycolor(this.state.curColor).toHexString().toUpperCase() }
                    </div>
                    <RelatedColors color={ this.state.curColor } />
                </div>
            </div>
        );
    }
}

export default ColorPicker;
