const fs = require('fs');
require('dotenv').config();
const apiKey = process.env.GOOGLE_API;
const cities = {
    'Bucharest': { lat: 44.4268, lng: 26.1025 },
    'Iasi': { lat: 47.1585, lng: 27.6014 },
    'Timisoara': { lat: 45.7489, lng: 21.2087 },
    'Cluj-Napoca': { lat: 46.7712, lng: 23.6236 },
    'Constanța': { lat: 44.1765, lng: 28.6359 },
    'Craiova': { lat: 44.3268, lng: 23.8258 },
    'Brașov': { lat: 45.6579, lng: 25.6012 },
    'Galați': { lat: 45.4324, lng: 28.0509 },
    'Ploiești': { lat: 44.9469, lng: 26.0364 },
    'Oradea': { lat: 47.0458, lng: 21.9189 },
    'Brăila': { lat: 45.2691, lng: 27.9574 },
    'Arad': { lat: 46.1866, lng: 21.3120 },
    'Pitești': { lat: 44.8565, lng: 24.8695 },
    'Sibiu': { lat: 45.7983, lng: 24.1256 },
    'Bacău': { lat: 46.5719, lng: 26.9102 },
    'Târgu-Mureș': { lat: 46.5414, lng: 24.5613 },
    'Baia Mare': { lat: 47.6598, lng: 23.5792 },
    'Buzău': { lat: 45.1477, lng: 26.8232 },
    'Botoșani': { lat: 47.7461, lng: 26.6593 },
    'Satu Mare': { lat: 47.7926, lng: 22.8854 },
    'Arad': { lat: 46.1866, lng: 21.3120 },
    'Suceava': { lat: 47.6331, lng: 26.2455 }
  };
  
const allResults = {};

const fetchPromises = Object.keys(cities).map(city => {
  const { lat, lng } = cities[city];
  const radius = '30000'; 
  const type = 'health'; 
  const keyword = 'azil+de+batrani';
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&keyword=${keyword}&key=${apiKey}`;

  return fetch(url)
    .then(response => response.json())
    .then(async data => {
      console.log(`Retirement homes within 30km of ${city}:`);
      const results = [];
      for (const place of data.results) {
        const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&key=${apiKey}`;
        const detailsResponse = await fetch(placeDetailsUrl);
        const detailsData = await detailsResponse.json();
        const placeDetails = detailsData.result;

        // Extract additional details
        const photos = placeDetails.photos ? placeDetails.photos.slice(0, 4).map(photo => ({
            url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${apiKey}`
          })) : [];
        const result = {
          name: placeDetails.name,
          rating: placeDetails.rating || 'N/A',
          phone_number: placeDetails.formatted_phone_number || 'N/A',
          website: placeDetails.website ||  'N/A',
          url: place.url || 'N/A', 
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
          photos: photos
        };
        results.push(result);
      }
      allResults[city] = results;
    })
    .catch(error => {
      console.error(`Error fetching retirement homes within 30km of ${city}:`, error);
    });
});

Promise.all(fetchPromises)
  .then(() => {
    writeResultsToFile();
  })
  .catch(error => {
    console.error('Error fetching retirement homes:', error);
  });

function writeResultsToFile() {
  const jsonContent = JSON.stringify(allResults, null, 2);
  fs.writeFile('retirement_homes.json', jsonContent, err => {
    if (err) {
      console.error('Error writing JSON file:', err);
    } else {
      console.log('Retirement homes data written to retirement_homes.json');
    }
  });
}
