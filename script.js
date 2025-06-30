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
    }, 4000); 
  }, 4000); 
});

setTimeout(function () {
  const splash = document.getElementById("splash-screen");
  splash.style.display = "none";
  const mainContent = document.getElementById("main-content");
  mainContent.style.display = "block";
  mainContent.classList.add("show");
}, 4000);




function toggleLeftSection() {
  const profile = document.querySelector('.profile-block');
  const iitm = document.querySelector('.iitm-block');

  if (currentIsProfile) {
    profile.classList.remove('active');
    iitm.classList.add('active');
  } else {
    iitm.classList.remove('active');
    profile.classList.add('active');
  }

  currentIsProfile = !currentIsProfile;
}

// Auto toggle every 4 seconds
setInterval(toggleLeftSection, 2000);

// Hamburger menu
function toggleMenu() {
  const navLinks = document.getElementById('nav-links');
  navLinks.classList.toggle('show');
}


// Dark/Light theme toggle
function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  const switchEl = document.getElementById('theme-switch');
  switchEl.classList.toggle('active', document.body.classList.contains('dark-theme'));
}

window.addEventListener('DOMContentLoaded', () => {
  const switchEl = document.getElementById('theme-switch');
  if (document.body.classList.contains('dark-theme')) {
    switchEl.classList.add('active');
  } else {
    switchEl.classList.remove('active');
  }
});
