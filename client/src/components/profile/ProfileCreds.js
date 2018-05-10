import React, { Component } from 'react'
import Moment from 'react-moment';
import {isEmpty} from '../../utils/isEmpty'
export default class ProfileCreds extends Component {
    render() {
        const {profile} = this.props;
        return (
            <div className="row">
            <div className="col-md-6">
              <h3 className="text-center text-info">Experience</h3>
              <ul className="list-group">
              {profile.experience.map((exp,index)=>(
                <li key={index} className="list-group-item">
                <h4>{exp.company}</h4>
                <p>{<Moment format="YYYY/MM/DD">{exp.from}</Moment>} - {exp.to ? <Moment format="YYYY/MM/DD">{exp.to}</Moment> :'Current'}</p>
                <p>
                  <strong>Position:</strong> {exp.title}
                </p>
                <p>
                  <strong>Description:</strong>
                  {isEmpty(exp.description) ? null : exp.description}
              </p>
              </li>
              ))
            }
               
              </ul>
            </div>
            <div className="col-md-6">
              <h3 className="text-center text-info">Education</h3>
              <ul className="list-group">
              {profile.education.map((edu,index)=>(
                <li key={index} className="list-group-item">
                <h4>{edu.school} </h4>
                <p>{<Moment format="YYYY/MM/DD">{edu.from}</Moment>} - {edu.to ? <Moment format="YYYY/MM/DD">{edu.to}</Moment> :'Current'}</p>                <p>
                  <strong>Degree: </strong>{edu.degree}</p>
                <p>
                  <strong>Field Of Study: </strong>{edu.fieldOfStudy}</p>
                <p>
                    <strong>Description:</strong>
                    {isEmpty(edu.description) ? null : edu.description}                    
                    </p>
              </li>
              ))}
              
              </ul>
            </div>
          </div>
        )
    }
}
