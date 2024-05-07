import {
  Fields,
  Link,
  LookerChartUtils,
  TooltipData,
  TooltipRow,
  VisConfig,
  VisData,
} from "../types";
import React, { Fragment, useEffect, useMemo, useState, useLayoutEffect } from "react";

import * as venn from "venn.js";
import * as d3 from "d3";

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
    writeTitle2,
    titleColor2
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


  // const Content = config.reachLeft2.split(",").map((d, i) => ({
  //   reachLeft2: d,
  //   // yAxisDropdown:config.yAxisDropdown.split(",")[i],
  //
  //   // symbol:config.symbol.split(",")[i],
  //   // yAxisLeftValues:config.yAxisLeftValues.split(",")[i],
  //
  //
  // }))

 let investment1 = data.map(item => item[reachLeft1].value)


let investment1 = investment1[0]


let spend1 = data.map(item => item[reachLeft3].value)

let spend1 = spend1[0]

let width = spend1 / investment1

let width = Math.round(width).toFixed(0).toLocaleString()
let label = data.map(item => item[reachLeft1].rendered)

let label = label[0]




let spend2 = data.map(item => item[reachLeft2].value)

let spend2 = spend2[0]

let label2 = data.map(item => item[write1].rendered)

let label2 = label2[0]


let investment2 = data.map(item => item[write1].value)

let investment2 = investment2[0]


let width2 = spend2 / investment2

let width2 = Math.round(width2).toFixed(0).toLocaleString()




let spend3 = data.map(item => item[dollar1].value)

let spend3 = spend3[0]

let label3 = data.map(item => item[percentSign1].rendered)

let label3 = label3[0]


let investment3 = data.map(item => item[percentSign1].value)

let investment3 = investment3[0]


let width3 = spend3 / investment3

let width3 = Math.round(width3).toFixed(0).toLocaleString()





let spend4 = data.map(item => item[write4].value)

let spend4 = spend4[0]

let label4 = data.map(item => item[reachRight].rendered)

let label4 = label4[0]


let investment4 = data.map(item => item[reachRight].value)

let investment4 = investment4[0]


let width4 = spend4 / investment4

let width4 = Math.round(width4).toFixed(0).toLocaleString()



let spend5 = data.map(item => item[write5].value)

let spend5 = spend5[0]

let label5 = data.map(item => item[effectivenessRight].rendered)

let label5 = label5[0]


let investment5 = data.map(item => item[effectivenessRight].value)

let investment5 = investment5[0]


let width5 = spend5 / investment5

let width5 = Math.round(width5).toFixed(0).toLocaleString()



useLayoutEffect(() => {
  const sets = [
    { sets: ["A"], size: 20 },
    { sets: ["B"], size: 10 },
    { sets: ["A", "B"], size: 5 }
  ];

  const buildVenn = venn.VennDiagram().width(350).height(350);
  // build venn diagram
  const vennChart = d3.select("#venn").datum(sets).call(buildVenn);

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
      venn.sortAreas(vennChart, i);

      let node = d3.select(this).transition();
      node
        .select("path")
        .style("fill-opacity", 0.7)
        .style("stroke", "red")
        .style("stroke-width", "2");
    })
    .on("mousemove", function (event, d) {
      // Display a tooltip with the current size
      tooltip.transition().duration(400).style("opacity", "0.9");
      tooltip.text(d.size + " users");
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
    <Fragment>
    <Styles>


    <div id="vis-wrapper" style={{fontFamily: bodyStyle ? bodyStyle : "'Roboto'"}}>

    <div className="lightBubble" style={{ backgroundColor: color_title ? background[0] : '#f7f8f9'}}>
  <Container fluid>
    <Row>
    <div class="d-flex justify-content-between">
    <p class="white mb-5" style={{color: titleColor ? titleColor : '#14171c'}}>{writeTitle === "" ? "Reach Overlap" : writeTitle}</p>

    </div>

    </Row>


      <Row>
        <Col md={12}>
        <div className="d-flex justify-content-between">

        <div className="dots">
        <p><i class="fas fa-circle"></i> Programmatic & Video</p>
        <p><i class="fas fa-circle"></i> Social</p>
        <p><i class="fas fa-circle"></i> Search & Others</p>
        <p><i class="fas fa-circle"></i> TV</p>
        <p><i class="fas fa-circle"></i> Digital</p>
        </div>


        <div className="values">
        <p>
        {spend1 / investment1 > 0 && spend1 / investment1 < 1
                  ? `${parseFloat(spend1 * 1  / investment1  * 1 ).toFixed(2)}%` : `${width}%` }
        </p>

        <p>
        {spend2 / investment2 > 0 && spend2 / investment2 < 1
              ? `${parseFloat(spend2 * 1  / investment2  * 1 ).toFixed(2)}%` : `${width2}%` }

        </p>

        <p>
        {spend3 / investment3 > 0 && spend3 / investment3 < 1
                    ? `${parseFloat(spend3 * 1  / investment3  * 1 ).toFixed(2)}%` : `${width3}%` }
          </p>

          <p>

          {spend4 / investment4 > 0 && spend4 / investment4 < 1
          ? `${parseFloat(spend4 * 1  / investment4  * 1 ).toFixed(2)}%` : `${width4}%` }


          </p>
          <p>
          {spend5 / investment5 > 0 && spend5 / investment5 < 1
                ? `${parseFloat(spend5 * 1  / investment5  * 1 ).toFixed(2)}%` : `${width5}%` }

            </p>


        </div>
</div>

        </Col>
      </Row>



    </Container>
    </div>


    </div>
    </Styles>
  </Fragment>

  );
}

export default BarLineVis;
