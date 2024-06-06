
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




   .dots p:nth-child(1) i{
    color: #12d465;
  }





  .dots p:nth-child(2) i{
    color: #ffda00;
 }



  .dots p:nth-child(3) i{
    color: #0066ff;
 }



    .dots p:nth-child(4) i{
    color: #e22bb7;
   }



  .dots p:nth-child(5) i{
   color: #6fd0e9;
 }



    .dots p:nth-child(6) i{
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
  background: white;
  display:flex;
  justify-content:center;
      padding:0em 0em 3em 0em;
      width:100%;
}



#venn .venn-area.venn-circle.secondary-class:nth-child(1) path{
    fill: #12d465 !important
}

#venn .venn-area.venn-circle.secondary-class:nth-child(2) path{
    fill: #ffda00 !important
}

#venn .venn-area.venn-circle.secondary-class:nth-child(4) path{
    fill: #0066ff !important
}

#venn .venn-area.venn-circle.secondary-class:nth-child(3) path,
[data-venn-sets="Programmatic"]{
  fill: #0066ff !important
}


.secondary-class:nth-child(5) path{
fill: #6fd0e9 !important
}



.venn-intersection path{
  fill-opacity: .2 !important;
}



svg path {
    stroke: white;
    stroke-width: 0px;
}

svg text {
    fill: white;

    font-size: 14px;
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

.black-text{

  font-size:17px !important;
  fill:black !important
}

.venn-intersection .black-text{
  display:none
}

.venn-intersection:hover .black-text{

}


  `;


export const Home = ({ data, config, queryResponse, details, bodyStyle}) => {


var { investment, chooseLabel,  numbers, reachPercentage, writeTitle, writeTitle2, titleColor,   bodyStyle,   color_title, } = config;



const filteredEntries = Object.entries(data)


const filteredObject = Object.fromEntries(filteredEntries);

const firstThree = data.slice(0, 3);

const findSingleValues = data


const arrayOfObjects = data


const filteredArray = arrayOfObjects


var setStrings = filteredArray.map((item, i) =>(
    item[investment].value

))


const filteredArray2 = setStrings.map(item => item)
  .filter(item => !item.includes(","));


var setNumbers = filteredArray.map((item, i) =>(
    item[numbers].value

))



const fixedArray = setStrings.map(item =>
  item.split(',') // Split on commas
    .map(subItem => `${subItem.trim()}`) // Add quotes and trim each item
);

console.log(filteredArray2, "bubbles");




// console.log(setStrings, "setStrings")

// const myObject = Object.fromEntries(setStrings.map((value, index) => [index, value]));
//
// let bigObject = Object.entries(myObject).map(([key, value]) => ({
//   sets: [`key_${key}`],
//   size: value
// }));

 const [totalIntersectionCount, setTotalIntersectionCount] = useState(0);

 const [sizes, setSizes] = useState([]);


useEffect(() => {

function combineArraysToObject(array1, array2) {
  if (!Array.isArray(array1) || !Array.isArray(array2)) {
    throw new Error('Both arguments must be arrays');
  }

  if (array1.length !== array2.length) {
    throw new Error('Arrays must have the same length');
  }

  return array1.map((value1, index) => {
    return { sets: value1, size: array2[index] };
  });
}

const array1 = fixedArray;
const array2 = setNumbers;


var combinedObject = combineArraysToObject(array1, array2);

var bigObject = combinedObject.sort()






const findBiggestSetAndSize = (data) => {

  let biggestSet = [];
  let biggestSetSize = 0;

  for (const item of data) {
    // Check if the current set is larger than the biggestSet
    if (item.sets.length > biggestSet.length) {
      biggestSet = item.sets;
      biggestSetSize = item.size;
    }
  }

  return { biggestSet, biggestSetSize };
};

const result = findBiggestSetAndSize(bigObject);
//
// console.log("Biggest set:", result.biggestSet);
// console.log("Matching size value:", result.biggestSetSize);



const intersectionCount = result.biggestSetSize < 1 ? result.biggestSetSize.toFixed(2) : result.biggestSetSize.toFixed(0);


setTotalIntersectionCount(intersectionCount);

var bigObject = bigObject


console.log(bigObject, "data object")


const singleSetSizes = bigObject.filter(obj => obj.sets.length === 1)
  .map(obj => obj.size);

setSizes(singleSetSizes)




const buildVenn = venn.VennDiagram().height(350);

const data2 = bigObject;

const vennChart = d3.select("#venn")
.datum(bigObject);

buildVenn(vennChart);


  vennChart
    .selectAll("path")
    .style("fill-opacity", "1")
    .style("mix-blend-mode", "none");

    const secondClass = 'secondary-class'; // Replace with your desired class name

    d3.selectAll('.venn-circle')
      .classed(secondClass, true);


  // d3.select("#venn").selectAll("text").remove();


  d3.selectAll(".venn-area").selectAll("text")
    // Filter based on data property (adjust as needed)
    .filter(function(d) {
      return !d.isIntersection; // Assuming data has an "isIntersection" property
    })
    .attr("class", function(d, i) {
      let className = "";
      if (d.category === "A") {
        className = "black-text";  // Assign color class
      } else {
        className = "black-text";  // Adjust class name if needed
      }
      return className;
    })
    .text(function(d, i) {
      const tooltipText = `${Math.round(d.size).toFixed(0)}%`;
      return tooltipText;
    });


  let tooltip = d3.select("body").append("div").attr("class", "venntooltip");


  d3.selectAll(".venn-area")
    .on("mouseover", function (d, i) {

      let node = d3.select(this).transition();
      node
        .select("path")
        .style("fill-opacity", 0.7)

    })
    .on("mousemove", function (event, d) {

      tooltip
         .transition()
         .duration(400)
         .style("opacity", 1)
         .style("display", "inline-block")
         .text(`${d.sets}, ${Math.round(d.size).toFixed(0)}%`);

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

        <div className="lightBubble" style={{ backgroundColor: color_title ? background[0] : 'white'}}>
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

          <h3 className="mb-0">{totalIntersectionCount}%</h3>
        </div>

          </Row>


          <Row>

            <Col md={12}>

            <div className="d-flex justify-content-between">

            <div className="dots">
             {filteredArray2.map((val, index) => (
            <p key={index}><i class="fas fa-circle"></i> {val}</p>
              ))}
            </div>



            <div className="values">
          {sizes.map((val, index) =>(
            <p key={index}>
            {val > 0 && val  < 1 ? `${parseFloat(val * 1 ).toFixed(2)}%` : `${Math.round(val).toFixed(0).toLocaleString()}%`}</p>
          ))}

            </div>

            </div>

            </Col>

          </Row>



        </Container>
        </div>


        </div>



</Styles>
  </>
);
};
