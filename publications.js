const pubQuotes = {
  light: "Our research journey is reflected in these pages. Explore our diverse and impactful publications.",
  dark: "Innovation thrives in the dark. Discover our groundbreaking work through these publications."
};

function setPubQuote() {
  const quoteEl = document.getElementById('pub-hero-quote');
  if (document.body.classList.contains('dark-theme')) {
    quoteEl.textContent = pubQuotes.dark;
  } else {
    quoteEl.textContent = pubQuotes.light;
  }
}
setPubQuote();
document.getElementById('theme-switch').addEventListener('click', setPubQuote);

// Google Sheets GViz JSON endpoint
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1FPgUPb-V7qzhAuO4z2bsO0zcnlp3gzkkQKW2XDqjvXQ/gviz/tq?tqx=out:json';

async function fetchPublications() {
  const res = await fetch(SHEET_URL);
  const text = await res.text();
  const json = JSON.parse(text.substr(47).slice(0, -2));
  const table = json.table;
  const headers = table.cols.map(col => col.label);
  return table.rows.map(row => {
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = row.c[i] ? row.c[i].v : '';
    });
    return obj;
  });
}

let allPubs = [];
let years = [];
let selectedYear = null;

function renderDropdown() {
  const yearDropdown = document.getElementById('yearDropdown');
  yearDropdown.innerHTML = '';
  years.forEach(year => {
    const btn = document.createElement('button');
    btn.textContent = year;
    btn.onclick = () => {
      selectedYear = year;
      document.getElementById('selectedYear').textContent = year;
      yearDropdown.style.display = 'none';
      renderPublications();
    };
    yearDropdown.appendChild(btn);
  });
}

function renderPublications() {
  const section = document.getElementById('pub-list-section');
  section.innerHTML = '';
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
    section.appendChild(yearDiv);
  });
}

document.getElementById('yearDropdownBtn').onclick = function() {
  const dropdown = document.getElementById('yearDropdown');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
};
window.onclick = function(e) {
  if (!e.target.matches('.pub-dropdown-btn')) {
    document.getElementById('yearDropdown').style.display = 'none';
  }
};

fetchPublications().then(pubs => {
  allPubs = pubs;
  years = [...new Set(pubs.map(p => p.Year))].sort((a, b) => b - a);
  renderDropdown();
  renderPublications();
});
