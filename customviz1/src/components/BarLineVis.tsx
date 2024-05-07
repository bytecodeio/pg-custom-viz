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

import { Button, Overlay, OverlayTrigger, Popover, PopoverBody, PopoverHeader} from 'react-bootstrap';
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
    reach2Left1,
    reach3Left1,
    reachLeft2,
    reach2Left2,
    reach3Left2,
    reach2Left3,
    reach3Left3,
    reachLeft3,
    reachRight,
    reach2Right,
    reach3Right,
    effectivenessLeft1,
    effectivenessLeft2,
    effectivenessLeft3,
    effectivenessRight,

    effectiveness2Left1,
    effectiveness2Left2,
    effectiveness2Left3,
    effectiveness2Right,

    effectiveness3Left1,
    effectiveness3Left2,
    effectiveness3Left3,
    effectiveness3Right,

    efficiencyLeft1,
    efficiencyLeft2,
    efficiencyLeft3,
    efficiencyRight,

    efficiency2Left1,
    efficiency2Left2,
    efficiency2Left3,
    efficiency2Right,

    efficiency3Left1,
    efficiency3Left2,
    efficiency3Left3,
    efficiency3Right,

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
    reach2right1,
    reach2iya1,

    reach3right1,
    reach3iya1,
    iya2,
    right2,
    effectivenessright2,

    effectiveness2right2,
    effectiveness2iya2,
    effectiveness3right2,
    effectiveness3iya2,
    right3,
    iya3,
    effectivenessiya2,
    efficiency2right2,
    efficiency2iya2,
    efficiency3right2,
    efficiency3iya2
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

    <div className="blueBubble reach" style={{ backgroundColor: color_title ? background[0] : '#2960f6'}}>
    <div class="d-flex justify-content-start">
    <p class="white" style={{color: titleColor ? titleColor : '#fff'}}>Reach</p>
    </div>

    {data.map((item, i) =>(

      <>

      <div className="whiteAcross">
      <div className="d-flex flex-column">
      <p className="mb-0">
      {reachLeft1}
      </p>
      <p className="large mb-0">

     {item[reachLeft2].rendered}
      </p>
      <p className="mb-0 small">
      {reachLeft3}

      </p>
      </div>

      <div class={item[reachRight].value >= 102 ? "varianceBubble positive" :
      item[reachRight].value < 102 && item[reachRight].value > 98 ? "varianceBubble neutral" :
      "varianceBubble negative"}>

      <i class="far fa-long-arrow-up"></i>
      {item[reachRight].rendered}{right1 ? "%" : ""}&nbsp;&nbsp;{iya1 ? "IYA" : ""}

       </div>
      </div>



      <div className="whiteAcross">
      <div className="d-flex flex-column">
      <p className="mb-0">
      {reach2Left1}
      </p>
      <p className="large mb-0">

     {item[reach2Left2].rendered}
      </p>
      <p className="mb-0 small">
      {reach2Left3}

      </p>
      </div>

      <div class={item[reach2Right].value >= 102 ? "varianceBubble positive" :
      item[reach2Right].value < 102 && item[reach2Right].value > 98 ? "varianceBubble neutral" :
      "varianceBubble negative"}>

      <i class="far fa-long-arrow-up"></i>
      {item[reach2Right].rendered}{reach2right1 ? "%" : ""}&nbsp;&nbsp;{reach2iya1 ? "IYA" : ""}

       </div>
      </div>



      <div className="whiteAcross mb-5">
      <div className="d-flex flex-column">
      <p className="mb-0">
      {reach3Left1}
      </p>
      <p className="large mb-0">

     {item[reach3Left2].rendered}
      </p>
      <p className="mb-0 small">
      {reach3Left3}

      </p>
      </div>

      <div class={item[reach3Right].value >= 102 ? "varianceBubble positive" :
      item[reach3Right].value < 102 && item[reach3Right].value > 98 ? "varianceBubble neutral" :
      "varianceBubble negative"}>

      <i class="far fa-long-arrow-up"></i>
      {item[reach3Right].rendered}{reach3right1 ? "%" : ""}&nbsp;&nbsp;{reach3iya1 ? "IYA" : ""}

       </div>
      </div>

      </>


    ))}

    </div>



        <div className="blueBubble effectiveness" style={{backgroundColor: color_title ? background[0] : '#2960f6'}}>
          <div class="d-flex justify-content-start">
          <p class="white" style={{color: titleColor ? titleColor : '#fff'}}>Effectiveness</p>
            </div>

            {data.map((item, i) =>(

              <>

              <div className="whiteAcross">
              <div className="d-flex flex-column">

              <p className="mb-0">
              {effectivenessLeft1}

              </p>

              <p className="large mb-0">

               {item[effectivenessLeft2].rendered}

               </p>

              <p className="mb-0 small">

              {effectivenessLeft3}



              </p>
              </div>

              <div class={item[effectivenessRight].value >= 102 ? "varianceBubble positive" :
              item[effectivenessRight].value < 102 && item[effectivenessRight].value > 98 ? "varianceBubble neutral" :
              "varianceBubble negative"}>


              <i class="far fa-long-arrow-up"></i>
                {item[effectivenessRight].rendered}{right2 ? "%" : ""}&nbsp;&nbsp;{iya2 ? "IYA" : ""}

               </div>
              </div>

              <div className="whiteAcross">
              <div className="d-flex flex-column">

              <p className="mb-0">
              {effectiveness2Left1}

              </p>

              <p className="large mb-0">

               {item[effectiveness2Left2].rendered}

               </p>

              <p className="mb-0 small">

              {effectiveness2Left3}



              </p>
              </div>

              <div class={item[effectiveness2Right].value >= 102 ? "varianceBubble positive" :
              item[effectiveness2Right].value < 102 && item[effectiveness2Right].value > 98 ? "varianceBubble neutral" :
              "varianceBubble negative"}>


              <i class="far fa-long-arrow-up"></i>
                {item[effectiveness2Right].rendered}{effectiveness2right2 ? "%" : ""}&nbsp;&nbsp;{effectiveness2iya2 ? "IYA" : ""}

               </div>
              </div>


              <div className="whiteAcross">
              <div className="d-flex flex-column">

              <p className="mb-0">
              {effectiveness3Left1}

              </p>

              <p className="large mb-0">

               {item[effectiveness3Left2].rendered}

               </p>

              <p className="mb-0 small">

              {effectiveness3Left3}



              </p>
              </div>

              <div class={item[effectiveness3Right].value >= 102 ? "varianceBubble positive" :
              item[effectiveness3Right].value < 102 && item[effectiveness3Right].value > 98 ? "varianceBubble neutral" :
              "varianceBubble negative"}>


              <i class="far fa-long-arrow-up"></i>
                {item[effectiveness3Right].rendered}{effectiveness3right2 ? "%" : ""}&nbsp;&nbsp;{effectiveness3iya2 ? "IYA" : ""}

               </div>
              </div>

              </>

            ))}


        </div>






                <div className="blueBubble efficiency" style={{backgroundColor: color_title ? background[0] : '#2960f6'}}>
                  <div class="d-flex justify-content-start">
                  <p class="white" style={{color: titleColor ? titleColor : '#fff'}}>Efficiency</p>
                    </div>

                    {data.map((item, i) =>(

                      <>

                      <div className="whiteAcross">
                      <div className="d-flex flex-column">

                      <p className="mb-0">
                      {efficiencyLeft1}

                      </p>

                      <p className="large mb-0">

                       {item[efficiencyLeft2].rendered}

                       </p>

                      <p className="mb-0 small">

                      {efficiencyLeft3}



                      </p>
                      </div>

                      <div class={item[efficiencyRight].value >= 102 ? "varianceBubble positive" :
                      item[efficiencyRight].value < 102 && item[efficiencyRight].value > 98 ? "varianceBubble neutral" :
                      "varianceBubble negative"}>


                      <i class="far fa-long-arrow-up"></i>
                        {item[efficiencyRight].rendered}{right3 ? "%" : ""}&nbsp;&nbsp;{iya3 ? "IYA" : ""}

                       </div>
                      </div>



                      <div className="whiteAcross">
                      <div className="d-flex flex-column">

                      <p className="mb-0">
                      {efficiency2Left1}

                      </p>

                      <p className="large mb-0">

                       {item[efficiency2Left2].rendered}

                       </p>

                      <p className="mb-0 small">

                      {efficiency2Left3}



                      </p>
                      </div>

                      <div class={item[efficiency2Right].value >= 102 ? "varianceBubble positive" :
                      item[efficiency2Right].value < 102 && item[efficiency2Right].value > 98 ? "varianceBubble neutral" :
                      "varianceBubble negative"}>


                      <i class="far fa-long-arrow-up"></i>
                        {item[efficiency2Right].rendered}{efficiency2right2 ? "%" : ""}&nbsp;&nbsp;{efficiency2iya2 ? "IYA" : ""}

                       </div>
                      </div>


                      <div className="whiteAcross">
                      <div className="d-flex flex-column">

                      <p className="mb-0">
                      {efficiency3Left1}

                      </p>

                      <p className="large mb-0">

                       {item[efficiency3Left2].rendered}

                       </p>

                      <p className="mb-0 small">

                      {efficiency3Left3}



                      </p>
                      </div>

                      <div class={item[efficiency3Right].value >= 102 ? "varianceBubble positive" :
                      item[efficiency3Right].value < 102 && item[efficiency3Right].value > 98 ? "varianceBubble neutral" :
                      "varianceBubble negative"}>


                      <i class="far fa-long-arrow-up"></i>
                        {item[efficiency3Right].rendered}{efficiency3right2 ? "%" : ""}&nbsp;&nbsp;{efficiency3iya2 ? "IYA" : ""}

                       </div>
                      </div>

                      </>

                    ))}


                </div>

    </div>
    </Styles>
  </Fragment>

  );
}

export default BarLineVis;
