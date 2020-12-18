import React, { Component } from 'react';
import * as d3 from "d3";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array"
import XAxis from "./XAxis";
import YAxis from "./YAxis";

const Graph = (props) => {
  console.log(props.data);
  const data = props.data,
    w = 1200,
    h = 800,
    margin = {
      top: 40,
      bottom: 40,
      left: 100,
      right: 40
    };

  const width = w - margin.right - margin.left,
    height = h - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain(extent(data, d => d.commits))
    .range([10, width])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, d => d.contributors))
    .range([height, 10])
    .nice();

  const circles = data.map((d, i) => (
    <svg>
      <g>
        <circle
          key={i}
          r={4}
          cx={xScale(d.commits)}
          cy={yScale(d.contributors)}
          style={{ fill: "blue", opacity: 0.25 }}
          title={"Hi"}
        />
        <text
          x={xScale(d.commits) + 10}
          y={yScale(d.contributors) + 10}
          style={{ fontSize: 10 }}

          dy=".3em"> {d.repoName}
        </text>
      </g>
    </svg>
  ));

  const svg1 = d3.selectAll(circles)

  return (
    <div>
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <text
            x={(width / 2) - margin.bottom}
            y={h - margin.bottom}
          >
            Commits</text>
          <text
            x={-margin.left}
            y={h / 2}
          >
            Contributors</text>

          <YAxis yScale={yScale} width={width} />
          <XAxis xScale={xScale} height={height} />
          {svg1}
          <div id="my_dataviz"> </div>
        </g>
      </svg>
      {/* {circles} */}
      {/*       <div className = "XAxis">Commits</div>
      <div className = "YAxis">Contributors</div> */}
    </div>

  );
}

export default Graph;