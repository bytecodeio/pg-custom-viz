import {
  Fields,
  Link,
  LookerChartUtils,
  TooltipData,
  TooltipRow,
  VisConfig,
  VisData,
} from "../types";
import React, { Fragment, useEffect, useMemo, useState } from "react";

import { formatNumber, formatNumber2 } from "../utils";
import {
  Chart as ChartJS,
  ArcElement,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip as ChartJsTooltip,
  LineController,
  BarController,
  ScatterController,
  ChartType,
  ChartOptions,
  Filler,
  ChartData,
  Point,
  BubbleDataPoint,
  ChartTypeRegistry,
  TooltipModel,
} from "chart.js";
import Tooltip from "./Tooltip";
import { Chart } from "react-chartjs-2";
import * as Gauge from "chartjs-gauge";
import "bootstrap/scss/bootstrap.scss";
// import Button from "react-bootstrap/Button";

import { Row, Col, Container, Button, Overlay, OverlayTrigger, Popover, PopoverBody, PopoverHeader, ProgressBar} from 'react-bootstrap';
import styled from "styled-components";
import CSS from 'csstype';

import ButtonGroup from "react-bootstrap/ButtonGroup";
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(
  LinearScale,
  ArcElement,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  ChartJsTooltip,
  LineController,
  BarController,
  Filler,
  ScatterController,
  ChartDataLabels
);



interface BarLineVisProps {
  data: VisData;
  fields: Fields;
  config: VisConfig;
  lookerCharts: LookerChartUtils;
  lookerVis?: any;
  configOptions: configOptions

}

