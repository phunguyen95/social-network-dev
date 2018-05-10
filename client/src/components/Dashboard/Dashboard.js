import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getCurrentProfile,deleteProfile } from '../../actions/profile';
import Spinner from '../common/Spinner';
import {Link} from 'react-router-dom';
import ProfileActions from './ProfileAction';
import Experience from './Experience';
import Education from './Education';
 class Dashboard extends Component {
     componentDidMount(){
         this.props.getCurrentProfile();
     }
     onDelete=(e)=>{
        this.props.deleteProfile();
     }
    render() {
        const {user} = this.props.auth;
        const {profile,loading} = this.props.profile;
        let dashboardContent;
        if(profile===null||loading){
            dashboardContent= <Spinner/>
        }
        else{
           //check if logged in user has profile data
           if(Object.keys(profile).length>0){
            dashboardContent = (
                <div>
                <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`} >{user.name}</Link></p>    
                <ProfileActions/>
                <Experience experience={profile.experience}/>
                <Education education ={profile.education}/>
                <div styled={{marginBottom:'60px'}}/>
                <button onClick={this.onDelete} className="btn btn-danger">Delete my account</button>
                </div>            
           )
           }
           else{
            dashboardContent=(
                <div>
                <p className="lead text-muted">Welcome {user.name}</p>
                <p>You have not yet setup profile , please add some info</p>
                <Link to ='/create-profile' className="btn btn-lg btn-info">
                Create Profile  
                </Link>
                </div>
            )
           }
        }
        return (
            <div className="dashboard">
             <div className="container">
                <div className="row">
                    <div className="col-md-12">
                    <h1 className="display-4"> Dashboard </h1>
                    {dashboardContent}
                    </div>
                </div>
            </div>
            </div>
        )
    }
   
    
}
Dashboard.propTypes={
    getCurrentProfile:PropTypes.func.isRequired,
    onDeleteAccount:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    profile:state.profile,
    auth:state.auth
})
// const mapDispatchToProps=(dispatch)=>{
//     return {
//         onDeleteAccount:()=>{
//             dispatch(this.deleteProfile())
//         }
//     }
// }
export default connect(mapStateToProps,{getCurrentProfile,deleteProfile})(Dashboard);