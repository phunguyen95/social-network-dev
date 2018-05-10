import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGitHub from './ProfileGitHub';
import Spinner from '../common/Spinner';
import {getProfileByHandle} from '../../actions/profile';
class ProfileHandle extends Component {
    componentDidMount(){
        if(this.props.match.params.handle){
            this.props.getProfileByHandle(this.props.match.params.handle);
        }
    }
    render() {
        const {profile,loading} = this.props.profile;
        let profileContent;
        if(profile===null||loading){
            profileContent= <Spinner/>
        }
        else{
            if(profile){
                profileContent=(
                    <div key={profile._id}>
                        <div className="row">
                            <div className="col-md-6">
                                <Link to="/profiles" className="btn btn-light mb-3 float-left">
                                Back to Profiles
                                </Link>
                            </div>
                            <div className="col-md-6"/>
                        </div>
                        <ProfileHeader profile={profile}/>
                        <ProfileAbout profile={profile}/>
                        <ProfileCreds profile={profile}/>
                        {profile.gitHubUserName && <ProfileGitHub username={profile.gitHubUserName}/>}
                    </div>
                )
            }
            
        }
        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">{profileContent}</div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    profile:state.profile
})

export default connect(mapStateToProps,{getProfileByHandle})(ProfileHandle);