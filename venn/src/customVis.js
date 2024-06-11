import * as React from "react";
import * as ReactDOM from "react-dom";
import 'regenerator-runtime/runtime'
import { Home } from "./Home";

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
          name: measure.name
        }));


        const fieldOptions = [...dimensions1, ...measures1].map((dim) => ({
          [dim.label]: queryResponse.data.map(row => row[dim.name].value).join(",")
        }));


        const fieldOptions2 = [...dimensions1, ...measures1].map((dim) => ({
          [dim.label]: dim.label
        }));



        const measures = measureLike.map((measure) => ({
          label: measure.label_short ?? measure.label,
          name: measure.name,
        }));

        const dimensions = dimensionLike.map((dimension) => ({
          label: dimension.label_short ?? dimension.label,
          name: dimension.name,
        }));


        const fieldOptions0 = [...dimensions, ...measures].map((all) => ({
          [all.label]: all.name
        }));
        //
        // console.log(fieldOptions)
        // console.log(fieldOptions0)
        // console.log(fieldOptions2)

    const options = {

      chooseLabel: {
        label: "Choose 5 Labels",
        type: "string",
        display: "select",
        default: "",
        values: fieldOptions0,

        order: 1,
        section: "Values",
      },



      reachPercentage: {
        label: "Choose 5 Reach Percentage",
        type: "string",
        display: "select",
        default: "",
        values: fieldOptions0,

        order: 2,
        section: "Values",
      },


investment: {
label: "Choose Reach Overlap String Values",
type: "string",
display: "select",
default: "",
values: fieldOptions0,

order: 3,
section: "Values",
},


numbers: {
label: "Choose Reach Overlap Number Values",
type: "string",
display: "select",
default: "",
values: fieldOptions0,

order: 4,
section: "Values",
},


writeTitle: {
  type: "string",
  label: "Title Override",
  default: "",
  order: 0,
  section: "Style",

},


hideTitle: {
  type: "boolean",
  label: "Hide Title",
  default: false,
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



  bodyStyle: {
      type: "string",
      label: "Choose Font",
      display: "select",
      values: [{ "Roboto": "'Roboto'" } , { "Open Sans": "'Open Sans'" }, {"Montserrat" : "'Montserrat'"}, {"IBM Plex Sans" :  "'IBM Plex Sans'"},{"DM Serif Text": "DM Serif Text"}],

      default: "'Roboto', sans-serif",
      order: 7,
        section: "Style",
    },


    across: {
      type: "boolean",
      label: "Change Layout to Horizontal",
      default: false,
      order: 9,
      section: "Style",
    },




  };


 this.trigger("registerOptions", options);



// get dimensions and measures
const { dimension_like, measure_like, pivots } = queryResponse.fields;
const fields = {
  dimensions: dimension_like.map((d) => d.name),
  dimensionsLabel: dimension_like.map((d) => d.label_short),
  measures: measure_like.map((m) => m.name),
  measuresLabel: measure_like.map((m) => m.label_short),
  pivots: pivots?.map((p) => p.name),
};

// console.log(fields, "fields")

    ReactDOM.render(
      <Home
        data={data}
        config={config}
        queryResponse={queryResponse}
        details={details}
      />,

      element
    );

  done()
  },
});
