import React, {
  Fragment,
  cloneElement,
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";

import styled from "styled-components";
import "./style.css";
import {
  useTable,
  useBlockLayout,
  useResizeColumns,
  usePagination,
  useSortBy,
} from "react-table";

import { columnSize } from "@looker/components/DataTable/Column/columnSize";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Sparklines,
  SparklinesLine,
  SparklinesCurve,
  SparklinesReferenceLine,
  SparklinesNormalBand,
  SparklinesSpots,
  SparklinesBars,
} from "react-sparklines";

import Pagination from "@mui/material/Pagination";
import { ProgressBar, Button, ButtonGroup, Form, Row, Col, Container, Overlay, OverlayTrigger, Popover, PopoverBody, PopoverHeader, Dropdown, DropdownButton, Tooltip } from "react-bootstrap";
import { TablePagination } from "@mui/material";


const Styles = ({ children, config }) => {
  var { thColor, thFontSize, tableBordered, fixedHeight, unsetTable, hidePag, removeBars, rightPag, index, border, unsetWidth, titleColor,  toolOn, bodyStyle, hideTitle, tableFontSize, columnsToHide, freeze, wrapText, freeze3, short, color_title, backgroundViz, fontColor, topFont, bottomFont, removeScroll, removeScroll5, removeScroll6, writeTooltip, writeTooltip2, addThird, addThirdhref,  writeTooltip3, buttonColor} = config;

  const StyledWrapper = styled.div`

  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');

  @import url('https://fonts.googleapis.com/css?family=Open+Sans:wght@100;300;400;500;700;900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');

  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,100;1,700&display=swap');


  @import url("https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css");


  .transparentText{
    visibility: hidden;
  }


  #vis-container {
      height: 100%;
      max-height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;

      font-weight: 300;
      justify-content:center;

 }
  #vis {
      min-height: 500px;
        justify-content:center;
        display: flex;
        flex-direction: column;
        align-items:center;


 }


  #spark1 svg, #spark2 svg, #spark3 svg {
      overflow: visible;
      width: 100%;
      max-width: 200px;
 }
  #spark1 circle {
      fill: transparent !important;
 }
  #spark2 circle {

 }
  #spark1 svg path {
      stroke-width: 2px !important;
 }
  #spark2 svg polyline {
 }
  .redGradient {
      fill: rgb(199, 32, 10) !important;
 }

  thead th {

      color: ${thColor};
      font-weight: 400;

      text-align: left;
 }
  tbody > tr > td {
      vertical-align: middle;
      font-size:12px
 }
  .table tbody > tr > td, .table tbody > tr > th, .table tfoot > tr > td, .table tfoot > tr > th, .table thead > tr > td, .table thead > tr > th {
      border: none;
 }
  table img {
      width: 33px !important;
 }
  .moveRight {
      margin: 0em 0em 0em 0.5em !important;

 }
  .d-flex {
      display: flex;
 }
  .align-items-center {
      align-items: center;
 }
  .flex-column {
      flex-direction: column;
 }
  .img-fluid {
      max-width: 100%;
      height: auto;
 }
  h3 {
      color: #1d1e20 !important;
      font-size: 13px !important;
      margin-bottom: 0 !important;
      color: #1d1e20 !important;
      font-weight: 400 !important;

      margin-top: 0 !important;
      min-width: 2rem;
 }
  .var h3 {
      width: 2em;
 }
  p.small {
      color: #72777e !important;
      font-weight: 300 !important;
      font-size: 11px !important;

 }
  p {
      margin: 0rem !important;
 }
  p.black {
      color: black !important;
 }
  span.type {
      font-size: 12px;
      border-radius: 0.25rem;
      padding: 0.25em 0.55em;
 }
  span.type.positive {
      background: #eef8e8;
      color: #39800b;
 }
  span.type.positive i {
      transform: rotate(45deg);
 }
  span.type.negative {
      background: #fbe7e5;
      color: #c7200a;
 }
  span.type.negative i {
      transform: rotate(135deg);
 }
  li.tag {
      font-size: 11px;
      padding: 0.25em 1.55em;
      border-radius: 1rem;
      color: #1d1e20;
      font-weight: 400;
      display: flex;
      justify-content: center;
      align-items: center;
 }
  li.tag:first-child {
 }
  .neutral {
      background: #e8edf3;
      max-width: 5em;
 }
  .branded {
      background: #ccccff;
      max-width: 5em;
 }
  .critical {
      background: #fdb6b0;
      max-width: 5em;
 }
  .warning {
      background: #ffd87f;
      position: relative;
      padding: 0.25em 0.75em 0.25em 1.55em !important;
 }
  .warning::before {
      font-family: "Font Awesome 5 Pro";
      position: absolute;
      content: "\f06a";
      display: inline-block;
      left: 5px;
      top: 4px;
 }
  .success {
      background: #d1ecc0;
      max-width: 5em;
 }
  .informational {
      background: #b6dff7;
      position: relative;
      padding: 0.25em 0.75em 0.25em 1.55em !important;
 }
  .informational::before {
      font-family: "Font Awesome 5 Pro";
      position: absolute;
      content: "\f05a";
      display: inline-block;
      left: 5px;
      top: 4px;
 }
  #sentimentInfo, #tagInfo {
      padding-left: 1em;
 }
  .neg {
      color: #c7200a;
      font-size: 12px;
      position: relative;
 }
  .neg::before {
      font-family: "Font Awesome 5 Pro";
      position: absolute;
      content: "\f119";
      display: inline-block;
      left: -15px;
      top: 2px;
 }
  .pos {
      color: #008759;
      font-size: 12px;
      position: relative;
 }
  .pos::before {
      font-family: "Font Awesome 5 Pro";
      position: absolute;
      content: "\f118";
      display: inline-block;
      left: -15px;
      top: 2px;
 }
  .neut {
      color: #ff9e00;
      font-size: 12px;
      position: relative;
 }
  .neut::before {
      font-family: "Font Awesome 5 Pro";
      position: absolute;
      content: "\f11a";
      display: inline-block;
      left: -15px;
      top: 2px;
 }
  p.sentiment {
      font-size: 12px;
 }
  .mr-2 {
      margin-right: 0.55rem;
 }
  .pr-1 {
      padding-right: 0.25rem;
 }
  .progress {
      --bs-progress-height: 24px !important;
      --bs-progress-font-size: 0.1rem !important;
      --bs-progress-bg: transparent;
      --bs-progress-border-radius: 2px !important;
      --bs-progress-bar-color: #fff;
      --bs-progress-bar-bg: #6253da !important;
      max-width: 180px !important;
 }
  .skinny .progress {
      --bs-progress-height: 8px !important;
      --bs-progress-font-size: 0.1rem !important;
      --bs-progress-bg: #e5e5e5 !important;
      --bs-progress-border-radius: 100px !important;
      width: 200px !important;
 }
  .skinny .progress-bar {
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      color: blue;
      text-align: center;
      white-space: nowrap;
 }
  .progress-label {
      color: #000000;
      font-size: 10px;
      font-weight: 300;
 }
  .positiveBlock {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #39800b;
      font-size: 14px;
      font-weight: 600;
      padding-left: 1em;
 }
  .positiveBlock:before {
      position: absolute;
      content: "";
      width: 5em;
      left: 0;
      z-index: 1;
      background-color: rgba(209, 236, 192, 0.5);
      height: 100%;
      min-height: 4em;
 }
  .negativeBlock:before {
      position: absolute;
      content: "";
      width: 5em;
      left: 0;
      z-index: 1;
      background-color: rgba(253, 182, 176, 0.5);
      height: 100%;
      min-height: 4em;
 }
  .negativeBlock {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #c7200a;
      font-size: 14px;
      font-weight: 600;
      padding-left: 1em;
 }
  .positiveBlock p, .negativeBlock p {
      position: relative;
      z-index: 2;
 }
  #tagInfo ul {
      margin: 0;
      display: flex;
      justify-content: flex-start;
      margin-left: -3.5em;
      flex-wrap: wrap;
 }
  #tagInfo li {
      list-style: none;
      margin-bottom: 0.2rem;
      margin-right: 0.2rem;
 }
  td div {
      position: relative;
 }
  .react-bootstrap-table table {
      table-layout: unset !important;
 }



 .form-control {
    display: block;
    width: 100%;
    padding: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: unset;
    background-color: unset;
    background-clip: padding-box;
    border: none !important;
   appearance: none;
    border-radius: unset;
    max-width: 25px;
    font-size: 13px !important;
    display: flex;
    justify-content: center;
}

 .form-control:focus{
   box-shadow:none
 }

 .form-select{
   max-width: 62px;

    max-height: 35px;
  font-size: 13px !important;
  padding:.5em 1em;
 }

.rightSide{
  min-width:15%;
}

  .avatar {
      width: 40px !important;
      height: 40px !important;
      border-radius: 50%;
      object-fit: cover;
      object-position: center right;
 }
  tr {
      border-bottom: 1px solid #FCFBFA;
 }
  td {
      display: flex !important;
      align-items: center;
 }


tr:nth-child(odd) td{
  background: #FCFBFA !important
}

  .fixedHeight {

      overflow-x: auto;


  }
 }

 ::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 7px;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, .5);
  box-shadow: 0 0 1px rgba(255, 255, 255, .5);
}
  .bordered td {
      border-right: 1px solid #d0d9e1 !important;

      padding: 0.5rem;
      padding-left:1em;
      margin: 0;

    position: relative;
 }
  .bordered td:first-child {
      border-left: 1px solid #d0d9e1 !important;
 }
  .bordered .positiveBlock:before, .bordered .negativeBlock:before {
    width: 198px;
    left: -6px;
    min-height:4em;

 }
  .unsetTable .td,
  .unsetTable td,
  .unsetTable tr,
    .unsetTable th {


    width: 100% !important;


 }


  .unsetTable .table {
    display: table;

  }
  .unsetTable .td,
  .unsetTable td{

}

  .unsetTable::-webkit-scrollbar-track {
   border-radius: 0.125rem;
   background-color: lightgray;
   height: 0px;
 }
   .unsetTable::-webkit-scrollbar {
   width: 0.25rem;
   border-radius: 0.125rem;
     height: 0px;
 }
   .unsetTable::-webkit-scrollbar-thumb {
   border-radius: 0.125rem;
   background-color: gray;
      height: 0px;
 }

 .unsetTable .fixedHeight {


 }



.clear{
  background:transparent  !important;
}

.unsetTable .tr, .unsetTable tr {
    border-color: inherit;
    border-style: solid;
    border-width: 0;
    width: 100% !important;


}


.hidePag{
  display:none
}


#spark3{
  display:none
}

.removeBars #spark2{
  display:none
}

.removeBars #spark3{
  display:block
}

.rightPag {
display: flex;
justify-content: flex-end;
}

.rightPag .rightSide {
    min-width: 15%;
    margin-top: 0.5em;
}

.rightPag .bottomPagination{
  flex-direction:column;
  justify-content:flex-end !important
}



.fixAcross{
position: fixed;
width: 99%;
}

  thead {
      position: sticky;
      top: 0;
      z-index: 100;
 }
  .table {

      display: inline-block;
      border-spacing: 0;
      .th {
          font-size: 12px;
          text-transform: capitalize;

}
          text-align: left;
            border-right: none;
          font-weight: 700;
     }
      .td {

          text-align: left;

          min-height: unset !important;
          height:auto !important
     }
      .th, .td {
          margin: 0;
          padding: .6rem;

          position: relative;
          font-weight:300;
          height: 75px;

          width: 180px !important;
          font-size: 12px !important ;
     }


     .th{


height: auto;
display: flex !important;
align-items: center;
font-weight: 400;

     }


      .td:last-child {
          border-right: 0;
     }
      .resizer {
          display: inline-block;
          width: 10px;
          height: 100%;
          position: absolute;
          right: 0;
          top: 0;
          transform: translateX(50%);
          z-index: 1;
          touch-action: none;
          &.isResizing {
         }
     }
 }
  .footer-container {
      display: flex;
      text-align: center;
 }
  .button-previous {
      margin: 0;
      background: none;
      border-radius: 4px 0 0 4px;
      border: 1px solid #d0d9e1;
 }
  .button-next {
      background: none;
      border-radius: 0 4px 4px 0;
      border: 1px solid #d0d9e1;
 }
  button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
 }
  .input-page {
      height: 28px;
      margin: 0;
      background: none;
      text-align: center;
      border: 1px solid #d0d9e1;
 }

  .font-page-options {

      color: #A6A6A6 !important;
      font-weight: 100 !important;
      font-size: 13px !important;

      min-width: 70%;
      margin-right:.5em;
      line-height:1
 }
  .button-page {
      margin-left: 10px;
      border: 1px solid #d0d9e1;
      appearance: none;
      width: 32px;
      text-align: center;
      border-radius: 4px;
 }

 .numBack{
   background:#F7F5F5;
   border-radius:50%;
   padding:1em;
   display:flex;
   justify-content:center;
   align-items:center;
   height: 1em !important;
    width: 1em !important;
    margin-right:.5rem
 }

 .clearBack{
   background:transparent;
   border-radius:50%;
   padding:1em;
   display:flex;
   justify-content:center;
   align-items:center;
   height: 1em !important;
    width: 1em !important;
      margin-left:.25rem
 }

 .pagination span{
   font-size: 14px;
 }

  .pagination{
    margin-top:-1em
  }



 .clear{
   background:none !important;
   border:none;
   padding: 12px;
margin-top: 3px;
 }

.bold{
  font-weight:700
}

.hidden{
  display:none !important
}


.padding-0{
  padding: 0;

}

.scrunch{
  padding:0;
  margin-bottom:3rem;
  margin-top:.5rem;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;

}


.fixedTD{
max-width:120px !important;
}

 .th.smallerWidth:first-child {
 max-width:120px !important;
}


.aroundIt{


  height:auto


}

.removeBorder #height{
  border:none;
}

thead th{

  line-height: 1.2;
}

.greenBox{
  background: #00363d;
  padding: 0em 0.5em 1em 0.5em;
  text-align: center;
}
.greenBox p{
  color:white;
  font-weight: 500;
  font-size: 15px;
}

thead{
  border-bottom: 1px solid black;
  background:transparent
}

#height{


      margin: 2em auto 0 auto;
}
h5{
  color:white;

  position:relative;
  display: inline-block;

    margin-left: 10px;
}



a{
  color:black;

}


    .arrow{
     display:none !important
    }

    .redBackground::before {
        position: absolute;
        content: "";
        width: 100%;
        left: 0;
        z-index: 1;
        background-color: rgba(253, 182, 176, 0.2);
        height: 100%;
        right:0;
        top:0
    }




th, .th, td, .td{
  font-family:${bodyStyle ? bodyStyle : "'Roboto'"}
}

table>:not(caption)>*>* {
    padding: unset;
  }

.makeGray td,
.makeGray tr:nth-child(odd) td,
.makeGray .td,
.makeGray,
.makeGray2 td,
.makeGray2 tr:nth-child(odd) td,
.makeGray2 .td,
.makeGray2
{
  background: #f4f3f3 !important
}




.unsetTable td,
.unsetTable .td,
.unsetTable .th,
.unsetTable th{
  width: 100% !important;



      max-width: ${config.removeScroll ? "25%" : ""};

      min-width: ${config.removeScroll ? "12%" : "180px"};

}


.fixHeight .td{
  height:70px !important;

word-break: break-all !important
}
.wrapText td,
.wrapText .td{
word-break: break-all !important
}

.makeGray th,
.makeGray2 th,
.makeGray2 .td{
  width:160px !important
}


.short th,
.short .th,
.short td,
.short .td{


  width:${short ? `${short} !important` : "200px !important"};
  word-break: unset !important;
  height: auto !important;


}


.wrapText .short th,
.wrapText .short .th,
.wrapText .short td,
.wrapText .short .td
{

  word-break: break-all !important;


}


table .th,
.td,
tr:nth-child(odd) td {

    text-transform: capitalize;


    background:${color_title ? `${color_title[0]} !important` : "#fff !important"};
    color: ${fontColor ? `${fontColor} !important` : "#000 !important"};
    justify-content: center;
    text-align: center;
    margin: 0px 8px;
}

 tr {
    border-bottom: none;
}


 thead {
    border-bottom: none;
    background: transparent;
}

td a {
  font-size: 22px !important;
}

.th {
  border-top-right-radius:8px;
  border-top-left-radius:8px;
  padding-top:26px
}

.td  {
  border-bottom-right-radius:8px;
  border-bottom-left-radius:8px;
  padding-bottom:1em;
    font-size: ${bottomFont ? `${bottomFont} !important` : "24px !important"};

    font-weight: 600;

}

#height{
padding: 0em .6em 0em .6em;
border-radius:8px;
display: flex;
justify-content: center;

flex-wrap: wrap;
margin:0;
flex-direction:column;
background:${backgroundViz ? `${backgroundViz[0]} !important` : "#06f !important"};


overflow-y: ${config.removeScroll ? "hidden" : "scroll"};
overflow: ${config.removeScroll ? "hidden" : ""};
}


.th,
table .th{

  font-size: ${topFont ? `${topFont} !important` : "19px !important"};

  margin-bottom:-13px !important
}

thead th {
    line-height: 1;
}

.top15{
      margin-top: -15px;
}

#vis {
    height: 100%;
    width: 100% !important;
    margin: 0 !important;
    border: none;
}

 td div {
    position: relative;

    width: 100%;
    height: 100%;
}

.td p{
  position: absolute;
      bottom: -17px;

      font-size: 13px;
      font-weight: 400;
z-index:999;
right: 0;
}

::-webkit-scrollbar,
::-webkit-scrollbar-thumb,
::-webkit-scrollbar,
::-webkit-scrollbar-thumb
{
  width: 0px !important;
}



button{
  background: transparent;
    border: none;
}

.dropdown-menu{
    box-shadow: 0px 15px 30px 2px rgba(4, 47, 78, 0.26);
    border: none;
}

.dropdown{
  position: relative;
width: auto;
max-width: 120px;
border-radius: 8px;
max-height:38px;
margin-right: 30px;
margin-top: 7px;

}

.dropdown-item{
  font-size:14px
}

.button1 button{
  background-color:#06f;
  color: #fff;
  border-radius:5px;
  border: none;
  font-size: 15px;
  min-height:50px;
  width:140px;
  line-height:1;
  margin-right:10px

}

.button2 button{
  background-color:#6FD0E9;
  color: #fff;
  border-radius:5px;
  border: none;
  font-size: 15px;
  min-height:50px;
  width:140px;
  line-height:1;

}



  `;

  return <StyledWrapper>{children}</StyledWrapper>;
};

