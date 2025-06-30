let currentIsProfile = true;

(function() {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
})();

window.addEventListener("load", function () {
  setTimeout(function () {
    const splash = document.getElementById("splash-screen");
    if (splash) splash.classList.add("fade-out");
    setTimeout(function () {
      if (splash) splash.style.display = "none";
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        mainContent.style.display = "block";
        mainContent.classList.add("show");
      }
    }, 2500); 
  }, 2500); 
});
window.addEventListener("load", function () {
  setTimeout(function () {
    const splash = document.getElementById("splash-screen-main");
    if (splash) splash.classList.add("fade-out");
    setTimeout(function () {
      if (splash) splash.style.display = "none";
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        mainContent.style.display = "block";
        mainContent.classList.add("show");
      }
    }, 3200); 
  }, 3200); 
});
setTimeout(function () {
  splash.style.display = "none";
  document.getElementById("main-content").style.display = "block";
}, 1000);

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

setInterval(toggleLeftSection, 2000);

function toggleMenu() {
  const navLinks = document.getElementById('nav-links');
  navLinks.classList.toggle('show');
}

function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  const switchEl = document.getElementById('theme-switch');
  switchEl.classList.toggle('active', document.body.classList.contains('dark-theme'));
  if (document.body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const switchEl = document.getElementById('theme-switch');
  if (document.body.classList.contains('dark-theme')) {
    switchEl.classList.add('active');
  } else {
    switchEl.classList.remove('active');
  }
});
