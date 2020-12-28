import React, { Component } from 'react';
import HueSpectrum from './Components/HueSpectrum';
import SaturationSpectrum from './Components/SaturationSpectrum';
import DEFAULT_COLOR from "./Components/DefaultColor";
import tinycolor from "tinycolor2";
import RelatedColors from './Components/RelatedColors';
import ColorEditor from "./Components/ColorEditor";
import { toFullColor } from './Components/ColorUtilities'
import { clone } from 'lodash';
import Grid from '@material-ui/core/Grid';
import "./App.css";
import './CSS/title.css'

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

        const mono = clone(baseColor).lighten(40).desaturate(40).toHexString().toUpperCase();
        const triad1 = clone(baseColor).triad()[1].toHexString().toUpperCase();
        const triad2 = clone(baseColor).triad()[2].toHexString().toUpperCase();

        const tetrad1 = clone(baseColor).tetrad()[1].toHexString().toUpperCase();
        const tetrad2 = clone(baseColor).tetrad()[2].toHexString().toUpperCase();
        const tetrad3 = clone(baseColor).tetrad()[3].toHexString().toUpperCase();

        const colorLabel = {
            textAlign: 'center',
            color: '#222',
            paddingTop: '3px',
            paddingBottom: '4px',
            package: '4px',
            textTransform: 'capitalize',
        };
        const colorInput = {
            border: 'none',
            boxShadow: 'inset 0 0 0 1px #ccc',
            width:'65px',
            marginRight: '8px',
            marginLeft: '4px',
            fontFamily: 'Roboto',
            fontWeight: 700,
            fontSize: 'x-large',
        };

        const redInput = {
            colorInput:{
                ...colorInput,
                color:'red',
            },
            colorLabel:{
                ...colorLabel,
                color:'red',
                textTransform: 'upperCase',
            }
        }
        const GreenInput = {
            colorInput:{
                ...colorInput,
                color:'green',
            },
            colorLabel:{
                ...colorLabel,
                color:'green',
                textTransform: 'upperCase',
            }
        }
        const BlueInput = {
            colorInput:{
                ...colorInput,
                color:'blue',
                textTransform: 'upperCase',
            },
            colorLabel:{
                ...colorLabel,
                color:'blue',
                textTransform: 'upperCase',
            }
        }
        const hexInput = {
            colorInput:{
                ...colorInput,
                color:'black',
                textTransform: 'upperCase',
                width:'120px',
            },
            colorLabel:{
                ...colorLabel,
                color:'black',
                textTransform: 'upperCase',
            }
        }
        const HSVInput = {
            colorInput:{
                ...colorInput,
                textTransform: 'upperCase',
            },
            colorLabel:{
                ...colorLabel,
                textTransform: 'upperCase',
            }
        }

        const shadowX = ((tinycolor(this.state.curColor).toHsv().s - .5)*20).toString()+'px';
        const shadowY = ((tinycolor(this.state.curColor).toHsv().v - .5)*20).toString()+'px';

        return (
            <div style={{ 'background':mono }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div className='container' style={{paddingTop:'5px', marginTop:'5px'}}>
                            <h1 className="vectro" style={{ background:"black", paddingLeft:'5px', paddingRight:'20px'
                                , borderRadius: "10px"  }}>
                                <span className="vectro-bar" style={{ '--xPos':shadowX, '--yPos':shadowY, '--color':tetrad1 }}>I</span>
                                <span className="vectro-bar" style={{ '--xPos':shadowX, '--yPos':shadowY,'--color':tetrad2 }}>I</span>
                                <span className="vectro-bar" style={{ '--xPos':shadowX, '--yPos':shadowY,'--color':tetrad3, paddingRight:'20px' }}>I</span>
                                <span className="vectro-body" style={{ '--xPos':shadowX, '--yPos':shadowY,'--color':complement }}>
                                    Coloration
                                </span>
                                <span className="vectro-bar" style={{ '--xPos':shadowX, '--yPos':shadowY,'--color':tetrad1 }}>I</span>
                                <span className="vectro-bar" style={{ '--xPos':shadowX, '--yPos':shadowY,'--color':tetrad2 }}>I</span>
                                <span className="vectro-bar" style={{ '--xPos':shadowX, '--yPos':shadowY,'--color':tetrad3 }}>I</span>
                            </h1>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className='container'>
                            <div style={{ display:'flex', marginLeft:'flex'}} >
                                <div style={{ width:'300px' }}>
                                    <SaturationSpectrum value={ tinycolor(this.state.curColor).toHsv() } onChange={ this.handleChange } />
                                    <div className="colorSwatches" style={{ background: tinycolor(this.state.curColor).toHexString(), width:'300px' }}>
                                        { tinycolor(this.state.curColor).toHexString().toUpperCase() }
                                    </div>
                                </div>
                                <div style={{ }}>
                                    <HueSpectrum value={ tinycolor(this.state.curColor).toHsv() } onChange={ this.handleChange } />
                                </div>
                                <div style={{ display:'flex', padding:'5px', marginTop:'auto', marginBottom:'auto', paddingBottom:'20px' }}>
                                    <div>
                                        <div style={{padding: '5px'}}>
                                            <ColorEditor
                                                colorFormat="hex"
                                                value={ tinycolor(this.state.curColor).toHexString() }
                                                onChange={ this.handleChange }
                                                style={{ colorInput: hexInput.colorInput, colorLabel: hexInput.colorLabel }}
                                            />
                                        </div>
                                        <div style={{padding: '5px'}}>
                                            <ColorEditor
                                                colorFormat="r"
                                                value={ tinycolor(this.state.curColor).toRgb().r }
                                                onChange={ this.handleChange }
                                                style={{ colorInput: redInput.colorInput, colorLabel: redInput.colorLabel }}
                                            />
                                            <ColorEditor
                                                colorFormat="g"
                                                value={ tinycolor(this.state.curColor).toRgb().g }
                                                onChange={ this.handleChange }
                                                style={{ colorInput: GreenInput.colorInput, colorLabel: GreenInput.colorLabel }}
                                            />
                                            <ColorEditor
                                                colorFormat="b"
                                                value={ tinycolor(this.state.curColor).toRgb().b }
                                                onChange={ this.handleChange }
                                                style={{ colorInput: BlueInput.colorInput, colorLabel: BlueInput.colorLabel }}
                                            />
                                        </div>
                                        <div style={{padding: '5px'}}>
                                            <ColorEditor
                                                colorFormat="h"
                                                value={ Math.round(tinycolor(this.state.curColor).toHsv().h) }
                                                onChange={ this.handleChange }
                                                style={{ colorInput: HSVInput.colorInput, colorLabel: HSVInput.colorLabel }}
                                            />
                                            <ColorEditor
                                                colorFormat="s"
                                                value={ Math.round(tinycolor(this.state.curColor).toHsv().s*100)+"%" }
                                                onChange={ this.handleChange }
                                                style={{ colorInput: HSVInput.colorInput, colorLabel: HSVInput.colorLabel }}
                                            />
                                            <ColorEditor
                                                colorFormat="v"
                                                value={ Math.round(tinycolor(this.state.curColor).toHsv().v*100)+"%" }
                                                onChange={ this.handleChange }
                                                style={{ colorInput: HSVInput.colorInput, colorLabel: HSVInput.colorLabel }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className='container'>
                            <div style={{ display:'flex', margin:'auto', width:'750px'}}>
                                <RelatedColors color={ this.state.curColor } />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default ColorPicker;