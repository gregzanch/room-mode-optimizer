import React, { Component } from "react";
import PropTypes from 'prop-types';
import d3 from 'd3';


class Line extends Component {
    constructor(props, context) {
        super(props, context);
        this.props = props;
        this.context = context;
    }
  render() {
    let path = d3.svg
      .line()
      .interpolate(this.props.interpolate)
      .x(d => this.context.xScale(d.x))
      .y(d => this.context.yScale(d.y));

    return (
      <path
        d={path(this.props.data)}
        stroke={this.props.color}
        strokeWidth={this.props.width}
        fill="none"
      />
    );
  }
}
Line.defaultProps = {
    interpolate: "linear",
    dotted: false
}
Line.contextTypes = {
    xScale: PropTypes.func,
    yScale: PropTypes.func
}

class LineChart extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    getChildContext() {
        return {
            xScale: this.getXScale(),
            yScale: this.getYScale()
        }
    }

    getXScale() {
        return d3.scale.linear()
            .domain(d3.extent(this.props.data, d => d.x))
            .range([0, this.props.width])
            ;
    }

    getYScale() {
        return d3.scale.linear()
            .domain(d3.extent(this.props.data, d => d.y))
            .range([this.props.height, 0])
            ;
    }

    render() {
        return (
            <svg style={{ width: this.props.width, height: this.props.height }}>
                <Line data={this.props.data} color="cornflowerblue" width="3" interpolate="basis" />
            </svg>
        );
    }
}
LineChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.array
};

LineChart.defaultProps = {
    width: 400,
    height: 200
};

LineChart.childContextTypes = {
    xScale: PropTypes.func,
    yScale: PropTypes.func
};
export default LineChart

//Generate sample data
// var data = [];

// for (var i = 0; i < 100; i++) {
//     data.push({
//         x: i,
//         y: Math.ceil(Math.random() * 100)
//     });
// }