const Styles = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');

  @import url('https://fonts.googleapis.com/css?family=Open+Sans:wght@100;300;400;500;700;900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');

  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,100;1,700&display=swap');

  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital,wght@0,300;0,400;0,500;0,600;1,100;1,700&display=swap');


  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;1,100;1,700&display=swap');


  `;



const chartPlugins = [
  {
    id: "padding-below-legend",
    beforeInit(chart: any) {
      // Get a reference to the original fit function
      const originalFit = chart.legend.fit;

      chart.legend.fit = function fit() {

        originalFit.bind(chart.legend)();
        this.height += 10;
      };
    },
  },
];


// ChartJS.defaults.font.family = "Roboto";
ChartJS.defaults.font.size = 13;
ChartJS.defaults.color = "#262D33";


function BarLineVis({ data, fields, config, lookerCharts, lookerVis, configOptions, }: BarLineVisProps): JSX.Element {


  // config values
  const {
    isYAxisCurrency,
    showXGridLines,
    showYGridLines,
    showXAxisLabel,
    xAxisText,
    showYAxisLabel,
    yAxisText,
    textTitle,
    showKpi,
    kpiUnit,
    isStacked,
    showLineChartGradient,
    showAllValuesInTooltip,
    showPoints,
    xAxisDropdown,
    yAxisDropdown,
    symbol,
    symbol2,
    showYAxis2,
    yAxisRightDropdown,
    showYAxis2Value,
    yAxisRightValues,
    isYAxisCurrency2,
    choosePoints,
    color_range,
    yAxisLeftValues,
    firstmeasure,
    borderLine,
    hideTarget,
    writeTitle,
    showDatalabels,
    writeTooltip,
    toolOn,
    showX,
    showTwo,
    hideBox,
    hideColors,
    hideBottom,
    writeTarget,
    color_title,
    lastBar,
    titleColor,
    firstmeasure,
    fieldOptions0,
    sign,
    kpiField,
    dollar,
    percentSign,
    xFontSize,
    yFontSize,
    legendSize,
    diagonal,
    changeLegend,
    labelPercent,
    hideTitle,
    bodyStyle,
    showDifference,
    writeTargetLabel,
    targetLabel,
    showAverage,
    hideCaret,
    showDifferenceBottom,
    lineChart,
    autoData,


    dollar1,
    percentSign1,
    dollar2,
    percentSign2,
    dollar3,
    percentSign3,
    reachLeft1,
    reachLeft2,
    reachLeft3,
    reachRight,
    effectivenessLeft1,
    effectivenessLeft2,
    effectivenessLeft3,
    effectivenessRight,
    efficiencyLeft1,
    efficiencyLeft2,
    efficiencyLeft3,
    efficiencyRight,
    write1,
    write2,
    write3,
    write4,
    write5,
    write6,
    write7,
    write8,
    write9,
    write10,
    write11,
    write12,
    right1,
    iya1,
    right2,
    iya2,
    right3,
    iya3,
    chooseLabel,
    spend,
    investment
  } = config;



  // Chart type toggle
  interface ChartTypeOption {
    label: string;
    value: ChartType;
  }

  const chartTypeOptions: ChartTypeOption[] = [
    {
      label: "Bar",
      value: "bar",
    },

  ];

  const [selectedChartType, setSelectedChartType] = useState(
    chartTypeOptions[0].value
  );

  // map Looker query data to ChartJS data format
  const dimensionName = fields.dimensions[0];
  const measureName = fields.measures[0];
  const previousPeriodFieldName = fields.measures[0];

  const dimensionLabel = fields.dimensionsLabel[0];
  const measureLabel = fields.measuresLabel[0];


  const [firstData = {}] = data;
  let cols_to_hide = [];

  for (const [key, value] of Object.entries(firstData)) {

    if (key.split(".")[1] === "count_orders") {

      cols_to_hide = key

    }
  }


  const labels = data.map(
    (row) => row[dimensionName].rendered ?? row[dimensionName].value ?? "∅"
  );



  //
  // let tooltipMeasure = [];
  //
  // for (const [key, value] of Object.entries(firstData)) {
  //   if (key.split(".")[1] === "count_orders") {
  //   tooltipMeasure = firstData[key].value.split(",").map((e) => e.trim());
  //
  //   }
  // }
  // // let tooltipMeasure = tooltipMeasure.toString()
  //
  //
  // console.log(tooltipMeasure, "count_orders")


  const colors = config.color_range

  const background = config.color_title


  const hasPivot = !!fields.pivots && fields.pivots.length > 0;

  const hasNoPivot = !!fields.pivots && fields.pivots.length === 0;

  const fill = showLineChartGradient ? "origin" : false;

  const defaultChartData: ChartData<
  | "bar"
  | "line"
  | "scatter"
  | "bubble"
  | "pie"
  | "doughnut"
  | "polarArea"
  | "radar",
  (number | Point | [number, number] | BubbleDataPoint)[],
  any
  > = {
    labels,
    datasets: [],
  };
  const [chartData, setChartData] = useState(defaultChartData);

  function updateChartData(chartType: ChartType) {
    let datasets = [];
    let canvasElement = document.getElementById("chart") as HTMLCanvasElement;
    if (canvasElement) {
      const ctx = canvasElement.getContext("2d");





      setChartData({ labels, datasets });
    }
  }

  useEffect(() => {
    updateChartData(selectedChartType);
  }, []);

  // chart tooltip
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  const hasPeriodComparisonMeasure = fields.measures.length > 1;
  const periodComparisonMeasure = fields.measures[1];



  interface TooltipContext {
    chart: ChartJS<
    keyof ChartTypeRegistry,
    (number | Point | [number, number] | BubbleDataPoint)[],
    unknown
    >;
    tooltip: TooltipModel<"bar" | "scatter">;
  }

  function tooltipHandler(
    context: TooltipContext,


    setTooltip: (newState: TooltipData | null) => void
  ) {
    const isTooltipVisible = context.tooltip.opacity !== 0;
    if (isTooltipVisible) {
      const position = context.chart.canvas.getBoundingClientRect();

      const { dataIndex } = context.tooltip.dataPoints[0];

      const lookerRow = data[dataIndex];

      let rows: TooltipRow[] = [];

        Object.entries(lookerRow[measureName]).forEach(

          ([pivotName, { value: currentPeriodValue }], i) => {

            const previousPeriodValue =
            lookerRow[previousPeriodFieldName][pivotName].value;

            const hasPreviousPeriod =
            hasPeriodComparisonMeasure && !!previousPeriodValue;
            const periodComparisonValue =
            ((currentPeriodValue - previousPeriodValue) /
            previousPeriodValue) *
            100;

            rows.push({
              hasPreviousPeriod,

              measureValue: `${currentPeriodValue}`,

              periodComparisonValue,
              pivotColor: `#${colors[i]}`,
              pivotText: pivotName,


            });


          }
        );

      setTooltip({


        dimensionLabel0: `${dimensionLabel}:`,

        dimensionLabel: `${context.tooltip.title[0]}`,
        measureLabel: `${context.tooltip.dataPoints[0].dataset.label}: `,



        // measureLabel0: `${yAxisLeftValues}: `,
        // measureLabel0: `${context.tooltip.dataPoints[0].formattedValue}`,
        //measureLabel0: percentSign ? `${context.tooltip.dataPoints[0].formattedValue*100}%` : `${context.tooltip.dataPoints[0].formattedValue}`,
        left:
            position.left + window.pageXOffset + context.tooltip.caretX + "px",
            rows,
            top:
              position.top +
              window.pageYOffset +
              context.tooltip.caretY -
              20 +
              "px",
            yAlign: context.tooltip.yAlign,
          });

    } else {
      setTooltip(null);
    }
  }


  // const Content = config.textTitle.split(",").map((d, i) => ({
  //   textTitle: d,
  //   // textTitle:config.textTitle.split(",")[i],
  //
  //
  //
  //
  // }))
