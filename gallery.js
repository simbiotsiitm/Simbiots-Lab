const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1TD-Ivc6yq-aC9OZSMFTzZBtpuR6tJ7T1gx75d6u8kZg/gviz/tq?tqx=out:json&sheet=Sheet1';

document.addEventListener("DOMContentLoaded", function() {
  fetch(SHEET_URL)
    .then(res => res.text())
    .then(text => {
      const json = JSON.parse(text.substr(47).slice(0, -2));
      const rows = json.table.rows;

      // Use the first row as headers
      const headers = rows[0].c.map(cell => cell && cell.v ? cell.v.trim().replace(/\s+/g, '_').toLowerCase() : '');
      // Now map the rest of the rows to objects
      const galleryData = rows.slice(1).map(row => {
        const obj = {};
        row.c.forEach((cell, i) => {
          obj[headers[i]] = cell && cell.v ? cell.v : '';
        });
        return obj;
      });

      // Carousel: show first 8 images
      const carouselImages = document.getElementById('carousel-images');
      galleryData.slice(0, 8).forEach(img => {
        carouselImages.innerHTML += `
          <div class="swiper-slide">
            <img src="${img.image_url}" alt="${img.title}" />
          </div>
        `;
      });
      new Swiper('.gallery-swiper', {
        loop: true,
        autoplay: { delay: 3500, disableOnInteraction: false },
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: { rotate: 30, stretch: 0, depth: 120, modifier: 1, slideShadows: true },
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
      });

      // Masonry Gallery
      renderGallery(galleryData);

      // Filters
      setupFilters(galleryData);
    });

  function renderGallery(items) {
    const container = document.getElementById('gallery-container');
    container.innerHTML = '';
    items.forEach(item => {
      container.innerHTML += `
        <div class="gallery-item" data-type="${item.type}">
          <img src="${item.image_url}" alt="${item.title}">
          <div class="gallery-overlay">
            <div class="gallery-overlay-title">${item.title}</div>
            <div class="gallery-overlay-date">${item.date}</div>
            <div class="gallery-overlay-links">
              ${item.link ? `<a href="${item.link}" target="_blank"><i class="fas fa-link"></i> Link </a>` : ''}
            </div>
          </div>
        </div>
      `;
    });
  }

  function setupFilters(galleryData) {
    document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
      btn.onclick = function() {
        document.querySelectorAll('.gallery-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        if (filter === 'all') {
          renderGallery(galleryData);
        } else {
          renderGallery(galleryData.filter(item => item.type.toLowerCase() === filter));
        }
      };
    });
  }
});
