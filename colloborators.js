document.addEventListener("DOMContentLoaded", function() {
  const themeSwitch = document.getElementById('theme-switch');
  themeSwitch.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
  });

  const carousel = document.getElementById('collab-carousel');
  const cards = carousel.querySelectorAll('.collab-card');
  const dotsContainer = document.querySelector('.carousel-dots');
  let index = 0;
  let interval;

  function renderDots() {
    dotsContainer.innerHTML = '';
    cards.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'carousel-dot' + (i === index ? ' active' : '');
      dot.addEventListener('click', () => {
        index = i;
        updateCarousel();
        resetInterval();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateCarousel() {
    const cardWidth = cards[0].offsetWidth + 32;
    carousel.style.transform = `translateX(-${index * cardWidth}px)`;
    renderDots();
  }

  function moveCarousel() {
    index = (index + 1) % cards.length;
    updateCarousel();
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(moveCarousel, 2200);
  }

  renderDots();
  updateCarousel();
  interval = setInterval(moveCarousel, 2200);

  carousel.addEventListener('mouseenter', () => clearInterval(interval));
  carousel.addEventListener('mouseleave', resetInterval);

  window.addEventListener('resize', updateCarousel);
});
