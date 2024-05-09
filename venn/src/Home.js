
import React, { Fragment, useEffect, useMemo, useState, useLayoutEffect } from "react";
import * as venn from "venn.js";
import * as d3 from "d3";
import 'regenerator-runtime/runtime';
import "bootstrap/dist/css/bootstrap.min.css";

import { Row, Col, Container, Button, Overlay, OverlayTrigger, Popover, PopoverBody, PopoverHeader, ProgressBar} from 'react-bootstrap';
import styled from "styled-components";

const Styles = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');

  @import url('https://fonts.googleapis.com/css?family=Open+Sans:wght@100;300;400;500;700;900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');

  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,100;1,700&display=swap');

  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital,wght@0,300;0,400;0,500;0,600;1,100;1,700&display=swap');


  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;1,100;1,700&display=swap');

  @import url("https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css");

  .lightBubble{
    background: #f7f8f9;
    padding:1em;
    border-radius: .5rem;
    display: flex;

    flex-direction: column;
  min-width:100%;

  }

  p{
    font-weight: 500
  }

  p.large{
    font-size: 22px;
    margin-top:0
  }

  p.small{
    font-size: 12px;
    font-weight: 300;
  }

  .whiteAcross{
    background: white;
    width:100%;
    display: flex;
    justify-content: space-between;
    border-radius: .4em;
    box-shadow: 0px 30px 60px rgba(0, 19, 87, 0.04);
    padding:.6em;
    margin-bottom:1em;
      align-items: center;
  }

  .whiteAcross p{
    color:black
  }

  .upDown{
    display: flex;
    flex-direction: column;

    font-family: 'Roboto', sans-serif;
    border: 1px solid black;
    max-width: 490px;
    margin: 2em auto 0 auto;
    // min-height: 380px;

  max-height: 498px;

  }


  .varianceBubble.positive{
    color:black;
    font-size: 11px;
        border: 2px solid #009c38;
        border-radius: 1rem;
        padding: 0.3em 1em;
        display: flex;
        justify-content: center;
        align-items: center;
        max-height: 30px;
  }

  .varianceBubble.positive i{
    color:#009c38;
    margin-right:3px
  }
  .varianceBubble.negative{
    color:black;
    font-size: 11px;
  border: 2px solid #ff1003;
  border-radius: 1rem;
  padding: 0.3em 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 30px;
  }


  .varianceBubble.negative i{
    color:#ff1003;
    margin-right:3px;
    transform: rotate(180deg);

  }
  .varianceBubble.neutral{
    color:black;
    font-size: 11px;
  border: 2px solid #ffda00;
  border-radius: 1rem;
  padding: 0.3em 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 30px;
  }

  .dots p{
    color:#637087 !important
  }

  .varianceBubble.neutral i{
  display: none

  }

  .upDown.unsetWidth{
      max-width: 100%;
  }

  :-webkit-scrollbar-track {
   border-radius: 0.125rem;
   background-color: lightgray;
   height: 0px;
  }
  ::-webkit-scrollbar {
   width: 0;
   border-radius: 0;
     height: 0px;
  }
  ::-webkit-scrollbar-thumb {


      height: 0px;
  }


  .progress {
      --bs-progress-height: 30px !important;
      --bs-progress-font-size: 0.1rem !important;
      --bs-progress-bg: transparent;
      --bs-progress-border-radius: 2px !important;
      --bs-progress-bar-color: #fff;
      --bs-progress-bar-bg: #6253da !important;
      max-width: 100% !important;
  }
   .progress {
      --bs-progress-height: 36px !important;
      --bs-progress-font-size: 0.1rem !important;
      --bs-progress-bg: #002169 !important;
      --bs-progress-border-radius: 100px !important;
      margin-bottom: 30px;

  }
   .progress-bar {
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      color: blue;
      text-align: center;
      white-space: nowrap;
      border-radius: 100px
  }
  .progress-label {
    color: #14171b;
    font-size: 17px;
      font-weight: 500;
      position: absolute;
      z-index: 999;
      top: 5px;
      left: 13px;

  }

  .progress-label.white {
    color: white;
    font-size: 17px;
      font-weight: 500;
      position: absolute;
      z-index: 999;
      top: 5px;
      left: 13px;

  }

  p{
    color:#14171b !important
  }


  .col-md-12:nth-child(1) .dots p i{
    color: #12d465;
  }


   .col-md-12:nth-child(2) .dots p i{
    color: #ffda00;
  }

  .col-md-12:nth-child(3) .dots p i{
  color: #0066ff;
  }

   .col-md-12:nth-child(4) .dots p i{
    color: #e22bb7;
  }

  .col-md-12:nth-child(5) .dots p i{
   color: #6fd0e9;
  }

  .col-md-12:nth-child(6) .dots p i{
    color: #12d465;
  }


   .col-md-12:nth-child(7) .dots p i{
    color: #ffda00;
  }

  .col-md-12::nth-child(8) .dots p i{
  color: #0066ff;
  }

   .col-md-12:nth-child(9) .dots p i{
    color: #e22bb7;
  }

  .col-md-12:nth-child(10) .dots p i{
   color: #6fd0e9;
  }


  .col-md-3 .progress-bar{
      --bs-progress-bar-bg: #002169 !important;
  }

  .col-md-3 .progress-label{
    color: white !important;
    left: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    right: unset;
    position: relative;
    margin-top: -60px;
  top: unset;

  }

  p.gray{
    color:#637087 !important
  }
