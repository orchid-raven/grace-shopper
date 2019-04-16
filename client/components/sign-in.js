import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      title: 'Sign In',
      show: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({
      show: !this.state.show
    })
  }
  render() {
    return (
      <div className="dd-wraper">
        <div className="dd-header">
          <div onClick={this.handleClick} className="dd-header-title">
            {this.state.title}{' '}
          </div>
        </div>
        <ul className={'dd-list ' + (this.state.show ? 'show' : 'hidden')}>
          <li className="dd-list-item">
            <Link to="/login">Login</Link>
          </li>
          <li className="dd-list-item">
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      </div>
      //   <div>
      //     <div>Sign In</div>
      //     <ul>
      //       <li>
      //         Sign In<Link to="/login">Login</Link>
      //       </li>
      //       <li>
      //         Dont have an account? <Link to="/signup">Sign Up</Link>
      //       </li>
      //       <li>
      //         <Link to="/home">Home</Link>
      //       </li>
      //     </ul>
      //   </div>
    )
  }
}

export default SignIn
