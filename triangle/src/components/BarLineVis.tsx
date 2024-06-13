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
    investment,

    spend2,
    investment2,

    hideBottom,
    labelLeft,
    leftOn,
    rightOn,
    labelRight,
    writeTarget2,
    labelLeft2,
    leftOn2,
    rightOn2,
    labelRight2,
    writeTargetSecond,
    writeTargetFirst
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

  //
  // const labels = data.map(
  //   (row) => row[dimensionName].rendered ?? row[dimensionName].value ?? "∅"
  // );



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
    // labels,
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


  return (
    <Fragment>
    <Styles>


    <div id="vis-wrapper" style={{fontFamily: bodyStyle ? bodyStyle : "'Roboto'", transform: writeTitle ? writeTitle : ""}}>

    <div style={{ backgroundColor: color_title ? background[0] : '#fff'}}>

    <Container fluid>
  {data.map((item, i) =>(
      <>
      <Row>

              <div className="thisDiv one">

              <div className="topTriangle"></div>
                <p className="first">Reach</p>
                <p className="second">{item[chooseLabel].rendered}</p>
              <div className="topTriangle2"></div>
              </div>

              <div className="thisDiv two">

             <div className="rightTriangle">
             </div>

              <p className="first">Efficiency</p>
            <p className="second" style={{fontSize: rightOn ? "20px" : "22px", right: rightOn ? "-133px" : "-100px"}}><span style={{display:rightOn ? "inline-flex" : "none"}}>{writeTarget2 === "" ? `${labelRight}:` : `${writeTarget2}:`}</span> {item[investment].rendered}</p>

                <p className="third" style={{fontSize: rightOn2 ? "20px" : "22px", right: rightOn2 ? "-125px" : "-100px"}}><span style={{display:rightOn2 ? "inline-flex" : "none"}}>{writeTargetSecond === "" ? `${labelRight2}:` : `${writeTargetSecond}:`}</span> {item[investment2].rendered}</p>

              <div className="rightTriangle3"></div>
             </div>
          <div className="thisDiv three">
            <div className="leftTriangle"></div>
            <p className="first">Effectiveness</p>
            <p className="second" style={{fontSize: leftOn ? "20px" : "22px", left: leftOn ? "-143px" : "-115px"}}><span style={{display:leftOn ? "inline-flex" : "none"}}>{writeTarget === "" ? `${labelLeft}:` : `${writeTarget}:`}</span> {item[spend].rendered}</p>

            <p className="third" style={{fontSize: leftOn2 ? "20px" : "22px", left: leftOn2 ? "-143px" : "-115px"}}><span style={{display:leftOn2 ? "inline-flex" : "none"}}>{writeTargetFirst === "" ? `${labelLeft2}:` : `${writeTargetFirst}:`}</span> {item[spend2].rendered}</p>

          <div className="leftTriangle2"></div>
        </div>







    </Row>



    <Row style={{display: hideBottom ? "none" : ""}}>
    <div class="grayBar"><p>Integrated to Deliver Profitable Return of Investment: {item[reachLeft2].rendered}</p></div>
    </Row>

    </>

  ))}
    </Container>
    </div>





    </div>
    </Styles>
  </Fragment>

  );
}

export default BarLineVis;
