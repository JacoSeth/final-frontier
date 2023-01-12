// Simple API fetch to return current location of the ISS

const options = {
    method: 'GET'
}

function getLocationData() {
    var info = fetch('http://api.open-notify.org/iss-now.json', options)
        .then(res => res.json())
        .then(data => {
            // Data access starts here
            // Set data I want to constants
            const dateValue = `<p>${data.timestamp}</p>`
            const latValue = `<p>${data.iss_position.latitude}</p>`
            const lonValue = `<p>${data.iss_position.longitude}</p>`
                // Apply data dynamically to page
            document.querySelector('#DateTime').insertAdjacentHTML("afterbegin", dateValue)
            document.querySelector('#Latitude').insertAdjacentHTML("afterbegin", latValue)
            document.querySelector('#Longitude').insertAdjacentHTML("afterbegin", lonValue)
        })
        .catch(error => console.log(error))
}

// Call function
getLocationData()