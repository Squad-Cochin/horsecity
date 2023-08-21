// import React, { useState, useEffect } from 'react';
// import { Card, CardBody, Col, Row } from "reactstrap";
// import { useFormik } from "formik";
// import { useParams } from 'react-router-dom'
// import ReactApexChart from "react-apexcharts";

// import { getMonthlySalesData } from '../../helpers/ApiRoutes/getApiRoutes';

// const LineColumnArea = () => 
// {

//     const[salesGraphDataOptions, setSalesGraphDataOptions] = useState([]);
//     const[salesGraphDataSeries, setSalesGraphDataSeries] = useState([]);
//     const [uId, setUId] = useState("");
//     const [roleName, setRoleName] = useState("");
//     const [roleId, setRoleId] = useState("");

//     var data = JSON.parse(localStorage.getItem("authUser"));
//     useEffect(() =>
//     {
//         // const data = JSON.parse(localStorage.getItem("authUser"));
//         // console.log('Data from the dashboard page', data);
//         let user_Id = data[0]?.user[0]?.id
//         console.log('User id from the dashboard page: ', user_Id);
//         let role_Name = data[0]?.user[0]?.role_name
//         console.log('Role name from the dashboard page: ', role_Name);
//         let rId = data[0]?.user[0]?.role_Id
//         console.log('Role Id from the dashboard page: ', rId);
//         setUId(user_Id);
//         setRoleId(rId);
//         setRoleName(role_Name);
//         LineColumnData();
//     }, [uId, roleName, roleId] );


//   async function LineColumnData()
//     {
//         // console.log(`Came inside the monthly sales graph data`);
//         console.log(`User id from the lineColumn area.js: `, data[0]?.user[0]?.id);
//         var sgData = await getMonthlySalesData(data[0]?.user[0]?.id);
//         console.log(`Result from the monthly sales graph  in the LineColumnArea.js: `, sgData);
//         setSalesGraphDataOptions(sgData.revenue);
//         setSalesGraphDataSeries(sgData.revenue)
//     }

//     // return(
//     //   <React.Fragment>
//     //       <ReactApexChart
//     //         options={salesGraphDataOptions}
//     //         series={salesGraphDataSeries}
//     //         type="line"
//     //         height="350"
//     //         stacked= "false"
//     //         className="apex-charts"
//     //       />
//     //     </React.Fragment>
//     // )

//     return(
//       <React.Fragment>
//           <ReactApexChart
//             options={salesGraphDataOptions.options}
//             series={salesGraphDataSeries.series}
//             type="line"
//             height="350"
//             stacked= "false"
//             className="apex-charts"
//           />
//         </React.Fragment>
//     )
//   }


// export default LineColumnArea;





// const LineColumnAreaData = {
//   series: [
//     {
//       name: "Revenue",
//       type: "column",
//       data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 18],
//     },
//     // {
//     //   name: "Maintenance",
//     //   type: "area",
//     //   data: [44, 55, 41, 42, 22, 43, 21, 41, 56, 27, 43, 27],
//     // },
//     // {
//     //   name: "Profit",
//     //   type: "line",
//     //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
//     // },
//   ],
//   options: {
//     chart: {
//       stacked: false,
//       toolbar: {
//         show: false,
//       },
//     },
//     stroke: {
//       width: [0, 0.5, 1],
//       curve: "smooth",
//       dashArray: [0, 8, 5]
//     },
//     plotOptions: {
//       bar: {
//         columnWidth: "18%",
//       },
//     },
//     colors: ["#0ab39c", "rgba(212, 218, 221, 0.18)", "rgb(251, 77, 83)"],

//     fill: {
//       opacity: [0.85, 0.25, 1],
//       gradient: {
//         inverseColors: false,
//         shade: "light",
//         type: "vertical",
//         opacityFrom: 0.85,
//         opacityTo: 0.55,
//         stops: [0, 100, 100, 100],
//       },
//     },

//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
    
//     markers: {
//       size: 0,
//     },
//     legend: {
//       offsetY: 11,
//     },
//     xaxis:
//     {
//       title :{
//         text : "Months"
//       },
//       type: "month",
//     },
    
//     yaxis: {
//       title: {
//         text: "Revenue",
//       },
//     },
    
//     tooltip: {
//       shared: true,
//       intersect: false,
//       y: {
//         formatter: function (y) {
//           if (typeof y !== "undefined") {
//             return y.toFixed(0) + "points"
//           }
//           return y
//         },
//       },
//     },
    
//     grid: {
//       borderColor: "#f1f1f1",
//     },
//   },
// }







import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Row } from "reactstrap";
import { useFormik } from "formik";
import { useParams } from 'react-router-dom'
import ReactApexChart from "react-apexcharts";

import { getMonthlySalesData } from '../../helpers/ApiRoutes/getApiRoutes';


const LineColumnAreaData = {
  series: [
    {
      name: "Revenue",
      type: "column",
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 18],
    },
    // {
    //   name: "Maintenance",
    //   type: "area",
    //   data: [44, 55, 41, 42, 22, 43, 21, 41, 56, 27, 43, 27],
    // },
    // {
    //   name: "Profit",
    //   type: "line",
    //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
    // },
  ],
  options: {
    chart: {
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: [0, 0.5, 1],
      curve: "smooth",
      dashArray: [0, 8, 5]
    },
    plotOptions: {
      bar: {
        columnWidth: "18%",
      },
    },
    colors: ["#0ab39c", "rgba(212, 218, 221, 0.18)", "rgb(251, 77, 83)"],

    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100],
      },
    },

    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
    
    markers: {
      size: 0,
    },
    legend: {
      offsetY: 11,
    },
    xaxis:
    {
      title :{
        text : "Months"
      },
      type: "month",
    },
    
    yaxis: {
      title: {
        text: "Revenue",
      },
    },
    
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + "points"
          }
          return y
        },
      },
    },
    
    grid: {
      borderColor: "#f1f1f1",
    },
  },
}

const LineColumnArea = () => 
{

  const[salesReportData, setSalesReportData] = useState({options : {}, series : []});

  var data = JSON.parse(localStorage.getItem("authUser"));
  useEffect(() =>
  {
    monthlySalesData();
  }, []);

  async function monthlySalesData()
  {
    // console.log(`Came inside the monthlly sales data`);
    let msReport = await getMonthlySalesData(data[0]?.user[0]?.id);
    // console.log(`Result from the monthlySalesData function: `, msReport);
    setSalesReportData(msReport.revenue);
  }



  return(
    <React.Fragment>
        <ReactApexChart
          options={salesReportData?.options}
          series={salesReportData?.series}
          type="line"
          height="350"
          stacked= "false"
          className="apex-charts"
        />
      </React.Fragment>
  )
}

export default LineColumnArea;