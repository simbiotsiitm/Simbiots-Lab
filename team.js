document.addEventListener("DOMContentLoaded", function() {
  let teamData = [];
  const cardsContainer = document.getElementById('team-cards');
  const btns = document.querySelectorAll('.team-btn');

  // Load data (replace 'team.json' with your actual path)
  fetch('https://api.sheetbest.com/sheets/d2c7661c-1744-4e48-9c2a-125d6d1585d6')
    .then(res => res.json())
    .then(data => {
      teamData = data;
      renderCards('all');
    });

  function renderCards(filter) {
    cardsContainer.style.opacity = 0.3;
    setTimeout(() => {
      cardsContainer.innerHTML = '';
      let filtered = filter === 'all' ? teamData : teamData.filter(d => d.designation.toLowerCase() === filter);
      filtered.forEach(member => {
        cardsContainer.innerHTML += `
          <div class="team-card">
            <img src="${member.image_path}" alt="${member.designation}" class="team-card-img" />
            <div class="team-card-designation">${member.designation}</div>
            <div class="team-card-work">${member.work_heading}</div>
          </div>
        `;
      });
      cardsContainer.style.opacity = 1;
    }, 200);
  }

  btns.forEach(btn => {
    btn.addEventListener('click', function() {
      btns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      renderCards(this.dataset.filter);
    });
  });
});