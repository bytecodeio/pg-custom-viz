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



    function filterNullValues(data) {
      return data.filter(item => {
        // Loop through each key-value pair within the object
        for (const key in item) {
          if (item[key] && typeof item[key] === 'object' && item[key].hasOwnProperty('value')) {
            // If the value is an object with a "value" property, check for null
            item[key].value = item[key].value === null ? 0 : item[key].value;
          }
        }
        return true; // Always return true to keep all items (modified if needed)
      });
    }

    const filteredData = filterNullValues(data);



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



        //  function checkZeroValues(fieldOptions) {
        //  let zeroCount = 0;
        //
        //  for (const option of fieldOptions) {
        //    const values = option[Object.keys(option)[0]].split(","); // Get the first key and split the value
        //
        //
        //    console.log(values)
        //
        //    // Count zeros in each value string
        //    zeroCount += values.filter(value => value === "0").length;
        //
        //    // Break if zero count exceeds 3 to improve efficiency
        //    if (zeroCount > 2) {
        //      break;
        //    }
        //  }
        //
        //  if (zeroCount > 2) {
        //    this.addError({
        //      title: "Incompatible Data",
        //      message: "This chart requires one dimension and one numerical measure.",
        //    });
        //    return;
        //  }
        // }
        //
        // checkZeroValues(fieldOptions);



        // console.log(fieldOptions)
        // // console.log(fieldOptions0)
        // // console.log(fieldOptions2)

    const options = {

      chooseLabel: {
        label: "Choose Labels",
        type: "string",
        display: "select",
        default: "",
        values: fieldOptions0,

        order: 1,
        section: "Values",
      },



      reachPercentage: {
        label: "Choose Reach Percentage",
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


// if (!hasOneDimension || !hasOneMeasure || !isMeasureNumeric) {
//   this.addError({
//     title: "Incompatible Data",
//     message: "This chart requires one dimension and one numerical measure.",
//   });
//   return;
// }
//


function checkZeroValues(fieldOptions) {
  let zeroCount = 0;

  for (const option of fieldOptions) {
    const values = option[Object.keys(option)[0]].split(","); // Get the first key and split the value

    // Count zeros in each value string
    zeroCount += values.filter(value => value === "0").length;



    // Break if zero count exceeds 2 to improve efficiency
    if (zeroCount > 2) {
      break;
    }
  }

  return zeroCount; // Return the zero count
}

const zeroCount = checkZeroValues(fieldOptions);



if (zeroCount > 2) {
  this.addError({
    title: "Incompatible Data",
    message: "This chart requires you to not have values that are not null or zero",
  });
  return; // Optional: Return if you need to stop execution after adding the error
}


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
