window.scrollTo(0, 0);
window.addEventListener('DOMContentLoaded', function() {
  const splash = document.getElementById('splash-screen');
  if (splash) splash.style.display = '';
  const splashText = document.querySelector('.splash-text');
  const path = window.location.pathname;
  const hash = window.location.hash;
  const isHome = (
    (path.endsWith('index.html') || path === '/' || path === '') &&
    (!hash || hash === '#')
  );
  if (isHome) {
    if (splashText) splashText.style.display = 'block';
    splash.style.display = '';
    setTimeout(() => {
      splash.classList.add('fade-out');
      setTimeout(() => {
        splash.style.display = 'none';
      }, 600);
    }, 3000); 
  } else {
    if (splashText) splashText.style.display = 'none';
    splash.style.display = '';
    setTimeout(() => {
      splash.classList.add('fade-out');
      setTimeout(() => {
        splash.style.display = 'none';
      }, 600);
    }, 1500); 
  }
});
let currentIsProfile = true;

(function() {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
  } else {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
  }
})();

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
  if (document.body.classList.contains('dark-theme')) {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    localStorage.setItem('theme', 'light');
  } else {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  }
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

document.addEventListener('DOMContentLoaded', () => {
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

  const news = [
    { logo: 'images/home/neuro_news.jpg', headline: 'Mathematical model examines factors influencing risk of cerebral aneurysm rupture.', source: 'Neuro News', date: '06 Jan 2023',link:'https://neuronewsinternational.com/mathematical-model-examines-factors-influencing-risk-of-cerebral-aneurysm-rupture/' },
    { logo: 'images/home/hindu_news.png', headline: 'SCTIMST and IIT researchers create a mathematical model to predict rupture of aneurysms.', source: 'The Hindu', date: '16 Oct 2022',link:'https://www.thehindu.com/news/national/kerala/sctimst-and-iit-researchers-create-a-mathematical-model-to-predict-rupture-of-aneurysms/article66018212.ece' },
    { logo: 'images/home/medical_news.png', headline: 'Researchers develop a mathematical model to predict aneurysm rupture risk.', source: 'The Medical News', date: '11 Oct 2022',link:'https://www.news-medical.net/news/20221011/Researchers-develop-a-mathematical-model-to-predict-aneurysm-rupture-risk.aspx' },
    { logo: 'images/home/neurology.png', headline: 'Doctor,will my aneurysm rupture', source: 'Neurology India', date: 'March 2025',link:'https://journals.lww.com/neur/fulltext/2025/03000/doctor,_will_my_aneurysm_rupture_.1.aspx' }
  ];

const carouselTrack = document.getElementById('carousel-track');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');

if (carouselTrack && prevBtn && nextBtn) {
  function getCardWidth() {
    const card = carouselTrack.querySelector('.carousel-card');
    return card ? card.offsetWidth + 20 : 340;
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
      if (item.link) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
          window.open(item.link, '_blank');
        });
      }
      carouselTrack.appendChild(card);
    });
  }

  let currentCenter = 0;

  function updateCarousel(animate = true) {
    const cardsToShow = getVisibleCards();
    const cardWidth = getCardWidth();
    const total = news.length;
    const offset = (currentCenter - Math.floor(cardsToShow / 2)) * cardWidth;
    if (animate) {
      carouselTrack.style.transition = 'transform 0.3s cubic-bezier(.77,0,.18,1)';
    } else {
      carouselTrack.style.transition = 'none';
    }
    carouselTrack.style.transform = `translateX(${-offset}px)`;
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
}

  const heroVideo = document.getElementById('hero-video');
  function setHeroVideo() {
    if (document.body.classList.contains('light-theme')) {
      heroVideo.src = 'videos/home_light.mp4';
    } else {
      heroVideo.src = 'videos/flowcut.mp4';
    }
    heroVideo.load();
    heroVideo.play();
  }
  if (heroVideo) setHeroVideo();
  const themeSwitch = document.getElementById('theme-switch');
  if (themeSwitch) {
    themeSwitch.addEventListener('click', function() {
      setTimeout(setHeroVideo, 300);
    });
  }
    const facilitiesCarousel = document.querySelector('.lab-facilities-carousel');
  if (facilitiesCarousel) {
    const slides = Array.from(facilitiesCarousel.children);
    slides.forEach(slide => {
      const clone = slide.cloneNode(true);
      facilitiesCarousel.appendChild(clone);
    });

    let scrollAmount = 0;
    let slideWidth = slides[0].offsetWidth + 32; 
    function autoScrollFacilities() {
      scrollAmount += 1.5;
      if (scrollAmount >= facilitiesCarousel.scrollWidth / 2) {
        scrollAmount = 0;
      }
      facilitiesCarousel.scrollTo({ left: scrollAmount, behavior: 'auto' });
    }
    setInterval(autoScrollFacilities, 20);
  }

  let facilityModal = document.createElement('div');
  facilityModal.id = 'facility-modal';
  facilityModal.style.cssText = `
    display:none; position:fixed; z-index:9999; top:0; left:0; width:100vw; height:100vh;
    background:rgba(0,0,0,0.85); justify-content:center; align-items:center;
  `;
  facilityModal.innerHTML = `
    <img id="facility-modal-img" src="" style="max-width:90vw; max-height:80vh; border-radius:1.2rem; box-shadow:0 8px 32px #000a;" />
    <span id="facility-modal-close" style="position:absolute;top:30px;right:40px;font-size:2.5rem;color:#fff;cursor:pointer;">&times;</span>
  `;
  document.body.appendChild(facilityModal);

  const modalImg = document.getElementById('facility-modal-img');
  const closeBtn = document.getElementById('facility-modal-close');
  let currentFacilityIndex = -1;
  let facilityImages = [];

  if (facilitiesCarousel) {
    facilityImages = Array.from(facilitiesCarousel.querySelectorAll('img'));
    facilitiesCarousel.addEventListener('click', function(e) {
      const img = e.target.closest('img');
      if (img) {
        facilityModal.style.display = 'flex';
        modalImg.src = img.src;
        currentFacilityIndex = facilityImages.findIndex(im => im.src === img.src);
      }
    });
  }

  closeBtn.onclick = function() {
    facilityModal.style.display = 'none';
    modalImg.src = '';
    currentFacilityIndex = -1;
  };
  facilityModal.onclick = function(e) {
    if (e.target === facilityModal) {
      facilityModal.style.display = 'none';
      modalImg.src = '';
      currentFacilityIndex = -1;
    }
  };

  document.addEventListener('keydown', function(e) {
    if (facilityModal.style.display === 'flex' && currentFacilityIndex !== -1 && facilityImages.length) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        currentFacilityIndex = (currentFacilityIndex + 1) % facilityImages.length;
        modalImg.src = facilityImages[currentFacilityIndex].src;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        currentFacilityIndex = (currentFacilityIndex - 1 + facilityImages.length) % facilityImages.length;
        modalImg.src = facilityImages[currentFacilityIndex].src;
      } else if (e.key === 'Escape') {
        facilityModal.style.display = 'none';
        modalImg.src = '';
        currentFacilityIndex = -1;
      }
    }
  });
  const applyNav = document.querySelector('a[href="#apply-section"]');
  if (applyNav) {
    applyNav.addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById('apply-section').scrollIntoView({ behavior: 'smooth' });
    });
  }
  const statsSection = document.querySelector('.lab-stats-section');
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  function animateStats() {
    statNumbers.forEach(el => {
      const target = +el.getAttribute('data-target');
      let count = 1;
      const duration = 5000; 
      const stepTime = Math.max(Math.floor(duration / target), 20);
      function update() {
        if (count < target) {
          count++;
          el.textContent = count;
          setTimeout(update, stepTime);
        } else {
          el.textContent = target;
        }
      }
      update();
    });
  }

  if ('IntersectionObserver' in window && statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !statsAnimated) {
        animateStats();
        statsAnimated = true;
      }
    }, { threshold: 0.3 });
    observer.observe(statsSection);
  } else {
    animateStats();
  }
  const contactNav = document.querySelector('a[href="#contact-section"]');
  if (contactNav) {
    contactNav.addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById('contact-section').scrollIntoView({ behavior: 'smooth' });
    });
  }
});
