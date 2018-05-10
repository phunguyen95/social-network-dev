import * as TYPES from '../actions/types';
import {isEmpty} from '../utils/isEmpty'
const initialState={
    isAuthenticated:false,
    user:{}
}

const authReducer=(state=initialState,action)=>{
    switch(action.type){
        case TYPES.REGISTER_USER:
        state=action.payload;
        return state;
        case TYPES.LOGIN_USER:
        return{
            ...state,
            isAuthenticated:!isEmpty(action.payload),
            user:action.payload
        };
        case 'GET_ERRORS':
        return {
            ...state,
            errors:action.payload
        };
        case TYPES.DELETE_USER:
        return {
            ...state,
            isAuthenticated:!isEmpty(action.payload),
            user:action.payload
        }
        default:
        return state;
    }
}
export default authReducer