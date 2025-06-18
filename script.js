document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault()

    const cityName = document.querySelector('#city-name').value

    if(!cityName){
        return showAlert('Por favor, digite o nome da cidade desejada')
    }

    const apiKey = '6bab7c2d615ad3fd9f02e6238335e0d9'
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`

    const results = await fetch(apiUrl)
    const json = await results.json()

    if(json.cod === 200){
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            humidity: json.main.humidity
        })
    }else {
        showAlert('Não foi possível localizar')
    }
})

function showInfo(json){
    showAlert('');

    document.querySelector('#weather').classList.add('show')

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`
    document.querySelector('#temp-value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} C°`
    document.querySelector('#temp-img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
     document.querySelector('#description').innerHTML = `
        <p>${json.description}</p>
        <p>Umidade: ${json.humidity}%</p>
     `
}

function showAlert(msg){
    document.querySelector('#alert').innerHTML = msg
}