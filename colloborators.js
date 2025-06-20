document.addEventListener("DOMContentLoaded", function() {
  const themeSwitch = document.getElementById('theme-switch');
  themeSwitch.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const carousel = document.getElementById('collab-carousel');
  const cards = carousel.querySelectorAll('.collab-card');
  const cardWidth = cards[0].offsetWidth + 32; // card width + gap
  let index = 0;
  let interval;

  function moveCarousel() {
    index++;
    if (index > cards.length - Math.floor(carousel.parentElement.offsetWidth / cardWidth)) {
      // Pause at end, then reset
      clearInterval(interval);
      setTimeout(() => {
        index = 0;
        carousel.style.transition = "none";
        carousel.style.transform = `translateX(0px)`;
        // Force reflow for smooth transition
        void carousel.offsetWidth;
        carousel.style.transition = "transform 0.7s cubic-bezier(.4,0,.2,1)";
        interval = setInterval(moveCarousel, 2200);
      }, 2200);
    } else {
      carousel.style.transform = `translateX(-${index * cardWidth}px)`;
    }
  }

  interval = setInterval(moveCarousel, 2200);

  // Pause on hover
  carousel.addEventListener('mouseenter', () => clearInterval(interval));
  carousel.addEventListener('mouseleave', () => interval = setInterval(moveCarousel, 2200));
});