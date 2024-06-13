
function fetchGetApplicationsByUserEmail(email) {
    return fetch(`/api/applications/application/${email}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();           
        } else {
            throw new Error(response.statusText);
        }
    })
    .then(data => {
        console.log('Applications Data received:', data);
        const idRetirementHome = data[0].idRetirementHome;
        const applicationStatus = data[0].application_status;
        const statusElement = document.getElementById('applicationStatus');
        statusElement.textContent = `Status: ${applicationStatus}`;

        switch (applicationStatus.toLowerCase()) {
            case 'pending':
              statusElement.classList.add('status-pending');
              break;
            case 'approved':
              statusElement.classList.add('status-approved');
              break;
            case 'rejected':
              statusElement.classList.add('status-rejected');
              break;
            default:
              break;
          }

        return performGetFetch(`/api/retirement-home-managment/retirement-homes/${idRetirementHome}`, 'same-origin')
            .then(retirementHome => {
                console.log('Retirement Home Data received:', retirementHome);
                displayRetirementHomeData(retirementHome);
                displayMap(retirementHome);
                return retirementHome;
            })
            .catch(error => {
                console.error('Error fetching retirement home:', error);
                throw error;
            });
    })
    .catch(error => {
        console.error('Error fetching applications by user email:', error);
        throw error;
    });
}

function performGetFetch(url, credentials) {
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: credentials
    })
    .then(response => {
        if (response.ok) {
            console.log('GET request successful');
            return response.json();
        } else {
            console.error('GET request failed:', response.statusText);
            throw new Error(response.statusText); 
        }
    })
    .catch(error => {
        console.error('GET request failed:', error);
        throw error; 
    });
}


function displayRetirementHomeData(retirementHome) {
    console.log('Retirement Home Data:', retirementHome);
    document.getElementById('retirementHomeName').textContent = retirementHome.name;
    //document.getElementById('retirementHomeDescription').textContent = `Rating: `;
    const ratingContainer = document.getElementById('retirementHomeRating');

    ratingContainer.innerHTML = '';

    const starContainer = document.createElement('div');
    starContainer.classList.add('d-inline');

    const fullStars = Math.floor(retirementHome.rating);

    for (let i = 0; i < fullStars; i++) {
        const starIcon = document.createElement('i');
        starIcon.classList.add('bi', 'bi-star-fill', 'text-white', 'fs-3', 'me-1');
        starContainer.appendChild(starIcon);
    }

    const halfStar = retirementHome.rating - fullStars >= 0.5;

    if (halfStar) {
        const starIcon = document.createElement('i');
        starIcon.classList.add('bi', 'bi-star-half', 'text-white', 'fs-3', 'me-1');
        starContainer.appendChild(starIcon);
    }

    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < emptyStars; i++) {
        const starIcon = document.createElement('i');
        starIcon.classList.add('bi', 'bi-star', 'text-white', 'fs-3', 'me-1');
        starContainer.appendChild(starIcon);
    }

    ratingContainer.appendChild(starContainer);

    console.log('Final HTML Content:', ratingContainer.innerHTML);

    document.getElementById('retirementHomeCity').textContent = retirementHome.city;
    document.getElementById('retirementHomePhoneNumber').textContent = retirementHome.phone_number;
    document.getElementById('retirementHomeWebsite').href = retirementHome.website;
    document.getElementById('retirementHomeWebsite').textContent = 'Visit Website';
}




document.addEventListener('DOMContentLoaded', () => {
    fetchGetApplicationsByUserEmail(email);
});



function displayMap(retirementHome) {
    let map;
    let infowindow;
  
    function initMap() {
      const centerOfRetirementHome = new google.maps.LatLng(retirementHome.latitude, retirementHome.longitude);
      map = new google.maps.Map(document.getElementById("mapRetirementHome"), {
        center: centerOfRetirementHome,
        zoom: 15 
      });
      infowindow = new google.maps.InfoWindow();
  
      createMarker(retirementHome);
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
          photoHtml += '</div>';
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
    }
    initMap();
}
  


const closeButton = document.querySelector('.close-button');

closeButton.addEventListener('click', async () => {
  try {

    const response = await fetch(`/api/applications/application/${email}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete retirement homes');
    }

    const data = await response.json();
    console.log(data.message); 
    location.reload();
  } catch (error) {
    console.error('Error deleting retirement homes:', error.message);
  }
});

