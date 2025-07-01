const pubQuotes = {
  light: "Our research journey is reflected in these pages. Explore our diverse and impactful publications.",
  dark: "Innovation thrives in the dark. Discover our groundbreaking work through these publications."
};

function setPubQuote() {
  const quoteEl = document.getElementById('pub-hero-quote');
  if (quoteEl) {
    if (document.body.classList.contains('dark-theme')) {
      quoteEl.textContent = pubQuotes.dark;
    } else {
      quoteEl.textContent = pubQuotes.light;
    }
  }
}
setPubQuote();
const themeSwitch = document.getElementById('theme-switch');
if (themeSwitch) {
  themeSwitch.addEventListener('click', setPubQuote);
}

document.addEventListener("DOMContentLoaded", function() {
  const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1FPgUPb-V7qzhAuO4z2bsO0zcnlp3gzkkQKW2XDqjvXQ/gviz/tq?tqx=out:json';
  const pubSection = document.getElementById('pub-list-section');
  const yearDropdown = document.getElementById('yearDropdown');
  const yearDropdownBtn = document.getElementById('yearDropdownBtn');
  const selectedYearEl = document.getElementById('selectedYear');
  let allPubs = [];
  let years = [];
  let selectedYear = null;

  fetch(SHEET_URL)
    .then(res => res.text())
    .then(text => {
      const json = JSON.parse(text.substr(47).slice(0, -2));
      const cols = json.table.cols.map(col => col.label);
      const data = json.table.rows.map(row => {
        const obj = {};
        row.c.forEach((cell, i) => {
          obj[cols[i]] = cell ? cell.v : '';
        });
        return obj;
      });
      allPubs = data;
      years = [...new Set(data.map(p => p.Year))].sort((a, b) => b - a);
      renderDropdown();
      renderPublications();
    });

  function renderDropdown() {
    yearDropdown.innerHTML = '';
    years.forEach(year => {
      const btn = document.createElement('button');
      btn.textContent = year;
      btn.onclick = () => {
        selectedYear = year;
        selectedYearEl.textContent = year;
        yearDropdown.style.display = 'none';
        renderPublications();
      };
      yearDropdown.appendChild(btn);
    });
  }

  function renderPublications() {
    pubSection.innerHTML = '';
    const pubsByYear = {};
    allPubs.forEach(pub => {
      if (!selectedYear || pub.Year === selectedYear) {
        if (!pubsByYear[pub.Year]) pubsByYear[pub.Year] = [];
        pubsByYear[pub.Year].push(pub);
      }
    });
    const yearsToShow = selectedYear ? [selectedYear] : years;
    yearsToShow.forEach(year => {
      if (!pubsByYear[year]) return;
      const yearDiv = document.createElement('div');
      yearDiv.className = 'pub-year-section';
      yearDiv.innerHTML = `<div class="pub-year-heading">${year}</div>`;
      const itemsDiv = document.createElement('div');
      itemsDiv.className = 'pub-items';
      pubsByYear[year].forEach(pub => {
        const item = document.createElement('div');
        item.className = 'pub-item';
        item.onclick = () => window.open(pub.Link, '_blank');
        item.innerHTML = `
          <img class="pub-img" src="${pub.Image || 'images/default_pub.jpg'}" alt="Publication Image" />
          <div class="pub-title">${pub.Title}</div>
          <div class="pub-authors">${pub.Authors}</div>
        `;
        itemsDiv.appendChild(item);
      });
      yearDiv.appendChild(itemsDiv);
      pubSection.appendChild(yearDiv);
    });
  }

  yearDropdownBtn.onclick = function() {
    yearDropdown.style.display = yearDropdown.style.display === 'block' ? 'none' : 'block';
  };
  window.onclick = function(e) {
    if (!e.target.matches('.pub-dropdown-btn')) {
      yearDropdown.style.display = 'none';
    }
  };
});
