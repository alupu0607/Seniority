let homesData;
let selectedCriteria = { city: null, rating: null, contact: null }; 
const filterElements = {};

function buildMenu(data) {
  homesData = data; 
  const { cities, ratings, contact } = processHomesData(data);
  const menu = document.getElementById('menu');

  const cityMenu = document.createElement('li');
  cityMenu.innerText = 'Cities';
  const citySubmenu = document.createElement('ul');
  citySubmenu.className = 'submenu';

  Object.keys(cities).forEach(city => {
    const cityItem = document.createElement('li');
    cityItem.innerText = city;
    cityItem.addEventListener('click', () => handleFilterSelection('city', city, cityItem));
    citySubmenu.appendChild(cityItem);
    filterElements[city] = cityItem; 
  });

  cityMenu.appendChild(citySubmenu);
  menu.appendChild(cityMenu);

  const ratingMenu = document.createElement('li');
  ratingMenu.innerText = 'Rating';
  const ratingSubmenu = document.createElement('ul');
  ratingSubmenu.className = 'submenu';

  Object.keys(ratings).forEach(rating => {
    const ratingItem = document.createElement('li');
    ratingItem.innerText = rating;
    ratingItem.addEventListener('click', () => handleFilterSelection('rating', rating, ratingItem));
    ratingItem.addEventListener('dblclick', () => handleFilterDeselection('rating', ratingItem));
    ratingSubmenu.appendChild(ratingItem);
    filterElements[rating] = ratingItem;
  });

  ratingMenu.appendChild(ratingSubmenu);
  menu.appendChild(ratingMenu);

  const contactMenu = document.createElement('li');
  contactMenu.innerText = 'Contact Information';
  const contactSubmenu = document.createElement('ul');
  contactSubmenu.className = 'submenu';

  Object.keys(contact).forEach(contactType => {
    const contactItem = document.createElement('li');
    contactItem.innerText = contactType;
    contactItem.addEventListener('click', () => handleFilterSelection('contact', contactType, contactItem));
    contactItem.addEventListener('dblclick', () => handleFilterDeselection('contact', contactItem));
    contactSubmenu.appendChild(contactItem);
    filterElements[contactType] = contactItem;
  });

  contactMenu.appendChild(contactSubmenu);
  menu.appendChild(contactMenu);
}

function handleFilterSelection(type, value, element) {
if (selectedCriteria[type] === value) {
    selectedCriteria[type] = null;
    console.log(`Deselected ${type}: ${value}`);
    
    element.classList.remove('active-filter');
} else {
    if (selectedCriteria[type] && filterElements[selectedCriteria[type]]) {
    filterElements[selectedCriteria[type]].classList.remove('active-filter');
    }
    
    selectedCriteria[type] = value;
    console.log(`Selected ${type}: ${value}`);
    
    element.classList.add('active-filter');
}
}

function logIntersection() {
  if (!homesData) return;

  let filteredHomes = homesData;
  if (selectedCriteria.city) {
    filteredHomes = filteredHomes.filter(home => home.city === selectedCriteria.city);
  }
  if (selectedCriteria.rating) {
    filteredHomes = filteredHomes.filter(home => {
      if (selectedCriteria.rating === '> 4.5') return home.rating > 4.5;
      if (selectedCriteria.rating === '3.5 - 4.5') return home.rating > 3.5 && home.rating <= 4.5;
      if (selectedCriteria.rating === '< 3.5') return home.rating < 3.5;
    });
  }
  if (selectedCriteria.contact) {
    if (selectedCriteria.contact === 'Website Available') {
      filteredHomes = filteredHomes.filter(home => home.website !== 'N/A');
    }
    if (selectedCriteria.contact === 'Phone Available') {
      filteredHomes = filteredHomes.filter(home => home.phone_number !== 'N/A');
    }
  }

  console.log('Filtered Homes:', filteredHomes);
  initMap(filteredHomes);
}

fetch('/api/retirement-home-managment/retirement-homes')
  .then(response => response.json())
  .then(data => {
    if (Array.isArray(data)) {
      buildMenu(data);
    } else {
      console.error('Retirement home data is not an array:', data);
    }
  })
  .catch(error => {
    console.error('Error loading retirement home data:', error);
  });

function processHomesData(homes) {
  console.log(homes);
  const cities = {};
  const ratings = { '> 4.5': [], '3.5 - 4.5': [], '< 3.5': [] };
  const contact = { 'Website Available': [], 'Phone Available': [] };

  homes.forEach(home => {
    if (!cities[home.city]) {
      cities[home.city] = [];
    }
    cities[home.city].push(home);

    if (home.rating > 4.5) {
      ratings['> 4.5'].push(home);
    } else if (home.rating > 3.5 && home.rating <= 4.5) {
      ratings['3.5 - 4.5'].push(home);
    } else {
      ratings['< 3.5'].push(home);
    }

    if (home.website !== 'N/A') {
      contact['Website Available'].push(home);
    }
    if (home.phone_number !== 'N/A') {
      contact['Phone Available'].push(home);
    }
  });

  return { cities, ratings, contact };
}

  document.getElementById('filterBtn').addEventListener('click', logIntersection);
  document.getElementById('clearBtn').addEventListener('click', () => {
  selectedCriteria = { city: null, rating: null, contact: null };

  Object.values(filterElements).forEach(element => element.classList.remove('active-filter'));
  console.log('All Homes:', homesData);
  initMap(homesData);
});