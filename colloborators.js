document.addEventListener("DOMContentLoaded", function() {
  const themeSwitch = document.getElementById('theme-switch');
  themeSwitch.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
  });

  const carousel = document.getElementById('collab-carousel');
  const dotsContainer = document.querySelector('.carousel-dots');
  const leftBtn = document.getElementById('carousel-left');
  const rightBtn = document.getElementById('carousel-right');
  let cards = Array.from(carousel.querySelectorAll('.collab-card'));
  let total = cards.length;

  // Clone first and last card for infinite effect
  const firstClone = cards[0].cloneNode(true);
  const lastClone = cards[total - 1].cloneNode(true);
  firstClone.classList.add('clone');
  lastClone.classList.add('clone');
  carousel.appendChild(firstClone);
  carousel.insertBefore(lastClone, cards[0]);

  // Update cards NodeList after cloning
  cards = Array.from(carousel.querySelectorAll('.collab-card'));
  total = cards.length - 2; // exclude clones for dot logic

  let index = 1; // Start at first real card
  let interval;

  function getCardWidth() {
    const card = carousel.querySelector('.collab-card');
    return card ? card.offsetWidth + 32 : 340; // 32 is the gap
  }

  function renderDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('span');
      dot.className = 'carousel-dot' + (i === ((index - 1 + total) % total) ? ' active' : '');
      dot.addEventListener('click', () => {
        index = i + 1;
        updateCarousel();
        resetInterval();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateCarousel(animate = true) {
    const cardWidth = getCardWidth();
    if (animate) {
      carousel.style.transition = 'transform 0.6s cubic-bezier(.77,0,.18,1)';
    } else {
      carousel.style.transition = 'none';
    }
    carousel.style.transform = `translateX(-${index * cardWidth}px)`;
    renderDots();
  }

  function moveNext() {
    index++;
    updateCarousel();
  }

  function movePrev() {
    index--;
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

  // Handle transition end for seamless looping
  carousel.addEventListener('transitionend', () => {
    const cardWidth = getCardWidth();
    if (index === 0) {
      carousel.style.transition = 'none';
      index = total;
      carousel.style.transform = `translateX(-${index * cardWidth}px)`;
      // Force reflow to apply the transform instantly
      carousel.offsetHeight;
      carousel.style.transition = 'transform 0.6s cubic-bezier(.77,0,.18,1)';
    }
    if (index === total + 1) {
      carousel.style.transition = 'none';
      index = 1;
      carousel.style.transform = `translateX(-${index * cardWidth}px)`;
      carousel.offsetHeight;
      carousel.style.transition = 'transform 0.6s cubic-bezier(.77,0,.18,1)';
    }
  });

  // Responsive: recalculate on resize
  window.addEventListener('resize', () => updateCarousel(false));

  // Pause on hover
  carousel.addEventListener('mouseenter', () => clearInterval(interval));
  carousel.addEventListener('mouseleave', resetInterval);

  renderDots();
  updateCarousel(false);
  interval = setInterval(moveNext, 2500);
});
