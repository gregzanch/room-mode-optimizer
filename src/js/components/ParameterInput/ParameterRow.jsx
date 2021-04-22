import React, { Component } from "react";
import './ParameterTable.css'

class ParameterRow extends Component {
    constructor(props) {
        super(props);
        let val = this.props.defaultValue;
        if (this.props.type === "limit") {
            val = val.map(x => parseFloat(x));
        }
        else val = parseFloat(val);
        this.state = {
            value: val,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        
        // e.target.value = parseFloat(e.target.value);
        switch (e.target.id.split('-')[1]) {
            case "min":
                this.state.value[0] = parseFloat(parseFloat(e.target.value).toFixed(2));
                this.setState(this.state);
                break;
            case "max":
                this.state.value[1] = parseFloat(parseFloat(e.target.value).toFixed(2));
                this.setState(this.state);
                break;
            case "val":
                this.state.value = parseFloat(parseFloat(e.target.value).toFixed(2));
                this.setState(this.state);
                break;
            default:
                break;
        }
        console.log(this.state.value)
        this.props.parameterInputChange(this.state.value, this.props.id);
    }
    render() {
        if (this.props.type === "limit") {
            return (
              <tr>
                <td className="ParameterRowLabel">
                  {this.props.label}
                </td>
                <td className="ParameterRow">
                  <input
                    className="inputParameterInputdouble"
                    id={this.props.id + "-min"}
                    type="number"
                    step={this.props.step}
                    onChange={this.handleChange}
                    value={this.state.value[0]}
                  />
                </td>
                <td className="ParameterRow">
                  <input
                    className="inputParameterInputdouble"
                    id={this.props.id + "-max"}
                    type="number"
                    step={this.props.step}
                    onChange={this.handleChange}
                    value={this.state.value[1]}
                  />
                </td>
              </tr>
            );
        }
        else {
            return (
              <tr>
                <td className="ParameterRowLabel">
                  {this.props.label}
                </td>
                <td className="ParameterRow">
                  <input
                    className="inputParameterInputsingle"
                    id={this.props.id + "-val"}
                    type="number"
                    step={this.props.step}
                    onChange={this.handleChange}
                    value={this.state.value}
                  />
                </td>
              </tr>
            );
        }

    }
}
export default ParameterRow;
