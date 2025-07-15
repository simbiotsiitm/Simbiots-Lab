const researchData = {
  cardio: {
    bgImg: "images/research/heart.gif",
    bgVideo: "images/research/heart.gif",
    subtitle: "Explore our impactful research in Cardiovascular Science",
    cards: [
      {
        title: "Structural Heart Defects",
        text: "We study congenital and acquired heart defects using simulations and imaging to support clinical decision-making and improve surgical outcomes for patient specific conditions.",
        mediaType: "gif",
        mediaSrc: "images/heart.gif",
      },
      {
        title: "Percutaneous Ventricular Assist Devices (PVADs)",
        text: "The objective is to design and perform CFD analysis to develop smallest possible micro-pump for percutaneous support to avoid cardiogenic shock during surgery.",
        mediaType: "img",
        mediaSrc: "images/research/pvad.jpeg",
      },
      {
        title: "Extracorporeal Membrane Oxygenation (ECMO)",
        text: "ECMO offers temporary support for heart or lung failure. We work on advancing membrane oxygenator technology, improving gas exchange, minimizing complications, and enabling safer long-term use.",
        mediaType: "gif",
        mediaSrc: "images/research/ecmo.gif",
      },
      {
        title: "Vascular Abnormalities",
        text: "We investigate abnormal vessel structures and flow disruptions that contribute to cardiovascular diseases, enhancing diagnostic tools and treatment planning through advanced modeling.",
        mediaType: "img",
        mediaSrc: "images/research/vascular.jpeg",
      },
    ],
  },
  cerebro: {
    bgImg: "images/research/brain.gif",
    bgVideo: "images/research/brain.gif",
    subtitle: "Explore our impactful research in Cerebrovascular Science",
    cards: [
      {
        title: "Aneurysms",
        text: "We model and analyze cerebral aneurysms to assess rupture risk and assist in optimizing interventions like coiling or surgical clipping.",
        mediaType: "img",
        mediaSrc: "images/research/aneurysm.png",
      },
      {
        title: "Moyamoya Angiopathy (MMA)",
        text: "Our work focuses on altered blood flow patterns in Moyamoya disease, using imaging and computational tools to support early diagnosis and revascularization strategies.",
        mediaType: "img",
        mediaSrc: "images/research/moya.jpeg",
      },
      {
        title: "Arteriovenous Malformations (AVMs)",
        text: "We study the complex structure and hemodynamics of AVMs to evaluate hemorrhagic risk and personalize therapeutic approaches.",
        mediaType: "img",
        mediaSrc: "images/research/avm.jpg",
      },
      {
        title: "Arterial Dissections (AD)",
        text: "We simulate the initiation and evolution of arterial dissections to understand their biomechanical triggers and improve patient-specific treatment planning.",
        mediaType: "img",
        mediaSrc: "images/research/ad.jpeg",
      },
    ],
  },
  heat: {
    bgImg: "images/heat-bg.jpg",
    bgVideo: "videos/heat-transfer.mp4",
    subtitle: "Explore our impactful research in Thermal Sciences",
    cards: [
      {
        title: "Flow Boiling",
        text: "We investigate flow boiling phenomena in microscale channels to improve heat dissipation in compact systems, with applications in electronics cooling and biomedical devices.",
        mediaType: "img",
        mediaSrc: "images/heat1.png",
      },
      {
        title: "Convective Heat Transfer",
        text: "Resolving the convective HTC for rod bundle heat transfer using full scale CFD simulations as well as sub-channel analysis.",
        mediaType: "gif",
        mediaSrc: "images/convection.gif",
      },
      {
        title: "Battery Thermal Management Systems (BTMS) for Electric Vechicles",
        text: "We study thermal management issues of concern to EV batteries and design of cold plate and their packing to achieve enhanced thermal performance.",
        mediaType: "video",
        mediaSrc: "videos/cooling.mp4",
      },
    ],
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash-screen");
  const mainContent = document.getElementById("main-content");
  const heroHeading = document.getElementById("hero-heading");
  const heroMediaDiv = document.getElementById("hero-media");
  const heroImage = document.getElementById("hero-image");
  const heroVideo = document.getElementById("hero-video");
  const heroVideoSource = heroVideo.querySelector("source");
  const heroSubtitle = document.getElementById("hero-subtitle");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cardList = document.getElementById("card-list");
  const backBtn = document.getElementById("back-btn");

  let currentFilter = "all";
  setTimeout(() => {
    splash.style.opacity = 0;
    setTimeout(() => {
      splash.style.display = "none";
      mainContent.style.display = "block";
      renderCards("all");
    }, 600);
  }, 2200);

  function clearActiveButtons() {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
  }

  function setActiveButton(filter) {
    clearActiveButtons();
    const btn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
    if (btn) btn.classList.add("active");
  }

  function showBackButton(show) {
    backBtn.style.display = show ? "inline-block" : "none";
  }

  function updateHeroMedia(filter) {
    if (filter === "all") {
      heroImage.style.display = "block";
      heroImage.src = "images/research/research.png";
      heroVideo.style.display = "none";
      heroVideo.pause();
      heroVideoSource.src = "";
      heroSubtitle.textContent = "Explore our impactful research";
      heroHeading.textContent = "OUR RESEARCH";
    } else if (filter === "cardio") {
      heroImage.style.display = "block";
      heroImage.src = researchData.cardio.bgImg;
      heroVideo.style.display = "none";
      heroVideo.pause();
      heroVideoSource.src = "";
      heroSubtitle.textContent = researchData.cardio.subtitle;
      heroHeading.textContent = "Cardiovascular Research";
    } else if (filter === "cerebro") {
      heroImage.style.display = "block";
      heroImage.src = researchData.cerebro.bgImg;
      heroVideo.style.display = "none";
      heroVideo.pause();
      heroVideoSource.src = "";
      heroSubtitle.textContent = researchData.cerebro.subtitle;
      heroHeading.textContent = "Cerebrovascular Research";
    } else if (filter === "heat") {
      heroImage.style.display = "none";
      heroVideoSource.src = researchData.heat.bgVideo;
      heroVideo.load();
      heroVideo.style.display = "block";
      heroVideo.play();
      heroSubtitle.textContent = researchData.heat.subtitle;
      heroHeading.textContent = "Heat Transfer Research";
    }
  }

  function createCard(card) {
    let mediaHtml = "";
    if (card.mediaType === "img") {
      mediaHtml = `<img src="${card.mediaSrc}" alt="${card.title}" />`;
    } else if (card.mediaType === "video") {
      mediaHtml = `<video muted loop playsinline preload="metadata" src="${card.mediaSrc}"></video>`;
    } else if (card.mediaType === "gif") {
      mediaHtml = `<img src="${card.mediaSrc}" alt="${card.title}" />`;
    }

    return `
      <article class="card">
        <div class="card-media">${mediaHtml}</div>
        <div class="card-content">
          <h3>${card.title}</h3>
          <p>${card.text}</p>
        </div>
      </article>
    `;
  }

  function renderCards(filter) {
    currentFilter = filter;
    setActiveButton(filter);
    showBackButton(filter !== "all");

    updateHeroMedia(filter);

    cardList.innerHTML = "";

    if (filter === "all") {
      let allCards = [];
      Object.values(researchData).forEach((sec) => {
        allCards = allCards.concat(sec.cards);
      });
      allCards.forEach((card) => {
        cardList.innerHTML += createCard(card);
      });
    } else {
      let cards = researchData[filter]?.cards || [];
      cards.forEach((card) => {
        cardList.innerHTML += createCard(card);
      });
    }
  }

    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        let filter = btn.getAttribute("data-filter");
        if (filter === currentFilter) return;
        renderCards(filter);
      });
    });
});
backBtn.addEventListener("click", () => {
  renderCards("all");
});
