import https from "https";
import readline from "readline/promises";
import chalk from "chalk";
import { json } from "stream/consumers";

const rl = readline.createInterface({
    input : process.stdin,
   output : process.stdout,
}
);

// c94a8ffc16fcd61f61d450c0d009f1dd
const API_key = "c94a8ffc16fcd61f61d450c0d009f1dd";

const base_url = 'https:api.openweathermap.org/data/2.5/weather';

const getWeather = async (city) => {
    const url = `${base_url}?q=${city}&appid=${API_key}&units=metric`;

    try {
        const res = await fetch(url);
        if(!res.ok){
            throw new Error(`City not found . please check the city name `);
        }
        const weatherData = await res.json();
        console.log(`\nWeather information`);
        console.log(`City:${weatherData.name}`);
        console.log(`Temp:${weatherData.main.temp}°C`);
        console.log(`Descn:${weatherData.weather[0].description}`);
        console.log(`Humidity:${weatherData.main.humidity}%`);
        console.log(`Wind Speed:${weatherData.wind.speed} m/s`);
    } catch (error) {
        console.log(error.message)
    }

}


const city = await rl.question(`Enter a city name to get its weather : `);
await getWeather(city);
rl.close();