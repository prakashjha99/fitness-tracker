function getStoredData() {
  return JSON.parse(localStorage.getItem("exercises")) || [];
}