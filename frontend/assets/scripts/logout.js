function logout() {
    fetch('/auth/logout', {
        method: 'POST',
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            console.log('User was loggedout');
            window.location.reload();
        } else {
            console.error('Logout request failed:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Logout request failed:', error);
    });
}
