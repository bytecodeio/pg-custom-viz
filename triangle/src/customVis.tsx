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


    //
    //
    //
    // const kpiFieldDefault = dimensions[0].name;
    // const comparisonFieldDefault = measures.length > 1 ? measures[1].name : "";
    // const gaugeFieldDefault = measures.length > 2 ? measures[2].name : "";
    //



    const lookerVis = this;
    const configOptions: ConfigOptions = {



            //
            //
            // writeTitle2: {
            //   type: "string",
            //   label: "Subtitle Override",
            //   default: "",
            //   order: 1,
            //   section: "Style",
            //
            // },
            //
            // titleColor: {
            //   type: "string",
            //   label: "Title Color",
            //   default: "#14171c",
            //   display: "text",
            //   placeholder: "",
            //
            //   order: 2,
            //   section: "Style",
            //
            // },
            //
            //     titleColor2: {
            //       type: "string",
            //       label: "Subtitle Color",
            //       default: "#637087",
            //       display: "text",
            //       placeholder: "",
            //
            //       order: 3,
            //         section: "Style",
            //
            //     },

                chooseLabel: {
                  label: "Choose Top Triangle Value",
                  type: "string",
                  display: "select",
                  default: "",
                  values: fieldOptions0,

                  order: 1,
                  section: "Values",
                },



                spend: {
                  label: "Choose Left Triangle Value",
                  type: "string",
                  display: "select",
                  default: "",
                  values: fieldOptions0,

                  order: 2,
                  section: "Values",
                },

                leftOn: {
                  type: "boolean",
                  label: "Turn on Left Label",
                  default: false,
                  order: 3,
                    section: "Values",
                },


                labelLeft: {
                  label: "Choose Left Label",
                  type: "string",
                  display: "select",
                  default: "",
                  values: fieldOptions2,

                  order: 4,
                  section: "Values",
                },

                writeTarget: {
                  type: "string",
                  label: "Left Label Override",
                  default: "",
                  order: 5,
                  section: "Values",

                },


      investment: {
        label: "Choose Right Triangle Value",
        type: "string",
        display: "select",
        default: "",
        values: fieldOptions0,

        order: 6,
        section: "Values",
      },



      rightOn: {
        type: "boolean",
        label: "Turn on Right Label",
        default: false,
        order: 7,
          section: "Values",
      },


      labelRight: {
        label: "Choose Right Label",
        type: "string",
        display: "select",
        default: "",
        values: fieldOptions2,

        order: 8,
        section: "Values",
      },

      writeTarget2: {
        type: "string",
        label: "Right Label Override",
        default: "",
        order: 9,
        section: "Values",

      },



      reachLeft2: {
        label: "Choose ROI Value",
        type: "string",
        display: "select",
        default: "",
        values: fieldOptions0,

        order: 10,
        section: "Values",
      },






                  writeTitle: {
                    type: "string",
                    label: "Scale Triangle Size",
                    display: "select",
                    default:"",
                    order: 0,
                    section: "Style",
                    values: [
                      {"Normal": "scale(1)"},
                      {"Larger": "scale(1.1)"},
                      {"Small": "scale(.9)"},
                      {"X-Small": "scale(.7)"}

                    ],

                  },




  bodyStyle: {
      type: "string",
      label: "Choose Font",
      display: "select",
      values: [{ "Roboto": "'Roboto'" } , { "Open Sans": "'Open Sans'" }, {"Montserrat" : "'Montserrat'"}, {"IBM Plex Sans" :  "'IBM Plex Sans'"},{"DM Serif Text": "DM Serif Text"}],

      default: "'Roboto', sans-serif",
      order: 7,
      section: "Style",
    },


          hideBottom: {
            type: "boolean",
            label: "Hide Bottom Bar",
            default: false,
            order: 8,
            section: "Style",
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
