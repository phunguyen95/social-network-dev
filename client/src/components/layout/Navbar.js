import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {onRequestLogout} from '../../actions/auth';
import {withRouter} from 'react-router-dom';
import {clearProfile} from '../../actions/profile'
class Navbar extends Component {
 

  logOut=()=>{
    this.props.logOut();
    this.props.clearCurrentProfile();
    this.props.history.push('/login')
  }
   showAuthLink=(user)=>{
      return(
        <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a
            href=""
            onClick={(event)=>this.logOut()}
            className="nav-link"
          >
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '25px', marginRight: '5px' }}
              title="You must have a Gravatar connected to your email to display an image"
            />{' '}
            Logout
          </a>
        </li>
      </ul>
  )

   }
  
   showGuestLink=()=>{
    return(
      <div>
      <ul className="navbar-nav ml-auto">
    <li className="nav-item">
      <Link className="nav-link" to='/register'>
        Sign Up
      </Link>
    </li>
   <li className="nav-item">
      <Link className="nav-link" to="/login">
        Login
      </Link>
    </li>
  </ul>
  </div>
 )
  }

  render() {
    const {isAuthenticated,user} =this.props.user;
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link to ="/" className="navbar-brand" >
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
          <li className="nav-item">
          <Link className="nav-link" to='/feeds'>
            Post Feeds
          </Link>
        </li>
          <li className="nav-item">
             <Link className="nav-link" to='/dashboard'>
               Dashboard
             </Link>
           </li>
           <li className="nav-item">
           <Link className="nav-link" to='/profiles'>
             Profiles
           </Link>
         </li>
           </ul>
          {isAuthenticated ? this.showAuthLink(user) :this.showGuestLink()}

          
          </div>
        </div>
      </nav>
    );
  }
}
Navbar.propTypes={
  onRequestLogout:PropTypes.func,
  user:PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
  user:state.auth
})
const mapDispatchToProps = (dispatch)=>{
  return {
    logOut:()=>dispatch(onRequestLogout),
    clearCurrentProfile:()=>dispatch(clearProfile)
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Navbar));
