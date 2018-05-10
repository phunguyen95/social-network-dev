import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {deleteComment} from '../../actions/post';
import {Link} from 'react-router-dom';
class CommentItem extends Component {
  onDeleteClick=(postId,commentId)=>{
    this.props.deleteComment(postId,commentId);
  }
    render() {
        const {comment,postId,auth} = this.props
        console.log(comment);
        return (
            <div className="card card-body mb-3">
            <div className="row">
              <div className="col-md-2">
              <Link to={`/profile/user/${comment.user}`}>
              <img className="rounded-circle d-none d-md-block" src={comment.avatar} alt="" />
              </Link>
                <br />
                <p className="text-center">{comment.name}</p>
                
              </div>
              <div className="col-md-10">
                <p className="lead">{comment.text}</p>
                {comment.user===auth.user.id ? <button type="button" onClick={()=>this.onDeleteClick(postId,comment._id)} className="btn btn-danger mr-1">
                <i className="fas fa-times" />
              </button> :null }
              </div>
             
            </div>
          </div>
        )
    }
}
CommentItem.propTypes={
    auth:PropTypes.object.isRequired,
    comment:PropTypes.object.isRequired,
    postId:PropTypes.string.isRequired,
    deleteComment:PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
auth:state.auth
})

export default connect(mapStateToProps,{deleteComment})(CommentItem);