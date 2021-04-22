import React, { Component } from "react";
const d3 = require('d3');
import './ModeChart.css';



class ModeChart extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        
    }

    drawModeChart(action) {
        let margin = this.props.margin || {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50
        };
        let width =
            this.props.width || window.innerWidth*2/3;
        let height =
            this.props.height || 150;
        width =width - margin.left - margin.right;
        height =height - margin.top - margin.bottom;

        let freqRange = this.props.freqRange || [20, 200];

        let svg = d3
            .select("#modechart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        
        
        const modeType = (modeTypeNumber) => ['', 'Oblique', 'Tangential', 'Axial'][modeTypeNumber];

        let xScale = d3.scaleLinear().domain(freqRange).range([0, width]);
        let yScale = d3.scaleLinear().domain([0, 3]).range([height, 0]);
        
        var xAxis = d3.axisBottom(xScale).ticks(10);
        let yAxis = d3.axisLeft(yScale).ticks(4).tickFormat((x, i) => modeType(x));


        
        let zoom = d3.zoom()
            .scaleExtent([1,32])
            .translateExtent([[0, 0], [width, height]])
            .extent([[0, 0], [width, height]])
            .on("zoom", zoomed);
        

        
        if (action === "update") d3.select("#modechart").select('svg').remove();

        
        svg.call(zoom)

        let modeData =
            this.props.data || [
                { x: 75, y: 1 },
                { x: 91, y: 2 },
            ];
    //    console.log(modeData);

        let modeLines = svg.append('g').attr('class', 'modeLines');
        var view = modeLines
          .append("rect")
          .attr("class", "view")
          .attr("x", 0.5)
          .attr("y", 0.5)
          .attr("width", width - 1)
          .attr("height", height - 1);
        modeData.forEach(pt => {
            modeLines
              .append("line")
              .attr("x1", xScale(pt.x))
              .attr("y1", yScale(0))
              .attr("x2", xScale(pt.x))
              .attr("y2", yScale(pt.y))
              .attr("class", `line line${pt.y}`);
        });

        let fakeclip = svg.append('g');
        fakeclip
            .append("rect")
            .attr("x", -margin.left)
            .attr("y", 0)
            .attr("width", margin.left)
            .attr("height", height)
            .attr('class', 'fakeclip');
        fakeclip
            .append("rect")
            .attr("x", width)
            .attr("y", 0)
            .attr("width", margin.right)
            .attr("height", height)
            .attr('class', 'fakeclip');

        var gX = svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        var gY = svg.append("g")
            .attr("class", "y axis")
            .call(yAxis); 
        

        function zoomed() {
            modeLines._groups[0][0].setAttribute('transform', `
                                translate(${d3.event.transform.x},0.0)
                                scale(${d3.event.transform.k},1.0)`)
            gX.call(
                xAxis.scale(
                    d3.event.transform.rescaleX(
                        xScale
                    )
                )
            );
        }


    }
    componentDidMount() {
        this.drawModeChart("init");
        document.getElementById("modechart").addEventListener('scroll', e => {
            e.preventDefault();
        })
        document.getElementById("modechart").addEventListener('wheel', e => {
          //  e.preventDefault();
        }, {
                passive: true
            })
    }
    componentDidUpdate() {
        this.drawModeChart("update");
    }
    render() {
        return (
            <span id="modechart"></span>
        );
    }
}

export default ModeChart