#venn{
  background: #f7f8f9;
  display:flex;
  justify-content:center;
      padding:0em 0em 3em 0em;
      width:100%;
}


svg .venn-area.venn-circle:nth-child(1) path{
  fill: #12d465 !important
}


svg .venn-area.venn-circle:nth-child(2) path{
  fill: #ffda00 !important
}

svg .venn-area.venn-circle:nth-child(3) path{
  fill: #0066ff !important
}


svg .venn-area.venn-circle:nth-child(4) path{
  fill: #e22bb7 !important
}

svg .venn-area.venn-circle:nth-child(5) path{
  fill: #6fd0e9 !important
}


svg .venn-area.venn-circle:nth-child(6) path{
  fill: #12d465 !important
}


svg .venn-area.venn-circle:nth-child(7) path{
  fill: #ffda00 !important
}

svg .venn-area.venn-circle:nth-child(8) path{
  fill: #0066ff !important
}


svg .venn-area.venn-circle:nth-child(9) path{
  fill: #e22bb7 !important
}

svg .venn-area.venn-circle:nth-child(10) path{
  fill: #6fd0e9 !important
}

.venn-intersection path{
  fill-opacity: .3 !important;
}



.overlap{
  background:#002169;
  padding: .5em 1em;
border-radius: 1rem;
display: flex;
justify-content: space-between;
align-items: center;
color: white;
margin-bottom: 3em;

}
.overlap p{
  color:white !important
}

