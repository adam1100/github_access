import React, { Component } from 'react';
import * as d3 from "d3";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array"
import  XAxis  from "./XAxis";
import YAxis  from "./YAxis";

function RandomData() {
  const data = [...Array(100)].map((e, i) => {
    return {
      x: Math.random() * 40,
      y: Math.random() * 40,
      temparature: Math.random() * 500
    };
  });
  return data;
}

const Graph = (props) => {
  console.log(props.data);
  const data = props.data,
    w = 600,
    h = 600,
    margin = {
      top: 40,
      bottom: 40,
      left: 40,
      right: 40
    };

  const width = w - margin.right - margin.left,
    height = h - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain(extent(data, d => d.commits))
    .range([0, width]);

  const yScale = scaleLinear()
    .domain(extent(data, d => d.contributors))
    .range([height, 0]);

  const circles = data.map((d, i) => (
    <circle
      key={i}
      r={10}
      cx={xScale(d.commits)}
      cy={yScale(d.contributors)}
      style={{ fill: "lightblue" }}
      onMouseOver={(console.log("here"))} 
      onMouseOut={console.log("gone")}
    />
  ));

  return (
    <div>
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <YAxis yScale={yScale} width={width} />
          <XAxis xScale={xScale} height={height} />
          {circles}
        </g>
      </svg>
    </div>
  );
}


export default Graph;