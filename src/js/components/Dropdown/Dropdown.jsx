import React, { Component } from "react";
import './Dropdown.css';


class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            selected: this.props.defaultValue
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.state.selected = e.target.value;
        this.setState({
            selected: e.target.value
        });
        this.props.dropdownChange(this.state.selected, this.props.id);
    }
    render() {
        const options = this.props.options.map(x => {
            return <option key={x} value={x}>{x}</option>;
        });
        return (
            <select onChange = {this.handleChange} value={this.state.selected}>
                {options}
            </select>
        );
    }
}

export default Dropdown;




