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

document.addEventListener('DOMContentLoaded', () => {
  // Morph animation (unchanged)
  let morphIndex = 0;
  const spans = document.querySelectorAll('.hero-morph-text span');
  function morphHeroText() {
    spans.forEach((span, i) => span.classList.toggle('active', i === morphIndex));
    morphIndex = (morphIndex + 1) % spans.length;
  }
  if (spans.length) {
    morphHeroText();
    setInterval(morphHeroText, 3000);
  }

  // News Carousel
  const news = [
    { logo: 'images/tn-logo.png', headline: 'Researchers developed a Mathematical model to predict Aneurysm rupture risk', source: 'The Medical News', date: '11 Oct 2022' },
    { logo: 'images/hindu-logo.png', headline: 'SCTIMST and IIT researchers create a mathematical model to predict cerebral aneurysm rupture', source: 'The Hindu', date: 'May 2022' },
    { logo: 'images/tn-logo.png', headline: 'Researchers developed a Mathematical model to predict Aneurysm rupture risk', source: 'The Medical News', date: '11 Oct 2022' },
    { logo: 'images/hindu-logo.png', headline: 'SCTIMST and IIT researchers create a mathematical model to predict cerebral aneurysm rupture', source: 'The Hindu', date: 'May 2022' }
  ];

  const carouselTrack = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  function getCardWidth() {
    const card = carouselTrack.querySelector('.carousel-card');
    return card ? card.offsetWidth + 20 : 340; // 20 is the gap
  }

  function getVisibleCards() {
    if (window.innerWidth < 500) return 1;
    if (window.innerWidth < 900) return 2;
    return 3;
  }

  function renderCarousel() {
    carouselTrack.innerHTML = '';
    news.forEach((item, i) => {
      const card = document.createElement('div');
      card.className = 'carousel-card';
      card.innerHTML = `
        <img src="${item.logo}" alt="${item.source}" class="card-logo" />
        <div class="card-headline">${item.headline}</div>
        <div class="card-meta">${item.source} — ${item.date}</div>
      `;
      carouselTrack.appendChild(card);
    });
  }

  let currentCenter = 0;

  function updateCarousel(animate = true) {
    const cardsToShow = getVisibleCards();
    const cardWidth = getCardWidth();
    const total = news.length;
    // Calculate offset so center card is centered
    const offset = (currentCenter - Math.floor(cardsToShow / 2)) * cardWidth;
    if (animate) {
      carouselTrack.style.transition = 'transform 0.6s cubic-bezier(.77,0,.18,1)';
    } else {
      carouselTrack.style.transition = 'none';
    }
    carouselTrack.style.transform = `translateX(${-offset}px)`;
    // Highlight center card
    const cards = Array.from(carouselTrack.children);
    cards.forEach((card, i) => card.classList.remove('center'));
    let centerIdx = currentCenter;
    if (centerIdx < 0) centerIdx += total;
    if (centerIdx >= total) centerIdx -= total;
    cards[centerIdx].classList.add('center');
  }

  function next() {
    currentCenter = (currentCenter + 1) % news.length;
    updateCarousel();
  }

  function prev() {
    currentCenter = (currentCenter - 1 + news.length) % news.length;
    updateCarousel();
  }

  renderCarousel();
  updateCarousel(false);

  let autoScroll = setInterval(next, 4000);

  nextBtn.addEventListener('click', () => {
    clearInterval(autoScroll);
    next();
    autoScroll = setInterval(next, 4000);
  });

  prevBtn.addEventListener('click', () => {
    clearInterval(autoScroll);
    prev();
    autoScroll = setInterval(next, 4000);
  });

  window.addEventListener('resize', () => {
    updateCarousel(false);
  });

  carouselTrack.addEventListener('mouseenter', () => clearInterval(autoScroll));
  carouselTrack.addEventListener('mouseleave', () => {
    autoScroll = setInterval(next, 4000);
  });
});
