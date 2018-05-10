import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import PostItem from './PostItem';
export default class PostsFeed extends Component {
    showPostContent= (posts)=>{
        let result;
        result = posts.map((post,item)=>{
           return <PostItem  key={item} post={post} />
        })
        return result;
    }
    render() {
        const {posts} = this.props;
        console.log(this.props)
        
        return (
            <div className="posts">
            {this.showPostContent(posts)}
          </div>    
        )
    }
}
