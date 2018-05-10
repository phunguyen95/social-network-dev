import React, { Component } from 'react'
import {getPost} from '../../actions/post';
import {connect} from 'react-redux';
import Spinner from '../common/Spinner';
import {Link} from 'react-router-dom';
import PostItem from './PostItem';
import CommentForm from './CommentForm';
import CommentFeeds from './CommentFeeds';
class Post extends Component {
    state={
        post:{}
    }
    componentDidMount(){
        this.props.getPost(this.props.match.params.id);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.post){
            this.setState({
                post:nextProps.post
            })
        }
    }
    showPostContent=(post)=>{
        let result;
        if(Object.keys(post).length===0 ||post.loading){
           result= <Spinner/>
        }
        else{
            if(post.post){
                console.log(post.post.comments);
                result =(
                    <div>
                    <PostItem post={post.post} showActions={false} />
                    <CommentForm postId={post.post._id}/>
                    <CommentFeeds comments={post.post.comments} postId={post.post._id}/>
                    </div>
                )
            }
        }
        return result;
    }
    render() {
        const {post} = this.state;
        return (
            <div className="post">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Link className="btn btn-light mb-3" to="/feeds">
                        Back to Feeds
                        </Link>
                        {this.showPostContent(post)}
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    post:state.post
})

export default  connect(mapStateToProps,{getPost})(Post);