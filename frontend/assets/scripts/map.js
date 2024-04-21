let map;
let infowindow;
let slideIndex = 1;

function initMap() {
  const centerOfRomania = new google.maps.LatLng(45.9432, 24.9668);
  map = new google.maps.Map(document.getElementById("map"), {
    center: centerOfRomania,
    zoom: 7
  });
  infowindow = new google.maps.InfoWindow();

  fetch('../../retirement_homes.json')
    .then(response => response.json())
    .then(data => {
      if (typeof data === 'object') {
        Object.keys(data).forEach(city => {
          const retirementHomes = data[city];
          retirementHomes.forEach(home => {
            createMarker(home);
          });
        });
      } else {
        console.error('Retirement home data is not an object:', data);
      }
    })
    .catch(error => {
      console.error('Error loading retirement home data:', error);
    });
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
    //   photoHtml += `
    //     <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
    //     <a class="next" onclick="plusSlides(1)">&#10095;</a>
    //   </div>
    //   `;
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

    //showSlides(slideIndex); 
  });
}

function plusSlides(n) {
  //showSlides(slideIndex += n);
}

// document.addEventListener('DOMContentLoaded', (event) => {
//     // Your existing showSlides function
//     function showSlides(n) {
//       let i;
//       let slideIndex = 1; // Ensure slideIndex is defined in a scope accessible by this function
//       const slides = document.getElementsByClassName("mySlides");
//       if (n > slides.length) { slideIndex = 1; }
//       if (n < 1) { slideIndex = slides.length; }
//       for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none";
//       }
//       slides[slideIndex - 1].style.display = "block";
//     }
  
//     // Initialize slideIndex variable
//     let slideIndex = 1;
  
//     // Call showSlides function with the initial slide index
//     showSlides(slideIndex);
  
//     // Add other event listeners if necessary
//   });
  