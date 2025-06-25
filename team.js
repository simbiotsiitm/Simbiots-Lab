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
document.addEventListener("DOMContentLoaded", function () {
  const SHEET_URL = `https://docs.google.com/spreadsheets/d/1xXRIh7eshx-9yJzoougoIpGG6gSY6hE5Pq9BuBqkVaU/gviz/tq?tqx=out:json&sheet=Sheet1`;
  const cardsContainer = document.getElementById('team-cards');
  const btns = document.querySelectorAll('.team-btn');
  let teamData = [];

  fetch(SHEET_URL)
    .then(res => res.text())
    .then(text => {
      const json = JSON.parse(text.substr(47).slice(0, -2));
      const rows = json.table.rows;

      // Extract headers from the first row
      const headers = rows[0].c.map(cell => cell?.v.trim().toLowerCase().replace(/\s+/g, '_') || '');
      console.log('Extracted headers:', headers);

      // Map each remaining row into an object using the headers
      teamData = rows.slice(1).map(row => {
        const obj = {};
        row.c.forEach((cell, i) => {
          obj[headers[i]] = cell?.v ?? '';
        });
        return obj;
      });

      console.log('Parsed team data:', teamData);
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
    btn.addEventListener('click', function () {
      btns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      renderCards(this.dataset.filter);
    });
  });
});

