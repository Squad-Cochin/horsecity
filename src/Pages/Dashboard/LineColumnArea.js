import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

//IMPORTED
import withRouter from "../../components/Common/withRouter";
import { getMonthlySalesData } from "../../helpers/ApiRoutes/getApiRoutes";

const LineColumnAreaData = {
  series: [
    {
      name: "Revenue",
      type: "column",
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 18],
    },
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
      dashArray: [0, 8, 5],
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

    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],

    markers: {
      size: 0,
    },
    legend: {
      offsetY: 11,
    },
    xaxis: {
      title: {
        text: "Months",
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
            return y.toFixed(0) + "points";
          }
          return y;
        },
      },
    },

    grid: {
      borderColor: "#f1f1f1",
    },
  },
};

const LineColumnArea = () => {
  const [salesReportData, setSalesReportData] = useState({
    options: {},
    series: [],
  });

  var data = JSON.parse(localStorage.getItem("authUser"));
  useEffect(() => {
    monthlySalesData();
  }, []);

  async function monthlySalesData() {
    let msReport = await getMonthlySalesData(data[0]?.user[0]?.id);
    setSalesReportData(msReport?.revenue);
  }
  const {
    dir
  } = useSelector(state => ({
    dir: state.Layout.dir,
  }));
  return (
    <React.Fragment>
      <ReactApexChart
        options={salesReportData?.options}
        series={salesReportData?.series}

        type="line"
        height="350"
        stacked="false"
        className={`apex-charts ${dir === 'rtl' ? 'monthly-report-rtl' : ''}`}
      />
    </React.Fragment>
  );
};

export default LineColumnArea;
