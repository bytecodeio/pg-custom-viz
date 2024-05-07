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



  return (
    <Fragment>
    <Styles>


    <div id="vis-wrapper" style={{fontFamily: bodyStyle ? bodyStyle : "'Roboto'"}}>

    <div className="lightBubble" style={{ backgroundColor: color_title ? background[0] : '#f7f8f9'}}>
  <Container fluid>
    <Row>
    <div class="d-flex justify-content-between">
    <p class="white mb-4" style={{color: titleColor ? titleColor : '#14171c'}}>{writeTitle === "" ? "Total Media Spend and Investment" : writeTitle}</p>


    <p className="gray" style={{color: titleColor2 ? titleColor2 : '#637087'}}>{writeTitle2 === "" ? "Total Investment" : writeTitle2}</p>
    </div>

    </Row>

      <Row>

      <Col md={8}>
      <p className="mb-0">Programmatic & Video</p>

      <div className="position-relative pv">
      <div className="progress">
        <div
        className="progress-bar"
        role="progressbar"
        style={{ width:  spend1 / investment1 > 0 && spend1 / investment1 < 6
        ?  5 : spend1 / investment1 }}
        ></div>
        </div>

          <span className={spend1 >= 0 && spend1 / investment1 < 20
          ? "progress-label white" : "progress-label"}>

          {spend1 / investment1 > 0 && spend1 / investment1 < 1
          ? `${parseFloat(spend1 * 1  / investment1  * 1 ).toFixed(2)}%` : `${width}%` }


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

        ></div>
        </div>

          <span className="progress-label">

          {label}

          </span>
        </div>

        </Col>

    </Row>


    <Row>

    <Col md={8}>
    <p className="mb-0">Social</p>

    <div className="position-relative social">
    <div className="progress">
      <div
      className="progress-bar"
      role="progressbar"
      style={{ width:  spend2 / investment2 > 0 && spend2 / investment2 < 6
      ?  5 : spend2 / investment2 }}
      ></div>
      </div>

        <span className={spend2 >= 0 && spend2 / investment2 < 20
        ? "progress-label white" : "progress-label"}>

        {spend2 / investment2 > 0 && spend2 / investment2 < 1
        ? `${parseFloat(spend2 * 1  / investment2  * 1 ).toFixed(2)}%` : `${width2}%` }


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

      ></div>
      </div>

        <span className="progress-label">

        {label2}

        </span>
      </div>

      </Col>

    </Row>





    <Row>

    <Col md={8}>
    <p className="mb-0">Search & Others</p>

    <div className="position-relative search">
    <div className="progress">
      <div
      className="progress-bar"
      role="progressbar"
      style={{ width:  spend3 / investment3 > 0 && spend3 / investment3 < 6
      ?  5 : spend3 / investment3 }}
      ></div>
      </div>

        <span className={spend3 >= 0 && spend3 / investment3 < 20
        ? "progress-label white" : "progress-label"}>

        {spend3 / investment3 > 0 && spend3 / investment3 < 1
        ? `${parseFloat(spend3 * 1  / investment3  * 1 ).toFixed(2)}%` : `${width3}%` }


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

      ></div>
      </div>

        <span className="progress-label">

        {label3}

        </span>
      </div>

      </Col>

  </Row>




      <Row>

      <Col md={8}>
      <p className="mb-0">TV</p>

      <div className="position-relative tv">
      <div className="progress">
        <div
        className="progress-bar"
        role="progressbar"
        style={{ width:  spend4 / investment4 > 0 && spend4 / investment4 < 6
        ?  5 : spend4 / investment4 }}
        ></div>
        </div>

          <span className={spend4 >= 0 && spend4 / investment4 < 20
          ? "progress-label white" : "progress-label"}>

          {spend4 / investment4 > 0 && spend4 / investment4 < 1
          ? `${parseFloat(spend4 * 1  / investment4  * 1 ).toFixed(2)}%` : `${width4}%` }


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

        ></div>
        </div>

          <span className="progress-label">

          {label4}

          </span>
        </div>

        </Col>

    </Row>




          <Row>

          <Col md={8}>
          <p className="mb-0">Digital</p>

          <div className="position-relative digital">
          <div className="progress">
            <div
            className="progress-bar"
            role="progressbar"
            style={{ width:  spend5 / investment5 > 0 && spend5 / investment5 < 6
            ?  5 : spend5 / investment5 }}
            ></div>
            </div>

              <span className={spend5 >= 0 && spend5 / investment5 < 20
              ? "progress-label white" : "progress-label"}>

              {spend5 / investment5 > 0 && spend5 / investment5 < 1
              ? `${parseFloat(spend5 * 1  / investment5  * 1 ).toFixed(2)}%` : `${width5}%` }


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

            ></div>
            </div>

              <span className="progress-label">

              {label5}

              </span>
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
