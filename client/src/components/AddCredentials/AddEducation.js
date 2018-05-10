import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addEducation} from '../../actions/profile';
class AddEducation extends Component {
    constructor(props){
        super(props);
        this.state={
            school:'',
            degree:'',
            fieldOfStudy:'',
            from:'',
            to:'',
            current:false,
            description:'',
            disabled:false ,
            errors:{}
        }
    }
    onCheck=(e)=>{
        console.log(this.state.disabled)
        this.setState({
            current:!this.state.current,
            disabled:!this.state.disabled
        })
    }
    onChange=(e)=>{
        this.setState({
           [e.target.name]:e.target.value
        })

    }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({
                errors:nextProps.errors
            })
        }
    }
    onSubmit=(e)=>{
        e.preventDefault();
        let education = {
          school:this.state.school,
          degree:this.state.degree,
          fieldOfStudy:this.state.fieldOfStudy,
          from:this.state.from,
          to:this.state.to,
          current:this.state.current,
          description:this.state.description,
        }
        console.log(education);
        this.props.addEducation(education,this.props.history);
    }
    render() {
        const {errors} = this.state;
        return (
            <div className="add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link className="btn btn-light" to="/dashboard"> Go Back </Link>
                            <h1 className="display-4 text-center">Add Education</h1>
                            <p className="lead text-center">Add any schools,bootcamps that you have attended</p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                            placeholder="*School"
                            name="school"
                            value={this.state.school}
                            onChange={this.onChange}
                            error={errors.school}
                           />
                           <TextFieldGroup
                           placeholder="*Degree "
                           name="degree"
                           value={this.state.degree}
                           onChange={this.onChange}
                           error={errors.degree}
                          />
                          <TextFieldGroup
                          placeholder="*Filed Of Study"
                          name="fieldOfStudy"
                          value={this.state.fieldOfStudy}
                          onChange={this.onChange}
                          error={errors.fieldOfStudy}
                         />
                         <h6>From date</h6>
                         <TextFieldGroup
                         type="date"
                         name="from"
                         value={this.state.from}
                         onChange={this.onChange}
                         error={errors.from}
                        />
                        <h6>To date</h6>
                        
                        <TextFieldGroup
                        type="date"
                        name="to"
                        value={this.state.to}
                        onChange={this.onChange}
                        error={errors.to}
                        disabled={this.state.disabled ? 'disabled' :''}
                       />
                       <div className="form-check mb-4">
                        <input className="form-check-input" 
                        name="current"
                        type="checkbox" 
                        value={this.state.current}
                        checked={this.state.current}
                        onChange={this.onCheck} 
                        id="current"
                        />
                        <label htmlFor="current" className="form-check-label">
                        Current school
                        </label>
                       </div>
                        <TextAreaFieldGroup
                        placeholder="Program Description"
                        name="description"
                        value={this.state.description}
                        onChange={this.onChange}
                        error={errors.description}
                        info="Describe your program"
                        />
                        <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
AddEducation.propTypes={
    addEducation:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    profile:state.profile,
    errors:state.errors
})


export default connect(mapStateToProps,{addEducation})(withRouter(AddEducation));