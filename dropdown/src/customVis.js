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

    const options = {



titleColor: {
  type: "string",
  label: "Background Color",
  default: "#06f",
  display: "text",
  placeholder: "#06f",

  order: 2,
  section: "Style",

},

writeTooltip: {
  type: "string",
  label: "Write Tooltip Link 1",
  default: "",
  order: 3,
  section: "Style",
},

writeTooltip2: {
  type: "string",
  label: "Write Tooltip Link 2",
  default: "",
  order: 4,
  section: "Style",
},

addThird: {
  type: "string",
  label: "Write 3rd Link Title",
  default: "",
  order: 5,
  section: "Style",
},

addThirdhref: {
  type: "string",
  label: "Write 3rd Link href",
  default: "",
  order: 6,
  section: "Style",
},

writeTooltip3: {
  type: "string",
  label: "Write Tooltip Link 3",
  default: "",
  order: 7,
  section: "Style",
},

  bodyStyle: {
      type: "string",
      label: "Choose Font",
      display: "select",
      values: [{ "Roboto": "'Roboto'" } , { "Open Sans": "'Open Sans'" }, {"Montserrat" : "'Montserrat'"}, {"IBM Plex Sans" :  "'IBM Plex Sans'"},{"DM Serif Text": "DM Serif Text"}],

      default: "'Roboto', sans-serif",
      order: 8,
        section: "Style",
    },



  };


 this.trigger("registerOptions", options);

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
