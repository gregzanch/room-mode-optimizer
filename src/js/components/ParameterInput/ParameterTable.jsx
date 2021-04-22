import React, { Component } from "react";
import './ParameterTable.css';

class ParameterTable extends Component{
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        return (
            <table className="tableParameterTable">
                <tbody>
                    {this.props.children}
                </tbody>
            </table>
        )
    }

}
export default ParameterTable