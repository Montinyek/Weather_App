import React from 'react'
import './App.css';
import Today from './Today'
import ExtraInfo from './ExtraInfo'
import NextSix from './NextSix'

function App() {
  const [inputVal, setInputVal] = React.useState("")
  const [metric, setMetric] = React.useState(true)
  const [today, setToday] = React.useState()
  const [interimToday, setInterimToday] = React.useState() // used for other days of the week
  const [daily, setDaily] = React.useState()
  const [otherDaysSelected, setOtherDaysSelected] = React.useState([1, 1, 1, 1, 1, 1]) 
  const days = {
    "Mon" : "Monday",
    "Tue" : "Tuesday",
    "Wed" : "Wednesday",
    "Thu" : "Thursday",
    "Fri" : "Friday",
    "Sat" : "Saturday",
    "Sun": "Sunday"
  }
  const icons = {
    "Thunderstorm" : "fas fa-thunderstorm",
    "Drizzle" : "fas fa-cloud-rain",
    "Rain" : "fas fa-cloud-showers-heavy",
    "Snow" : "fas fa-snowflake",
    "Clear" : "fa-solid fa-sun",
    "Clouds" : "fas fa-cloud",
    "Tornado" : "fa-solid fa-tornado",
    "Haze" : "fas fa-smog",
    "Mist" : "fas fa-smog",
    "Dust" : "fas fa-smog",
    "Ash" : "fas fa-smog",
    "Sand" : "fas fa-smog",
    "Squall" : "fas fa-smog"
  }
  const nextSix = getNextSix() 
  const nextSixWeather = getNextSixWeather()
  const nextSixIcons = getNextSixIcons()
  const loading = <i className="fas fa-spinner fa-spin"></i>
  const loadingIcons = Array.from({length: 6}, () => <i className="fas fa-spinner fa-spin"></i>)
  
  function handleChange(e) {
    if (inputVal === "City not found") {
      setInputVal(prev => "")
    } else {
      setInputVal(prev => e.target.value)
    }
  }
  
  function unitConverter(degree, windSpeed) {
    if (metric) {
      return [Math.round(degree), windSpeed]
    } else {
      let F = Math.round((degree * (9/5)) + 32)
      let mph = windSpeed * 0.62137
      return [F, +mph.toFixed(2)]
    }
  }
  
  function toggleUnit(unit) {
    setMetric(prev => prev = unit === "C" ? true : false)
  }
  
  function changeBg(weather) {
    if (weather === "Clear") {
      return 'url("https://i.postimg.cc/GpLWGbqv/clear.png")'
    } else if (weather === "Rain" || weather === "Drizzle") {
      return 'url("https://i.postimg.cc/9FDzLXkt/rain.png")'
    } else if (weather === "Snow") {
      return 'url("https://i.postimg.cc/rm1FSswV/snow.png")'
    } else if (weather === "Clouds") {
      return 'url("https://i.postimg.cc/rmbs707G/cloudy.png")'
    } else {
      return 'url("https://i.postimg.cc/3xT3jpcP/haze.png")'
    }
  }
  
  function changeColor(weather) {
    return weather === "Snow" ? "#333333" : weather === "Clouds" ? "#F9F6EE" : "white"
  }
  
  React.useEffect(() => { // set default weather state
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Baku&appid=${process.env.REACT_APP_API_TODAY}&units=metric`)
  .then(response => response.json())
  .then(data => {
     let date = getDate(data.dt, data.timezone)
     setToday({...data, "day": date.slice(0, 3), "date": date.slice(5, 16)})
     setInterimToday({...data, "day": date.slice(0, 3), "date": date.slice(5, 16)})
   })
   fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=Baku&units=metric&cnt=7&appid=${process.env.REACT_APP_API_DAILY}`)
  .then(response => response.json())
  .then(data => {
    setDaily(data)
  })
   
  }, [])
  
  function getDate(dt, timezone) { // get local date
    const utcSeconds = parseInt(dt, 10) + parseInt(timezone, 10);
    const utcMilliseconds = utcSeconds * 1000;
    const localDate = new Date(utcMilliseconds).toUTCString();
    return localDate;
  }
  
  function getData(e) { // set state after searching 
   let name = e.target.value;
    if (name && e.key === "Enter") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.REACT_APP_API_TODAY}
