import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import 'materialize-css/dist/css/materialize.min.css'
//  import M from 'materialize-css/dist/js/materialize.min.js'
import M from 'materialize-css'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className='container'>
    {/* <h1>BOILERMAKER</h1> */}
    <nav>
      <div className='nav-wrapper'>
      {isLoggedIn ? (
        <div className='left'>
          {/* The navbar will show these links after you log in */}
          <a href="#" className=''><img src='/images/logo/orchidRavenLogo.png'/></a>
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
      </div>
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
