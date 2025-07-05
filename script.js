document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("exerciseForm"),
        list = document.getElementById("exerciseList"),
        search = document.getElementById("searchInput"),
        totalMin = document.getElementById("totalMinutes"),
        totalCal = document.getElementById("totalCalories");

  let stored = JSON.parse(localStorage.getItem("exercises")) || [];

  stored.forEach(addToDOM);
  updateSummary();

  form.addEventListener("submit", e => {
    e.preventDefault();
    const exercise = form.exercise.value.trim(),
          duration = form.duration.value,
          calories = form.calories.value,
          date = new Date().toLocaleDateString();

    const newItem = { exercise, duration, calories, date };
    stored.push(newItem);
    localStorage.setItem("exercises", JSON.stringify(stored));

    addToDOM(newItem);
    updateSummary();
    form.reset();
    showToast("Added! 🎉");
  });

  search.addEventListener("input", () => {
    const term = search.value.toLowerCase();
    document.querySelectorAll("#exerciseList li").forEach(li => {
      li.style.display = li.textContent.toLowerCase().includes(term) ? "" : "none";
    });
  });

  function addToDOM(item) {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.exercise}</strong> – ${item.duration} min – ${item.calories} cal
      <small>🗓 ${item.date}</small>
      <button class="deleteBtn">❌</button>
    `;

    li.querySelector(".deleteBtn").onclick = () => {
      list.removeChild(li);
      stored = stored.filter(i =>
        !(i.exercise===item.exercise &&
          i.duration===item.duration &&
          i.calories===item.calories &&
          i.date===item.date)
      );
      localStorage.setItem("exercises", JSON.stringify(stored));
      updateSummary();
      showToast("Deleted.");
    };

    list.appendChild(li);
  }

  function updateSummary() {
    let mins = 0, cal = 0;
    stored.forEach(i => {
      mins += Number(i.duration);
      cal += Number(i.calories);
    });
    totalMin.textContent = mins;
    totalCal.textContent = cal;
  }

  function showToast(msg) {
    const toast = document.createElement("div");
    toast.textContent = msg;
    Object.assign(toast.style, {
      position: "fixed",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "#333",
      color: "#fff",
      padding: "8px 15px",
      borderRadius: "5px",
      opacity: 0.9,
      zIndex: 9999
    });
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 2000);
  }
});