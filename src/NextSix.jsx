import React from 'react'

function NextSix(props) {
    return (
    <section className="nextSix">
        {props.nextSix?.map((day, i) => (
              <div key={props.keyVal + i} style={{animation: "fadein 2s", backgroundColor: props.selected(i)[0], color: props.selected(i)[1]}} onClick={() => props.changeToday(i + 1)}>
                <span><i className={props.icon[i]}></i></span>
                <span>{day}</span>
                <span>{typeof props.forecast[0] === "number" ? props.unitConverter(props.forecast[i])[0] : props.forecast[i]}{props.metric ? <>&#8451;</> : <>&#8457;</>}</span>
              </div>
            ))}
    </section>
    )
  }

export default NextSix