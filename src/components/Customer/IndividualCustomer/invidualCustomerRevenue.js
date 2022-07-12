import React, { Component, useEffect, useState } from 'react';
import { Card,Button,ButtonGroup } from "react-bootstrap";
//Import Charts
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { OrderAnalyticsGraph } from '../../../store/actionCreators/Customers/CustomerAction';
const IndividualCustomerRevenue =()=>{
   const graph=useSelector(state=>state.order_analytics_graph);
   const currYear = new Date().getFullYear()
   const [current, setcurrent] = useState({
       month: "Jan",
       year: "2022"
   })
   const orderHistory = useSelector(state => state.customer_order_history)
   const [revFilter,setRevFilter]=useState("yearly");
   const dispatch=useDispatch()
   const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
   const yearArray = () => {
       let arrYear = ["All"]
       for (let i = 0; i < currYear - 2017 + 1; i++) {
           arrYear.push(2017 + i);
       }
       return arrYear
   }

  const [ state,setState] =useState({
    series: [{
        type: 'column',
        data: [0]
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
        colors: ['#6F7BD9'],
        labels: ["0"],
    }}) 
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
    const yearDrop = () => {
        const year = yearArray()
        return year.map((item, index) => {
            return (<option key={index} value={item}>{item}</option>)
        })
    }
    const handleYearChange = (e) => {
        setcurrent({
            ...current, year: e.target.value
        })
    }
useEffect(()=>{

 if(graph.data){
     if(graph.data.status!=="failure"){
        let data=[]
        let label=[]
        for(let i=0;i<graph.data.X.length;i++){
          data.push(parseInt(graph.data.Y[i]))
          label.push(String(graph.data.X[i]))
        }
        setState({
            series: [{
                type: 'column',
                data: data
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
                colors: ['#1cbb8c'],
                labels:label
            }})
     }
 
 }
},[graph])
useEffect(() => {
    if (orderHistory.data) {
      if (orderHistory.data.status === "success") {
        dispatch(OrderAnalyticsGraph(current.month, current.year, orderHistory.data.customer_data[0].mobile_no,revFilter))
      }

    }
  }, [current,orderHistory,revFilter])
   
 const main=()=>{
     if(graph.data){
       return(
        <React.Fragment>
        <Card className="mt-4">
            <Card.Body>
            <div className="float-end d-none d-md-inline-block">
                        <ButtonGroup className="mb-2 graph-buttons" style={{ fontFamily: "Nunito,sans-serif" }}>
                            <Button size="sm" variant="light" style={{ backgroundColor: "#EFF2F7", fontSize: "13px" }} onClick={()=>{setRevFilter("today")}} type="button">Today</Button>
                            <Button size="sm" variant="light" style={{ backgroundColor: "#EFF2F7", fontSize: "13px" }} onClick={()=>{setRevFilter("weekly")}} type="button">Weekly</Button>
                            <Button size="sm" variant="light" style={{ backgroundColor: "#EFF2F7", fontSize: "13px" }} onClick={()=>{setRevFilter("monthly")}} type="button">Monthly</Button>
                            <Button size="sm" variant="light" style={{ backgroundColor: "#EFF2F7", fontSize: "13px" }} onClick={()=>{setRevFilter("yearly")}} type="button">yearly</Button>
                        </ButtonGroup>

                    </div>
                    <div className="float-end d-none d-md-inline-block">
                        <div className="form-group dash-rev">
                            <select className="form-control form-select form-select-sm" name="month" onChange={handleMonthChange}>
                                {monthDrop()}
                            </select>
                        </div>
                    </div>
                    <div className="float-end d-none d-md-inline-block">
                        <div className="form-group dash-rev">
                            <select className="form-control form-select form-select-sm" name="month" onChange={handleYearChange}>
                                {yearDrop()}
                            </select>
                        </div>
                    </div>
           
                <h4 className="card-title mb-4 revenue" >Customer Analytics</h4>

                <div>
                    <div id="line-column-chart" className="apex-charts" dir="ltr">
                        <ReactApexChart options={state.options} series={state.series} type="line" height="255" />
                    </div>
                </div>
            </Card.Body>

        </Card>
    </React.Fragment>
       )  
     }
 }
        return (
            <React.Fragment>
             {main()}
            </React.Fragment>
        );

}

export default IndividualCustomerRevenue;