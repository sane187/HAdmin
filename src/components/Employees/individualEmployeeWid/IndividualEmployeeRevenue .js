import React, { Component, useEffect, useState } from 'react';
import { Card, ButtonGroup, Button } from "react-bootstrap";
//Import Charts
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { EmployeeSalesAnalytics } from '../../../store/actionCreators/Employees/EmployeeAction';
const IndividualEmployeeRevenue = () => {
    const dispatch = useDispatch()
    const employee = useSelector(state => state.employee)
    const data= useSelector(state=>state.employee_sales_analytics)
    const currYear = new Date().getFullYear()
    const [current, setcurrent] = useState({
        filter: "weekly",
        year: "All",
        month:"Jan"
    })
    const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    function monthDrop() {
        return monthArray.map((item, index) => {
            return (<option key={index} value={item}>{item}</option>);
        });
    }
    const handleMonthChange = (e) => {
        setcurrent({
            ...current, month: e.target.value
        })
    }
    const yearArray = () => {
        let arrYear = ["All"]
        for (let i = 0; i < currYear - 2017 + 1; i++) {
            arrYear.push(2017 + i);
        }
        return arrYear
    }
    const yearDrop = () => {
        const year = yearArray()
        return year.map((item, index) => {
            if (index ===0) {
                return (<option key={index} value={item} selected>{item}</option>)
            }
            else {
                return (<option key={index} value={item}>{item}</option>)
            }
        })
    }
    const handleYearChange = (e) => {
        setcurrent({
            ...current, year: e.target.value
        })
    }

    const [state, setState] = useState({
        series: [{
            type: 'column',
            data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
        }],
        options: {
            chart: {
                toolbar: {
                    show: false,
                }
            },
            stroke: {
                width: [0, 3],
                curve: 'smooth'
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '20%',
                },
            },
            dataLabels: {
                enabled: false,
            },

            legend: {
                show: false,
            },
            colors: ['#6F7BD9', '#1cbb8c'],
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        }
    })
    const handleChange = (e) => {
        setcurrent({ ...current, filter: e.target.value })
    }
    useEffect(() => {
        if (employee.data) {
            dispatch(EmployeeSalesAnalytics(employee.data.data.employee_id, current.filter, current.year,current.month))
        }

    }, [current,employee])
    useEffect(() => {
        if (data.data) {

         
           if(data.data.status==='failure'){
               setState({
                series: [{
                    type: 'column',
                    data: []
                }],
                options: {
                    chart: {
                        toolbar: {
                            show: false,
                        }
                    },
                    stroke: {
                        width: [0, 3],
                        curve: 'smooth'
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: '20%',
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
        
                    legend: {
                        show: false,
                    },
                    colors: [ '#1cbb8c'],
                    labels: [],
                }
            })
           }
           else{
            let label=[]
            for(let i=0;i<data.data.x.length;i++){
                label.push(String(data.data.x[i]))
            }
            setState({
                series: [{
                    type: 'column',
                    data: data.data.y
                }],
                options: {
                    chart: {
                        toolbar: {
                            show: false,
                        }
                    },
                    stroke: {
                        width: [0, 3],
                        curve: 'smooth'
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: '20%',
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
        
                    legend: {
                        show: false,
                    },
                    colors: [ '#1cbb8c'],
                    labels: label,
                }
            })
           }
            
        }

    }, [data])



    return (
        <React.Fragment>
            <Card className="mt-4">
                <Card.Body>

                    <div className="float-end d-none d-md-inline-block">
                        <ButtonGroup className="mb-2 graph-buttons" style={{ fontFamily: "Nunito,sans-serif" }}>
                        <Button size="sm" variant="light" style={{ backgroundColor: "#EFF2F7", fontSize: "13px" }} type="button" value={"daily"} onClick={handleChange}>Daily</Button>
                            <Button size="sm" variant="light" style={{ backgroundColor: "#EFF2F7", fontSize: "13px" }} type="button" value={"weekly"} onClick={handleChange}>Weekly</Button>
                            <Button size="sm" variant="light" style={{ backgroundColor: "#EFF2F7", fontSize: "13px" }} type="button" value={"monthly"} onClick={handleChange}>Monthly</Button>
                            <Button size="sm" variant="light" style={{ backgroundColor: "#EFF2F7", fontSize: "13px" }} type="button" value={"yearly"} onClick={handleChange}>Yearly</Button>
                        </ButtonGroup>
                    </div>
                    <div className="float-end d-none d-md-inline-block">
                        <div className="form-group dash-rev">
                            <select className="form-control form-select form-select-sm" name="month" onChange={handleYearChange}>
                                {yearDrop()}
                            </select>
                        </div>
                    </div>
                    <div className="float-end d-none d-md-inline-block">
                        <div className="form-group dash-rev">
                            <select className="form-control form-select form-select-sm" name="month" onChange={handleYearChange}>
                            {monthDrop()}
                            </select>
                        </div>
                    </div>
                    
                    <h4 className="card-title mb-4 revenue" >Employee Sales Analytics</h4>

                    <div>
                        <div id="line-column-chart" className="apex-charts" dir="ltr">
                            <ReactApexChart options={state.options} series={state.series} type="line" height="280" />
                        </div>
                    </div>
                </Card.Body>

            </Card>
        </React.Fragment>
    );

}

export default IndividualEmployeeRevenue;