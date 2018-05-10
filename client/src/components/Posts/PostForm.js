import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {addPost} from '../../actions/post';

class PostForm extends Component {
    constructor(props){
        super(props);
        this.state={
            text:'',
            errors:{}
        }
    }
    onSubmit=(e)=>{
        e.preventDefault();
        const {user} =this.props.auth;
        const newPost = {
            text:this.state.text,
            name:user.name,
            avatar:user.avatar
        }
        this.props.addPost(newPost);
        this.setState({
            text:''
        })
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({
                errors:nextProps.errors
            })
        }
    }
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
         })
    }
    render() {
        const {errors} = this.state;
        return (
            <div className="post-form mb-3">
            <div className="card card-info">
              <div className="card-header bg-info text-white">
                Say Somthing...
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <TextAreaFieldGroup 
                    className="form-control form-control-lg"
                    name="text"
                     placeholder="Create a post"
                     value={this.state.text}
                     error={errors.text? errors.text : null}
                     onChange={this.onChange}
                     />
                  </div>
                  <button type="submit" className="btn btn-dark">Submit</button>
                </form>
              </div>
            </div>
          </div>
        )
    }
}
PostForm.propTypes={
    errors:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
    addPost:PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
    errors:state.errors,
    auth:state.auth    
})

export default  connect(mapStateToProps,{addPost})(PostForm);