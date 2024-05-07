// const data  = require("../../controllers/usercontroller");
// import { getMonthlyCustomerData } from '../../controllers/usercontroller'
// const currentYear = new Date().getFullYear();
//     const currentYearSalesData = data.getMonthlySalesData(currentYear);

//     // Get the previous year's sales data
//     const previousYear = currentYear - 1;
//     const previousYearSalesData = data.getMonthlySalesData(previousYear);

// ---------- CHARTS ----------

// const salesData = JSON.parse(decodeURIComponent(document.currentScript.getAttribute('data-sales-data')));
// const salesData = JSON.parse(decodeURIComponent("{{salesData}}"));
// const { currentYearCustomerCount, previousYearCustomerCount } = await getMonthlyCustomerData();

// const currentYearCustomerCount = monthlyCustomerData.currentYearCustomerCount;
// const previousYearCustomerCount = monthlyCustomerData.previousYearCustomerCount;
// console.log(currentYearCustomerCount)
// console.log(previousYearCustomerCount)
// BAR CHART
var barChartOptions = {
    series: [{
      data: [10, 8, 6, 4, 0],
      name: "data",
    }],
    chart: {
      type: "bar",
      background: "transparent",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    colors: [
      "#2962ff",
      "#d50000",
      "#2e7d32",
      "#ff6d00",
      "#583cb3",
    ],
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 4,
        horizontal: false,
        columnWidth: "40%",
      }
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
    grid: {
      borderColor: "#55596e",
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      labels: {
        colors: "#f5f7ff",
      },
      show: true,
      position: "top",
    },
    stroke: {
      colors: ["transparent"],
      show: true,
      width: 2
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: "dark",
    },
    xaxis: {
      categories: ["Jan", "feb", "mar", "apr", "may"],
      title: {
        style: {
          color: "#f5f7ff",
        },
      },
      axisBorder: {
        show: true,
        color: "#55596e",
      },
      axisTicks: {
        show: true,
        color: "#55596e",
      },
      labels: {
        style: {
          colors: "#f5f7ff",
        },
      },
    },
    yaxis: {
      title: {
        text: "Count",
        style: {
          color: "#f5f7ff",
        },
      },
      axisBorder: {
        color: "#55596e",
        show: true,
      },
      axisTicks: {
        color: "#55596e",
        show: true,
      },
      labels: {
        style: {
          colors: "#f5f7ff",
        },
      },
    }
  };
  
  var barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
  barChart.render();
  
  
  // AREA CHART
  var areaChartOptions = {
    series: [{
      name: "Previous year",
      
      data: [6000,3000,5000,2000,3000,1000,2000,4000,1200,5300,2200,8400]
    }, {
      name: "Current Year",
     
      data: [5000,2000,5000,2000,8000,1600,2500,4500,2200,3300,2200,3500]
    }],
    chart: {
      type: "area",
      background: "transparent",
      height: 350,
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: ["#00ab57", "#d50000"],
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sept","Oct","Nov","Dec"],
    dataLabels: {
      enabled: false,
    },
    fill: {
      gradient: {
        opacityFrom: 0.4,
        opacityTo: 0.1,
        shadeIntensity: 1,
        stops: [0, 100],
        type: "vertical",
      },
      type: "gradient",
    },
    grid: {
      borderColor: "#55596e",
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      labels: {
        colors: "#f5f7ff",
      },
      show: true,
      position: "top",
    },
    markers: {
      size: 6,
      strokeColors: "#1b2635",
      strokeWidth: 3,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      axisBorder: {
        color: "#55596e",
        show: true,
      },
      axisTicks: {
        color: "#55596e",
        show: true,
      },
      labels: {
        offsetY: 5,
        style: {
          colors: "#f5f7ff",
        },
      },
    },
    yaxis: [{
        title: {
          text: "Previous Year",
          style: {
            color: "#f5f7ff",
          },
        },
        labels: {
          style: {
            colors: ["#f5f7ff"],
          },
        },
      },
      {
        opposite: true,
        title: {
          text: "Current Year",
          style: {
            color: "#f5f7ff",
          },
        },
        labels: {
          style: {
            colors: ["#f5f7ff"],
          },
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      theme: "dark",
    }
  };
  
  var areaChart = new ApexCharts(document.querySelector("#area-chart"), areaChartOptions);
  areaChart.render();