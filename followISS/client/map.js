// Declare some stuff
const options = {
    method: 'GET'
}



// Initiate map
var map = L.map("map")

// Add Map Tile Layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 2,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Add ISS Marker based on location data

var iconISS = L.icon({
    iconUrl: 'Icon-ISS.png',
    // shadowUrl: 'Icon-ISS.png',
    iconSize: [40, 40],
    // shadowSize: [55, 55],
    // shadowAnchor: [0, 0],
    // shadowOpacity: 0.1
})

var marker = L.marker([], {
    icon: iconISS
})

var circle = L.circle([], {
    color: '#ffffff',
    colorOpacity: 0.3,
    fillColor: '#f7f8fa',
    fillOpacity: 0.15,
    radius: 3218688
})

function queryISS() {
    fetch('http://api.open-notify.org/iss-now.json', options)
        .then(res => res.json())
        .then(data => {
            latitude = data.iss_position.latitude
            longitude = data.iss_position.longitude
            console.log(latitude, longitude)
                // Create the marker, place it on the map
            var newLatLng = new L.LatLng(latitude, longitude)
                // marker.addTo(map)
            marker.setLatLng(newLatLng).addTo(map)
                // Create the circle, place it on the map
            circle.setLatLng(newLatLng).addTo(map)
                // Set the map to follow the latitude of the ISS (always horizontally centered on map)
            map.setView([25.0, longitude], 1)
                // Set the table elements to match the current coordinates
            const d = data.timestamp
                // Account for miliseconds and convert to UTC
            const date = new Date(d * 1000).toUTCString()
            const dateValue = `<p>${date}</p>`
            const latValue = `<p>${data.iss_position.latitude}</p>`
            const lonValue = `<p>${data.iss_position.longitude}</p>`
                // Apply data dynamically to page, removing previously logged elements first
            var setCurrentInfo = function() {
                // Define elements to be changed
                dateElement = "#DateTime"
                dateSelector = document.querySelector(dateElement)
                latElement = "#Latitude"
                latSelector = document.querySelector(latElement)
                lonElement = "#Longitude"
                lonSelector = document.querySelector(lonElement)

                // Update defined Elements
                dateSelector.innerHTML = dateValue
                latSelector.innerHTML = latValue
                lonSelector.innerHTML = lonValue
            }
            setCurrentInfo()
        })
        .catch(error => console.log(error))
    setTimeout(queryISS, 30000)

}

queryISS()