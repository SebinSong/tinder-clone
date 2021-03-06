import React from 'react'
import './SwipeButtons.scss'

// Icon Buttons
import ReplayIcon from '@material-ui/icons/Replay'
import CloseIcon from '@material-ui/icons/Close'
import StarRateIcon from '@material-ui/icons/StarRate'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FlashIcon from '@material-ui/icons/FlashOn'
import IconButton from '@material-ui/core/IconButton'

function SwipeButtons() {
  return (
    <div className="swipe-buttons">
      <IconButton className="swipe-buttons__repeat">
        <ReplayIcon fontSize="large" />
      </IconButton>

      <IconButton className="swipe-buttons__left">
        <CloseIcon fontSize="large" />
      </IconButton>

      <IconButton className="swipe-buttons__star">
        <StarRateIcon fontSize="large" />
      </IconButton>

      <IconButton className="swipe-buttons__right">
        <FavoriteIcon fontSize="large" />
      </IconButton>

      <IconButton className="swipe-buttons__lightning">
        <FlashIcon fontSize="large" />
      </IconButton>
    </div>
  )
}

export default SwipeButtons