//
//   Content.map((val, i) => (
//
// console.log(val.yAxisDropdown, "seifuewbiviyewiwvew")
//
//   ))
//
//


 //
 // const yAxisValues = data.map(item => item[yAxisLeftValues].value)







//
//
//
//
//
//   var total = 0;
//   for(var i = 0; i < yAxisValues.length; i++) {
//       total += yAxisValues[i];
//   }
//   var avg = total / yAxisValues.length;
//   let array = yAxisValues
//
// function calculateAverage(array) {
// let num = 0;
// for (let i = 0; i < yAxisValues.length; i++) {
//    // console.log(yAxisValues[i]);
//
//  num += +yAxisValues[i];
//    // console.log(yAxisValues.length)
// }
// return num / yAxisValues.length
//
// }
//
// var average = calculateAverage(array);
//
// var average =  percentSign ? Math.round(average * 100).toLocaleString() : Math.round(average * 1).toLocaleString();
//
//
//   let title = Content.map(function(val, i){ return val.textTitle });
//
//   let title = title[0]
//
//
//   let percent = Content.map(function(val, i){ return val.yAxisDropdown });
//
//   let percent = Math.round(percent[0] * 100)
//
//
//   let result = data.map(item => item[symbol].value)
//
//
//
//   let target = percentSign ? Math.round(result[0]*100) : Math.round(result[0]) ;
//
//   let yAxisRightDropdownValues = Content.map(function(val, i){ return val.yAxisRightDropdown });
//
//
//   let yAxisRightDropdownValues = Math.round(yAxisRightDropdownValues[0])
//
//
//   const first = labels[0];
//   const lastLabel = labels[labels.length - 1];
//
//
//
//   let array2 = yAxisDropdown.split(',').map(function(item) {
//       return parseInt(item);
//   });
//
//
//   const yDrop = data.map(item => item[yAxisDropdown].value)
//
//   const last = yDrop[yDrop.length - 1];
//
//
//   // const last = Math.round(last * 1).toLocaleString();
//   //
//   //
//   // console.log(last)
//
// // var labels = [first, lastLabel]
// // console.log(thing)
// //
// // console.log(labels)
//
//
//
// const percentDiff1 = percentSign ? Math.round(last / (target/100) * 100) : Math.round(last / target * 100)
// const percentDiff2 =  Math.round(last / parseInt(writeTarget) * 100)
//
// const percentDiff3 = percentSign ? Math.round(last / (parseInt(average)/100) * 100) : Math.round(last / parseInt(average) * 100)
//
//
//
// console.log(last, percentDiff1, percentDiff2, percentDiff3 )
//
//
//   const popoverHoverFocus = (
//     <Popover
//     className={toolOn ? "" : "hidden"}
//     id="popover"
//     >
//     <p>{writeTooltip}</p>
//     </Popover>
//   );
//
//   const chartOptions: ChartOptions<"scatter" | "bar"> = useMemo(
//     () => ({
//       layout: {
//         padding: {
//           top: 30,
//           right:10,
//           left: 10,
//           bottom:0
//
//         },
//       },
//
//       onClick: (event, elements, chart) => {
//
//         if (!elements.length) {
//           return;
//         }
//         const { datasetIndex, index: dataIndex } = elements[0];
//
//         if (hasPivot) {
//
//           const measureLinks = Object.values(data[dataIndex][measureName])[datasetIndex].links ?? [];
//           const dimensionLinks = (data[dataIndex][dimensionName].links as Link[]) ?? [];
//
//         }
//         else{
//           const measureLinks = data[dataIndex][measureName].links ?? [];
//
//           const dimensionLinks = (data[dataIndex][dimensionName].links) ?? [];
//         }
//
//         lookerCharts.Utils.openDrillMenu({
//           links: [...measureLinks, ...dimensionLinks],
//           event: event.native,
//         });
//       },
//       maintainAspectRatio: false,
//       responsive: true,
//       plugins: {
//         datalabels: {
//
//             // display:  showDatalabels ?  "auto" : false,
//
//           display: showDatalabels && !autoData ?  "auto" :  showDatalabels && autoData  ? true : !showDatalabels && autoData ? false : !showDatalabels && !autoData ? false : false,
//           formatter: function(value: number) {
//
//            if (value > 0 && value <  1){
//                 return `${percentSign ? (value*100).toFixed(0) + '%' : (value).toFixed(2)}`
//             }
//
//            else if (value < 100){
//
//               return `${percentSign ? Math.round(value*100).toFixed(0) + '%' : Math.round(value*1)}`
//             }
//             else if (value < 1000){
//
//             return `${percentSign ? Math.round(value*100).toFixed(0) + '%' : Math.round(value*1)}`
//           }
//             else{
//                 let percentage = (value) / 1000
//                 return `${percentSign ? formatNumber(Math.round(percentage.toFixed(0) * 1000)) + '%' : formatNumber(Math.round(percentage.toFixed() * 1000))}`;
//             }
//         },
//
//           font: {
//             size: 10,
//             weight: '500',
//             family: bodyStyle ? bodyStyle : "'Roboto'"
//
//           },
//
//           anchor: 'end',
//           align: 'end',
//
//         },
//         legend: {
//           position: "bottom",
//           labels:
//
//           {
//             color:'#262D33',
//             font: {
//               size: `${legendSize ?  legendSize  : 10 }`,
//               weight: '500',
//               family: bodyStyle ? bodyStyle : "'Roboto'"
//
//             },
//             usePointStyle: true
//           },
//           align: "center" as const,
//           display: `${showXGridLines ? hasNoPivot || hasPivot : ""}`
//         },
//
//         tooltip: {
//           enabled: false,
//           position: "nearest",
//           external: (context) =>
//           tooltipHandler(context, setTooltip),
//         },
//       },
//       scales: {
//         x: {
//           border: {
//             display: false,
//           },
//
//           grid: {
//             display: false,
//           },
//           stacked: false,
//           title: {
//             display: false,
//             // text: ` ${xAxisDropdown ?  xAxisDropdownValues  : dimensionLabel }`,
//             font: {
//               size: 10,
//               family: bodyStyle ? bodyStyle : "'Roboto'"
//             }
//           },
//           ticks: {
//
//
//             display: showTwo || showX ? true : false,
//
//             // `${showX  ? true : false  : showTwo  ? true : false : false}`,
//
//               autoSkip: `${diagonal ?  true : false }`,
//               maxRotation: `${diagonal ?  60  : 0 }`,
//               minRotation: `${diagonal ?  60  : 0 }`,
//
//               maxTicksLimit: `${showTwo ?  1 : 5000}`,
//               autoSkip: `${showTwo ?  true : false}`,
//               minRotation:`${showTwo ?  0 : 0}`,
//
//
//             // callback: () => {
//             //
//             //   return labels[0];
//             //   // return labels[labels.length - 1];
//             // },
//
//
//
//             font: {
//               size:`${xFontSize ?  xFontSize  : 10 }`,
//               family: bodyStyle ? bodyStyle : "'Roboto'"
//             },
//             color: 'black',
//           },
//         },
//
//         yLeft: {
//           border: {
//             display: false,
//           },
//           grid: {
//             display: false,
//           },
//           position: "left" as const,
//           stacked: false,
//           ticks: {
//             font: {
//               size: `${yFontSize ?  yFontSize  : 10 }`,
//               family: bodyStyle ? bodyStyle : "'Roboto'"
//             },
//             display:showYGridLines,
//             callback: function (value: number) {
//               return `${percentSign ? formatNumber((value*100).toFixed(0)) + "%" :  formatNumber(value)}`;
//             },
//           },
//           title: {
//             display: false,
//             // text: `${showYGridLines ?  yAxisRightDropdownValues  : measureLabel }`,
//             font: {
//               size: 10,
//               family: bodyStyle ? bodyStyle : "'Roboto'"
//             }
//           },
//
//         },
//
//         yRight: {
//           legend: {
//             display: true,
//         },
//         grid: {
//           display: false,
//         },
//         position: "right" as const,
//         display: false,
//         ticks: {
//
//           display: false,
//
//
//         },
//
//
//       },
//
//       },
//     }),
//     []
//   );
//
//   const kpiValue = data.reduce((total, currentRow) => {
//     let newTotal = total;
//     if (hasPivot) {
//       const cellValues = Object.values(currentRow[measureName]).map(
//         (cell) => cell.value
//       );
//       for (let i = 0; i < cellValues.length; i++) {
//         newTotal += cellValues[i];
//       }
//     } else {
//       newTotal += currentRow[measureName].value;
//     }
//
//     return newTotal;
//   }, 0);
//
//   function handleChartTypeSelection(newChartType: ChartType) {
//     setSelectedChartType(newChartType);
//     updateChartData(newChartType);
//   }


