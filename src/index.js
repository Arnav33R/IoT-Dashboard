import "./styles.css";

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

new Chart("liveChart", {
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

document.getElementById("app").innerHTML = ``;
