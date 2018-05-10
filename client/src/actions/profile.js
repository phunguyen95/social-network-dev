import {GET_PROFILE,PROFILE_LOADING,PROFILE_NOT_FOUND,CLEAR_CURRENT_PROFILE,GET_PROFILES,GET_ERRORS, LOGIN_USER,DELETE_USER,ADD_EXPERIENCE} from'./types';
import axios from 'axios';

 //get current profile;
 export const getCurrentProfile=()=>{
     return dispatch=>{
        dispatch(setProfileLoading());
        axios.get('/api/profile')
        .then(res=>{
            console.log(res);
            dispatch({
                type:GET_PROFILE,
                payload:res.data
            })
        })
        .catch(err=>{
            dispatch({
                type:GET_PROFILE,
                payload:{}
            })
        })
    }
 }
 export const setProfileLoading=()=>{
     return{
         type:PROFILE_LOADING,
     }
 }
 export const clearProfile=()=>{
    return{
        type:CLEAR_CURRENT_PROFILE,
    }
}
export const createProfile = (profileData, history) => dispatch => {
    axios
      .post('/api/profile', profileData)
      .then(res => history.push('/dashboard'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  export const deleteProfile=()=>{
      return dispatch =>{
          if(window.confirm('Are you sure,this CAN NOT be undone')){
              axios.delete('/api/profile').then(res=>{
                  dispatch({
                      type:DELETE_USER,
                      payload:{}
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
  }
  export const addExperience=(data,history)=>{
    return dispatch =>{
        axios.post('/api/profile/experience',data).then(res=>{
            history.push('/dashboard');
        })
        .catch(err=>{
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        })
    }
  }
  export const addEducation=(data,history)=>{
      return dispatch=>{
          axios.post('/api/profile/education',data).then(res=>{
              history.push('/dashboard');
          })
          .catch(err=>{
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        })
      }
  }
  export const deleteExperience = (id)=>{
      return dispatch=>{
          axios.post(`/api/profile/experience/${id}`).then(res=>{
            dispatch({
                type:GET_PROFILE,
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
  export const deleteEducation =(id)=>{
    return dispatch=>{
        axios.post(`/api/profile/education/${id}`).then(res=>{
            dispatch({
                type:GET_PROFILE,
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
  export const getProfiles=()=>{
      return dispatch=>{
          axios.get('/api/profile/all').then(res=>{
              dispatch({
                  type:GET_PROFILES,
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
  export const getProfileByHandle = (handle)=>{
    return dispatch=>{
        dispatch(setProfileLoading());        
        axios.get(`/api/profile/handle/${handle}`).then(res=>{
            dispatch({  
                type:GET_PROFILE,
                payload:res.data
            })
        })
        .catch(err=>{
            dispatch({
                type:GET_PROFILE,
                payload:{}
            })
        })
    }
  }