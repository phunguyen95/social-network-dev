import {REGISTER_USER,LOGIN_USER, GET_ERRORS} from './types';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
export const onRequestRegister=(user,history)=>{
    return dispatch =>{
        return axios.post('/api/users/register',user).then(res=>{
            console.log(res);
            dispatch(registerUser(res.data))
            history.push('/login');
            })
            .catch(err=>{
                return dispatch({
                    type:GET_ERRORS,
                    payload:err.response.data
                })
        });
    }
};
export const registerUser =(user)=>{
   return{
       type:REGISTER_USER,
       payload:user,
   }
}
export const onRequestLogin=(user,history)=>{
    return dispatch=>{
        return axios.post('/api/users/login',user).then(res=>{
                const {token} = res.data;
                //set token to localstorage
                localStorage.setItem('jwtToken',token);
                //set token to auth header
                setAuthToken(token);
                //decode token to get user data
               const decoded= jwt_decode(token);
               //set current user 
                dispatch(loginUser(decoded))
        })
        .catch(err=>{
            return dispatch({
                type:GET_ERRORS,
                payload:err.response.data,
            })
        })
    }
}
//set login user 
export const loginUser = (decoded)=>{
    return{
        type:LOGIN_USER,
        payload:decoded
    }
}

export const onRequestLogout = ()=>{
    //remove token from local storage
    localStorage.removeItem('jwtToken');
    //remove auth header
    setAuthToken(false);
    //set current user to empty which will set authenticated to false
    return dispatch =>{
        dispatch(loginUser({}));            
    }
}
