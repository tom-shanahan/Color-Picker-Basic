import React, { Component } from 'react';
import tinycolor from "tinycolor2";
import "../App.css"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from "prop-types";

class RelatedColors extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayType: null,
        }
        this.changeDisplay = this.changeDisplay.bind(this);
    }

    static propTypes = {
        color: PropTypes.any,
    }

    static defaultProps = {
        color: null,
    }

    changeDisplay(event) {
        this.setState({
            displayType: event.target.value,
        });
    }

    render() {
        let color0 = null;
        let color1 = null;
        let color2 = null;
        let color3 = null;
        let color4 = null;

        let complementColor = tinycolor(this.props.color).complement();
        let mono10 = tinycolor(this.props.color).lighten(10).toString();
        let mono20 = tinycolor(this.props.color).lighten(20).toString();
        let mono30 = tinycolor(this.props.color).lighten(30).toString();
        let analogArray = tinycolor(this.props.color).analogous();
        let triadArray = tinycolor(this.props.color).triad();
        let tetradArray = tinycolor(this.props.color).tetrad();

        let { color } = this.props;
        let { displayType } = this.state;
        switch (displayType) {
            default:
                color0 = null;
                color1 = null;
                color2 = null;
                color3 = null;
                color4 = null;
                break;
            case 'Complementary Colors:':
                color0 = color;
                color1 = complementColor;
                color2 = null;
                color3 = null;
                color4 = null;
                break;
            case 'Monochromatic Colors:':
                color0 = color;
                color1 = mono10;
                color2 = mono20;
                color3 = mono30;
                color4 = null;
                break;
            case 'Analogous Colors:':
                color0 = color;
                color1 = analogArray[1].toHexString();
                color2 = analogArray[2].toHexString();
                color3 = analogArray[4].toHexString();
                color4 = analogArray[5].toHexString();
                break;
            case 'Triadic Colors:':
                color0 = color;
                color1 = triadArray[1].toHexString();
                color2 = triadArray[2].toHexString();
                color3 = null;
                color4 = null;
                break;
            case 'Tetradic Colors:':
                color0 = color;
                color1 = tetradArray[0].toHexString();
                color2 = tetradArray[1].toHexString();
                color3 = tetradArray[2].toHexString();
                color4 = null;
                break;
        }

        return (
            <div>
                <div>
                    <FormControl>
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                            Color Type
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-placeholder-label-label"
                            id="demo-simple-select-placeholder-label"
                            value= ""
                            onClick={ this.changeDisplay }
                            displayEmpty
                            // className={classes.selectEmpty}
                        >
                            <MenuItem value="" disabled><em>Choose a Color Scheme!</em></MenuItem>
                            <MenuItem value={ 'Complementary Colors:' }>Complementary Colors</MenuItem>
                            <MenuItem value={ 'Monochromatic Colors:' }>Monochromatic Colors</MenuItem>
                            <MenuItem value={ 'Analogous Colors:' }>Analogous Colors</MenuItem>
                            <MenuItem value={ 'Triadic Colors:' }>Triadic Colors</MenuItem>
                            <MenuItem value={ 'Tetradic Colors:' }>Tetradic Colors</MenuItem>
                        </Select>
                        <FormHelperText>Select a Color Scheme</FormHelperText>
                    </FormControl>
                </div>

                <div>
                    <h4>{displayType}</h4>
                    {(color0 !== null) &&
                    <div className="colorSwatches" style={{background: color0}}>
                        {color0}
                        </div>
                    }
                    {(color1 !== null) &&
                    <div className="colorSwatches" style={{background: color1}}>
                        {color1}
                    </div>
                    }
                    {(color2 !== null) &&
                    <div className="colorSwatches" style={{background: color2}}>
                        {color2}
                    </div>
                    }
                    {(color3 !== null) &&
                    <div className="colorSwatches" style={{background: color3}}>
                        {color3}
                    </div>
                    }
                    {(color4 !== null) &&
                    <div className="colorSwatches" style={{background: color4}}>
                        {color4}
                    </div>
                    }
                </div>
            </div>
        );
    }
}

export default RelatedColors;
