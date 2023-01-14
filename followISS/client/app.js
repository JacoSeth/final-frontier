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
            const latValue = `<p>${data.iss_position.latitude}</p>`
            const lonValue = `<p>${data.iss_position.longitude}</p>`
                // Convert unix to human time
            const d = data.timestamp
                // Account for miliseconds and convert to UTC
            const date = new Date(d * 1000).toUTCString()
            const dateValue = `<p>${date}</p>`
                // function dateConvert(date) {
                //     dateValue = unixDate.Date.prototype.toISOString()
                // }
                // return dateConvert()
                // Apply data dynamically to page
            document.querySelector('.DateTime').insertAdjacentHTML("afterbegin", dateValue)
            document.querySelector('.Latitude').insertAdjacentHTML("afterbegin", latValue)
            document.querySelector('.Longitude').insertAdjacentHTML("afterbegin", lonValue)
        })
        .catch(error => console.log(error))
}

// Call function
getLocationData()