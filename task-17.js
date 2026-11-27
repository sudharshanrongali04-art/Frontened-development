const searchForm = document.querySelector("#search-form");
const cityInput = document.querySelector("#city-input");
const searchButton = searchForm.querySelector("button");
const statusMessage = document.querySelector("#status-message");
const weatherCard = document.querySelector("#weather-card");
const weatherPlaceholder = document.querySelector("#weather-placeholder");

let activeRequest = 0;

function describeWeather(code, isDay) {
    if (code === 0) return { condition: "Clear sky", icon: isDay ? "☀️" : "🌙" };
    if (code === 1) return { condition: "Mostly clear", icon: isDay ? "🌤️" : "🌙" };
    if (code === 2) return { condition: "Partly cloudy", icon: "⛅" };
    if (code === 3) return { condition: "Overcast", icon: "☁️" };
    if ([45, 48].includes(code)) return { condition: "Foggy", icon: "🌫️" };
    if ([51, 53, 55, 56, 57].includes(code)) return { condition: "Drizzle", icon: "🌦️" };
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
        return { condition: "Rainy", icon: "🌧️" };
    }
    if ([71, 73, 75, 77, 85, 86].includes(code)) return { condition: "Snowy", icon: "❄️" };
    if ([95, 96, 99].includes(code)) return { condition: "Thunderstorm", icon: "⛈️" };
    return { condition: "Variable conditions", icon: "🌥️" };
}

function setStatus(message, isError) {
    statusMessage.textContent = message;
    if (isError) {
        statusMessage.dataset.error = "true";
    } else {
        delete statusMessage.dataset.error;
    }
}

function formatLocalTime(time, timezone) {
    return new Intl.DateTimeFormat("en", {
        weekday: "long",
        hour: "numeric",
        minute: "2-digit",
        timeZone: timezone
    }).format(new Date(time));
}

function displayWeather(place, weather) {
    const current = weather.current;
    const isDay = current.is_day === 1;
    const description = describeWeather(current.weather_code, isDay);

    document.querySelector("#city-name").textContent =
        [place.name, place.country].filter(Boolean).join(", ");
    document.querySelector("#local-time").textContent =
        formatLocalTime(current.time, weather.timezone);
    document.querySelector("#temperature").innerHTML =
        `${Math.round(current.temperature_2m)}<span>°</span>`;
    document.querySelector("#feels-like").textContent =
        `Feels like ${Math.round(current.apparent_temperature)}°`;
    document.querySelector("#weather-icon").textContent = description.icon;
    document.querySelector("#weather-condition").textContent = description.condition;
    document.querySelector("#humidity").innerHTML =
        `${Math.round(current.relative_humidity_2m)}<span>%</span>`;
    document.querySelector("#wind-speed").innerHTML =
        `${Math.round(current.wind_speed_10m)}<span> km/h</span>`;
    document.querySelector("#daylight").textContent = isDay ? "Daytime" : "Night";
    weatherCard.hidden = false;
    weatherPlaceholder.hidden = true;
    setStatus("", false);
}

async function fetchWeather(city, requestNumber) {
    const geocodingUrl = new URL("https://geocoding-api.open-meteo.com/v1/search");
    geocodingUrl.search = new URLSearchParams({
        name: city,
        count: "1",
        language: "en",
        format: "json"
    });

    const locationResponse = await fetch(geocodingUrl);
    if (!locationResponse.ok) throw new Error("Could not search for that city right now.");
    const locationData = await locationResponse.json();
    const place = locationData.results && locationData.results[0];
    if (!place) throw new Error(`We couldn't find “${city}”. Check the spelling and try again.`);

    const forecastUrl = new URL("https://api.open-meteo.com/v1/forecast");
    forecastUrl.search = new URLSearchParams({
        latitude: String(place.latitude),
        longitude: String(place.longitude),
        current: "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m",
        timezone: "auto"
    });

    const weatherResponse = await fetch(forecastUrl);
    if (!weatherResponse.ok) throw new Error("Weather data is temporarily unavailable. Please try again.");
    const weather = await weatherResponse.json();
    if (!weather.current || !weather.timezone) {
        throw new Error("Weather data for this city is incomplete. Please try another city.");
    }
    if (requestNumber === activeRequest) displayWeather(place, weather);
}

searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (!city) {
        setStatus("Enter a city name to search.", true);
        cityInput.focus();
        return;
    }

    const requestNumber = ++activeRequest;
    searchButton.disabled = true;
    setStatus(`Finding the weather for ${city}...`, false);
    try {
        await fetchWeather(city, requestNumber);
    } catch (error) {
        if (requestNumber === activeRequest) {
            setStatus(error instanceof Error ? error.message : "Something went wrong. Please try again.", true);
        }
    } finally {
        if (requestNumber === activeRequest) searchButton.disabled = false;
    }
});

cityInput.value = "London";
searchForm.requestSubmit();