function Table({ columns, data, config }) {


  var { tableBordered, fixedHeight, unsetTable, hidePag, rightPag, removeBars, index, border, textTitle, color_title, writeTitle, toolOn, writeTooltip, headerText, yesText, unsetWidth, titleColor, bodyStyle, hideTitle, tableFontSize, columnsToHide, freeze, wrapTex, freeze3, short, backgroundViz, fontColor, removeScroll, writeTooltip, writeTooltip2, addThird, addThirdhref,  writeTooltip3, buttonColor } = config;

  const defaultColumn = React.useMemo(
     () => ({
       minWidth: 40,
       width: 180,
       maxWidth: 400,
     }),
     []
   );
   const {

      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,

      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },

   } = useTable(
     {
       columns,
       data,
       defaultColumn,
       initialState: { pageIndex: 0, pageSize: 500 },
       disableSortRemove: true,
       defaultCanSort: true
     },
     useSortBy,
      usePagination,
      useBlockLayout,
      useResizeColumns
   );


   const Content = config.textTitle.split(",").map((d, i) => ({
     textTitle: d,


   }))

     var title = Content.map(function(val, i){ return val.textTitle });
     var title = title[0]

  const background = config.color_title

  const popoverHoverFocus = (
    <Popover

    className={config.toolOn ? "" : "hidden"}
    id="popover"
    style={{backgroundColor:'black', color:'white', padding: '1em 1.25em'}}
    >
    <p className="m-0">{config.writeTooltip}</p>
    </Popover>
  );
  const tr_length = (headerGroups[0].headers.length - 2) * 200


  const tr_length3 = (headerGroups[0].headers.length - 1) * 200




    const [hiddenRows, setHiddenRows] = useState([]);

  return (
    <>

<div class="d-flex justify-content-between mb-4 mt-1">
<div>

<a className="button1" target="_blank" href="https://procterandgamble.cloud.looker.com/dashboards/qJunHnk5bVXvqRZTzfIjio"><Button>Media Planning Overview</Button></a>
<a  className="button2" target="_blank" href="https://procterandgamble.cloud.looker.com/dashboards/u5y7x9wLVb16EAEcugLprW"><Button>Media Actuals Overview</Button></a>

</div>




    <DropdownButton id="dropdown-basic-button" title="Reference" style={{background: buttonColor ? buttonColor : "#06f"}}>
    <OverlayTrigger
       placement="left"
       data-html="true"
       trigger={["hover"]}
       overlay={<Tooltip>
         <div style={{minWidth:"40px", minHeight:"20px", color:"white !important", fontSize:"12px", display:"flex", alignItem:"center", padding:"4px 7px", fontFamily: bodyStyle ? bodyStyle : "'Roboto'"}}>
        {writeTooltip}
        </div>
         </Tooltip>}
       >

      <Dropdown.Item  target="_blank" href="https://pgone.sharepoint.com/sites/dx/SitePages/Product_IMS_Measurement_and_Reporting.aspx">Get Help</Dropdown.Item>
      </OverlayTrigger>


      <OverlayTrigger
         placement="left"
         data-html="true"
         trigger={["hover"]}
         overlay={<Tooltip>
             <div style={{minWidth:"40px", minHeight:"20px", color:"white !important", fontSize:"12px", display:"flex", alignItem:"center", padding:"4px 7px", fontFamily: bodyStyle ? bodyStyle : "'Roboto'"}}>
          {writeTooltip2}
          </div>
           </Tooltip>}
         >
        <Dropdown.Item target="_blank" href="https://datacatalog.pg.com/docs/glossary/27">Glossary</Dropdown.Item>
        </OverlayTrigger>



 {addThird === "" ||  addThird === undefined  ? (
      ""

        ) : (
          <OverlayTrigger
             placement="left"
             data-html="true"
             trigger={["hover"]}
             overlay={<Tooltip>
                 <div style={{minWidth:"40px", minHeight:"20px", color:"white !important", fontSize:"12px", display:"flex", alignItem:"center", padding:"4px 7px", fontFamily: bodyStyle ? bodyStyle : "'Roboto'"}}>
              {writeTooltip3}
              </div>
               </Tooltip>}
             >
            <Dropdown.Item target="_blank" href={addThirdhref}>{addThird}</Dropdown.Item>
            </OverlayTrigger>
      )}

      </DropdownButton>
</div>


   <div className={`
     ${config.border ? "removeBorder" : ""}
     ${config.wrapText ? "wrapText" : ""}
     `}>



    <Container fluid className={`${config.removeBars ? "scrunch" : "padding-0 second"}`} id="height">
 <h5 className={config.hideTitle ?  "transparentText top15"  : "mb-2 mt-2"} style={{ color: titleColor ? titleColor : '#fff', fontFamily: bodyStyle ? bodyStyle : "'Roboto'"}}>{config.writeTitle === "" ? title : config.writeTitle}</h5>


      <div className={`${config.short ? "short" : ""}`}>
        <div className={`${config.unsetTable  ? "unsetTable" : ""}`}>
        <div className={`${config.fixedHeight  ? "fixedHeight" : ""}`}>

        <div className="aroundIt">

        <table className="table" {...getTableProps()}>

        {
           config.freeze  ? (
         <Fragment>
            <thead style={{display: "inline-flex", width: `${tr_length + 2 * 160}px`}}>
              <tr key={headerGroups[0].id}
               {...headerGroups[0].getHeaderGroupProps()}
               className="tr makeGray"
               style={{
                position: "sticky",

                left: 0,
                zIndex: 1,
                display: "flex",
                width: "320px !important",

              }}
              >
                {/* <th className="th smallerWidth"/> */}
                <th key={headerGroups[0].headers[0].id}
                  {...headerGroups[0].headers[0].getHeaderProps(headerGroups[0].headers[0].getSortByToggleProps())}
                  className="th makeGray"
                >

                {headerGroups[0].headers[0].render("Header")}


                  <span>
                    {/* {column.isSorted ? (column.isSortedDesc ? "↓"  : "↑"  ) : " "}  */ }
                    {headerGroups[0].headers[0].isSorted ?  "⇅"  : " "}
                  </span>
                  {/* Use column.getResizerProps to hook up the events correctly */}
                  <div
                    {...headerGroups[0].headers[0].getResizerProps()}
                    className={`resizer ${headerGroups[0].headers[0].isResizing ? "isResizing" : ""
                      }`}
                  />
                </th>
                <th key={headerGroups[0].headers[1].id}
                  {...headerGroups[0].headers[1].getHeaderProps(headerGroups[0].headers[1].getSortByToggleProps())}
                  className="th makeGray"
                >

                {headerGroups[0].headers[1].render("Header")}


                  <span>
                    {/* {column.isSorted ? (column.isSortedDesc ? "↓"  : "↑"  ) : " "}  */ }
                    {headerGroups[0].headers[1].isSorted ?  "⇅"  : " "}
                  </span>
                  {/* Use column.getResizerProps to hook up the events correctly */}
                  <div
                    {...headerGroups[0].headers[1].getResizerProps()}
                    className={`resizer ${headerGroups[0].headers[1].isResizing ? "isResizing" : ""
                      }`}
                  />
                </th>
              </tr>
              {headerGroups.map((headerGroup, index) => (
              <tr
               key={headerGroup.id}
               {...headerGroup.getHeaderGroupProps()} className={`${(config.tableBordered) ? "hidden" : ""} tr`} style={{ width: `${tr_length}px`, display: "flex"}}>
                  {headerGroup.headers.map((column, i) => {
                    if(i != 0 && i != 1) {
                      return(
                        <th
                          key={column.id}
                            {...column.getHeaderProps(column.getSortByToggleProps())}
                            className="th"
                          >
                          {column.render("Header")}
                          <span>
                            {/* {column.isSorted ? (column.isSortedDesc ? "↓"  : "↑"  ) : " "}  */ }
                            {column.isSorted ?  "⇅"  : " "}
                          </span>
                          {/* Use column.getResizerProps to hook up the events correctly */}
                          <div
                            {...column.getResizerProps()}
                            className={`resizer ${column.isResizing ? "isResizing" : ""
                              }`}
                          />
                        </th>
                      )
                    }
              })}
              </tr>
              ))}
            </thead>



            <tbody {...getTableBodyProps()} style={{display: 'inline-flex'}} className="fixHeight">
              <tr
                style={{
                  position: "sticky",
                  left: 0,
                  zIndex: 1,

                }}

              >
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr
                  key={row.id}
                  {...row.getRowProps()}
                  className="tr makeGray"
                  style={{
                    display: "flex",
                    width: "320px",

                  }}
                  >

                    {row.cells.map((cell, index) => {
                      if(index == 0 || index == 1) {
                      return (
                        <td

                        style={{fontFamily: config.bodyStyle ? config.bodyStyle : "'Roboto'"}}
                        key={cell.id}
                          {...cell.getCellProps()} className="td">
                          {cell.render("Cell")}
                        </td>


                      );
                    }
                    })}
                  </tr>
                  );
                })}
              </tr>

              <tr>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr
                  key={row.id}
                  {...row.getRowProps()} className="tr" style={{ width: `${tr_length}px`, display: "flex" }}>

                    {row.cells.map((cell, index) => {
                      if(index != 0 && index != 1) {
                      return (
                        <td

                        style={{fontFamily: config.bodyStyle ? config.bodyStyle : "'Roboto'"}}
                        key={cell.id}
                          {...cell.getCellProps()} className="td">
                          {cell.render("Cell")}
                        </td>
                      );
                    }
                    })}
                  </tr>
                  );
                })}
              </tr>
            </tbody>
          </Fragment>
      ) : config.freeze3 ? (


        <Fragment>
           <thead style={{display: "inline-flex", width: `${tr_length + 2 * 160}px`}}>
             <tr key={headerGroups[0].id}
              {...headerGroups[0].getHeaderGroupProps()}
              className="tr makeGray2"
              style={{
               position: "sticky",

               left: 0,
               zIndex: 1,
               display: "flex",
               width: "480px !important",

             }}
             >
               {/* <th className="th smallerWidth"/> */}
               <th key={headerGroups[0].headers[0].id}
                 {...headerGroups[0].headers[0].getHeaderProps(headerGroups[0].headers[0].getSortByToggleProps())}
                 className="th makeGray2"
               >

               {headerGroups[0].headers[0].render("Header")}


                 <span>
                   {/* {column.isSorted ? (column.isSortedDesc ? "↓"  : "↑"  ) : " "}  */ }
                   {headerGroups[0].headers[0].isSorted ?  "⇅"  : " "}
                 </span>
                 {/* Use column.getResizerProps to hook up the events correctly */}
                 <div
                   {...headerGroups[0].headers[0].getResizerProps()}
                   className={`resizer ${headerGroups[0].headers[0].isResizing ? "isResizing" : ""
                     }`}
                 />
               </th>
               <th key={headerGroups[0].headers[1].id}
                 {...headerGroups[0].headers[1].getHeaderProps(headerGroups[0].headers[1].getSortByToggleProps())}
                 className="th makeGray2"
               >

               {headerGroups[0].headers[1].render("Header")}


                 <span>
                   {/* {column.isSorted ? (column.isSortedDesc ? "↓"  : "↑"  ) : " "}  */ }
                   {headerGroups[0].headers[1].isSorted ?  "⇅"  : " "}
                 </span>
                 {/* Use column.getResizerProps to hook up the events correctly */}
                 <div
                   {...headerGroups[0].headers[1].getResizerProps()}
                   className={`resizer ${headerGroups[0].headers[1].isResizing ? "isResizing" : ""
                     }`}
                 />
               </th>



               <th key={headerGroups[0].headers[2].id}
                 {...headerGroups[0].headers[2].getHeaderProps(headerGroups[0].headers[2].getSortByToggleProps())}
                 className="th makeGray2"
               >

               {headerGroups[0].headers[2].render("Header")}


                 <span>
                   {/* {column.isSorted ? (column.isSortedDesc ? "↓"  : "↑"  ) : " "}  */ }
                   {headerGroups[0].headers[2].isSorted ?  "⇅"  : " "}
                 </span>
                 {/* Use column.getResizerProps to hook up the events correctly */}
                 <div
                   {...headerGroups[0].headers[2].getResizerProps()}
                   className={`resizer ${headerGroups[0].headers[2].isResizing ? "isResizing" : ""
                     }`}
                 />
               </th>

             </tr>
             {headerGroups.map((headerGroup, index) => (
             <tr
              key={headerGroup.id}
              {...headerGroup.getHeaderGroupProps()} className={`${(config.tableBordered) ? "hidden" : ""} tr`}
              style={{ width: `${tr_length}px`, display: "flex"}}>
                 {headerGroup.headers.map((column, i) => {
                   if(i != 0 && i != 1  && i != 2) {
                     return(
                       <th
                         key={column.id}
                           {...column.getHeaderProps(column.getSortByToggleProps())}
                           className="th"
                         >
                         {column.render("Header")}
                         <span>
                           {/* {column.isSorted ? (column.isSortedDesc ? "↓"  : "↑"  ) : " "}  */ }
                           {column.isSorted ?  "⇅"  : " "}
                         </span>
                         {/* Use column.getResizerProps to hook up the events correctly */}
                         <div
                           {...column.getResizerProps()}
                           className={`resizer ${column.isResizing ? "isResizing" : ""
                             }`}
                         />
                       </th>
                     )
                   }
             })}
             </tr>
             ))}
           </thead>



           <tbody {...getTableBodyProps()} style={{display: 'inline-flex'}} className="fixHeight">
             <tr
               style={{
                 position: "sticky",
                 left: 0,
                 zIndex: 1,
                 width:"480px !important"
               }}

             >
             {page.map((row, i) => {
               prepareRow(row);
               return (
                 <tr
                 key={row.id}
                 {...row.getRowProps()}
                 className="tr makeGray2"
                 style={{
                   display: "flex",
                   width:"480px !important"

                 }}
                 >

                   {row.cells.map((cell, index) => {
                     if(index == 0 || index == 1 || index == 2) {
                     return (
                       <td

                       style={{fontFamily: config.bodyStyle ? config.bodyStyle : "'Roboto'"}}
                       key={cell.id}
                         {...cell.getCellProps()} className="td">
                         {cell.render("Cell")}
                       </td>


                     );
                   }
                   })}
                 </tr>
                 );
               })}
             </tr>

             <tr>
             {page.map((row, i) => {
               prepareRow(row);
               return (
                 <tr
                 key={row.id}
                 {...row.getRowProps()} className="tr" style={{ width: `${tr_length}px`, display: "flex" }}>

                   {row.cells.map((cell, index) => {
                     if(index != 0 && index != 1 && index != 2) {
                     return (
                       <td

                       style={{fontFamily: config.bodyStyle ? config.bodyStyle : "'Roboto'"}}
                       key={cell.id}
                         {...cell.getCellProps()} className="td">
                         {cell.render("Cell")}
                       </td>
                     );
                   }
                   })}
                 </tr>
                 );
               })}
             </tr>
           </tbody>
         </Fragment>



        ) : config.index  ? (
          <Fragment>

                 <thead className={`${config.tableBordered ? "hidden" : "" }`}>
                   {headerGroups.map((headerGroup, index) => (
                   <tr
                    key={headerGroup.id}
                    {...headerGroup.getHeaderGroupProps()} className="tr">

                     <th className="th smallerWidth"/>

                       {headerGroup.headers.map((column, i) => (
                         <th

                         key={column.id}
                           {...column.getHeaderProps(column.getSortByToggleProps())}
                           className="th"
                         >



                         {column.render("Header")}


                           <span>
                             {/* {column.isSorted ? (column.isSortedDesc ? "↓"  : "↑"  ) : " "}  */ }
                             {column.isSorted ?  "⇅"  : " "}
                           </span>
                           {/* Use column.getResizerProps to hook up the events correctly */}
                           <div
                             {...column.getResizerProps()}
                             className={`resizer ${column.isResizing ? "isResizing" : ""
                               }`}
                           />
                         </th>
                       ))}
                     </tr>
                   ))}
                 </thead>



                 <tbody {...getTableBodyProps()}>
                           {page.map((row, i) => {
                             prepareRow(row);
                             return (
                               <tr
                               key={row.id}
                               {...row.getRowProps()} className="tr">
                                 <td className="td fixedTD">
                                   {pageIndex * pageSize + i + 1 }
                                 </td>
                                 {row.cells.map((cell, i) => {
                                   return (
                                     <td
                                     style={{fontFamily: config.bodyStyle ? config.bodyStyle : "'Roboto'"}}
                                     key={cell.id}
                                       {...cell.getCellProps()} className="td">
                                       {cell.render("Cell")}
                                     </td>


                                   );
                                 })}
                               </tr>

                             );
                           })}
                   </tbody>
                     </Fragment>


            ) : (

              <Fragment>
              <thead className={`${config.tableBordered ? "hidden" : "" }`}>
                      {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()} className="tr">
                              {headerGroup.headers.map((column) => (
                                <th
                                style={{fontFamily: config.bodyStyle ? config.bodyStyle : "'Roboto'"}}
                                  {...column.getHeaderProps(column.getSortByToggleProps())}
                                  className="th"
                                >
                                  {column.render("Header")}

                                  <div
                                    {...column.getResizerProps()}
                                    className={`resizer ${
                                      column.isResizing ? "isResizing" : ""
                                    }`}
                                  />
                                </th>
                              ))}
                            </tr>
                          ))}
                        </thead>

            <tbody {...getTableBodyProps()}>
               {page.map((row, i) => {
                 prepareRow(row);

                 return (
                   <tr {...row.getRowProps()} className="tr">
                     {row.cells.map((cell) => {
                       return (
                         <td
                        style={{fontFamily: config.bodyStyle ? config.bodyStyle : "'Roboto'"}}
                          {...cell.getCellProps()} className="td">
                           {cell.render("Cell")}
                         </td>
                       );
                     })}
                   </tr>
                 );
               })}
             </tbody>





               </Fragment>

            )
        }


            </table>
            </div>
            </div>
        </div>


