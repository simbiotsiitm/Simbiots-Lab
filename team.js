/*document.addEventListener("DOMContentLoaded", function() {
  const SHEET_URL = `https://docs.google.com/spreadsheets/d/1xXRIh7eshx-9yJzoougoIpGG6gSY6hE5Pq9BuBqkVaU/gviz/tq?tqx=out:json&sheet=Sheet1`;
  const cardsContainer = document.getElementById('team-cards');
  const btns = document.querySelectorAll('.team-btn');
  let teamData = [];

  fetch(SHEET_URL)
    .then(res => res.text())
    .then(text => {
      const json = JSON.parse(text.substr(47).slice(0, -2));
      //const cols = json.table.cols.map(col => col.label.trim().toLowerCase().replace(/\s+/g, '_'));
      const cols = ['image_path', 'designation', 'name', 'work_heading'];
      console.log('Parsed columns:', cols);
      const data = json.table.rows.map(row => {
        const obj = {};
        row.c.forEach((cell, i) => {
          obj[cols[i]] = cell ? cell.v : '';
        });
        return obj;
      });
      // SKIP THE FIRST ROW (header row)
      teamData = data.slice(1);
      console.log('Team Data:', teamData);
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
      cardsContainer.innerHTML += `
        <div class="team-card">
            <div class="team-card-img-wrap">
            <img src="${member.image_path}" alt="${member.name}" class="team-card-img" />
            </div>
            <div class="team-card-content">
            <div class="team-card-designation">${member.designation}</div>
            <div class="team-card-name">${member.name}</div>
            <div class="team-card-work">${member.work_heading}</div>
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
});*/ 
document.addEventListener("DOMContentLoaded", function() {
  const SHEET_URL = `https://docs.google.com/spreadsheets/d/1xXRIh7eshx-9yJzoougoIpGG6gSY6hE5Pq9BuBqkVaU/gviz/tq?tqx=out:json&sheet=Sheet1`;
  const cardsContainer = document.getElementById('team-cards');
  const btns = document.querySelectorAll('.team-btn');
  let teamData = [];

  fetch(SHEET_URL)
    .then(res => res.text())
    .then(text => {
      const json = JSON.parse(text.substr(47).slice(0, -2));
      const cols = ['image_path', 'designation', 'name', 'work_heading','profile_link','intern_year'];
      console.log('Parsed columns:', cols);
      const data = json.table.rows.map(row => {
        const obj = {};
        row.c.forEach((cell, i) => {
          obj[cols[i]] = cell ? cell.v : '';
        });
        return obj;
      });
      teamData = data.slice(1);
      console.log('Team Data:', teamData);
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
      <img src="${member.image_path}" alt="${member.name}" class="team-card-img${isIntern ? ' intern-img' : ''}" onclick="maximizeImage('${member.image_path}', '${member.name}')"/>
    </div>
  `;
  if (isIntern) {
    cardsContainer.innerHTML += `
      <div class="team-card intern-card">
        ${cardImgHtml}
        <div class="team-card-content">
          <div class="team-card-name">${member.name}</div>
          <div class="team-card-intern-year">${member.intern_year || ''}</div>
        </div>
      </div>
    `;
  } else {
    const cardContent = `
      <div class="team-card-content">
        <div class="team-card-designation">${member.designation}</div>
        <div class="team-card-name">${member.name}</div>
        <div class="team-card-work">${member.work_heading}</div>
      </div>
    `;
    if (member.profile_link) {
      cardsContainer.innerHTML += `
        <a href="${member.profile_link}" class="team-card" target="_blank">
          ${cardImgHtml}
          ${cardContent}
        </a>
      `;
    } else {
      cardsContainer.innerHTML += `
        <div class="team-card">
          ${cardImgHtml}
          ${cardContent}
        </div>
      `;
    }
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
filtered.forEach(member => {
  const isIntern = (member.designation && member.designation.trim().toLowerCase().includes('intern')) || member.intern_year;
  const cardImgHtml = `
    <div class="team-card-img-wrap">
      <img src="${member.image_path}" alt="${member.name}" class="team-card-img${isIntern ? ' intern-img' : ''}" onclick="maximizeImage('${member.image_path}', '${member.name}')"/>
    </div>
  `;
  if (isIntern) {
    cardsContainer.innerHTML += `
      <div class="team-card intern-card">
        ${cardImgHtml}
        <div class="team-card-content">
          <div class="team-card-name">${member.name}</div>
          <div class="team-card-intern-year">${member.intern_year || ''}</div>
        </div>
      </div>
    `;
  } else {
    const cardContent = `
      <div class="team-card-content">
        <div class="team-card-designation">${member.designation}</div>
        <div class="team-card-name">${member.name}</div>
        <div class="team-card-work">${member.work_heading}</div>
      </div>
    `;
    if (member.profile_link) {
      cardsContainer.innerHTML += `
        <a href="${member.profile_link}" class="team-card" target="_blank">
          ${cardImgHtml}
          ${cardContent}
        </a>
      `;
    } else {
      cardsContainer.innerHTML += `
        <div class="team-card">
          ${cardImgHtml}
          ${cardContent}
        </div>
      `;
    }
  }
});
