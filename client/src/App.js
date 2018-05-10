import React, { Component } from 'react';
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import {Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {loginUser, onRequestLogout} from './actions/auth';
import {clearProfile} from './actions/profile';
import store from './store';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register'
import Dashboard from './components/Dashboard/Dashboard'
import PrivateRoutes from './components/common/PrivateRoutes'
import CreateProfile from './components/create-profile/CreateProfile'
import EditProfile from './components/edit-profile/EditProfile'
import AddExperience from './components/AddCredentials/AddExperiences'
import AddEducation from './components/AddCredentials/AddEducation'
import Profiles from './components/profile/Profiles'
import ProfileHandle from './components/profile/ProfileHandle'
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import Posts from './components/Posts/Posts';
import './App.css';
//check for toekn
import Post from './components/Posts/Post'
if(localStorage.jwtToken){
  //set auth token header
  setAuthToken(localStorage.jwtToken);
  //decode token get use info
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isauthenticated
  store.dispatch(loginUser(decoded));
  //check for expired token
  const currentTime = Date.now()/1000;
  if(decoded.exp<currentTime){  
    //logoutuser
    store.dispatch(onRequestLogout());
    //clear current profile
    store.dispatch(clearProfile());
    //redirect to login
    
    window.location.href='/login';
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <BrowserRouter>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
        <div className="container">
      
          
          <Switch>
          <Route exact path ="/register" component={Register}/>
          <Route exact path ="/login" component={Login}/>
          <Route exact path ="/profiles" component={Profiles}/>
          <Route exact path ="/profile/:handle" component={ProfileHandle}/>
          <PrivateRoutes exact path="/dashboard" component={Dashboard}/>   
          <PrivateRoutes exact path="/create-profile" component={CreateProfile}/>          
          <PrivateRoutes exact path="/edit-profile" component={EditProfile}/>          
          <PrivateRoutes exact path="/add-experience" component={AddExperience}/>      
          <PrivateRoutes exact path="/add-education" component={AddEducation}/> 
          <PrivateRoutes exact path="/add-education" component={AddEducation}/>          
          <PrivateRoutes exact path="/feeds" component={Posts}/>          
          <PrivateRoutes exact path="/post/:id" component={Post}/>          
          
          <Route component={NotFoundPage}/>
          
          </Switch>
          
        </div>
        
        <Footer />
      </div>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
