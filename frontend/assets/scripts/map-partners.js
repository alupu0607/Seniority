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
    place.status = 'available';
    const status = place.status === 'available' ? '<span style="color: green;">Available</span>' : '<span style="color: red;">Unavailable</span>';
    const applyButton = place.status === 'available' ? `<button onclick="apply(${place.id})">Apply</button>` : '';
    const content = `
      <div>
        <strong>${place.name}</strong><br>
        Status: ${status}<br>
        Latitude: ${place.latitude}<br>
        Longitude: ${place.longitude}<br>
        ${place.rating !== 'N/A' ? `Rating: ${place.rating}<br>` : ''}
        ${place.phone_number !== 'N/A' ? `Phone: ${place.phone_number}<br>` : ''}
        ${place.website !== 'N/A' ? `<a href="${place.website}" target="_blank">${place.website}</a><br>` : ''}
        ${applyButton}
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

// function apply(idRetirementHome) {
//     const email = '<%= email %>';
//     const applicationData = {
//         idRetirementHome: idRetirementHome,
//         idUser: 1 
//     };

//     performPostFetch('/api/applications/application', applicationData, 'same-origin')
//         .then(data => {
//             console.log('Application created successfully:', data);
//         })
//         .catch(error => {
//             console.error('Error creating application:', error);
//         });
// }


function apply(idRetirementHome) {
    const email = '<%= email %>'; // Assuming you embed the email using EJS
    fetchUserId(email)
        .then(userId => {
            const applicationData = {
                idRetirementHome: idRetirementHome,
                idUser: userId
            };

            performPostFetch('/api/applications/application', applicationData, 'same-origin')
                .then(data => {
                    console.log('Application created successfully:', data);
                })
                .catch(error => {
                    console.error('Error creating application:', error);
                });
        })
        .catch(error => {
            console.error('Error fetching user ID:', error);
        });
}

function fetchUserId(email) {
    return fetch(`/api/users/${email}`, {
        method: 'GET',
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    })
    .then(data => {
        return data.id;
    })
    .catch(error => {
        console.error('Error fetching user ID:', error);
        throw error;
    });
}


function performPostFetch(url, data, credentials) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: credentials
    })
    .then(response => {
        if (response.ok) {
            console.log('POST request successful');
            return response.json();
        } else {
            console.error('POST request failed:', response.statusText);
            throw new Error(response.statusText); 
        }
    })
    .catch(error => {
        console.error('POST request failed:', error);
        throw error; 
    });
}
