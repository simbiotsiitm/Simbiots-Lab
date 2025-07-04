const carousel = document.getElementById('collab-carousel');
const dotsContainer = document.querySelector('.carousel-dots');
const leftBtn = document.getElementById('carousel-left');
const rightBtn = document.getElementById('carousel-right');
let cards = Array.from(carousel.querySelectorAll('.collab-card'));
let total = cards.length;
let index = 0;
let interval;

function getVisibleCards() {
  if (window.innerWidth < 600) return 1;
  if (window.innerWidth < 900) return 2;
  return 3;
}

function getCardWidth() {
  const card = carousel.querySelector('.collab-card');
  return card ? card.offsetWidth + 32 : 340;
}

function renderDots() {
  const visible = getVisibleCards();
  dotsContainer.innerHTML = '';
  const maxIndex = Math.max(0, total - visible);
  for (let i = 0; i <= maxIndex; i++) {
    const dot = document.createElement('span');
    dot.className = 'carousel-dot' + (i === index ? ' active' : '');
    dot.addEventListener('click', () => {
      index = i;
      updateCarousel();
      resetInterval();
    });
    dotsContainer.appendChild(dot);
  }
}

function updateCarousel(animate = true) {
  const cardWidth = getCardWidth();
  const visible = getVisibleCards();
  const maxIndex = Math.max(0, total - visible);
  if (index > maxIndex) index = 0;
  if (index < 0) index = maxIndex;
  if (animate) {
    carousel.style.transition = 'transform 0.6s cubic-bezier(.77,0,.18,1)';
  } else {
    carousel.style.transition = 'none';
  }
  carousel.style.transform = `translateX(-${index * cardWidth}px)`;
  renderDots();
}

function moveNext() {
  const visible = getVisibleCards();
  const maxIndex = Math.max(0, total - visible);
  index = index + 1 > maxIndex ? 0 : index + 1;
  updateCarousel();
}

function movePrev() {
  const visible = getVisibleCards();
  const maxIndex = Math.max(0, total - visible);
  index = index - 1 < 0 ? maxIndex : index - 1;
  updateCarousel();
}

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(moveNext, 2500);
}

leftBtn.addEventListener('click', () => {
  movePrev();
  resetInterval();
});

rightBtn.addEventListener('click', () => {
  moveNext();
  resetInterval();
});

window.addEventListener('resize', () => updateCarousel(false));
carousel.addEventListener('mouseenter', () => clearInterval(interval));
carousel.addEventListener('mouseleave', resetInterval);

renderDots();
updateCarousel(false);
interval = setInterval(moveNext, 2500);
