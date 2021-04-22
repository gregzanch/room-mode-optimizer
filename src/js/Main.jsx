import React, { Component } from "react";
import ReactDOM from "react-dom";
import Header from './components/Header/Header.jsx';
import ParameterInput from './components/ParameterInput/ParameterInput.jsx';
import ResultTable from './components/ResultTable/ResultTable.jsx';
import Dropdown from './components/Dropdown/Dropdown.jsx';
import ModeChart from "./components/Charts/ModeChart.jsx";
import BonelloChart from './components/Charts/BonelloChart.jsx';
import ParameterTable from "./components/ParameterInput/ParameterTable.jsx";
import ParameterRow from "./components/ParameterInput/ParameterRow.jsx";
import AC from 'functional-acoustics';
import sort from "fast-sort";
import uniqBy from './utils/uniqBy';

import './Main.css';


class Main extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.parameterInputChange = this.parameterInputChange.bind(this);
        //this.calculateModes = this.calculateModes.bind(this);
        this.dropdownChange = this.dropdownChange.bind(this);
      this.updateModes = this.updateModes.bind(this);
      this.rowclicked = this.rowclicked.bind(this);
        this.state = {
          length: this.props.length,
          width: this.props.width,
          height: this.props.height,
          freq: this.props.freq,
          stepsize: this.props.stepsize,
          stdSchema: this.props.stdSchema,
          overlap: this.props.overlap,
          result: [],
          selectedRow: 0,
          modeData: {},
          bonelloData: []
        };
      const initialModes = this.calculateModes();
      this.state.result = initialModes;
      this.state.modeData = {
        rowData: initialModes[0].modes.map(item => {
          return { x: item.frequency, y: item.modeTypeNumber };
        }),
        freqRange: this.props.freq
      };
      this.state.bonelloData = initialModes[0].bonello;
    }
    componentDidMount() {
      window.AC = AC;
    }
    parameterInputChange(val, id) {
        console.log(id);
        if (typeof val === "object") {
            val = val.map(x => Number(x));
        }
        else {
            val = Number(val);
        }
        this.state[id] = val;
        this.setState(this.state);
    }
    dropdownChange(val, id) {
       // console.log(val, id);
        this.state[id] = val;
        this.setState(this.state);
    }
    rowclicked(index) {
      let opt = this.state.result[index];
      let modeData = opt.modes.map(item => { return { x: item.frequency, y: item.modeTypeNumber } });
      // console.log(modes);
      this.state.modeData = {
        rowData: modeData,
        freqRange: this.state.freq
      };
      this.state.bonelloData = opt.bonello;
      this.state.selectedRow = index;
      this.setState(this.state);
    }
    calculateModes() {
        let options = [],
            L = this.state.length.map(x => Number(x)),
            W = this.state.width.map(x => Number(x)),
            H = this.state.height.map(x => Number(x)),
            stepsize = Number(this.state.stepsize);

        if (L[0] > L[1]) {
            throw "error: minimum length > maximum length... not possible";
            return
        }
        if (W[0] > W[1]) {
            throw "error: minimum width > maximum width... not possible";
            return
        }
        if (H[0] > H[1]) {
            throw "error: minimum height > maximum height... not possible";
            return 
        }
        if (this.state.freq[0] > this.state.freq[1]) {
            throw "error: minimum frequency > maximum frequency... not possible";
            return 
        }

        let c = AC.Properties.Air.SpeedOfSound({
            temp: {
                value: 70,
                units: "F"
            },
            units: "ft/s"
        });


        for (let h = H[0]; h <= H[1]; h += stepsize) {
            for (let w = W[0]; w <= W[1]; w += stepsize) {
              for (let l = L[0]; l <= L[1]; l += stepsize) {
                options.push(
                  AC.Modes.calcModes({
                    c: c,
                    dim: [l, w, h],
                    units: "ft",
                    freq: this.state.freq,
                    stdSchema: this.state.stdSchema,
                    overlap: this.state.overlap
                  })
                );
              }
            }
        }
      

      options = sort(uniqBy(x => x.score, options)).asc(x => x.score);
        console.log(options);
        return options;
    }
    updateModes() {
      const newModes = this.calculateModes();
      this.state.result = newModes;
      this.state.selectedRow = 0;
      this.state.modeData = {
        rowData: newModes[0].modes.map(item => {
          return { x: item.frequency, y: item.modeTypeNumber };
        }),
        freqRange: this.state.freq
      };
      this.state.bonelloData = newModes[0].bonello;
        window.results = this.state.result;
        this.setState(this.state);
        
    }
    render() {
      const bonelloHeight = 280;
      const bonelloWidth = 400;
      const modeHeight = 150;

      return (
        <div className="grid-container">
          <div className="header">
            <Header>Room Mode Optimizer</Header>
          </div>
          <div className="paramA">
            <ParameterTable>
              <tr className="min-max-label-row">
                <td> </td>
                <td className="mix-max-label">min</td>
                <td className="mix-max-label">max</td>
              </tr>
              <ParameterRow
                type="limit"
                id="length"
                label="Length"
                step={0.25}
                parameterInputChange={this.parameterInputChange}
                defaultValue={this.props.length}
              />
              <ParameterRow
                type="limit"
                id="width"
                label="Width"
                step={0.25}
                parameterInputChange={this.parameterInputChange}
                defaultValue={this.props.width}
              />

              <ParameterRow
                type="limit"
                id="height"
                label="Height"
                step={0.25}
                parameterInputChange={this.parameterInputChange}
                defaultValue={this.props.height}
              />

              <ParameterRow
                type="limit"
                id="freq"
                label="Frequency"
                step={20}
                parameterInputChange={this.parameterInputChange}
                defaultValue={this.props.freq}
              />

              <ParameterRow
                type="value"
                id="stepsize"
                label="Step Size"
                step={0.25}
                parameterInputChange={this.parameterInputChange}
                defaultValue={this.props.stepsize}
              />
            </ParameterTable>
          </div>
          <div className="paramB">
            <Dropdown
              id="stdSchema"
              dropdownChange={this.dropdownChange}
              options={["biased", "unbiased", "uncorrected"]}
              defaultValue={this.props.stdSchema}
            />
            <Dropdown
              id="overlap"
              dropdownChange={this.dropdownChange}
              options={["+overlap", "*overlap", "no overlap"]}
              defaultValue={this.props.overlap}
            />
            <input
              type="button"
              onClick={this.updateModes}
              value="Calculate"
            />
          </div>
          <div className="modes" style={{ maxHeight: modeHeight }}>
            <ModeChart
              margin={{
                top: 5,
                right: 25,
                bottom: 25,
                left: 65
              }}
              freqRange={this.state.modeData.freqRange}
              height={modeHeight}
              width={(window.innerWidth / 3) * 2 - 50}
              data={this.state.modeData.rowData}
            />
          </div>
          <div className="bonello" style={{ maxHeight: bonelloHeight }}>
            <BonelloChart
              data={this.state.bonelloData}
              width={bonelloWidth}
              height={bonelloHeight}
            />
          </div>
          <div className="result">
            <ResultTable
              data={this.state.result}
              rowclicked={this.rowclicked}
              selectedRow={this.state.selectedRow}
            />
          </div>
        </div>
      );
    }
}

export default Main
ReactDOM.render(<Main 
    length={[18, 20]}
    width={[13, 20]}
    height={[9, 10]}
    freq={[20, 200]}
    stepsize={1}
    stdSchema="biased"
    overlap={"*overlap"}
/>, document.getElementById('main'));