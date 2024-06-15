function logout() {
    fetch('/auth/logout', {
        method: 'POST',
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            console.log('User was loggedout');
            // window.location.reload();
            fetch('/info/about.html', {
                method: 'GET',
                credentials: 'same-origin'
            })
            .then(response => {
                if (response.ok) {
                    console.log('Redirected to about page');
                    window.location.href = '/info/about.html';
                } else {
                    console.error('Failed to fetch about page:', response.statusText);
                }
            })
        } else {
            console.error('Logout request failed:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Logout request failed:', error);
    });
}
