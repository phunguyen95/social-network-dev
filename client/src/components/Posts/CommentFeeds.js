import React, { Component } from 'react'
import CommentItem from './CommentItem';
export default class CommentFeed extends Component {
    render() {
        const {comments,postId} = this.props;
        return (
            <div className="container">
           {comments?comments.map(comment=><CommentItem key={comment._id} comment={comment} postId={postId}/>):null}
            </div>
        )
    }
}