</div>



</Container>

  </div>

<div className={`${config.hidePag ? "hidden" : "pagination display-flex justify-content-center align-items-center" }`}>

              <Button className="clear" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {<i class="fal fa-angle-double-left"></i>}
              </Button>{' '}
              <Button className="clear" onClick={() => previousPage()} disabled={!canPreviousPage}>
                {<i class="fal fa-angle-left"></i>}
              </Button>{' '}

              <span className="numBack">{pageIndex + 1}</span> <span>of</span> <span className="clearBack">{pageOptions.length}</span>

                {' '}

              <Button className="clear" onClick={() => nextPage()} disabled={!canNextPage}>
                {<i class="fal fa-angle-right"></i>}
              </Button>{' '}
              <Button className="clear" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                {<i class="fal fa-angle-double-right"></i>}
              </Button>{' '}


            </div>

    </>
  );
}




const createLabel = (label) => {
  const splitByDot = label.split(".").join(" ");
  const splitByDash = splitByDot.split("_").join(" ");
  return splitByDash;
};



export const CustomTable = ({ data, config, queryResponse, details, done }) => {




  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [firstData = {}] = data;
  let cols_to_hide = [];

  for (const [key, value] of Object.entries(firstData)) {


    if (config['columnsToHide'].split(",").includes(key.split(".")[1])){

      cols_to_hide.push(key);
    }


  }

  cols_to_hide.map((col) => {
    delete firstData[col];
  });

  const data2 = useMemo(() => data, []);



    const columns = useMemo(
      () =>
        Object.keys(firstData).map((key) => {



 if(key.indexOf('.') !== -1) {

  const [tableKeyword, slicedKey] = key.split(".");
  const dimension = config.query_fields.dimensions.find(
    (dimension) => dimension.name === key
  );

  return {
    Header:
      slicedKey === key
        ? key
        : dimension?.field_group_variant ||


          config.query_fields.measures.find(
            (dimension) => dimension.name === key
          )?.field_group_variant ||
          slicedKey,

      accessor: (d) => {
      return d[key].value;
    },

    sortable: true,

    sortType: "basic",


    Cell: ({ cell, value, row }) => {


       if (slicedKey === "days_since_last_activity_from_today") {
         return (
                       <>

                           <span class="redBackground">
                             {row.original[key]?.rendered || row.original[key]?.value}
                           </span>

                       </>
                     );

       }

      if (row.original[key]?.html){



    let comment1 = `${row.original[key]?.html}`
      return <div dangerouslySetInnerHTML={{__html:comment1}} />

    }
    else{
      return row.original[key]?.rendered || row.original[key]?.value
    }

      {/*return row.original[key]?.rendered || row.original[key]?.value*/}
    },

    headerClassName: "table-header1",
  };



}

else{
  return {
    id: key,
    Header: createLabel(key),
    accessor: (d) => {
      return d[key].value
    },

    sortable: true,

    sortType: 'basic',
    // Cell: (  { row: { original } }) => {
    //   return original[key]?.rendered || original[key]?.value;
    // },
    Cell: ({ cell, value, row }) => {


      if (key === "days_since_last_activity_from_today") {
        return (
                      <>

                          <span class="redBackground">
                            {row.original[key]?.rendered || row.original[key]?.value}
                          </span>

                      </>
                    );

      }

      if (row.original[key]?.html){


      let comment1 = `${Math.round(row.original[key]?.html).toFixed(0)}`
      return <div dangerouslySetInnerHTML={{__html:comment1}} />

    }
    else{
      return Math.round(row.original[key]?.rendered.value.toFixed(0)) || Math.round(row.original[key]?.value.toFixed(0))
    }

      {/*return row.original[key]?.rendered || row.original[key]?.value*/}
    },
    headerClassName: "table-header1",
  };

}

        }),
      []
    );



  const handleChangePage = (event, newPage) => {
     setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
     setRowsPerPage(parseInt(event.target.value, 10));

     setPage(0);
   };




  return (
    <Styles config={config}>
      <Table

      config={config}
      columns={columns}
      data={data}
      />

    </Styles>
  );
};
