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





    const kpiFieldDefault = dimensions[0].name;
    const comparisonFieldDefault = measures.length > 1 ? measures[1].name : "";
    const gaugeFieldDefault = measures.length > 2 ? measures[2].name : "";




    const lookerVis = this;
    const configOptions: ConfigOptions = {



            writeTitle: {
              type: "string",
              label: "Title Override",
              default: "",
              order: 0,
              section: "Style",

            },


            writeTitle2: {
              type: "string",
              label: "Subtitle Override",
              default: "",
              order: 1,
              section: "Style",

            },

            titleColor: {
              type: "string",
              label: "Title Color",
              default: "#14171c",
              display: "text",
              placeholder: "",

              order: 2,
              section: "Style",

            },

                titleColor2: {
                  type: "string",
                  label: "Subtitle Color",
                  default: "#637087",
                  display: "text",
                  placeholder: "",

                  order: 3,
                    section: "Style",

                },


                reachLeft3: {
                  label: "Programmatic & Video Spend Value",
                  type: "string",
                  display: "select",
                  default: kpiFieldDefault,
                  values: fieldOptions0,

                  order: 4,
                    section: "Calc 1",
                },


      reachLeft1: {
        label: "Programmatic & Video Total Investment Value",
        type: "string",
        display: "select",
        default: kpiFieldDefault,
        values: fieldOptions0,

        order: 5,
        section: "Calc 1",
      },


      reachLeft2: {
        label: "Social Spend Value",
        type: "string",
        display: "select",
        default: kpiFieldDefault,
        values: fieldOptions0,

        order: 6,
        section: "Calc 2",
      },


            write1: {
              label: "Social Investment Value",
              type: "string",
              display: "select",
              default: kpiFieldDefault,
              values: fieldOptions0,

              order: 7,
              section: "Calc 2",
            },


            dollar1: {
              label: "Search Spend Value",
              type: "string",
              display: "select",
              default: kpiFieldDefault,
              values: fieldOptions0,

              order: 6,
              section: "Calc 3",
            },


                  percentSign1: {
                    label: "Search Investment Value",
                    type: "string",
                    display: "select",
                    default: kpiFieldDefault,
                    values: fieldOptions0,

                    order: 7,
                    section: "Calc 3",
                  },

                  write4: {
                    label: "TV Spend Value",
                    type: "string",
                    display: "select",
                    default: kpiFieldDefault,
                    values: fieldOptions0,

                    order: 6,
                    section: "Calc 4",
                  },


                        reachRight: {
                          label: "TV Investment Value",
                          type: "string",
                          display: "select",
                          default: kpiFieldDefault,
                          values: fieldOptions0,

                          order: 7,
                          section: "Calc 4",
                        },


                        write5: {
                          label: "Digital Spend Value",
                          type: "string",
                          display: "select",
                          default: kpiFieldDefault,
                          values: fieldOptions0,

                          order: 6,
                          section: "Calc 5",
                        },


                            effectivenessRight: {
                                label: "Digital Investment Value",
                                type: "string",
                                display: "select",
                                default: kpiFieldDefault,
                                values: fieldOptions0,

                                order: 7,
                                section: "Calc 5",
                              },





     //  dollar1: {
     //   type: "boolean",
     //   label: "Add $ Sign Left Side Value 2",
     //   default: false,
     //   order: 3,
     //  section: "Reach",
     // },
     // percentSign1: {
     //   type: "boolean",
     //   label: "Add % Sign Left Side Value 2",
     //   default: false,
     //   order: 4,
     //  section: "Reach",
     // },



      //
      // write4: {
      //    type: "string",
      //    label: "Override Left Side Value 3 for Reach",
      //    default: "",
      //    order: 6,
      //    section: "Reach",
      //  },
      //
      //
      //
      // reachRight: {
      //   label: "Choose Right Side Value for Reach",
      //   type: "string",
      //   display: "select",
      //   default: kpiFieldDefault,
      //   values: fieldOptions0,
      //   section: "Reach",
      //   order: 7,
      // },
      //
      // right1: {
      //   type: "boolean",
      //   label: "Add % Sign Right Side Value for Reach",
      //   default: false,
      //   order: 8,
      //  section: "Reach",
      // },
      //
      //
      // iya1: {
      //   type: "boolean",
      //   label: "IYA",
      //   default: false,
      //   order: 9,
      //  section: "Reach",
      // },
      //
      //
      //
      // effectivenessLeft1: {
      //   label: "Choose Left Side Value 1 for Effectiveness",
      //   type: "string",
      //   display: "select",
      //   default: kpiFieldDefault,
      //   values: fieldOptions0,
      //   section: "Effectiveness",
      //   order: 0,
      // },
        //
        // write5: {
        //    type: "string",
        //    label: "Override Left Side Value 1 for Effectiveness",
        //    default: "",
        //    order: 1,
        //    section: "Effectiveness",
        //  },

     //  effectivenessLeft2: {
     //    label: "Choose Left Side Value 2 for Effectiveness",
     //    type: "string",
     //    display: "select",
     //    default: kpiFieldDefault,
     //    values: fieldOptions0,
     //    section: "Effectiveness",
     //    order: 2,
     //  },
     //
     //  dollar2: {
     //   type: "boolean",
     //   label: "Add $ Sign Left Side Value 2",
     //   default: false,
     //   order: 3,
     //    section: "Effectiveness",
     // },
     // percentSign2: {
     //   type: "boolean",
     //   label: "Add % Sign Left Side Value 2",
     //   default: false,
     //   order: 4,
     //  section: "Effectiveness",
     // },
     //  effectivenessLeft3: {
     //    label: "Choose Left Side Value 3 for Effectiveness",
     //    type: "string",
     //    display: "select",
     //    default: kpiFieldDefault,
     //    values: fieldOptions0,
     //    section: "Effectiveness",
     //    order: 5,
     //  },
     //
     //  write7: {
     //     type: "string",
     //     label: "Override Left Side Value 3 for Effectiveness",
     //     default: "",
     //     order: 6,
     //     section: "Effectiveness",
     //   },
     //
     //  effectivenessRight: {
     //    label: "Choose Right Side Value for Effectiveness",
     //    type: "string",
     //    display: "select",
     //    default: kpiFieldDefault,
     //    values: fieldOptions0,
     //    section: "Effectiveness",
     //    order: 7,
     //  },
     //
     //
     //  right2: {
     //    type: "boolean",
     //    label: "Add % Sign Right Side Value for Effectiveness",
     //    default: false,
     //    order: 8,
     //    section: "Effectiveness",
     //  },
     //
     //
     //  iya2: {
     //    type: "boolean",
     //    label: "IYA",
     //    default: false,
     //    order: 9,
     //    section: "Effectiveness",
     //  },
     //
     //
     //
     //          efficiencyLeft1: {
     //          label: "Choose Left Side Value 1 for Efficiency",
     //          type: "string",
     //          display: "select",
     //          default: kpiFieldDefault,
     //          values: fieldOptions0,
     //          section: "Efficiency",
     //          order: 0,
     //        },
     //
     //
     //
     //
     //        efficiencyLeft2: {
     //          label: "Choose Left Side Value 2 for Efficiency",
     //          type: "string",
     //          display: "select",
     //          default: kpiFieldDefault,
     //          values: fieldOptions0,
     //          section: "Efficiency",
     //          order: 2,
     //        },
     //
     //        dollar3: {
     //         type: "boolean",
     //         label: "Add $ Sign Left Side Value 2",
     //         default: false,
     //         order: 3,
     //          section: "Efficiency",
     //       },
     //       percentSign3: {
     //         type: "boolean",
     //         label: "Add % Sign Left Side Value 2",
     //         default: false,
     //         order: 4,
     //          section: "Efficiency",
     //       },
     //
     //
     //
     //        efficiencyLeft3: {
     //          label: "Choose Left Side Value 3 for Efficiency",
     //          type: "string",
     //          display: "select",
     //          default: kpiFieldDefault,
     //          values: fieldOptions0,
     //          section: "Efficiency",
     //          order: 5,
     //        },
     //
     //        write11: {
     //           type: "string",
     //           label: "Override Left Side Value 3 for Efficiency",
     //           default: "",
     //           order: 6,
     //           section: "Efficiency"
     //         },
     //
     //        efficiencyRight: {
     //          label: "Choose Right Side Value for Efficiency",
     //          type: "string",
     //          display: "select",
     //          default: kpiFieldDefault,
     //          values: fieldOptions0,
     //          section: "Efficiency",
     //          order: 7,
     //        },
     //
     //
     //        right3: {
     //          type: "boolean",
     //          label: "Add % Sign Right Side Value for Efficiency",
     //          default: false,
     //          order: 8,
     //          section: "Efficiency",
     //        },
     //
     //
     //        iya3: {
     //          type: "boolean",
     //          label: "IYA",
     //          default: false,
     //          order: 9,
     //          section: "Efficiency",
     //        },

      //
      // color_title: {
      //   type: 'array',
      //   label: 'Background Color',
      //   display: 'colors',
      //   default: ['#f7f8f9','#0066ff', '#a2c4c9', '#00363d', '#dd3333', '#80ce5d', '#f78131', '#369dc1', '#c572d3', '#36c1b3', '#b57052', '#ed69af'],
      //   order: 4,
      //   section: "Style",
      // },







  bodyStyle: {
      type: "string",
      label: "Choose Font",
      display: "select",
      values: [{ "Roboto": "'Roboto'" } , { "Open Sans": "'Open Sans'" }, {"Montserrat" : "'Montserrat'"}, {"IBM Plex Sans" :  "'IBM Plex Sans'"},{"DM Serif Text": "DM Serif Text"}],

      default: "'Roboto', sans-serif",
      order: 7,
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