console.log(data)

  // {item[reachLeft1].value.toLocaleString()}

  return (
    <Fragment>
    <Styles>


    <div id="vis-wrapper" style={{fontFamily: bodyStyle ? bodyStyle : "'Roboto'"}}>

    <div className="lightBubble" style={{ backgroundColor: color_title ? background[0] : '#f7f8f9'}}>
    <div class="d-flex justify-content-between">
    <p class="white mb-4" style={{color: titleColor ? titleColor : '#14171c'}}>{writeTitle === "" ? "Total Media Spend and Investment" : writeTitle}</p>


    <p className="gray">Total Investment</p>
    </div>
    <Container fluid>
      <Row>
      {data.map((item, i) =>(
        <>

      <Col md={8}>
      <p className="mb-0">{item[chooseLabel].value}</p>
      <div className="position-relative">
      <div className="progress">
        <div
        className="progress-bar"
        role="progressbar"
        style={{ width:  item[spend].value / item[investment].value > 0 && item[spend].value / item[investment].value < 6
      ?  9 : item[spend].value / item[investment].value}}
      ></div>
        </div>

        <span className={item[spend].value >= 0 && item[spend].value / item[investment].value < 20
    ? "progress-label white" : "progress-label"}>

    {item[spend].value / item[investment].value > 0 && item[spend].value / item[investment].value < 1
    ? `${parseFloat(item[spend].value * 1  / item[investment].value  * 1 ).toFixed(2)}%` : `${Math.round(item[spend].value / item[investment].value).toFixed(0).toLocaleString()}%` }


    </span>
        </div>


      </Col>


      <Col md={3} className="offset-1">
       <p className="mb-0">&nbsp;</p>
      <div className="position-relative">
      <div className="progress">
        <div
        className="progress-bar"
        role="progressbar"
        style={{ width:  Math.round(item[investment].value.toFixed(0))}}
        ></div>
        </div>

          <span className="progress-label">

          {item[investment].rendered}

          </span>
        </div>




        </Col>

          </>
    ))}


    </Row>
    </Container>
    </div>





    </div>
    </Styles>
  </Fragment>

  );
}

export default BarLineVis;
