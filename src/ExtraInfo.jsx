import React from 'react'

function ExtraInfo(props) {
    return (
    <section className="extraInfo">
        <div>
          <span>PRESSURE</span>
          <span>{props.pressure} hPA</span>
        </div>
        <div>
          <span>HUMIDITY</span>
          <span>{props.humidity} %</span>
        </div>
        <div>
          <span>WIND</span>
          <span>{props.unitConverter(0, props.wind)[1]} {props.metric ? "km/h" : "mph"}</span>
        </div>
    </section>
    )
  }

export default ExtraInfo