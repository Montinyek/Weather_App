import React from 'react'

function Today(props) {
    return (
    <section className="today" style={{backgroundImage: props.bg}}>
        <div className="todaysDate" key={props.keyVal} style={{color: props.color, animation: "fadein 1.5s ease-in-out"}}>
          <span>{props.day}</span>
          <span>{props.date}</span>
          <span><i className="fa-solid fa-location-dot"></i>{props.name}, {props.country}</span>
        </div>
        <div className="todaysWeather" key={props.keyVal + 1} style={{color: props.color, animation: "fadein 1.5s ease-in-out"}}>
          <div>{props.icon}</div>
          <div className="todaysDegree" key={"" + props.metric} style={{animation: "fadein 1s ease-in-out"}}>
            {props.unitConverter(props.temp)[0]}
            <span className="todaysDegSymb" onClick={() => props.toggleUnit("C")} style={{opacity: props.metric ? 1 : 0.7}}>&#8451;</span>
            <span className="partition">|</span>
            <span className="todaysDegSymb" onClick={() => props.toggleUnit("F")} style={{opacity: props.metric ? 0.7 : 1}}>&#8457;</span>
          </div>
          <div>{props.weather}</div>
        </div>
    </section>
    )
  }

export default Today