&units=metric`)
  .then(response => response.json())
  .then(data => {
     if (data.cod !== "404") {
     setOtherDaysSelected([1, 1, 1, 1, 1, 1])
     let date = getDate(data.dt, data.timezone)
     setToday({...data, "day": date.slice(0, 3), "date": date.slice(5, 16)})
     setInterimToday({...data, "day": date.slice(0, 3), "date": date.slice(5, 16)})
     fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${name}&units=metric&cnt=7&appid=${process.env.REACT_APP_API_DAILY}`)
  .then(response => response.json())
  .then(data => {
        setDaily(data)
  })
     } else {
       setInputVal("City not found")
     }
   })
    }
  }
  
  function getNextSix() { 
    if (today) {
    let arr = Object.keys(days)
    let i = arr.indexOf(today.day)
    let a = arr.slice(i, arr.length)
    let b = arr.slice(0, i)
    return [...a, ...b].slice(1)
    }
}
  
  function getNextSixWeather() {
    let forecast = []
    if (daily) {
     daily.list.forEach(a => forecast.push(a.temp.day))
     return forecast.slice(1)
    }
  }
  
  function getNextSixIcons() {
    let icons = []
    if (daily) {
     daily.list.forEach(a => icons.push(a.weather[0].main))
     icons = icons.slice(1)
     for (let i = 0; i < icons.length; i++) {
       switch(icons[i]) {
          case "Thunderstorm": 
          icons[i] = "fas fa-thunderstorm"
          break;
          case "Drizzle": 
          icons[i] = "fas fa-cloud-rain"
          break;
          case "Rain": 
          icons[i] = "fas fa-cloud-showers-heavy"
          break;
          case "Snow": 
          icons[i] = "fas fa-snowflake"
          break;
          case "Clear": 
          icons[i] = "fa-solid fa-sun"
          break;
          case "Clouds": 
          icons[i] = "fas fa-cloud"
          break;
          case "Tornado": 
          icons[i] = "fa-solid fa-tornado" 
          break;
         default:
          icons[i] = "fas fa-smog"
       }
     }
     return icons
    }
  }
  
  function nextSixHover(idx) {
    return otherDaysSelected[idx] === 2 ? ["white", "#222831"] : ["transparent", "white"]
  }
  
  function changeToday(idx) {
    let date = getDate(daily.list[idx].dt, today.timezone)
    setInterimToday(prev => ({...prev, "main": {...prev.main, temp: daily.list[idx].temp.day, pressure: daily.list[idx].pressure, humidity: daily.list[idx].humidity}, "weather": [{...prev.weather[0], main: daily.list[idx].weather[0].main}], "wind": {...prev.wind, speed: daily.list[idx].speed}, "day": date.slice(0, 3), "date": date.slice(5, 16), "dt": daily.list[idx].dt}))
    let copy = [...otherDaysSelected]
    copy = copy.map(a => a === 2 ? 1 : a) // deselect the currently selected day
    copy[idx - 1] += 1 // select new day 
    setOtherDaysSelected(copy)
    if (otherDaysSelected.some(a => a === 2) && otherDaysSelected.indexOf(2) === idx - 1) { // if the selected day is clicked on again, deselect it 
      copy = copy.map(a => a === 2 ? 1 : a)
      setOtherDaysSelected(copy)
      setInterimToday(today)
    }
  }
 
  return (
  <div className="container">
    <Today keyVal={!interimToday ? 0 : interimToday.dt}
           color={!interimToday ? "white" : changeColor(interimToday.weather[0].main)}
           bg={!interimToday ? null : changeBg(interimToday.weather[0].main)} 
           day={!interimToday ? loading : days[interimToday.day]}
           date={!interimToday ? loading : interimToday.date}
           icon={!interimToday ? loading : <i className={icons[interimToday.weather[0].main]}></i>}
           temp={!interimToday ? loading : Math.round(interimToday.main.temp)} 
           weather={!interimToday ? loading : interimToday.weather[0].main}
           name={!interimToday ? loading : interimToday.name}
           country={!interimToday ? loading : interimToday.sys.country}
           metric={metric}
           toggleUnit={toggleUnit}
           unitConverter={unitConverter}/>
    <section className="rightSide">
      <ExtraInfo metric={metric}
                 wind={!interimToday ? loading : interimToday.wind.speed}
                 humidity={!interimToday ? loading : interimToday.main.humidity}
                 pressure={!interimToday ? loading : interimToday.main.pressure}
                 unitConverter={unitConverter}/>
      <NextSix keyVal={!today ? 0 : today.dt}
               changeToday={changeToday}
               selected={nextSixHover}
               icon={!daily ? loadingIcons : nextSixIcons}
               nextSix={!daily ? loadingIcons : nextSix}
               forecast={!daily ? loadingIcons : nextSixWeather}
               unitConverter={unitConverter}
               metric={metric}/>
      <input type="text"
             style={!interimToday ? {backgroundImage: null, color: "white"} : {backgroundImage: changeBg(interimToday.weather[0].main), color: changeColor(interimToday.weather[0].main)}} 
             onKeyUp={getData}
             onChange={handleChange}
             value={inputVal}/>
    </section> 
  </div>
  )
}

export default App;
