import React from 'react';
import { connect } from 'react-redux';
import Login from '../login/login';

export function authenticate(Component) {
    class AuthenticateComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
            console.log(this.props)
        }
        render() {
            const content = this.props.loggedIn !== "Y" ? <Login /> : <Component child={this.props}/>
            return (
                 content
            )
        }
    }
    const mapStateToProps = (state) => {
        const { loggedIn } = state.loginReducer;
        return {
            loggedIn
        }
    }
    return connect(mapStateToProps, null)(AuthenticateComponent);    
}