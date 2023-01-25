const options = {
    method: "GET",
    headers: {
        'X-RapidAPI-Key': '6ca08b1d9emshca1edadce9dfcf8p13c32bjsna44d25ac7830',
        'X-RapidAPI-Host': 'uphere-space1.p.rapidapi.com'
    }
}


function getSatelliteList() {
    fetch('https://uphere-space1.p.rapidapi.com/satellite/list?page=1&text=goes&country=US', options)
        .then(res = res.json())
        .then(data => {
            console.log(data)
        })
}

getSatelliteList()