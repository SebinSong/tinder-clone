import React from 'react'
import './Header.scss'

// child components
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';

// assets
import logoImage from '@media/Tinder_logo.png'

function Header () {
  return (
    <div className="header">
      <h2>I&lsquo;m a header</h2>
      <IconButton>
        <PersonIcon fontSize="large" className="header__icon" />
      </IconButton>

      <img className="header__logo"
        src={logoImage}
      />
    </div>
  )
}

export default Header