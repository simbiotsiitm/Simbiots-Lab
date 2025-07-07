function maximizeImage(src, alt) {
  let modal = document.getElementById('img-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'img-modal';
    modal.style.position = 'fixed';
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.8)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = 9999;
    modal.innerHTML = `<img id="modal-img" style="max-width:90vw;max-height:90vh;border-radius:12px;box-shadow:0 0 32px #000;" alt="">
      <span id="modal-close" style="position:absolute;top:32px;right:48px;font-size:2.5rem;color:#fff;cursor:pointer;">&times;</span>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', function(e) {
      if (e.target === modal || e.target.id === 'modal-close') modal.style.display = 'none';
    });
  }
  modal.querySelector('#modal-img').src = src;
  modal.querySelector('#modal-img').alt = alt;
  modal.style.display = 'flex';
}

document.addEventListener("DOMContentLoaded", function() {
  const SHEET_URL = `https://docs.google.com/spreadsheets/d/1xXRIh7eshx-9yJzoougoIpGG6gSY6hE5Pq9BuBqkVaU/gviz/tq?tqx=out:json&sheet=Sheet1`;
  const cardsContainer = document.getElementById('team-cards');
  const btns = document.querySelectorAll('.team-btn');
  let teamData = [];

  fetch(SHEET_URL)
    .then(res => res.text())
    .then(text => {
      const json = JSON.parse(text.substr(47).slice(0, -2));
      const cols = ['image_path', 'designation', 'name', 'work_heading','profile_link','intern_year', 'college_name'];
      const data = json.table.rows.map(row => {
        const obj = {};
        row.c.forEach((cell, i) => {
          obj[cols[i]] = cell ? cell.v : '';
        });
        return obj;
      });
      teamData = data.slice(1);
      renderCards('all');
    });

  function renderCards(filter) {
    cardsContainer.style.opacity = 0.3;
    setTimeout(() => {
      cardsContainer.innerHTML = '';
      let filtered = teamData;
      if (filter !== 'all') {
        if (filter === 'others') {
          const othersList = ['mtech', 'intern', 'dual degree', 'others'];
          filtered = teamData.filter(d =>
            d.designation &&
            othersList.some(val => d.designation.trim().toLowerCase().includes(val))
          );
        } else {
          filtered = teamData.filter(d =>
            d.designation &&
            d.designation.trim().toLowerCase().includes(filter)
          );
        }
      }
      filtered.forEach(member => {
        const isIntern = (member.designation && member.designation.trim().toLowerCase().includes('intern')) || member.intern_year;
        const cardImgHtml = `
          <div class="team-card-img-wrap">
            <img src="${member.image_path}" alt="${member.name}" class="team-card-img" onclick="maximizeImage('${member.image_path}', '${member.name}')"/>
          </div>
        `;
        let nameHtml = member.name;
        if (member.profile_link) {
          nameHtml = `<a href="${member.profile_link}" target="_blank" style="color:inherit;text-decoration:underline;">${member.name}</a>`;
        }
        if (isIntern) {
          cardsContainer.innerHTML += `
            <div class="team-card intern-card">
              ${cardImgHtml}
              <div class="team-card-content">
                <div class="team-card-name">${nameHtml}</div>
                <div class="team-card-intern-year">${member.intern_year || ''}</div>
                <div class="team-card-college">${member.college_name || ''}</div>
              </div>
            </div>
          `;
        } else {
          const cardContent = `
            <div class="team-card-content">
              <div class="team-card-designation">${member.designation}</div>
              <div class="team-card-name">${nameHtml}</div>
              <div class="team-card-work">${member.work_heading}</div>
            </div>
          `;
          cardsContainer.innerHTML += `
            <div class="team-card">
              ${cardImgHtml}
              ${cardContent}
            </div>
          `;
        }
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
