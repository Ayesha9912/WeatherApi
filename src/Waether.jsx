import React, { useEffect, useRef, useState } from 'react';
import { CiSearch } from "react-icons/ci";

export default function Waether() {
  const [input, setinput] = useState("lahore")
  const [weather, setweather] = useState({})
  const inputValue = useRef()
  const apiKey = 'f65e32faa80c40a876bd4112cd36e525'
  const ApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`
  console.log(input);
  const search = () => {
    let inputcity = inputValue.current.value
    setinput(inputcity)
  }
  const waetherApi = async () => {
    let response = await fetch(ApiUrl)
    let data = await response.json()
    console.log(data);
    let name = data.name
    let img = data.weather[0].icon
    console.log(img);
    let wind = data.wind.speed
    console.log(wind);
    let temp = data.main.temp
    let tempC = Math.floor(temp - 273)
    let humidity = data.main.humidity
    console.log(name, "name", wind, "wind", temp, "Temp", tempC, "c");
    let iconimg = (`https://openweathermap.org/img/wn/${img}@2x.png`)
    console.log(iconimg);
    let main = data.weather[0].main
    setweather({
      name,
      iconimg,
      tempC,
      wind,
      main,
      humidity
    })
  }
  useEffect(() => {
    waetherApi()

  }, [input])
  return (
    <div className='w-full bg-sky-300  h-[100vh] flex flex-col justify-center items-center'>
      <h1 className='text-white font-bold text-5xl mb-5'>Weather Api</h1>
      <div className='w-[600px] h-[500px] bg-slate-700 rounded-lg  opacity-80 p-10'>
        <div className='flex justify-between items-center'>
          <input type="text" className=' border-none pl-5 h-20 w-[80%] rounded-lg ' placeholder='Enter your City name'
            ref={inputValue}
          />
          <button onClick={search} className='text-black text-3xl p-5 bg-white rounded-full'><CiSearch /></button>
        </div>
        {weather ? (<div>
          <div className='w-[100%] flex justify-between'>
            <div className='flex flex-col w-[50%]'>
              <h1 className='text-3xl text-white underline text-bold mt-5'>{weather.name}</h1>
              <h1 className='text-2xl text-white font-semibold mt-5'>Condition: {weather.main}</h1>
              <h1 className='text-2xl text-white font-semibold mt-5'>Temperature: {weather.tempC}C</h1>
              <h1 className='text-2xl text-white font-semibold mt-5'>Wind Speed: {weather.wind}Km/h</h1>
              <h1 className='text-2xl text-white font-semibold mt-5'>Humidity: {weather.humidity} </h1>
            </div>
            <div className='flex justify-center items-center w-[50%]'>
              <img src={weather.iconimg} alt={weather.name} />
            </div>
          </div>
        </div>)
          :
          (
            <p className='text-white'>Loading .....</p>
          )
          }
      </div>
    </div>
  )
}
