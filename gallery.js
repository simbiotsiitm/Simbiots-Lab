document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryContainer = document.getElementById("gallery-container");
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    const navbarRight = document.getElementById("nav-links");
    const toggleContainer = document.querySelector(".toggle-container");
  
    // Example gallery data — replace with your real images
    const galleryData = [
      { category: 'vip', src: 'vip/1.jpg', title: 'VIP Image 1', date: '2023' },
      { category: 'vip', src: 'vip/2.jpg', title: 'VIP Image 2', date: '2023' },
      { category: 'conferences', src: 'conferences/1.jpg', title: 'Conference 1', date: '2022' },
      { category: 'conferences', src: 'conferences/2.jpg', title: 'Conference 2', date: '2022' },
      { category: 'treats', src: 'eating/1.jpg', title: 'Treat 1', date: '2023' },
      { category: 'treats', src: 'eating/2.jpg', title: 'Treat 2', date: '2023' },
      { category: 'prof_aswath', src: 'prof_aswath/1.jpg', title: 'Prof Aswath 1', date: '2023' },
      // Add your images here
    ];
  
    let itemsPerLoad = 6;
    let currentIndex = 0;
  
    function renderGalleryItems(filter = 'all') {
      galleryContainer.innerHTML = '';
      const filteredData = filter === 'all' ? galleryData : galleryData.filter(item => item.category === filter);
      const visibleItems = filteredData.slice(0, currentIndex + itemsPerLoad);
  
      visibleItems.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${item.category} visible`;
        galleryItem.innerHTML = `
          <a href="${item.src}" data-lightbox="gallery" data-title="<strong>${item.title}</strong><br>${item.date}">
            <img src="${item.src}" alt="${item.title}" loading="lazy" />
            <div class="caption">
              <h3>${item.title}</h3>
              <p>${item.date}</p>
            </div>
          </a>
        `;
        galleryContainer.appendChild(galleryItem);
      });
  
      // Show/hide Load More
      if (currentIndex + itemsPerLoad >= filteredData.length) {
        loadMoreBtn.style.display = 'none';
      } else {
        loadMoreBtn.style.display = 'inline-block';
      }
    }
  
    renderGalleryItems();
  
    loadMoreBtn.addEventListener('click', () => {
      currentIndex += itemsPerLoad;
      const activeFilter = document.querySelector(".filter-btn.active").getAttribute("data-filter");
      renderGalleryItems(activeFilter);
    });
  
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentIndex = 0;
        renderGalleryItems(button.getAttribute('data-filter'));
      });
    });
  
    // Toggle navbar left block between profile and IIT info
    function toggleLeftSection() {
      const profileBlock = document.querySelector(".profile-block");
      const iitmBlock = document.querySelector(".iitm-block");
      if (profileBlock.classList.contains("active")) {
        profileBlock.classList.remove("active");
        iitmBlock.classList.add("active");
      } else {
        profileBlock.classList.add("active");
        iitmBlock.classList.remove("active");
      }
    }
    window.toggleLeftSection = toggleLeftSection;
  
    // Hamburger menu toggle for mobile
    function toggleMenu() {
      navbarRight.classList.toggle('open');
    }
    window.toggleMenu = toggleMenu;
  
    // Auto slider for top images
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    function showSlides() {
      slides.forEach(slide => slide.classList.remove('active'));
      slides[slideIndex].classList.add('active');
      slideIndex = (slideIndex + 1) % slides.length;
    }
    setInterval(showSlides, 2000);
  
    // Scroll animation on gallery items
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
  
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => observer.observe(item));
  });
  