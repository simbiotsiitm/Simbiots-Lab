// Toggle menu for small devices
let currentIsProfile = true;

// Splash screen with fade-out
window.addEventListener("load", function () {
  setTimeout(function () {
    const splash = document.getElementById("splash-screen");
    splash.classList.add("fade-out");

    // After fade-out ends (1s), hide splash and show main content
    setTimeout(function () {
      splash.style.display = "none";
      document.getElementById("main-content").style.display = "block";
    }, 2000); // matches fade-out duration
  }, 2000); // splash visible for 2s before fade starts
});

setTimeout(function () {
  splash.style.display = "none";
  const mainContent = document.getElementById("main-content");
  mainContent.style.display = "block";
  mainContent.classList.add("show");
}, 1000);
  