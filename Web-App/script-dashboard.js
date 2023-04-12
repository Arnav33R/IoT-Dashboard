/* ------ Assigning Names to DOM elements from HTML ------ */
const dataSaveMethod = document.getElementById("selected-data-save");
const dataSaveButton = document.getElementById("download-button");
const select = document.getElementById("selected-sensor");
const unit = document.getElementById("unit");
const tempUnit = document.getElementById("select-unit-container");

/* ------ Timer to Call the Get Request Repeatedly ------ */
var myTimer = setInterval(getVals, 5000);

var index = 0;
const labels = ["x", "y"];
var csvData;

/* ------ Function to Generate CSV File and Download from given Data Object ------ */
function generateCSV(data, dataSaveButton) {
    const rows = [labels.join(",")];
    data.forEach(({ x, y }) => {
        rows.push(`${x},${y}`);
    });
    const csvContent = rows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    dataSaveButton.setAttribute("href", URL.createObjectURL(blob));
    dataSaveButton.setAttribute("download", "iot-data.csv");
}

downloadButton.addEventListener("click", () => {
    generateCSV(xyValues);
});

/* ------ Display Unit Dropdown Menu only if selected sensor is Temperature ------ */
select.addEventListener("change", () => {
  if (select.value === "temperature") {
    if(tempUnit)
      tempUnit.style.display = "block";
  } else {
    tempUnit.style.display = "none";
    unit.value = "";
  }
});

/* ------ Sensor Data Objects ------ */
const sensors = {
    temperature: {
      xyValues: [],
      label: 'Temperature (°F)',
      color: "rgb(0,0,255)",
      yAxisLabel: 'Temperature (°F)'
    },
    distance: {
      xyValues: [],
      label: 'Distance',
      color: "rgb(255,0,0)",
      yAxisLabel: 'Distance'
    },
    light: {
      xyValues: [],
      label: 'Light',
      color: "rgb(0,255,0)",
      yAxisLabel: 'Light'
    },
    moisture: {
      xyValues: [],
      label: 'Moisture',
      color: "rgb(255,255,0)",
      yAxisLabel: 'Moisture'
    }
};


var xyValues = [
];

/* ------ Chart Object created using Chart.js ------ */
let chart = new Chart("liveChart", {
  type: 'scatter',
  data: {
    datasets: [
      {
        pointRadius: 4,
        label: 'Temperature (°F)', 
        pointBackgroundColor: "rgb(0,0,255)",
        data: xyValues,
        fill: false, // Add fill: false to prevent filling the area below the line
        borderColor: "rgb(0,0,255)", // Add a border color for the line
        lineTension: 0 // Set lineTension to 0 to disable smoothing of the line
      }
    ]
  },
  options: {
    legend: { display: false },
    scales: {
      xAxes: [{ ticks: { min: 0, max: 20 } }],
      yAxes: [{ ticks: { min: 0, max: 100 } }]
    },
    spanGaps: true
  }
});

/* ------ Callback function for Regular Sensor Readings ------ */
function regReply(response) {
    xyValues.push({x: index++, y: response });
    chart.data.datasets[0].data = xyValues;
    csvData = `${labels.join(",")}\n${xyValues.map(({ x, y }) => `${x},${y}`).join("\n")}`;
  
     // Keep only the last 30 data points
    if (xyValues.length > 20) {
      chart.options.scales.xAxes[0].ticks.min += 1;
      chart.options.scales.xAxes[0].ticks.max += 1;
    }
    chart.update();
}
let prevSelectValue = select.value;

/* ------ Callback function for Temperature/Humidity Readings ------ */
function tempReply(tempF, tempC, hum) {
  let curReading = 0; 
  if (select.value == "temperature") 
    curReading = unit.value == "celsius"? tempC : tempF;
  else 
    curReading = hum;

  console.log(curReading);
  xyValues.push({x: index++, y: curReading });
  chart.data.datasets[0].data = xyValues;
  csvData = `${labels.join(",")}\n${xyValues.map(({ x, y }) => `${x},${y}`).join("\n")}`;

   // Keep only the last 30 data points
  if (xyValues.length > 20) {
    chart.options.scales.xAxes[0].ticks.min += 1;
    chart.options.scales.xAxes[0].ticks.max += 1;
  }
  chart.update();
}

/* ------ Make HTTP Request based on selected sensor ------ */
function getVal() {
  if (select.value !== prevSelectValue) {
    prevSelectValue = select.value;
    xyValues = [];
    chart.data.datasets[0].data = xyValues;
    index = 0;
    chart.options.scales.xAxes[0].ticks.min = 0;
    chart.options.scales.xAxes[0].ticks.max = 20;
    chart.update();
  }

  if (select.value == "distance")
    httpGet("/dis", regReply);
  else if (select.value == "light") 
    httpGet("/par", regReply);
  else if (select.value == "moisture") 
    httpGet("/mois", regReply);
  else 
    httpGet("/temp", tempReply);
}

/* ------ Complete and Process HTTP GET Request ------ */
function httpGet(path, callback) {
  var req = new XMLHttpRequest();
  req.open("GET", path, true); 
  req.onreadystatechange = function(){ 
    if (req.readyState == 4) {
      if(req.status == 200) {
        if (path == "/temp"){
          data = req.responseText.split(",");
          callback(data[0], data[1], data[2]);
        }
        callback(req.responseText);
      }
      else 
        callback("Waiting...");
    }
  }
  req.send(null);
}
