import React, { Component } from 'react'
import {connect} from 'react-redux';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';
import {getPosts} from '../../actions/post'
import PropTypes from 'prop-types';
import PostsFeed from './PostsFeed'
 class Posts extends Component {
     componentDidMount(){
         this.props.getPosts();
     }

    render() {
        const {posts,loading} = this.props.post;
        let postContent;
        if(posts===null ||loading){
            postContent = <Spinner/>
        }
        else{
            if(posts.length>0){
                postContent = <PostsFeed posts={posts}/>
                
            }
        }
        return (
            <div className="feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <PostForm/>
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Posts.propTypes={
    post:PropTypes.object.isRequired,
    getPosts:PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
    post:state.post
})

export default  connect(mapStateToProps,{getPosts})(Posts);