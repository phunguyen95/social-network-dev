import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {deleteEducation} from '../../actions/profile';
class Education extends Component {
onDelete=(id)=>{
    this.props.deleteEducation(id);
}
    render() {
        const education = this.props.education.map(item=>(
            <tr key={item._id}>
                <td>{item.school}</td>
                <td>{item.degree}</td>
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
                            <th>School</th>
                            <th>Degree</th>
                            <th>Years</th>
                        </tr>
                        {education}
                    </thead>
                </table>
            </div>
        )
    }
}
export default connect(null,{deleteEducation})(withRouter(Education));