.overlap h3{
  color:white !important
}

  `;


export const Home = ({ data, config, queryResponse, details, bodyStyle}) => {


var { investment, chooseLabel, spend, writeTitle, writeTitle2, titleColor,   bodyStyle,   color_title, } = config;


var percentages = data.map((item, i) =>(
    item[spend].value / item[investment].value

))


useEffect(() => {

const myObject = Object.fromEntries(percentages.map((value, index) => [index, value]));


const newObject = Object.fromEntries(
  Object.entries(myObject).map(([key, value], index) => [
    index === 0 ? `key_${index}` : `key_${index}`,
    value
  ])
);

let bigObject = Object.entries(myObject).map(([key, value]) => ({
  sets: [`key_${key}`],
  size: value
}));


bigObject = bigObject.sort()


function generateUniqueCombinations(sets) {
  const combinations = [];
  const seenSets = new Set(); // Track seen sets to avoid duplicates

  function generateCombinationsHelper(currentSet, index) {
    if (currentSet.length > 1 && !seenSets.has(currentSet.join())) { // Check for unique combination
      const intersectionCount = calculateIntersectionCount(currentSet); // Calculate intersection size
      combinations.push({ sets: currentSet.slice(), size: intersectionCount }); // Add unique combination with size
      seenSets.add(currentSet.join()); // Mark combination as seen
    }

    if (index === sets.length) {
      return;
    }

    for (let i = index; i < sets.length; i++) {
      currentSet.push(sets[i]);
      generateCombinationsHelper(currentSet, i + 1); // Recursive call with next element
      currentSet.pop();
    }
  }

  generateCombinationsHelper([], 0);
  return combinations;
}

function calculateIntersectionCount(combination) {
  return bigObject.filter(obj => combination.every(set => obj.sets.includes(set))).length;
}

const allCombinations = generateUniqueCombinations(bigObject.map(obj => obj.sets[0]));

const extendedData = [...bigObject, ...allCombinations];

console.log(extendedData);




// function generateUniqueCombinations(sets) {
//   const combinations = [];
//   const seenSets = new Set(); // Track seen sets to avoid duplicates
//
//   function generateCombinationsHelper(currentSet, index) {
//     if (currentSet.length > 1 && !seenSets.has(currentSet.join())) { // Check for unique combination
//       combinations.push(currentSet.slice()); // Add unique combination (copy)
//       seenSets.add(currentSet.join()); // Mark combination as seen
//     }
//
//     if (index === sets.length) {
//       return;
//     }
//
//     for (let i = index; i < sets.length; i++) {
//       currentSet.push(sets[i]);
//       generateCombinationsHelper(currentSet, i + 1); // Recursive call with next element
//       currentSet.pop();
//     }
//   }
//
//   generateCombinationsHelper([], 0);
//   return combinations;
// }
//
//
//
//
// const allCombinations = generateUniqueCombinations(bigObject.map(obj => obj.sets[0]));
//
// const extendedData = [...bigObject, ...allCombinations.map(set => ({ sets: set, size: 0 }))];



//
//
// var comboData = allCombinations,
// result = comboData.reduce((a, b) => a.filter(c => b.includes(c)));
//
// console.log(result);
//
// console.log(allCombinations);
//
// console.log(extendedData);
//











  const buildVenn = venn.VennDiagram().height(350);
  // build venn diagram
  // const vennChart = d3.select("#venn").datum(sets).call(buildVenn);

const data2 = extendedData;

const vennChart = d3.select("#venn")
.datum(extendedData); // Bind data directly to the selection

buildVenn(vennChart); // Call buildVenn with the data-bound selection


  vennChart
    .selectAll("path")
    .style("fill-opacity", "1")
    .style("mix-blend-mode", "none");

  // remove labels
  d3.select("#venn").selectAll("text").remove();

  let tooltip = d3.select("body").append("div").attr("class", "venntooltip");

  d3.selectAll(".venn-area")
    .on("mouseover", function (d, i) {
      // sort all the areas relative to the current item
      // venn.sortAreas(vennChart, i);
      //
      let node = d3.select(this).transition();
      node
        .select("path")
        .style("fill-opacity", 0.7)
        .style("stroke", "#efefef")
        .style("stroke-width", "2");
    })
    .on("mousemove", function (event, d) {
      // Display a tooltip with the current size
      tooltip.transition().duration(400).style("opacity", "0.9");
      tooltip.text(Math.round(d.size).toFixed(0) + "%");
      tooltip
        .style("position", "absolute")

        .style("left", event.pageX + "px")
        .style("top", event.pageY - 28 + "px");
    })
    .on("mouseout", function (d, i) {
      let node = d3.select(this).transition();
      tooltip.transition().duration(400).style("opacity", "0");
      d3.select(this).transition("tooltip").duration(400);
      node.select("path").style("fill-opacity", 1).style("stroke-width", "0");
      node
        .select("text")
        .style("font-weight", "100")
        .style("font-size", "24px");
    });
}, []);
return (
  <>
  <Styles>

        <div id="vis-wrapper" style={{fontFamily: bodyStyle ? bodyStyle : "'Roboto'"}}>

        <div className="lightBubble" style={{ backgroundColor: color_title ? background[0] : '#f7f8f9'}}>
      <Container fluid>
        <Row>
        <div class="d-flex justify-content-between">
        <p class="white" style={{color: titleColor ? titleColor : '#14171c'}}>{writeTitle === "" ? "Reach Overlap" : writeTitle}</p>

        </div>

        </Row>

        <Row>

            <div
            id="venn"
            config={config}>
            </div>

        </Row>

        <Row>
        <div className="overlap">
        <p className="mb-0">Total Overlap</p>

          <h3 className="mb-0">25.6%</h3>
        </div>

          </Row>


          <Row>
          {data.map((item, i) =>(
            <Col md={12}>

            <div className="d-flex justify-content-between">

            <div className="dots">
            <p><i class="fas fa-circle"></i> {item[chooseLabel].value}</p>

            </div>


            <div className="values">
            <p>
            {item[spend].value / item[investment].value > 0 && item[spend].value / item[investment].value < 1
            ? `${parseFloat(item[spend].value * 1  / item[investment].value  * 1 ).toFixed(2)}%` : `${Math.round(item[spend].value / item[investment].value).toFixed(0).toLocaleString()}%` }

                </p>


            </div>
            </div>

            </Col>
          ))}
          </Row>



        </Container>
        </div>


        </div>



</Styles>
  </>
);
};
