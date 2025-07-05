document.addEventListener("DOMContentLoaded", () => {
  const data = getStoredData();

  const labels = data.map(e => e.date);
  const calories = data.map(e => +e.calories);
  const durations = data.map(e => +e.duration);

  new Chart(document.getElementById("calorieChart"), {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Calories Burned",
        data: calories,
        backgroundColor: "#ff7f50"
      }]
    }
  });

  new Chart(document.getElementById("durationChart"), {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Workout Duration (min)",
        data: durations,
        borderColor: "#36a2eb",
        fill: false
      }]
    }
  });
});