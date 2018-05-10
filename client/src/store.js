import {createStore,applyMiddleware,compose} from 'redux'
import rootReducer from './reducer/index';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  });
const initialState={}
const middleware=[thunk];
const store  = createStore(rootReducer,
    initialState,
    composeEnhancers(
    applyMiddleware(...middleware)))
export default store;