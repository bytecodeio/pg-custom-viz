
import React, { Fragment, useEffect, useMemo, useState, useLayoutEffect, useRef } from "react";
import * as venn from "venn.js";
import * as d3 from "d3";
import 'regenerator-runtime/runtime';
import "bootstrap/dist/css/bootstrap.min.css";

import { Row, Col, Container, Button, Overlay, OverlayTrigger, Popover, PopoverBody, PopoverHeader, ProgressBar, Dropdown, DropdownButton, Tooltip} from 'react-bootstrap';
import styled from "styled-components";

const Styles = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');

  @import url('https://fonts.googleapis.com/css?family=Open+Sans:wght@100;300;400;500;700;900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');

  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,100;1,700&display=swap');

  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital,wght@0,300;0,400;0,500;0,600;1,100;1,700&display=swap');


  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;1,100;1,700&display=swap');

  @import url("https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css");

  .lightBubble{
    background: #f7f8f9;
    padding:1em;
    border-radius: .5rem;
    display: flex;

    flex-direction: column;
  min-width:100%;

  }

  p{
    font-weight: 500
  }

  p.large{
    font-size: 22px;
    margin-top:0
  }

  p.small{
    font-size: 12px;
    font-weight: 300;
  }

  .whiteAcross{
    background: white;
    width:100%;
    display: flex;
    justify-content: space-between;
    border-radius: .4em;
    box-shadow: 0px 30px 60px rgba(0, 19, 87, 0.04);
    padding:.6em;
    margin-bottom:1em;
      align-items: center;
  }

  .whiteAcross p{
    color:black
  }

  .upDown{
    display: flex;
    flex-direction: column;

    font-family: 'Roboto', sans-serif;
    border: 1px solid black;
    max-width: 490px;
    margin: 2em auto 0 auto;


  max-height: 498px;

  }


  .varianceBubble.positive{
    color:black;
    font-size: 11px;
        border: 2px solid #009c38;
        border-radius: 1rem;
        padding: 0.3em 1em;
        display: flex;
        justify-content: center;
        align-items: center;
        max-height: 30px;
  }

  .varianceBubble.positive i{
    color:#009c38;
    margin-right:3px
  }
  .varianceBubble.negative{
    color:black;
    font-size: 11px;
  border: 2px solid #ff1003;
  border-radius: 1rem;
  padding: 0.3em 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 30px;
  }


  .varianceBubble.negative i{
    color:#ff1003;
    margin-right:3px;
    transform: rotate(180deg);

  }
  .varianceBubble.neutral{
    color:black;
    font-size: 11px;
  border: 2px solid #ffda00;
  border-radius: 1rem;
  padding: 0.3em 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 30px;
  }

  .dots p{
    color:#637087 !important
  }

  .varianceBubble.neutral i{
  display: none

  }

  .upDown.unsetWidth{
      max-width: 100%;
  }

  :-webkit-scrollbar-track {
   border-radius: 0.125rem;
   background-color: lightgray;
   height: 0px;
  }
  ::-webkit-scrollbar {
   width: 0;
   border-radius: 0;
     height: 0px;
  }
  ::-webkit-scrollbar-thumb {


      height: 0px;
  }


  .progress {
      --bs-progress-height: 30px !important;
      --bs-progress-font-size: 0.1rem !important;
      --bs-progress-bg: transparent;
      --bs-progress-border-radius: 2px !important;
      --bs-progress-bar-color: #fff;
      --bs-progress-bar-bg: #6253da !important;
      max-width: 100% !important;
  }
   .progress {
      --bs-progress-height: 36px !important;
      --bs-progress-font-size: 0.1rem !important;
      --bs-progress-bg: #002169 !important;
      --bs-progress-border-radius: 100px !important;
      margin-bottom: 30px;

  }
   .progress-bar {
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      color: blue;
      text-align: center;
      white-space: nowrap;
      border-radius: 100px
  }
  .progress-label {
    color: #14171b;
    font-size: 17px;
      font-weight: 500;
      position: absolute;
      z-index: 999;
      top: 5px;
      left: 13px;

  }

  .progress-label.white {
    color: white;
    font-size: 17px;
      font-weight: 500;
      position: absolute;
      z-index: 999;
      top: 5px;
      left: 13px;

  }

  p{
    color:#14171b !important
  }

   .dots p:nth-child(1) i{
    color: #12d465;
  }

  .dots p:nth-child(2) i{
    color: #ffda00;
 }

  .dots p:nth-child(3) i{
    color: #0066ff;
 }

  .dots p i{
    color: #adadad
   }





  .col-md-3 .progress-bar{
      --bs-progress-bar-bg: #002169 !important;
  }

  .col-md-3 .progress-label{
    color: white !important;
    left: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    right: unset;
    position: relative;
    margin-top: -60px;
  top: unset;

  }

  p.gray{
    color:#637087 !important
  }
#venn{
  background: white;
  display:flex;
  justify-content:center;
  padding:0em 0em 3em 0em;
  width:100%;
}



.secondary-class:nth-child(5) path{
fill: #6fd0e9 !important
}



.venn-intersection path{
  fill-opacity: .2 !important;
}



svg path {
    stroke: white;
    stroke-width: 0px;
}

svg text {
    fill: white;

    font-size: 14px;
}



.overlap{
  background:#002169;
  padding: .5em 1em;
border-radius: 1rem;
display: flex;
justify-content: space-between;
align-items: center;
color: white;
margin-bottom: 3em;

}
.overlap p{
  color:white !important
}

.overlap h3{
  color:white !important
}

.black-text{

  font-size:17px !important;
  fill:black !important
}

.venn-intersection .black-text{
  display:none
}

.venn-intersection:hover .black-text{

}

.across{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-top:3%;
  margin-left:-3vw !important
}


.across .halfWidth{
  width:50%;
  display:flex;
  flex-direction:column;
}


.across .halfWidth .overlap{
  margin-bottom:1.5em
}

.across #venn{
  padding-bottom:0em !important
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

}

.dropdown-item{
  font-size:14px
}


  `;


export const Home = ({ data, config, queryResponse, details, bodyStyle}) => {


var { investment, chooseLabel,  numbers, reachPercentage, writeTitle, writeTitle2, titleColor, bodyStyle, color_title, across, hideTitle, writeTooltip, writeTooltip2, addThird, addThirdhref,  writeTooltip3} = config;

// const [show, setShow] = useState(false);
// const target = useRef(null);

console.log(addThird)
return (
  <>
  <Styles>
      <div id="vis-wrapper" style={{fontFamily: bodyStyle ? bodyStyle : "'Roboto'"}}>


      <DropdownButton id="dropdown-basic-button" title="Reference" style={{background: titleColor ? titleColor : "#06f"}}>
      <OverlayTrigger
         placement="right"
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
           placement="right"
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
               placement="right"
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

</Styles>
  </>
);
};
