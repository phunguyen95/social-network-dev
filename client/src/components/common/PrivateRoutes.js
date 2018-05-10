import React from 'react'
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
function PrivateRoutes({component:Component,auth,...rest}) {
    return (
        <Route render={props=>auth.isAuthenticated===true?(

            <Component {...props} />
        ):(
            <Redirect to='/login'/>
        )} {...rest} ></Route>
    )
}
const mapStateToProps = (state) => ({
    auth:state.auth
})

export default connect(mapStateToProps,null)(PrivateRoutes)
