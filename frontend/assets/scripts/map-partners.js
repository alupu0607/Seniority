let map;
let infowindow;
let slideIndex = 1;
let markers = [];

function initMap(filtered_data) {
    if (map) {
        clearMarkers();
    } else {
        const centerOfRomania = new google.maps.LatLng(45.9432, 24.9668);
        map = new google.maps.Map(document.getElementById("map-partners"), {
            center: centerOfRomania,
            zoom: 7
        });
        infowindow = new google.maps.InfoWindow();
    }
    if(filtered_data && filtered_data.length > 0){
        console.log('filtered data, here');
        filtered_data.forEach(createMarker);
    }
    else{
        console.log('null data, initial');
        const centerOfRomania = new google.maps.LatLng(45.9432, 24.9668);
        map = new google.maps.Map(document.getElementById("map-partners"), {
            center: centerOfRomania,
            zoom: 7
        });
        infowindow = new google.maps.InfoWindow();

        fetch('/api/retirement-home-managment/retirement-homes')
            .then(response => response.json())
            .then(data => {
            if (Array.isArray(data)) {
                data.forEach(home => {
                createMarker(home);
                });
            } else {
                console.error('Retirement home data is not an array:', data);
            }
            })
            .catch(error => {
            console.error('Error loading retirement home data:', error);
            });
    }
}

function createMarker(place) {
  const marker = new google.maps.Marker({
    map: map,
    position: { lat: place.latitude, lng: place.longitude }
  });

  google.maps.event.addListener(marker, "click", () => {
    let photoHtml = '';
    if (place.photos && place.photos.length > 0) {
      photoHtml += '<div class="slideshow-container">';
      place.photos.forEach((photo, index) => {
        photoHtml += `
          <div class="mySlides fade">
            <img src="${photo.url}" style="width:100%">
          </div>
        `;
      });
    }

    const content = `
      <div>
        <strong>${place.name}</strong><br>
        Latitude: ${place.latitude}<br>
        Longitude: ${place.longitude}<br>
        ${place.rating !== 'N/A' ? `Rating: ${place.rating}<br>` : ''}
        ${place.phone_number !== 'N/A' ? `Phone: ${place.phone_number}<br>` : ''}
        ${place.website !== 'N/A' ? `<a href="${place.website}" target="_blank">${place.website}</a><br>` : ''}
      </div>
      ${photoHtml}
    `;

    infowindow.setContent(content);
    infowindow.open(map, marker);
  });
  markers.push(marker);
}


function clearMarkers() {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}