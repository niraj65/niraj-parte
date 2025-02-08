async function getWeather() {
    const apiKey = "be43e687b8bfd8e1a3082f7de1422e8d"; // Replace with your OpenWeatherMap API key
    const city = document.getElementById("cityInput").value;
    
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");
        
        const data = await response.json();
        
        document.getElementById("weatherResult").innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } catch (error) {
        document.getElementById("weatherResult").innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}
