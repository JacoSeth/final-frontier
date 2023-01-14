var map = L.map("map").setView([20.7399, -156.4542], 5)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 2,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



// Document.onload = function() {
//     var map = L.map("map").setView([18.5095, -46.0000], 10);
// }