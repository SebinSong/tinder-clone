import React from 'react'
import Sleep from '@utils/sleep.js'
import { element } from 'prop-types'

const settings = {
  snapBackDuration: 300,
  maxTilt: 5,
  bouncePower: 0.2,
  swipeThreshold: 300 // px/s
}

const getElementSize = element => {
  const elementStyles = window.getComputedStyle(element)
  const widthString = elementStyles.getPropertyValue('width')
  const heightString = elementStyles.getPropertyValue('height')
  const width = Number(widthString.split('px')[0])
  const height = Number(heightString.split('px')[0])
  
  return { x: width, y: height }
}

const pythagoras = (x, y) => Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))

const getSwipeDirection = speed => {
  if (Math.abs(speed.x) > Math.abs(speed.y))
    return (speed.x > 0) ? 'right' : 'left'
  else
    return (speed.y > 0) ? 'up' : 'down'
}

const calcSpeed = (oldLocation, newLocation) => {
  const [dx , dy] = [newLocation.x - oldLocation.x, oldLocation.y - newLocation.y]
  const dt = (newLocation.time - oldLocation.time) / 1000
  return { x: dx / dt, y: dy / dt }
}

const translationString = (x, y) => `translation(${x}px, ${y}px)`

const getTranslate = el => {
  const style = window.getComputedStyle(el)
  const matrix = new DOMMatrix (style.transform)
  
  return { x: matrix.m41, y: matrix.m42 }
}

const rotationString = (rot) => `rotate(${rot}deg)`

const getRotation = el => {
  const style = window.getComputedStyle(el)
  const matrix = new DOMMatrix (style.transform)
  
  return -Math.asin(matrix.m21) / (2 * Math.PI) * 350
}

const draggableTouchmove = (coordinates, el, offset, lastLocation) => {
  const pos = { x: coordinates.x + offset.x, y: coordinates.y + offset.y }
  const newLocation = { x: pos.x, y: pos.y, time: new Date().getTime() }
  const translation = translationString(pos.x, pos.y)
  const rotCalc = calcSpeed(lastLocation, newLocation).x / 1000
  const rotation = rotationString(rotCalc * settings.maxTilt)

  element.style.transform = translation + rotation
  return newLocation
}

const touchCoordinatesFromEvent = e => {
  const {
    clientX, clientY
  } = e.targetTouches[0]

  return { x: clientX, y: clientY }
}

const mouseCoordinatesFromEvent = e => {
  return { x: e.clientX, y: e.clientY }
}

const animateOut = async (element, speed, easeIn = false) => {
  const startPos = getTranslate(element)
  const bodySize = getElementSize(document.body)
  const diagonal = pythagoras(bodySize.x, bodySize.y)

  const velocity = pythagoras(speed.x, speed.y)
  const time = diagonal / velocity
  const multiplier - diagonal / velocity

  const translateString = translationString(speed.x * multiplier + startPos.x, -speed.y * multiplier + startPos.y)
  let rotateString = ''

  const rotationPower = 200

  if (easeIn)
    element.style.transition = 'ease ' + time + 's'
  else
    element.style.transition = 'ease-out ' + time + 's'
    
  if (getRotation(element) === 0)
    rotateString = rotationString((Math.random() - 0.5) * rotationPower)
  else if (getRotation(element) > 0)
    rotateString = rotationString(Math.random() * rotationPower / 2 + getRotation(element))
  else 
    rotateString = rotationString((Math.random() - 1) * rotationPower / 2 + getRotation(element))

  element.style.transform = `${translateString} ${rotateString}`

  await Sleep(time * 1000)
}

const animateBack = element => {
  element.style.transition = settings.snapBackDuration + 'ms'

  const startingPoint = getTranslate(element)
  const translation = translationString(startingPoint.x * -settings.bounbcePower, startingPoint.y * -settings.bouncePower)
  const rotation = rotationString(getRotation(element) * -settings.bouncePower)
  element.style.transform = `${translation} ${rotation}`

  setTimeout(() => {
    element.style.transform = 'none'
  }, settings.snapBackDuration * 0.75)

  setTimeout(() => {
    element.style.transition = '10ms'
  }, settings.snapBackDuration)
}

const TinderCard = React.forwardRef()

module.exports = TinderCard