
import * as React from "react";
import * as ReactDOM from "react-dom";
import { CustomTable } from "./CustomTable";
import PaginationComponent from "./PaginationComponent";

looker.plugins.visualizations.add({
  create: function (element, config) {

  },

updateAsync: function (data, element, config, queryResponse, details, done) {

const { dimension_like: dimensionLike } = queryResponse.fields;

const dimensions = dimensionLike.map((dimension) => ({
   label: dimension.label_short ?? dimension.label,
   name: dimension.name


 }));



 const { measure_like: measureLike } = queryResponse.fields;


 const measures = measureLike.map((measure) => ({
   label: measure.label_short ?? measure.label,
   name: measure.name,
 }));



 const fieldOptions = [...dimensions, ...measures].map((dim) => ({
     [dim.label]: queryResponse.data.map(row => row[dim.name].value).join(",")
   }));


    const options = {

      textTitle: {
        type: "string",
        label: "Choose Title from Dropdown",
        display: "select",
        placeholder: "Please Select",
        values: fieldOptions,
        order: 0,
        default:"Please Select",
        section: "Style",
      },

      backgroundViz: {
        type: 'array',
        label: 'Background Color',
        display: 'colors',
        default: ['#06f', '#00363d', '#17494d', '#498283', '#bdd9d7', '#aecfc2', '#d1e8df', '#edf8f4', '#f5fcfc'],
        order: 1,
        section: "Style",
      },

      color_title: {
        type: 'array',
        label: 'Tiles Background Color',
        display: 'colors',
        default: ['#fff','#06f', '#00363d', '#17494d', '#498283', '#bdd9d7', '#aecfc2', '#d1e8df', '#edf8f4', '#f5fcfc'],
        order: 2,
        section: "Style",
      },

      titleColor: {
      type: "string",
      label: "Title Color",
      default: "#fff",
      display: "text",
      placeholder: "#fff",

      order: 3,
      section: "Style",
    },

      writeTitle: {
        type: "string",
        label: "Write Title Text Instead",
        default: "",
        order: 4,
        section: "Style",
      },


      fontColor: {
      type: "string",
      label: "Font Color",
      default: "#000",
      display: "text",
      placeholder: "#000",

      order: 5,
      section: "Style",
    },


    topFont: {
    type: "string",
    label: "Top Font Size",
    default: "19px",
    display: "text",
    placeholder: "19px",

    order: 6,
    section: "Style",
  },

  bottomFont: {
  type: "string",
  label: "Bottom Font Size",
  default: "24px",
  display: "text",
  placeholder: "24px",

  order: 6,
  section: "Style",
},


     fixedHeight: {
      type: "boolean",
      label: "Table Fixed Height",
      default: true,
      order: 8,
      section: "Style",
    },

    hidePag: {
     type: "boolean",
     label: "Hide Pagination",
     default: true,
     order: 9,
    section: "Style",
    },
    unsetTable: {
     type: "boolean",
     label: "Make Table Column Width Unset",
     default: true,
     order: 10,
     section: "Style",
    },

    removeScroll: {
     type: "boolean",
     label: "Remove Scroll and Auto Fit",
     default: false,
     order: 10,
     section: "Style",
    },


    border: {
     type: "boolean",
     label: "Remove Border",
     default: false,
     order: 12,
      section: "Style",
    },

      bodyStyle: {
          type: "string",
          label: "Choose Font",
          display: "select",
          values: [{ "Roboto": "'Roboto'" } , { "Open Sans": "'Open Sans'" }, {"Montserrat" : "'Montserrat'"}],
          section: "Style",
          default: "'Roboto', sans-serif;",
          order: 29,
        },
        hideTitle: {
          type: "boolean",
          label: "Hide Title",
          default: false,
          order: 30,
          section: "Style",
        },

        columnsToHide: {
            type: "string",
           label: "Columns to Hide (use comma as delimiter)",
           default: "",
           display: "text",
           section: "Style",
           order: 32,
        },



        buttonColor: {
          type: "string",
          label: "Background Color",
          default: "#06f",
          display: "text",
          placeholder: "#06f",

          order: 2,
          section: "Style",

        },


        addFirst: {
          type: "string",
          label: "Write 1st Link Title",
          default: "",
          order: 1,
          section: "Dropdown",
        },

        addFirsthref: {
          type: "string",
          label: "Write 1st Link href",
          default: "",
          order: 2,
          section: "Dropdown",
        },

        writeTooltip: {
          type: "string",
          label: "Write Tooltip Link 1",
          default: "",
          order: 3,
          section: "Dropdown",
        },

        addSecond: {
          type: "string",
          label: "Write 2nd Link Title",
          default: "",
          order: 4,
          section: "Dropdown",
        },

        addSecondhref: {
          type: "string",
          label: "Write 2nd Link href",
          default: "",
          order: 5,
          section: "Dropdown",
        },

        writeTooltip2: {
          type: "string",
          label: "Write Tooltip Link 2",
          default: "",
          order: 6,
          section: "Dropdown",
        },

        addThird: {
          type: "string",
          label: "Write 3rd Link Title",
          default: "",
          order: 7,
          section: "Dropdown",
        },

        addThirdhref: {
          type: "string",
          label: "Write 3rd Link href",
          default: "",
          order: 8,
          section: "Dropdown",
        },

        writeTooltip3: {
          type: "string",
          label: "Write Tooltip Link 3",
          default: "",
          order: 9,
          section: "Dropdown",
        },


        addFourth: {
          type: "string",
          label: "Write 4th Link Title",
          default: "",
          order: 10,
          section: "Dropdown",
        },

        addFourthhref: {
          type: "string",
          label: "Write 4th Link href",
          default: "",
          order: 11,
          section: "Dropdown",
        },

        writeTooltip4: {
          type: "string",
          label: "Write Tooltip Link 4",
          default: "",
          order: 12,
          section: "Dropdown",
        },


        addFifth: {
          type: "string",
          label: "Write 5th Link Title",
          default: "",
          order: 13,
          section: "Dropdown",
        },

          addFifthhref: {
          type: "string",
          label: "Write 5th Link href",
          default: "",
          order: 14,
          section: "Dropdown",
        },

        writeTooltip5: {
          type: "string",
          label: "Write Tooltip Link 5",
          default: "",
          order: 15,
          section: "Dropdown",
        },


        button1: {
          type: "string",
          label: "Button 1 Link Title",
          default: "",
          order: 1,
          section: "Buttons",
        },

          button1link: {
          type: "string",
          label: "Button 1 Link href",
          default: "",
          order: 2,
          section: "Buttons",
        },

        button2: {
          type: "string",
          label: "Button 2 Link Title",
          default: "",
          order: 3,
          section: "Buttons",
        },

          button2link: {
          type: "string",
          label: "Button 2 Link href",
          default: "",
          order: 4,
          section: "Buttons",
        },



        button3: {
          type: "string",
          label: "Button 3 Link Title",
          default: "",
          order: 5,
          section: "Buttons",
        },

          button3link: {
          type: "string",
          label: "Button 3 Link href",
          default: "",
          order: 6,
          section: "Buttons",
        },



        button4: {
          type: "string",
          label: "Button 4 Link Title",
          default: "",
          order: 7,
          section: "Buttons",
        },

          button4link: {
          type: "string",
          label: "Button 4 Link href",
          default: "",
          order: 8,
          section: "Buttons",
        },



        button5: {
          type: "string",
          label: "Button 5 Link Title",
          default: "",
          order: 9,
          section: "Buttons",
        },

          button5link: {
          type: "string",
          label: "Button 5 Link href",
          default: "",
          order: 10,
          section: "Buttons",
        },



        button6: {
          type: "string",
          label: "Button 6 Link Title",
          default: "",
          order: 11,
          section: "Buttons",
        },

          button6link: {
          type: "string",
          label: "Button 6 Link href",
          default: "",
          order: 12,
          section: "Buttons",
        },


        button7: {
          type: "string",
          label: "Button 7 Link Title",
          default: "",
          order: 13,
          section: "Buttons",
        },

          button7link: {
          type: "string",
          label: "Button 7 Link href",
          default: "",
          order: 14,
          section: "Buttons",
        },


        button8: {
          type: "string",
          label: "Button 8 Link Title",
          default: "",
          order: 15,
          section: "Buttons",
        },

          button8link: {
          type: "string",
          label: "Button 8 Link href",
          default: "",
          order: 16,
          section: "Buttons",
        },




  }




 this.trigger("registerOptions", options);

    ReactDOM.render(

      <CustomTable
        data={data}
        config={config}
        queryResponse={queryResponse}
        details={details}
        done={done}
      />

      ,

      element
    );

  done()
  },
});
