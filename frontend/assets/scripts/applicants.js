

// document.addEventListener('DOMContentLoaded', () => {
//     async function fetchApplications() {
//         try {
//             const retirementHomeId = id;
//             const response = await fetch(`/api/applications/application/retirementHome/${retirementHomeId}`);
//             const applications = await response.json();

//             if (response.ok) {
//                 let carouselInner = document.querySelector('.carousel-inner');
//                 let noRequestsMessage = document.getElementById('noRequestsMessage');
//                 carouselInner.innerHTML = '';

//                 let pendingCount = 0;
//                 let approvedCount = 0;

//                 if (applications.length > 0) {
//                     const userPromises = applications.map(async (application, index) => {
//                         try {
//                             const userResponse = await fetch(`/api/users/user/id/${application.idUser}`);
//                             const user = await userResponse.json();

//                             if (userResponse.ok) {
//                                 let isActive = index === 0 ? 'active' : '';

//                                 let carouselItem = `
//                                     <div class="carousel-item ${isActive}" style = "background-color: transparent;">
//                                         <div class="card" style="height: 58vh;">
//                                             <button class="close-button" aria-label="Close" onclick="removeApplication(${application.id})">&times;</button>
//                                             <div class="card-body">
//                                                 <div class="row justify-content-center">
//                                                     <div class="col-6 text-center">
//                                                         <button class="btn__text mt-3 mb-4" id="approveButton" onclick="approveApplication(${application.id})">Approve</button>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <ul class="list-group list-group-light list-group-small">
//                                                 <li class="list-group-item px-4">Name: ${user.name || '--'}</li>
//                                                 <li class="list-group-item px-4">Surname: ${user.surname || '--'}</li>
//                                                 <li class="list-group-item px-4">Phone Number: ${user.phone || '--'}</li>
//                                                 <li class="list-group-item px-4">Email: ${user.email || '--'}</li>
//                                                 <li class="list-group-item px-4">Birthdate: ${new Date(user.birthdate).toLocaleDateString() || '--'}</li>
//                                             </ul>
//                                             <div class="card-body">
//                                                 <a href="#" class="card-link"></a>
//                                                 <a href="#" class="card-link"></a>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 `;
//                                 carouselInner.innerHTML += carouselItem; 

//                                 if (application.application_status === "PENDING") {
//                                     pendingCount++;
//                                 }
//                                 if (application.application_status === "APPROVED") {
//                                     approvedCount++;
//                                 }
//                             } else {
//                                 console.error(`Error fetching user ${application.idUser}:`, user.message);
//                             }
//                         } catch (error) {
//                             console.error(`Network error fetching user ${application.idUser}:`, error);
//                         }
//                     });
//                     await Promise.all(userPromises);

//                     updateRequestCount(pendingCount);
//                     updateApprovedCount(approvedCount);
//                     document.getElementById('carouselExampleControls').style.display = 'block';
//                     noRequestsMessage.style.display = 'none';
//                 } else {
//                     document.getElementById('carouselExampleControls').style.display = 'none';
//                     noRequestsMessage.style.display = 'block';
//                 }
//             } else {
//                 console.error('Error fetching applications:', applications.message);
//             }
//         } catch (error) {
//             console.error('Network error:', error);
//         }
//     }

//     function updateRequestCount(count) {
//         const countElement = document.getElementById('request-count');
//         countElement.classList.add('updating');
//         countElement.textContent = count;
//         countElement.classList.remove('updating');
//     }

//     function updateApprovedCount(count) {
//         const countElement = document.getElementById('accepted-count');
//         countElement.classList.add('updating');
//         countElement.textContent = count;
//         countElement.classList.remove('updating');
//     }

//     function toggleCarousel() {
//         var count = getRequestCount();
//         var carouselContainer = document.getElementById('carouselExampleControls');
//         var noRequestsMessage = document.getElementById('noRequestsMessage');

//         if (count > 0) {
//             carouselContainer.style.display = 'block';
//             noRequestsMessage.style.display = 'none';
//         } else {
//             carouselContainer.style.display = 'none';
//             noRequestsMessage.style.display = 'block';
//         }
//     }

//     function getRequestCount() {
//         return parseInt(document.getElementById('request-count').textContent);
//     }

//     window.removeApplication = function(applicationId) {
//         console.log(`Remove application with ID: ${applicationId}`);
//     }

//     window.approveApplication = async function(applicationId) {
//         console.log(`Approve application with ID: ${applicationId}`);
//         try {
//             const response = await fetch(`/api/applications/application/approve/${applicationId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ status: 'APPROVED' }), 
//             });
    
//             if (response.ok) {
//                 console.log(`Application ${applicationId} approved successfully`);
//                 fetchApplications();
//             } else {
//                 const errorData = await response.json();
//                 console.error('Error approving application:', errorData.message);
//             }
//         } catch (error) {
//             console.error('Network error while approving application:', error);
//         }
//     }
//     fetchApplications();
//     toggleCarousel();
//     setInterval(fetchApplications, 150000); 
//     setInterval(toggleCarousel, 150000); 
// });




