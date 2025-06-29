document.addEventListener("DOMContentLoaded", function() {
  const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1lo9LvFti30ZkcvL0y-ZotaQY2ci-0lcJ90LiF6NQvF0/gviz/tq?tqx=out:json&sheet=Sheet1';
  const cardsContainer = document.getElementById('alumni-cards');
  const btns = document.querySelectorAll('.alumni-btn');
  let alumniData = [];

  fetch(SHEET_URL)
    .then(res => res.text())
    .then(text => {
      const json = JSON.parse(text.substr(47).slice(0, -2));
      const cols = json.table.cols.map(col => col.label.trim().toLowerCase().replace(/\s+/g, '_'));
      const data = json.table.rows.map(row => {
        const obj = {};
        row.c.forEach((cell, i) => {
          obj[cols[i]] = cell ? cell.v : '';
        });
        return obj;
      });
      // Skip header row if needed
      alumniData = data[0].name === 'name' ? data.slice(1) : data;
      renderCards('all');
    });

  function renderCards(filter) {
    cardsContainer.style.opacity = 0.3;
    setTimeout(() => {
      cardsContainer.innerHTML = '';
      let filtered = alumniData;
      if (filter !== 'all') {
        filtered = alumniData.filter(d =>
          d.scholar_type &&
          d.scholar_type.trim().toLowerCase().includes(filter)
        );
      }
      // ...existing code...
filtered.forEach(member => {
  cardsContainer.innerHTML += `
  <div class="alumni-card-horizontal">
  <div class="alumni-card-top-row">
    <div class="alumni-card-photo-col">
      <img src="${member.image_path}" alt="${member.name}" class="alumni-card-photo" />
    </div>
    <div class="alumni-card-info">
      <div class="alumni-card-name">${member.name || ''}</div>
      <div class="alumni-card-meta">
        ${member.scholar_type || ''}${member.year_of_graduation ? ' · ' + member.year_of_graduation : ''}
      </div>
      <div class="alumni-card-thesis">“${member.thesis_title || ''}”</div>
      <div class="alumni-card-coguide"><b>Co-guide:</b> ${member.co_guide || ''}</div>
    </div>
  </div>

  <div class="alumni-card-coord-row">
    ${member.workplace_logo ? `<img src="${member.workplace_logo}" alt="Workplace" class="alumni-card-workplace-img" />` : ''}
    <span class="alumni-card-coord">${member.current_coordinates || ''}</span>
  </div>

  <div class="alumni-card-links-row">
    ${member.profile_link ? `<a href="${member.profile_link}" class="alumni-card-link" target="_blank" title="LinkedIn"><i class="fab fa-linkedin"></i></a>` : ''}
    ${member.scholar_link ? `<a href="${member.scholar_link}" class="alumni-card-link" target="_blank" title="Google Scholar"><i class="fas fa-graduation-cap"></i></a>` : ''}
  </div>
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
