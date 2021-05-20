import React from 'react'
import './Header.scss'

// child components
import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';
import IconButton from '@material-ui/core/IconButton'

// assets
import logoImage from '@media/Tinder_logo.png'

function Header () {
  return (
    <div className="header">
      <IconButton className="header__btn">
        <PersonIcon fontSize="large" className="header__icon" />
      </IconButton>

      <img className="header__logo"
        src={logoImage}
        alt=""
      />
      
      <IconButton className="header__btn">
        <ForumIcon fontSize="large" className="header__icon" />
      </IconButton>
    </div>
  )
}

export default Header