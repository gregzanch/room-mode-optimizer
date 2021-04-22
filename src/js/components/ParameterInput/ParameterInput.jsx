import React, { Component } from "react";
import "./ParameterInput.css";


class ParameterInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value: this.props.defaultValue,
    };
    this.handleChange = this.handleChange.bind(this);
  }

    handleChange(e) {
      
      switch (e.target.id.split('-')[1]) {
          case "min":
              this.state.value[0] = e.target.value;
              this.setState(this.state);
              break;
          case "max":
              this.state.value[1] = e.target.value;
              this.setState(this.state);
              break;
          case "val":
              this.state.value = e.target.value;
              this.setState(this.state);  
              break;
          default:
              break;
      }
      
    this.props.parameterInputChange(this.state.value, this.props.id);
  }
    render() {
    if (this.props.type === "limit") {
        return (
            <span>
                {this.props.label}
                <input
                    className="inputParameterInput"
                    id={this.props.id + "-min"}
                    type="number"
                    onChange={this.handleChange}
                    value={this.state.value[0]}
                />
                <input
                    className="inputParameterInput"
                    id={this.props.id + "-max"}
                    type="number"
                    onChange={this.handleChange}
                    value={this.state.value[1]}
                />
            </span>
        );
    }
    else {
        return (
            <span>
                {this.props.label}
                <input
                    className="inputParameterInput"
                    id={this.props.id + "-val"}
                    type="number"
                    onChange={this.handleChange}
                    value={this.state.value}
                />
            </span>
        );
        }

  }
}

export default ParameterInput;
