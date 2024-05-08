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
    titleColor2,
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
  </Fragment>

  );
}

export default BarLineVis;
