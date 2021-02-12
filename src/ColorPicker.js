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
import {Box, Container} from "@material-ui/core";

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

        const shadowX = ((tinycolor(this.state.curColor).toHsv().s - .5)*100).toString()+'px';
        const shadowY = ((tinycolor(this.state.curColor).toHsv().v - .5)*100).toString()+'px';

        const SatSpecWd = Math.min((document.documentElement.clientWidth*.4),300)
        const SatSpecHt = Math.min((document.documentElement.clientHeight*.4),300)

        const HexWd = Math.min((document.documentElement.clientWidth*.18),120)

        return (
            <Box style={{ 'background':'slategrey', minHeight: '100vh',minWidth: '100vw',paddingBottom:'10vh' }}>
                <Grid container className='grid-container'>
                    <Grid item xs={12} className='grid-element'>
                        <div className='container' style={{ paddingTop:'5px', marginTop:'5px' }}>
                            <h1 className="vectro" >
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

                    <Grid item className='grid-element'>
                        <div className='sat-hue-element'>
                            <div>
                                <SaturationSpectrum value={ tinycolor(this.state.curColor).toHsv() } height = {SatSpecWd} width={SatSpecWd} onChange={ this.handleChange } />
                                <HueSpectrum value={tinycolor(this.state.curColor).toHsv()} onChange={this.handleChange} height={SatSpecWd} width={SatSpecWd/5} />
                            </div>
                            <div>
                                <div className="colorSwatches" style={{ background: tinycolor(this.state.curColor).toHexString(), width:SatSpecWd, height:SatSpecWd/5 }}>
                                    { tinycolor(this.state.curColor).toHexString().toUpperCase() }
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item className='grid-element'>
                        <div style={{ display:'flex', padding:'5px', marginTop:'auto', marginBottom:'auto', paddingBottom:'20px' }}>
                            <div>
                                <div className='input-group'>
                                    <ColorEditor
                                        colorFormat="hex"
                                        value={ tinycolor(this.state.curColor).toHexString() }
                                        onChange={ this.handleChange }
                                        style={{ width:HexWd }}
                                    />
                                </div>
                                <div className='input-group'>
                                    <ColorEditor
                                        colorFormat="r"
                                        value={ tinycolor(this.state.curColor).toRgb().r }
                                        onChange={ this.handleChange }
                                        style={{ color:'red' }}
                                    />
                                    <ColorEditor
                                        colorFormat="g"
                                        value={ tinycolor(this.state.curColor).toRgb().g }
                                        onChange={ this.handleChange }
                                        style={{ color:'green' }}
                                    />
                                    <ColorEditor
                                        colorFormat="b"
                                        value={ tinycolor(this.state.curColor).toRgb().b }
                                        onChange={ this.handleChange }
                                        style={{ color:'blue' }}
                                    />
                                </div>
                                <div className='input-group'>
                                    <ColorEditor
                                        colorFormat="h"
                                        value={ Math.round(tinycolor(this.state.curColor).toHsv().h) }
                                        onChange={ this.handleChange }
                                    />
                                    <ColorEditor
                                        colorFormat="s"
                                        value={ Math.round(tinycolor(this.state.curColor).toHsv().s*100)+"%" }
                                        onChange={ this.handleChange }
                                    />
                                    <ColorEditor
                                        colorFormat="v"
                                        value={ Math.round(tinycolor(this.state.curColor).toHsv().v*100)+"%" }
                                        onChange={ this.handleChange }
                                    />
                                </div>
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={12} className='grid-element'>
                        <div className='sat-hue-element' style={{ display:'flex' }}>
                            <RelatedColors color={ this.state.curColor } />
                        </div>
                    </Grid>
                </Grid>
                <div className='signature container'>
                    <div>Made by Tom Shanahan using React</div>
                </div>
            </Box>
        );
    }
}

export default ColorPicker;
