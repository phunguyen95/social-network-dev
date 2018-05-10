import React, { Component } from 'react';
import {connect} from 'react-redux';
import {onRequestLogin} from '../../actions/auth'
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.onRequestLogin(user);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.user.errors){
      this.setState({
        errors:nextProps.user.errors
      })
    }
    if(nextProps.user.isAuthenticated){
      this.props.history.push('/');
    }
  }
componentDidMount(){
  if(this.props.user.isAuthenticated){
    this.props.history.push('/dashboard');
  }
}
  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
              <TextFieldGroup 
              type="email"
              placeholder="Email Address" 
              onChange={this.onChange}
              value={this.state.email} 
              error={errors.email}
              name="email"
              />
              <TextFieldGroup 
              type="password"
              placeholder="Password" 
              onChange={this.onChange}
              value={this.state.password} 
              error={errors.password}
              name="password"
              />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user:state.auth,
  errors:state.errors
})
const mapDispatchToProps =(dispatch)=>{
  return {
    onRequestLogin:(user,history)=>{
      return dispatch(onRequestLogin(user,history))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Login));
