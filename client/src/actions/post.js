import axios from 'axios';
import {ADD_POST,GET_ERRORS,GET_POSTS,POST_LOADING,DELETE_POST,LIKE_POST,GET_POST,DELETE_COMMENT} from './types';

//add post
export const addPost=(postData)=>{
    console.log(postData);
    return dispatch=>{
        axios.post('/api/posts',postData).then((res)=>{
            console.log(res.data);
            dispatch({
                type:ADD_POST,
                payload:res.data
            })
        })
        .catch(err=>{
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        })
    }
}
export const getPosts=()=>{

    return dispatch =>{
        dispatch(setPostLoading());
        axios.get('/api/posts').then((res)=>{
            dispatch({
                type:GET_POSTS,
                payload:res.data
            })
        })
        .catch(err=>{
            dispatch({
                type:GET_POSTS,
                payload:null
            })
        })
    }
}
export const    setPostLoading=()=>{
    return{
        type:POST_LOADING,
    }
}
export const deletePost=(id)=>{
    return dispatch=>{
        axios.delete(`/api/posts/${id}`).then((res)=>{
            dispatch({
                type:DELETE_POST,
                payload:id,
            })
        })
        .catch(err=>{
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        })
    }
}
export const likePost = (id)=>{
    return dispatch =>{
        axios.post(`/api/posts/like/${id}`).then((res)=>{
            dispatch(getPosts())
        })
        .catch(err=>{
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
                
            })
        })
    }
   
}
export const unLikePost = (id)=>{
    return dispatch =>{
        axios.post(`/api/posts/unlike/${id}`).then((res)=>{
            dispatch(getPosts())
        })
        .catch(err=>{
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        })
    }
   
}
export const getPost=(id)=>{
    
        return dispatch =>{
            dispatch(setPostLoading());
            axios.get(`/api/posts/${id}`).then((res)=>{
                dispatch({
                    type:GET_POST,
                    payload:res.data
                })
            })
            .catch(err=>{
                dispatch({
                    type:GET_POST,
                    payload:null
                })
            })
        }
    }
    export const addComment=((postId,comment)=>{
        console.log(comment);
        return dispatch=>{
            axios.post(`/api/posts/comment/${postId}`,comment).then((res)=>{
                dispatch({
                    type:GET_POST,
                    payload:res.data
                })
            })
            .catch(err=>{
                dispatch({
                    type:GET_ERRORS,
                    payload:err.response.data
                })
            })
        }
    })
    export const deleteComment =(postId,commentId)=>{
        return dispatch=>{
            axios.delete(`/api/posts/comment/${postId}/${commentId}`)
            .then(res=>{
                dispatch({
                    type:GET_POST,
                    payload:res.data
                })
            })
            .catch(err=>{
                dispatch({
                    type:GET_ERRORS,
                    payload:err.response.data
                })
            })
        }
    }