document.addEventListener('DOMContentLoaded', () => {
    async function fetchApplications() {
        try {
            const retirementHomeId = id;
            const response = await fetch(`/api/applications/application/retirementHome/${retirementHomeId}`);
            const applications = await response.json();

            if (response.ok) {
                let carouselInner = document.querySelector('.carousel-inner');
                let noRequestsMessage = document.getElementById('noRequestsMessage');
                carouselInner.innerHTML = '';

                let pendingCount = 0;
                let approvedCount = 0;
                if (applications.length > 0) {
                    const approvedCount = applications.filter(application => application.application_status === "APPROVED").length;
                    const pendingApplications = applications.filter(application => application.application_status === "PENDING");

                    if (pendingApplications.length > 0) {
                        const userPromises = pendingApplications.map(async (application, index) => {
                            try {
                                const userResponse = await fetch(`/api/users/user/id/${application.idUser}`);
                                const user = await userResponse.json();

                                if (userResponse.ok) {
                                    let isActive = index === 0 ? 'active' : '';

                                    let carouselItem = `
                                        <div class="carousel-item ${isActive}" style = "background-color: transparent;">
                                            <div class="card" style="height: 58vh;">
                                                <button class="close-button" aria-label="Close" onclick="removeApplication(${application.id})">&times;</button>
                                                <div class="card-body">
                                                    <div class="row justify-content-center">
                                                        <div class="col-6 text-center">
                                                            <button class="btn__text mt-3 mb-4" id="approveButton" onclick="approveApplication(${application.id})">Approve</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ul class="list-group list-group-light list-group-small">
                                                    <li class="list-group-item px-4">Name: ${user.name || '--'}</li>
                                                    <li class="list-group-item px-4">Surname: ${user.surname || '--'}</li>
                                                    <li class="list-group-item px-4">Phone Number: ${user.phone || '--'}</li>
                                                    <li class="list-group-item px-4">Email: ${user.email || '--'}</li>
                                                    <li class="list-group-item px-4">Birthdate: ${user.birthdate ? new Date(user.birthdate).toLocaleDateString() : '--'}</li>
                                                </ul>
                                                <div class="card-body">
                                                    <a href="#" class="card-link"></a>
                                                    <a href="#" class="card-link"></a>
                                                </div>
                                            </div>
                                        </div>
                                    `;
                                    carouselInner.innerHTML += carouselItem;
                                    pendingCount++;
                                } else {
                                    console.error(`Error fetching user ${application.idUser}:`, user.message);
                                }
                            } catch (error) {
                                console.error(`Network error fetching user ${application.idUser}:`, error);
                            }
                        });
                        await Promise.all(userPromises);

                        updateRequestCount(pendingCount);
                        updateApprovedCount(approvedCount);
                        toggleCarousel();
                    } else {
                        updateRequestCount(pendingCount);
                        updateApprovedCount(approvedCount);
                        toggleCarousel();
                    }
                } else {
                    document.getElementById('carouselExampleControls').style.display = 'none';
                    noRequestsMessage.style.display = 'block';
                }
            } else {
                console.error('Error fetching applications:', applications.message);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    }

    function updateRequestCount(count) {
        const countElement = document.getElementById('request-count');
        countElement.classList.add('updating');
        countElement.textContent = count;
        countElement.classList.remove('updating');
        if (count>0){
            document.getElementById('carouselExampleControls').style.display = 'block';
            noRequestsMessage.style.display = 'none';
        }
        else{
            document.getElementById('carouselExampleControls').style.display = 'none';
            noRequestsMessage.style.display = 'block';
        }
    }

    function updateApprovedCount(count) {
        const countElement = document.getElementById('accepted-count');
        countElement.classList.add('updating');
        countElement.textContent = count;
        countElement.classList.remove('updating');
    }

    function toggleCarousel() {
        var count = getRequestCount();
        var carouselContainer = document.getElementById('carouselExampleControls');
        var noRequestsMessage = document.getElementById('noRequestsMessage');

        if (count > 0) {
            carouselContainer.style.display = 'block';
            noRequestsMessage.style.display = 'none';
        } else {
            carouselContainer.style.display = 'none';
            noRequestsMessage.style.display = 'block';
        }
    }

    function getRequestCount() {
        return parseInt(document.getElementById('request-count').textContent);
    }

    window.removeApplication = function(applicationId) {
        console.log(`Remove application with ID: ${applicationId}`);
    }

    window.approveApplication = async function(applicationId) {
        console.log(`Approve application with ID: ${applicationId}`);
        try {
            const response = await fetch(`/api/applications/application/approve/${applicationId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'APPROVED' }), 
            });
    
            if (response.ok) {
                console.log(`Application ${applicationId} approved successfully`);
                fetchApplications(); 
            } else {
                const errorData = await response.json();
                console.error('Error approving application:', errorData.message);
            }
        } catch (error) {
            console.error('Network error while approving application:', error);
        }
    }

    fetchApplications();
    setInterval(fetchApplications, 10000);
});
