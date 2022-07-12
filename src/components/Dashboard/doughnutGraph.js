import React, { Component } from 'react';
import {  Row, Col } from "react-bootstrap";
//Import Charts
import ReactApexChart from 'react-apexcharts';
import {BsFillCircleFill} from "react-icons/bs";
import "../../css/miniWidgets.css"
const DoughnutGraph=({options,series})=> {
    // const state = Doughnutstate;
       const labels=()=>{
          return options.labels.map((item,index)=>{
               return(
                <Col key={index}>
                <div className="text-center mt-4">
                    <p className="dougnhut-text"><BsFillCircleFill style={{color:`${options.colors[index]}`}}/> {(item.slice(0,-6)).toUpperCase()}</p>
                    {series[index]} %
                </div>
            </Col>
               )
           })
       }
        return (
            <React.Fragment>
{/* 
                        <div className="float-end">
                            <select className="form-select form-select-sm">
                                <option defaultValue>Apr</option>
                                <option value="1">Mar</option>
                                <option value="2">Feb</option>
                                <option value="3">Jan</option>
                            </select>
                        </div> */}
                        <h4 className="card-title mb-4" style={{fontSize:"15px", color:"#343a40"}}>Sales Analytics</h4>

                        <div id="donut-chart" className="apex-charts">
                            <ReactApexChart options={options} series={series} type="donut" height="250" />
                        </div>

                        <Row>
                           {labels()}
                        </Row>
                   
            </React.Fragment>
        );
    
}

export default DoughnutGraph;


