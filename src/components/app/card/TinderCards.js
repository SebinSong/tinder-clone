import React, { useState } from 'react'
import TinderCard from 'react-tinder-card'
import './tinder-cards.scss'

function TinderCards () {
  const [people] = useState([
    { name: "Elon Musk", url: "https://upload.wikimedia.org/wikipedia/commons/4/49/Elon_Musk_2015.jpg" },
    { name: "Jeff Bezos", url: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Jeff_Bezos_2016_crop.jpg" },
  ])

  const swiped = (direction, nameToDelete) => {
    console.log("removing: ", nameToDelete)
    // setLastDirection(direction)
  }

  const outOfFrame = name => {
    console.log(`${name} left the screen!`)
  }

  return (
    <div className="tinder-cards">
      {
        <div className="tinder-cards__card-container">
          {
            people.map(person => (
              <TinderCard
                className="swipe"
                key={person.name}
                perventSwipe={["up", "down"]}
                onSwipe={(dir) => swiped(dir, person.name)}
                onCardLeftScreen={() => outOfFrame(person.name)}
              >
                <div
                  style={{ backgroundImage: `url(${person.url})`}}
                  className="card"
                >
                  <h3>{person.name}</h3>
                </div>

              </TinderCard>
            ))
          }
        </div>
      }
    </div>
  )
}

export default TinderCards