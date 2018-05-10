import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {deleteExperience} from '../../actions/profile';
class Experience extends Component {
onDelete=(id)=>{
    this.props.deleteExperience(id);
}
    render() {
        const experience = this.props.experience.map(item=>(
            <tr key={item._id}>
                <td>{item.company}</td>
                <td>{item.title}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{item.from}</Moment> - {item.to? <Moment format="YYYY/MM/DD">{item.to}</Moment>:'Now'}
                </td>
                <td><button onClick={()=>this.onDelete(item._id)}className="btn btn-danger">Delete</button></td>
            </tr>
        ))
        return (
            <div>
                <h4 className="mb-4">Experience Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Years</th>
                        </tr>
                        {experience}
                    </thead>
                </table>
            </div>
        )
    }
}
export default connect(null,{deleteExperience})(withRouter(Experience));