import React, { Component } from "react";
const d3 = require("d3");
import "./BonelloChart.css"

class BonelloChart extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    reDraw(action) {
        let data = this.props.data;
        let margin = this.props.margin || {
            top: 50,
            right: 50,
            bottom: 50,
            left: 100
        };
        let width = this.props.width || 300;
        let height = this.props.height || 300;
        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;
        if (action === "update") d3.select("#bonelloChart").select('svg').remove();
        let svg = d3
            .select("#bonelloChart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);
        let g = svg.append("g")
          .attr(
            "transform",
            "translate(" + margin.left + "," + margin.top + ")"
        );

        let x = d3.scaleBand()
            .rangeRound([0, width])
            .padding(0.05);

        let y = d3.scaleLinear()
            .rangeRound([height, 0]);
        
        var xAxis = d3.axisBottom(x);
        let yAxis = d3.axisLeft(y).ticks(5);
        
        
        x.domain(data.map(x => x.band));
        y.domain([0, d3.max(data, x => x.count)]);

        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr('font-size', '12')
            .attr("fill", "#000")
            .attr("y", margin.bottom / 2 + 10)
            .attr("dy", "0.0em")
            .attr("x", width / 2)
            .attr("text-anchor", "middle")
            .text("Band (3rd Octave)");
        
        g.append("g")
            .append("text")
            .attr('font-size', '12')
            .attr("fill", "#000")
            .attr("y", - margin.top / 2 + 5)
            .attr("dy", "0.0em")
            .attr("x", width / 2)
            .attr("text-anchor", "middle")
            .text("Bonello Distribution");

        g.append("g")
          .call(yAxis)
          .append("text")
          .attr("font-size", "12")
          .attr("fill", "#000")
          // .attr("transform", "rotate(-90)")
          // .attr("y", -margin.left / 2 - 5)
          // .attr("dy", "0.0em")
          .attr("y", height / 2)
            .attr("x", 0)
            .attr("dx",-margin.left/3)
          .attr("text-anchor", "end")
          .text("Mode Count");

        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", u => x(u.band))
            .attr("y", u => y(u.count))
            .attr("width", x.bandwidth())
            .attr("height", u => height - y(u.count));
        
        g.selectAll(".barText")
            .data(data)
            .enter()
            .append("text")
            .attr('font-size', '10')
            .attr("fill", "#000")
            .attr("x", u => x(u.band) + x.bandwidth() / 2)
            .attr("y", u => y(u.count)-5)
            .attr("height", u => height - y(u.count))
            .attr("text-anchor", "middle")
            .text(u => String(u.count));
        
    }
    componentDidMount() {
        this.reDraw("init");
    }
    componentDidUpdate() {
        this.reDraw("update");
    }
    render() {
        return (
            <span id="bonelloChart"></span>
        );
    }
}

export default BonelloChart;