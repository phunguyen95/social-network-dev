import React, { Component } from 'react'
import {isEmpty} from '../../utils/isEmpty'
export default class ProfileAbout extends Component {
    render() {
        const {profile} =this.props;
        return (
            <div className="row">
            <div className="col-md-12">
              <div className="card card-body bg-light mb-3">
                <h3 className="text-center text-info">{profile.user.name}'s Bio</h3>
                <p className="lead">
                {isEmpty(profile.bio) ? null :<span>{profile.bio}</span>}
                </p>
                <hr />
                <h3 className="text-center text-info">Skill Set</h3>
                <div className="row">

                  <div className="d-flex flex-wrap justify-content-center align-items-center">
                  { isEmpty(profile.skills) ?'No skills to display' :profile.skills.map((skill,index)=>(
                    <div key={index} className="p-3">
                      <i className="fa fa-check"></i>
                       {skill}
                       </div>
                  ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        )
    }
}
