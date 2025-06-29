const researchData = {
  cardio: {
    bgImg: "images/research-bg.jpg",
    bgVideo: "videos/ha.mp4",
    gif: "images/heart.gif",
    subtitle: "Explore our impactful research in Cardio Vascular Science",
    title: "Cardio Vascular Research",
    cards: [
      { title: "Hemodynamics in the Heart", text: "Advanced simulations of blood flow and wall mechanics for improved diagnosis and treatment of cardiovascular diseases.",img:"images/research2.png" },
      { title: "Patient-Specific Modeling", text: "Custom models for individual patients to predict disease progression and optimize therapies.",img:"images/research2.png" },
      { title: "FSI Techniques", text: "Fluid-structure interaction methods to analyze hemodynamics in arteries." ,img:"images/research2.png"},
      { title: "Vascular Device Testing", text: "Computational and experimental studies for stents and grafts.",img:"images/research2.png" }
    ]
  },
  cerebro: {
    bgImg: "images/cerebro-hero-bg.jpg",
    bgVideo: "videos/cerebro.mp4",
    gif: "images/cerebro.gif",
    subtitle: "Explore our impactful research in Cerebro Vascular Science",
    title: "Cerebro Vascular Research",
    cards: [
      { title: "Aneurysm Modeling", text: "Patient-specific models for cerebral aneurysms and rupture risk assessment.",img:"images/research2.png" },
      { title: "Histopathology-Based Reconstructions", text: "Detailed vessel wall reconstructions for accurate FSI simulations." ,img:"images/research2.png"},
      { title: "Brain Flow Dynamics", text: "Analysis of complex flow patterns in the brain's arteries." ,img:"images/research2.png"}
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
    const heroResearchText = heroGifCol.querySelector('.hero-research-text');
    if (heroResearchText) heroResearchText.textContent = "OUR RESEARCH";
    const heroGifImg = heroGifCol.querySelector('.hero-gif-img');
    if (heroGifImg) heroGifImg.style.display = "none";
    heroSubtitle.textContent = "Explore our impactful research";
    if (heroBgImg) {
      heroBgImg.src = "images/research-bg.jpg";
      heroBgImg.style.opacity = 1;
      heroBgImg.style.display = "block";
    }
    if (heroBgVideo) {
      heroBgVideo.style.opacity = 0;
      heroBgVideo.style.display = "none";
      heroBgVideo.pause();
    }
    heroGifCol.classList.remove('hide');
    heroSubtitle.classList.remove('hide');
    heroHeadingCol.classList.add('show');
    if (heroTitle) heroTitle.textContent = "OUR RESEARCH";
    btns.forEach(b => b.classList.remove('active'));
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
    if (CARDS_PER_PAGE < allCards.length) {
      loadMoreBtn.style.display = "block";
    } else {
      loadMoreBtn.style.display = "none";
    }
    backBtn.style.display = "none";
    currentSection = null;
    currentPage = 1;
  }

  function renderSection(section, page = 1) {
    const bulbImg = document.querySelector('.research-bulb-img');
    if (bulbImg) bulbImg.style.display = 'none';
    const heroGifImg = heroGifCol.querySelector('.hero-gif-img');
    if (heroGifImg) {
      heroGifImg.src = researchData[section].gif;
      heroGifImg.style.display = "block";
    }
    const heroResearchText = heroGifCol.querySelector('.hero-research-text');
    if (heroResearchText) {
      heroResearchText.textContent = section === 'cardio'
        ? "CARDIO VASCULAR RESEARCH"
        : "CEREBRO VASCULAR RESEARCH";
    }
    heroSubtitle.textContent = researchData[section].subtitle;
    const data = researchData[section];
    if (heroBgImg) heroBgImg.style.display = "none";
    if (heroBgVideo) {
      heroBgVideo.style.display = "none";
      heroBgVideo.pause();
      if (heroBgVideoSource) heroBgVideoSource.src = "";
    }
    heroGifCol.classList.remove('hide');
    heroSubtitle.classList.remove('hide');
    heroHeadingCol.classList.remove('show');
    if (heroTitle) heroTitle.textContent = "";
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
    if (end < data.cards.length) {
      loadMoreBtn.style.display = "block";
    } else {
      loadMoreBtn.style.display = "none";
    }
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
      let allCards = [];
      Object.values(researchData).forEach(sec => allCards = allCards.concat(sec.cards));
      const start = currentPage * CARDS_PER_PAGE;
      const end = Math.min((currentPage + 1) * CARDS_PER_PAGE, allCards.length);
      for (let i = start; i < end; i++) {
        const card = allCards[i];
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
      currentPage++;
      if (end >= allCards.length) loadMoreBtn.style.display = "none";
    } else {
      renderSection(currentSection, currentPage + 1);
    }
  });

  backBtn.addEventListener('click', () => {
    renderDefault();
  });

  renderDefault();
});
