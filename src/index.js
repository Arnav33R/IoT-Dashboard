const canvas = document.getElementById("liveChart");
const select = document.getElementById("selected-sensor");
const unit = document.getElementById("unit");
const select2Container = document.getElementById("select2-container");

select.addEventListener("change", () => {
  if (select.value === "temperature") {
    select2Container.style.display = "block";
  } else {
    select2Container.style.display = "none";
    unit.value = "";
  }
});

var xyValues = [
  { x: 1, y: 28 },
  { x: 2, y: 26 },
  { x: 3, y: 25 },
  { x: 4, y: 29 },
  { x: 5, y: 32 },
  { x: 6, y: 23 },
  { x: 7, y: 14 },
  { x: 8, y: 24 },
  { x: 9, y: 11 },
  { x: 10, y: 15 }
];

const myChart = new Chart("liveChart", {
  type: "scatter",
  data: {
    datasets: [
      {
        pointRadius: 4,
        pointBackgroundColor: "rgb(0,0,255)",
        data: xyValues
      }
    ]
  },
  options: {
    legend: { display: false },
    scales: {
      xAxes: [{ ticks: { min: 0, max: 10 } }],
      yAxes: [{ ticks: { min: 0, max: 40 } }]
    }
  }
});

// Assume you have a chart object called "myChart"
const data = myChart.data;

// Convert the data to CSV format
const labels = ["x", "y"];
const datasets = data.datasets[0].data;
const csvData = datasets.map((point) => `"${point.x}",${point.y}`).join("\n");

// Create a download link and button
const downloadLink = document.createElement("a");
const button = document.createElement("button");

// Set the download link attributes
downloadLink.href = URL.createObjectURL(new Blob([csvData], {type: "text/csv"}));
downloadLink.download = "chart-data.csv";
downloadLink.style.display = "none";

// Set the button attributes
button.innerText = "Download CSV";
button.addEventListener("click", () => {
  downloadLink.click();
});

// Append the button to the document body
document.body.appendChild(button);

document.getElementById("app").innerHTML = ``;
