function updateViews() {
  $.get("https://gdirectory.glitch.me/views", function(data) {
    if (data !== NaN) {
      localStorage.setItem("views", data);
      document.getElementById("views").innerHTML = "Views: " + data;
      console.log("Loaded views: " + data);
    } else {
      document.getElementById("views").innerHTML = "Failed to load views (If this keeps happening report it to rust#1622)";
      console.error("Failed loading views!!!");
    }
  });
}

updateViews();
setInterval(updateViews, 5000);

window.addEventListener("load", () => {
  createDialog(
    "Welcome",
    "[UPDATE]: Added more games to <a href='/addicting.html'>Cool Games</a>"
  );
});

console.log("script.js for index loaded.");