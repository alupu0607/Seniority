document.addEventListener('DOMContentLoaded', async () => {
    let usersData = [];
    let applicationIds = []; 

    async function fetchApplicationsAndUsers() {
        try {
            const retirementHomeId = id;
            console.log('Retirement Home ID:', retirementHomeId);

            const applicationsResponse = await fetch(`/api/applications/application/retirementHome/${retirementHomeId}`);
            const applicationsData = await applicationsResponse.json();
            console.log('Applications Data:', applicationsData);

            const approvedApplications = applicationsData.filter(application => application.application_status === 'APPROVED');
            console.log('Approved Applications:', approvedApplications);

            const userIds = approvedApplications.map(application => application.idUser);
            applicationIds = approvedApplications.map(application => application.id);

            const usersPromises = userIds.map(userId => fetch(`/api/users/user/id/${userId}`));
            const usersResponses = await Promise.all(usersPromises);
            usersData = await Promise.all(usersResponses.map(response => response.json()));
            console.log('Users Data:', usersData);

            renderCards(usersData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function fetchRetirementHomeStatus() {
        try {
            const response = await fetch(`/api/retirement-home-managment/retirement-homes/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch retirement home status');
            }

            const retirementHomeData = await response.json();
            highlightStatusButton(retirementHomeData.status);
        } catch (error) {
            console.error('Error fetching retirement home status:', error);
        }
    }


    function highlightStatusButton(currentStatus) {
        const availableButton = document.getElementById('makeAvailable');
        const unavailableButton = document.getElementById('makeUnavailable');


        // if (currentStatus === 'available') {
        //     unavailableButton.classList.remove('btn-danger');
        //     availableButton.classList.add('btn-success');
        // } else if (currentStatus === 'unavailable') {
        //     unavailableButton.classList.add('btn-danger');
        //     unavailableButton.classList.remove('btn-success');
        // }
        availableButton.classList.remove('btn-success', 'btn-outline-secondary');
        unavailableButton.classList.remove('btn-danger', 'btn-outline-secondary');
    
        if (currentStatus === 'available') {
            availableButton.classList.add('btn-success');
            unavailableButton.classList.add('btn-outline-secondary');
        } else if (currentStatus === 'unavailable') {
            unavailableButton.classList.add('btn-danger');
            availableButton.classList.add('btn-outline-secondary');
        }
        fetchRetirementHomeStatus();
    }

    async function updateRetirementHomeStatus(status) {
        try {
            const response = await fetch(`/api/retirement-home-managment/retirement-homes/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                throw new Error('Failed to update retirement home status');
            }

            const updatedHome = await response.json();
            console.log('Updated Retirement Home:', updatedHome);
            alert(`Retirement home status updated to ${status.toUpperCase()}`);
        } catch (error) {
            console.error('Error updating retirement home status:', error);
            alert('Failed to update retirement home status');
        }
    }
    
    
    function renderCards(users) {
        const cardContainer = document.getElementById('cardContainer');
        cardContainer.innerHTML = ''; 

        users.forEach((user, index) => {
            const applicationId = applicationIds[index];

            const cardHtml = `
                <div data-aos="fade-down" data-aos-delay="150" class="col-12 col-lg-6 mb-4">
                    <div class="card">
                        <button class="close-button" aria-label="Close" onclick="removeApplication(${applicationId})">&times;</button>
                        
                        <ul class="list-group list-group-light list-group-small" style="margin-top: 15vh;">
                            <li class="list-group-item px-4">Name: ${user.name || '--'}</li>
                            <li class="list-group-item px-4">Surname: ${user.surname || '--'}</li>
                            <li class="list-group-item px-4">Phone Number: ${user.phone || '--'}</li>
                            <li class="list-group-item px-4">Email: ${user.email || '--'}</li>
                            <li class="list-group-item px-4">Birthdate: ${user.birthdate ? new Date(user.birthdate).toLocaleDateString() : '--'}</li>
                        </ul>
                       
                    </div>
                </div>
            `;
            cardContainer.insertAdjacentHTML('beforeend', cardHtml);
        });

        const seniorsCountElement = document.getElementById('seniorsCount');
        if (seniorsCountElement) {
            seniorsCountElement.textContent = users.length.toString();
        } else {
            console.error('Seniors count element not found.');
        }
    }

    function searchSeniors() {
        const searchInput = document.getElementById('searchInput').value.toLowerCase().trim();
        const filteredUsers = usersData.filter(user => {
            return (
                (user.phone && user.phone.toLowerCase().includes(searchInput)) ||
                (user.email && user.email.toLowerCase().includes(searchInput))
            );
        });
        renderCards(filteredUsers);
    }

    function resetSearch() {
        document.getElementById('searchInput').value = '';
        renderCards(usersData);
    }

    function sortUsers(criteria) {
        switch (criteria) {
            case 'oldestFirst':
                usersData.sort((a, b) => new Date(a.birthdate) - new Date(b.birthdate));
                break;
            case 'youngestFirst':
                usersData.sort((a, b) => new Date(b.birthdate) - new Date(a.birthdate));
                break;
            case 'surnameAZ':
                usersData.sort((a, b) => a.surname.localeCompare(b.surname));
                break;
            case 'surnameZA':
                usersData.sort((a, b) => b.surname.localeCompare(a.surname));
                break;
            case 'nameAZ':
                usersData.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'nameZA':
                usersData.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }
        renderCards(usersData);
    }

    window.removeApplication = async function(applicationId) {
        console.log(`Remove application with ID: ${applicationId}`);
        try {

            const response = await fetch(`/api/applications/application/id/${applicationId}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              },
            });
        
            if (!response.ok) {
              throw new Error('Failed to delete application');
            }
        
            const data = await response.json();
            console.log(data.message); 
            location.reload();
          } catch (error) {
            console.error('Error deleting application:', error.message);
          }
    }


    function setupEventListeners() {
        document.getElementById('sortByOldest').addEventListener('click', () => sortUsers('oldestFirst'));
        document.getElementById('sortByYoungest').addEventListener('click', () => sortUsers('youngestFirst'));
        document.getElementById('sortBySurnameAZ').addEventListener('click', () => sortUsers('surnameAZ'));
        document.getElementById('sortBySurnameZA').addEventListener('click', () => sortUsers('surnameZA'));
        document.getElementById('sortByNameAZ').addEventListener('click', () => sortUsers('nameAZ'));
        document.getElementById('sortByNameZA').addEventListener('click', () => sortUsers('nameZA'));
        document.getElementById('searchButton').addEventListener('click', searchSeniors);
        document.getElementById('resetButton').addEventListener('click', resetSearch);


        document.getElementById('makeAvailable').addEventListener('click', () => updateRetirementHomeStatus('available'));
        document.getElementById('makeUnavailable').addEventListener('click', () => updateRetirementHomeStatus('unavailable'));
    }


    fetchApplicationsAndUsers();
    fetchRetirementHomeStatus(); 
    setupEventListeners();

    setInterval(fetchApplicationsAndUsers, 600000);

  
});
