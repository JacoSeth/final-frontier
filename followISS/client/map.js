// Declare some stuff
const options = {
    method: 'GET'
}

const pathCoordinates = []



// Initiate map
const map = L.map("map").setView([0.0, 0.0], 1)

// Day/Night terminator package to add a polygon showing Earth's shadow over the map

const earthShadow = L.terminator().addTo(map)
earthShadow.bindPopup("Earth's Shadow")

setInterval(function() { updateTerminator(earthShadow) }, 1000)

function updateTerminator(earthShadow) {
    earthShadow.setTime()
}



// Add Map Tile Layer
const mapLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 2,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Add ISS Marker based on location data

const iconISS = L.icon({
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
    fillColor: '#241571',
    fillOpacity: 0.1,
    radius: 3218688
})




function queryISS() {
    fetch('http://api.open-notify.org/iss-now.json', options)
        .then(res => res.json())
        .then(data => {
            latitude = data.iss_position.latitude
            longitude = data.iss_position.longitude
                // console.log(latitude, longitude)
                // Create the marker, place it on the map
            var newLatLng = new L.LatLng(latitude, longitude)
                // marker.addTo(map)
            marker.setLatLng(newLatLng).addTo(map)
                // Create the circle, place it on the map
            circle.setLatLng(newLatLng).addTo(map)
                // Set the map to follow the latitude of the ISS (always horizontally centered on map)
                // map.setView([25.0, longitude], 1)
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

                // Make a marker for the popup describing elevation & coordinates
                var mkrMsg = `beep boop`
                marker.bindPopup(mkrMsg), {
                        maxWidth: 2000,
                        minWidth: 1000
                    }
                    // .openPopup();

                var circleMsg = `approx view: 3,218,688m`
                circle.bindPopup(circleMsg), {
                        maxWidth: 2000,
                        minWidth: 1000,
                        offset: [10, 30]
                    }
                    // .openPopup();
            }
            setCurrentInfo()
            var drawPath = function() {
                var coordinateObj = [data.iss_position.latitude, data.iss_position.longitude]
                pathCoordinates.push(coordinateObj)
                    // console.log(pathCoordinates)
                var polyline = new L.polyline(pathCoordinates, {
                    color: '#ffffff',
                    weight: 1
                }).addTo(map)
                if (pathCoordinates.length < 8) {
                    // do nothing
                } else {
                    pathCoordinates.shift()
                        // polyline = new L.polyline(pathCoordinates, {
                        //     color: '#AA336A',
                        //     weight: 3
                        // }).addTo(map)
                        // return pathCoordinates
                }
            }
            drawPath()
        })

    .catch(error => console.log(error))
    setTimeout(queryISS, 3000)

}

queryISS()