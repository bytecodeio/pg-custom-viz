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


      reachLeft1: {
        label: "Choose Label for Reach 1",
        type: "string",
        display: "select",
        default: '',
        values: fieldOptions2,
        section: "Reach",
        order: 0,
      },


      reachLeft2: {
        label: "Choose Value for Reach 1",
        type: "string",
        display: "select",
        default: '',
        values: fieldOptions0,
        section: "Reach",
        order: 2,
      },


      reachLeft3: {
        label: "Choose Subtitle for Reach 1",
        type: "string",
        display: "select",
        default:'',
        values: fieldOptions0,
        section: "Reach",
        order: 5,
      },


      reachRight: {
        label: "Choose Right Side for Reach 1",
        type: "string",
        display: "select",
        default: '',
        values: fieldOptions0,
        section: "Reach",
        order: 7,
      },

      right1: {
        type: "boolean",
        label: "% for Reach 1",
        default: false,
        order: 8,
       section: "Reach",
      },

      iya1: {
        type: "boolean",
        label: "IYA for Reach 1",
        default: false,
        order: 9,
       section: "Reach",
      },




      reach2Left1: {
        label: "Choose Label for Reach 2",
        type: "string",
        display: "select",
        default: '',
        values: fieldOptions2,
        section: "Reach",
        order: 10,
      },


      reach2Left2: {
        label: "Choose Value 2 for Reach 2",
        type: "string",
        display: "select",
        default: '',
        values: fieldOptions0,
        section: "Reach",
        order: 11,
      },


      reach2Left3: {
        label: "Choose Subtitle for Reach 2",
        type: "string",
        display: "select",
        default: '',
        values: fieldOptions0,
        section: "Reach",
        order: 12,
      },


      reach2Right: {
        label: "Choose Right Side Value for Reach 2",
        type: "string",
        display: "select",
        default: '',
        values: fieldOptions0,
        section: "Reach",
        order: 13,
      },

      reach2right1: {
        type: "boolean",
        label: "% for Reach 2",
        default: false,
        order: 14,
       section: "Reach",
      },

      reach2iya1: {
        type: "boolean",
        label: "IYA for Reach 2",
        default: false,
        order: 15,
       section: "Reach",
      },



            reach3Left1: {
              label: "Choose Label for Reach 3",
              type: "string",
              display: "select",
              default: '',
              values: fieldOptions2,
              section: "Reach",
              order: 16,
            },


            reach3Left2: {
              label: "Choose Value 2 for Reach 3",
              type: "string",
              display: "select",
              default: '',
              values: fieldOptions0,
              section: "Reach",
              order: 17,
            },


            reach3Left3: {
              label: "Choose Subtitle for Reach 3",
              type: "string",
              display: "select",
              default: '',
              values: fieldOptions0,
              section: "Reach",
              order: 18,
            },


            reach3Right: {
              label: "Choose Right Side Value for Reach 3",
              type: "string",
              display: "select",
              default: '',
              values: fieldOptions0,
              section: "Reach",
              order: 19,
            },

            reach3right1: {
              type: "boolean",
              label: "% for Reach 3",
              default: false,
              order: 20,
             section: "Reach",
            },

            reach3iya1: {
              type: "boolean",
              label: "IYA for Reach 3",
              default: false,
              order: 21,
             section: "Reach",
            },


            //
            // write5: {
            //    type: "string",
            //    label: "Override Left Side Value 1 for Effectiveness",
            //    default: "",
            //    order: 1,
            //    section: "Effectiveness",
            //  },
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
            // write7: {
            //    type: "string",
            //    label: "Override Left Side Value 3 for Effectiveness",
            //    default: "",
            //    order: 6,
            //    section: "Effectiveness",
            //  },





      effectivenessLeft1: {
        label: "Choose Label for Effectiveness 1",
        type: "string",
        display: "select",
        default: '',
        values: fieldOptions2,
        section: "Effectiveness",
        order: 0,
      },

      effectivenessLeft2: {
        label: "Choose Value for Effectiveness 1",
        type: "string",
        display: "select",
        default: '',
        values: fieldOptions0,
        section: "Effectiveness",
        order: 1,
      },

      effectivenessLeft3: {
        label: "Choose Subtitle for Effectiveness 1",
        type: "string",
        display: "select",
        default: '',
        values: fieldOptions0,
        section: "Effectiveness",
        order: 2,
      },

      effectivenessRight: {
        label: "Choose Right Side Value for Effectiveness 1",
        type: "string",
        display: "select",
        default: '',
        values: fieldOptions0,
        section: "Effectiveness",
        order: 3,
      },
      right2: {
        type: "boolean",
        label: "Add % Sign Right Side Value for Effectiveness 1",
        default: false,
        order: 4,
        section: "Effectiveness",
      },

      iya2: {
        type: "boolean",
        label: "IYA for Effectiveness 1",
        default: false,
        order: 5,
        section: "Effectiveness",
      },


      effectiveness2Left1: {
        label: "Choose Label for Effectiveness 2",
        type: "string",
        display: "select",
        default: '',
        values: fieldOptions2,
        section: "Effectiveness",
        order: 6,
      },

      effectiveness2Left2: {
        label: "Choose Value for Effectiveness 2",
        type: "string",
        display: "select",
        default: '',
        values: fieldOptions0,
        section: "Effectiveness",
        order: 7,
      },

      effectiveness2Left3: {
        label: "Choose Subtitle for Effectiveness 2",
        type: "string",
        display: "select",
        default: '',
        values: fieldOptions0,
        section: "Effectiveness",
        order: 8,
      },

      effectiveness2Right: {
        label: "Choose Right Side Value for Effectiveness 2",
        type: "string",
        display: "select",
        default: '',
        values: fieldOptions0,
        section: "Effectiveness",
        order: 9,
      },
      effectiveness2right2: {
        type: "boolean",
        label: "% for Effectiveness 2",
        default: false,
        order: 10,
        section: "Effectiveness",
      },

      effectiveness2iya2: {
        type: "boolean",
        label: "IYA for Effectiveness 2",
        default: false,
        order: 11,
        section: "Effectiveness",
      },


      effectiveness3Left1: {
        label: "Choose Label for Effectiveness 3",
        type: "string",
        display: "select",
        default: '',
        values: fieldOptions2,
        section: "Effectiveness",
        order: 12,
      },

      effectiveness3Left2: {
        label: "Choose Value for Effectiveness 3",
        type: "string",
        display: "select",
        default: '',
        values: fieldOptions0,
        section: "Effectiveness",
        order: 13,
      },

      effectiveness3Left3: {
        label: "Choose Subtitle for Effectiveness 3",
        type: "string",
        display: "select",
        default: '',
        values: fieldOptions0,
        section: "Effectiveness",
        order: 14,
      },

      effectiveness3Right: {
        label: "Choose Right Side Value for Effectiveness 3",
        type: "string",
        display: "select",
        default: '',
        values: fieldOptions0,
        section: "Effectiveness",
        order: 15,
      },
      effectiveness3right2: {
        type: "boolean",
        label: "% for Effectiveness 3",
        default: false,
        order: 16,
        section: "Effectiveness",
      },

      effectiveness3iya2: {
        type: "boolean",
        label: "IYA for Effectiveness 3",
        default: false,
        order: 17,
        section: "Effectiveness",
      },


              efficiencyLeft1: {
              label: "Choose Label for Efficiency 1",
              type: "string",
              display: "select",
              default: '',
              values: fieldOptions2,
              section: "Efficiency",
              order: 0,
            },




            efficiencyLeft2: {
              label: "Choose Value for Efficiency 1",
              type: "string",
              display: "select",
              default: '',
              values: fieldOptions0,
              section: "Efficiency",
              order: 2,
            },

           //  dollar3: {
           //   type: "boolean",
           //   label: "Add $ Sign Left Side Value 2",
           //   default: false,
           //   order: 3,
           //    section: "Efficiency",
           // },
           // percentSign3: {
           //   type: "boolean",
           //   label: "Add % Sign Left Side Value 2",
           //   default: false,
           //   order: 4,
           //    section: "Efficiency",
           // },



            efficiencyLeft3: {
              label: "Choose Subtitle for Efficiency 1",
              type: "string",
              display: "select",
              default: '',
              values: fieldOptions0,
              section: "Efficiency",
              order: 5,
            },

            // write11: {
            //    type: "string",
            //    label: "Override Left Side Value 3 for Efficiency",
            //    default: "",
            //    order: 6,
            //    section: "Efficiency"
            //  },

            efficiencyRight: {
              label: "Choose Right Side Value for Efficiency 1",
              type: "string",
              display: "select",
              default: '',
              values: fieldOptions0,
              section: "Efficiency",
              order: 7,
            },


            right3: {
              type: "boolean",
              label: "% for Efficiency 1",
              default: false,
              order: 8,
              section: "Efficiency",
            },


            iya3: {
              type: "boolean",
              label: "IYA for Efficiency 1",
              default: false,
              order: 9,
              section: "Efficiency",
            },



                  efficiency2Left1: {
                    label: "Choose Label for Efficiency 2",
                    type: "string",
                    display: "select",
                    default: '',
                    values: fieldOptions2,
                    section: "Efficiency",
                    order: 10,
                  },

                  efficiency2Left2: {
                    label: "Choose Value for Efficiency 2",
                    type: "string",
                    display: "select",
                    default: '',
                    values: fieldOptions0,
                    section: "Efficiency",
                    order: 11,
                  },

                  efficiency2Left3: {
                    label: "Choose Subtitle for Efficiency 2",
                    type: "string",
                    display: "select",
                    default: '',
                    values: fieldOptions0,
                    section: "Efficiency",
                    order: 12,
                  },

                  efficiency2Right: {
                    label: "Choose Right Side Value for Efficiency 2",
                    type: "string",
                    display: "select",
                    default: '',
                    values: fieldOptions0,
                    section: "Efficiency",
                    order: 13,
                  },
                  efficiency2right2: {
                    type: "boolean",
                    label: "% for Efficiency 2",
                    default: false,
                    order: 14,
                    section: "Efficiency",
                  },

                  efficiency2iya2: {
                    type: "boolean",
                    label: "IYA for Efficiency 2",
                    default: false,
                    order: 15,
                    section: "Efficiency",
                  },


                  efficiency3Left1: {
                    label: "Choose Label for Efficiency 3",
                    type: "string",
                    display: "select",
                    default: '',
                    values: fieldOptions2,
                    section: "Efficiency",
                    order: 16,
                  },

                  efficiency3Left2: {
                    label: "Choose Value for Efficiency 3",
                    type: "string",
                    display: "select",
                    default: '',
                    values: fieldOptions0,
                    section: "Efficiency",
                    order: 17,
                  },

                  efficiency3Left3: {
                    label: "Choose Subtitle for Efficiency 3",
                    type: "string",
                    display: "select",
                    default: '',
                    values: fieldOptions0,
                    section: "Efficiency",
                    order: 18,
                  },

                  efficiency3Right: {
                    label: "Choose Right Side Value for Efficiency 3",
                    type: "string",
                    display: "select",
                    default: '',
                    values: fieldOptions0,
                    section: "Efficiency",
                    order: 19,
                  },
                  efficiency3right2: {
                    type: "boolean",
                    label: "% for Efficiency 3",
                    default: false,
                    order: 20,
                    section: "Efficiency",
                  },

                  efficiency3iya2: {
                    type: "boolean",
                    label: "IYA for Efficiency 1",
                    default: false,
                    order: 21,
                    section: "Efficiency",
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

    //
    // hide1: {
    //   type: "boolean",
    //   label: "Hide Bubble in Reach",
    //   default: false,
    //   order: 1,
    //   section: "Hidden",
    // },
    //
    // hide2: {
    //   type: "boolean",
    //   label: "Hide Bubble in Effectiveness",
    //   default: false,
    //   order: 2,
    //   section: "Hidden",
    // },
    //
    // hide3: {
    //   type: "boolean",
    //   label: "Hide Bubble in Efficiency",
    //   default: false,
    //   order: 3,
    //   section: "Hidden",
    // },


    toHide1: {
      type: "string",
       label: "Reach to Hide (use comma as delimiter: 1,2,3)",
       default: "",
       display: "text",
       section: "Hide",
       order: 1,
    },

    toHide2: {
      type: "string",
       label: "Effectiveness to Hide (use comma as delimiter: 1,2,3)",
       default: "",
       display: "text",
       section: "Hide",
       order: 2,
    },

    toHide3: {
      type: "string",
       label: "Efficiency to Hide (use comma as delimiter: 1,2,3)",
       default: "",
       display: "text",
       section: "Hide",
       order: 3,
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
