import "./style.scss";
import { createRoot } from "react-dom/client";
import React from "react";
import "bootstrap/scss/bootstrap.scss";
import { Fields, Looker, LookerChartUtils } from "./types";
import BarLineVis from "./components/BarLineVis";


// Global values provided via the Looker custom visualization API
declare var looker: Looker;
declare var LookerCharts: LookerChartUtils;

interface ConfigOptions {
  [key: string]: {
    [key: string]: any;
    default: any;
  };
}

looker.plugins.visualizations.add({
  // The create method gets called once on initial load of the visualization.
  // It's just a convenient place to do any setup that only needs to happen once.
  create: function (element, config) {},

  // The updateAsync method gets called any time the visualization rerenders due to any kind of change,
  // such as updated data, configuration options, etc.
  updateAsync: function (data, element, config, queryResponse, details, done) {

console.log(data)


    const { measure_like: measureLike } = queryResponse.fields;
    const { dimension_like: dimensionLike } = queryResponse.fields;

    const dimensions1 = dimensionLike.map((dimension) => ({
      label: dimension.label_short ?? dimension.label,
      name: dimension.name

    }));


    const measures1 = measureLike.map((measure) => ({
      label: measure.label_short ?? measure.label,
      name: measure.name,
    }));


    const fieldOptions = [...dimensions1, ...measures1].map((dim) => ({
      [dim.label]: queryResponse.data.map(row => row[dim.name].value).join(",")
    }));


    const fieldOptions2: FieldOptions2[] = [...dimensions1, ...measures1].map((dim) => ({
      [dim.label]: dim.label
    }));



    const { measure_like: measureLike } = queryResponse.fields;
    interface Measure {
      label: string;
      name: string;
    }

    interface Dimension {
      label: string;
      name: string;
    }

    const measures: Measure[] = measureLike.map((measure) => ({
      label: measure.label_short ?? measure.label,
      name: measure.name,
    }));

    const dimensions: Dimensions[] = dimensionLike.map((dimension) => ({
      label: dimension.label_short ?? dimension.label,
      name: dimension.name,
    }));

    interface FieldOption {
      [key: string]: string;
    }
    const fieldOptions0: FieldOption[] = [...dimensions, ...measures].map((all) => ({
      [all.label]: all.name,
    }));




    const lookerVis = this;
    const configOptions: ConfigOptions = {





      reachLeft2: {
        label: "Choose Value for Name",
        type: "string",
        display: "select",
        default: '',
        values: fieldOptions0,
        section: "Reach",
        order: 2,
      },




      color_title: {
        type: 'array',
        label: 'Background Color',
        display: 'colors',
        default: ['#0066ff', '#a2c4c9', '#00363d', '#dd3333', '#80ce5d', '#f78131', '#369dc1', '#c572d3', '#36c1b3', '#b57052', '#ed69af'],
        order: 4,
        section: "Style",
      },



      titleColor: {
        type: "string",
        label: "Title Color",
        default: "#ffffff",
        display: "text",
        placeholder: "#ffffff",

        order: 6,
        section: "Style",
      },

  bodyStyle: {
      type: "string",
      label: "Choose Font",
      display: "select",
      values: [{ "Roboto": "'Roboto'" } , { "Open Sans": "'Open Sans'" }, {"Montserrat" : "'Montserrat'"}, {"IBM Plex Sans" :  "'IBM Plex Sans'"},{"DM Serif Text": "DM Serif Text"}],
      section: "Style",
      default: "'Roboto', sans-serif",
      order: 29,
    },





    };




    lookerVis.trigger("registerOptions", configOptions);

    // assign defaults to config values, which first render as undefined until configOptions is registered
    const validatedConfig = { ...config };
    const configKeys = Object.keys(validatedConfig);
    for (let i = 0; i < configKeys.length; i++) {
      if (validatedConfig[configKeys[i]] === undefined) {
        const configKey = configKeys[i] as keyof typeof configOptions;
        validatedConfig[configKey] = configOptions[configKey].default;
      }
    }


    // get dimensions and measures
    const { dimension_like, measure_like, pivots } = queryResponse.fields;
    const fields: Fields = {
      dimensions: dimension_like.map((d) => d.name),
      dimensionsLabel: dimension_like.map((d) => d.label_short),
      measures: measure_like.map((m) => m.name),
      measuresLabel: measure_like.map((m) => m.label_short),
      pivots: pivots?.map((p) => p.name),
    };


    // console.log(fields)

    // create react root
    element.innerHTML = '<div id="app"></div>';

    const root = createRoot(document.getElementById("app"));
    root.render(
      <BarLineVis
      data={data}
      fields={fields}
      config={validatedConfig}
      lookerCharts={LookerCharts}
      lookerVis={lookerVis}
      />
    );

    done();
  },
});
