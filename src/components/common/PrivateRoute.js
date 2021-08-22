import React from 'react';
import { Route, Redirect} from "react-router-dom";
import { connect} from "react-redux";
import Container from "../loading";

const PrivateRoute =  ({ component: Component, auth, ...rest }) => {
    return (
        <div>
            <Route
                {...rest}
                render={ props => {
                    if(auth.isLoading){
                        return <Container/>
                    }else if(auth.isAuthenticated){
                        return <Component {...props} />
                    }else {
                        return <Redirect to="/" />
                    }
                }}
            />
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})


export default connect(mapStateToProps)(PrivateRoute);