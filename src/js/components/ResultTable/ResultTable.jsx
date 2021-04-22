import React, { Component } from "react";
import './ResultTable.css';


class ResultTable extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.headerKeys = this.props.headerKeys || [
            // { key: "n", text: "#"},
            { key: "L", text: "L" },
            { key: "W", text: "W" },
            { key: "H", text: "H" },
        ];
        this.state = {
            cols: this.headerKeys,
            selectedRow: this.props.selectedRow
        };
        this.handleClick = this.handleClick.bind(this);
        
    }
    handleClick(e) {
      //  let opt = this.props.data[Number(e.target.getAttribute('index'))];
       // let modes = opt.modes.map(item => { return { x: item.frequency, y: item.modeTypeNumber } });
        let index = Number(e.target.getAttribute("index"))
        this.props.rowclicked(index);
        this.state.selectedRow = index;
        this.setState(this.state);
    }
    render() {

        const cols = this.state.cols.map((col) => {
            return <th className="thResultTable" key={col.key}>{col.text}</th>
        });
        
        const rows = this.props.data.map((res, index) => {
            let class_name = "trResultTableBody";
            if (index == this.state.selectedRow) {
                class_name = "trResultTableBody-selected";
            }
            res.n = index + 1;
            return (
                <tr
                    className={class_name}
                    key={"option" + String(index)}
                    id={"option-" + String(index)}
                    onClick={this.handleClick} >
                    {
                        this.state.cols.map((col) => {
                            const cls = col.key === "n" ? "tdResultTableNumber" : "tdResultTable"
                            return <td
                                className={cls}
                                key={col.key + String(index)}
                                index={index}>
                                {res[col.key]}
                            </td>
                        })
                    }
                </tr>
            );  
        })


        const head = (
            <thead>
                <tr className="trResultTable">
                    {cols}
                </tr>
            </thead>
        );

        const body = (
            <tbody>
                {rows}
            </tbody>
        );

        return (
            <table
                className="tableResultTable"
                style={{ width: this.props.width || '100%' }}>
                {head}
                {body}
            </table>
        );
    }
}

export default ResultTable;