/*// Toggle menu for small devices
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
    }, 1000); // matches fade-out duration
  }, 1000); // splash visible for 2s before fade starts
});

setTimeout(function () {
  splash.style.display = "none";
  const mainContent = document.getElementById("main-content");
  mainContent.style.display = "block";
  mainContent.classList.add("show");
}, 1000);*/
const researchData = {
  cardio: {
    bgImg: "images/research-bg.jpg",
    bgVideo: "videos/ha.mp4",
    gif: "images/research-bg.gif",
    subtitle: "Explore our impactful research in Cardio Vascular Science",
    title: "Cardio Vascular Research",
    cards: [
      { title: "Hemodynamics in the Heart", text: "Advanced simulations of blood flow and wall mechanics for improved diagnosis and treatment of cardiovascular diseases.",img:"images/research2.png" },
      { title: "Patient-Specific Modeling", text: "Custom models for individual patients to predict disease progression and optimize therapies." },
      { title: "FSI Techniques", text: "Fluid-structure interaction methods to analyze hemodynamics in arteries." },
      { title: "Vascular Device Testing", text: "Computational and experimental studies for stents and grafts." }
    ]
  },
  cerebro: {
    bgImg: "images/cerebro-hero-bg.jpg",
    bgVideo: "videos/cerebro.mp4",
    gif: "images/cerebro-bg.gif",
    subtitle: "Explore our impactful research in Cerebro Vascular Science",
    title: "Cerebro Vascular Research",
    cards: [
      { title: "Aneurysm Modeling", text: "Patient-specific models for cerebral aneurysms and rupture risk assessment." },
      { title: "Histopathology-Based Reconstructions", text: "Detailed vessel wall reconstructions for accurate FSI simulations." },
      { title: "Brain Flow Dynamics", text: "Analysis of complex flow patterns in the brain's arteries." }
    ]
  },
};

const CARDS_PER_PAGE = 3;

document.addEventListener("DOMContentLoaded", () => {
  const btns = document.querySelectorAll('.toggle-btn');
  const heroBgImg = document.getElementById('hero-bg-img');
  const heroBgVideo = document.getElementById('hero-bg-video');
  const heroBgVideoSource = document.getElementById('hero-bg-video-source');
  const heroGifCol = document.querySelector('.hero-gif-col');
  const heroSubtitle = document.getElementById('hero-subtitle');
  const heroTitle = document.getElementById('hero-title');
  const heroHeadingCol = document.getElementById('hero-heading-col');
  const contentList = document.getElementById('research-content-list');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const backBtn = document.getElementById('back-btn');

  let currentSection = null;
  let currentPage = 1;

  function renderDefault() {
    const bulbImg = document.querySelector('.research-bulb-img');
    if (bulbImg) bulbImg.style.display = '';
    // Show default background image, hide video
    heroBgImg.src = "images/research-bg.jpg";
    heroBgImg.style.opacity = 1;
    heroBgImg.style.display = "block";
    heroBgVideo.style.opacity = 0;
    heroBgVideo.style.display = "none";
    heroBgVideo.pause();

    // Show GIF and subtitle, hide heading
    heroGifCol.classList.remove('hide');
    heroSubtitle.classList.remove('hide');
    heroHeadingCol.classList.add('show');
    heroTitle.textContent = "OUR RESEARCH"; // <-- Fix: always set this!
    heroSubtitle.textContent = "Explore our impactful research"; // <-- Reset subtitle too

    const heroResearchText = document.querySelector('.hero-research-text');
    if (heroResearchText) heroResearchText.textContent = "OUR RESEARCH";

    // No button selected
    btns.forEach(b => b.classList.remove('active'));

    // Show default cards (first 3 from all sections)
    let allCards = [];
    Object.values(researchData).forEach(sec => allCards = allCards.concat(sec.cards));
    contentList.innerHTML = "";
    allCards.slice(0, CARDS_PER_PAGE).forEach(card => {
      contentList.innerHTML += `
  <div class="research-card-container">
    <div class="research-card-img">
      <img src="${card.img}" alt="${card.title}" />
    </div>
    <div class="research-card">
      <h3>${card.title}</h3>
      <p>${card.text}</p>
    </div>
  </div>
`;
    });

    // Show/hide Load More
    if (CARDS_PER_PAGE < allCards.length) {
      loadMoreBtn.style.display = "block";
    } else {
      loadMoreBtn.style.display = "none";
    }

    // Hide "All" button
    backBtn.style.display = "none";

    currentSection = null;
    currentPage = 1;
  }

  function renderSection(section, page = 1) {
    const bulbImg = document.querySelector('.research-bulb-img');
    if (bulbImg) bulbImg.style.display = 'none';
    const data = researchData[section];
  
    // For both cardio and cerebro: no background image/video, show big text and subtitle
    heroBgImg.style.display = "none";
    heroBgVideo.style.display = "none";
    heroBgVideo.pause();
    heroBgVideoSource.src = "";
  
    // Show GIF/text and subtitle, hide heading
    heroGifCol.classList.remove('hide');
    heroSubtitle.classList.remove('hide');
    heroHeadingCol.classList.remove('show');
    heroTitle.textContent = "";
  
    // Set the big text and subtitle for each section
    if (section === 'cardio') {
      heroGifCol.querySelector('.hero-research-text').textContent = "CARDIO VASCULAR RESEARCH";
      heroSubtitle.textContent = data.subtitle;
    } else if (section === 'cerebro') {
      heroGifCol.querySelector('.hero-research-text').textContent = "CEREBRO VASCULAR RESEARCH";
      heroSubtitle.textContent = data.subtitle;
    }
  
    // Cards
    const start = 0;
    const end = Math.min(page * CARDS_PER_PAGE, data.cards.length);
    contentList.innerHTML = "";
    for (let i = 0; i < end; i++) {
      const card = data.cards[i];
      contentList.innerHTML += `
        <div class="research-card-container">
          <div class="research-card-img">
            <img src="${card.img}" alt="${card.title}" />
          </div>
          <div class="research-card">
            <h3>${card.title}</h3>
            <p>${card.text}</p>
          </div>
        </div>
      `;
    }
  
    // Show/hide Load More
    if (end < data.cards.length) {
      loadMoreBtn.style.display = "block";
    } else {
      loadMoreBtn.style.display = "none";
    }
  
    // Show "All" button
    backBtn.style.display = "inline-block";
  
    currentSection = section;
    currentPage = page;
  }

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const section = btn.getAttribute('data-section');
      renderSection(section, 1);
    });
  });

  loadMoreBtn.addEventListener('click', () => {
    if (!currentSection) {
      // Default: show more from all cards
      let allCards = [];
      Object.values(researchData).forEach(sec => allCards = allCards.concat(sec.cards));
      const start = currentPage * CARDS_PER_PAGE;
      const end = Math.min((currentPage + 1) * CARDS_PER_PAGE, allCards.length);
      for (let i = start; i < end; i++) {
        const card = allCards[i];
        contentList.innerHTML += `
          <div class="research-card">
            <h3>${card.title}</h3>
            <p>${card.text}</p>
          </div>
        `;
      }
      currentPage++;
      if (end >= allCards.length) loadMoreBtn.style.display = "none";
    } else {
      // Section: show more from that section
      renderSection(currentSection, currentPage + 1);
    }
  });

  backBtn.addEventListener('click', () => {
    renderDefault();
  });

  // Initial render
  renderDefault();
});