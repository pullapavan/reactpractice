import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { logout } from '../actions/counterActions';

class CustomHeader extends React.Component {
    render() {        
        return (
            <Navbar bg="dark" variant="dark">
                {this.props.loggedIn === "Y" &&
                    <Nav className="mr-auto">                        
                        <Nav.Link href="/addtask">Task Manager</Nav.Link>
                        <Nav.Link href="/counterstore">Counter-store</Nav.Link>
                        <Nav.Link href="/test">Testing</Nav.Link>
                        <Nav.Link href="/http">AXIOS Library</Nav.Link>
                        <Nav.Link href="/weather">Nested Routing</Nav.Link>
                        <Nav.Link href="/logout" onClick={this.props.logout}>Logout</Nav.Link> 
                    </Nav>
                }
                {this.props.loggedIn !== "Y" &&
                    <Nav className="mr-auto">
                        <Nav.Link href="/register">SignUp</Nav.Link>                  

                    </Nav>
                }
            </Navbar>
        )
    }
}
const mapStateToProps = (state) => {
    const { loggedIn } = state.loginReducer;
    return {
        loggedIn
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logout }, dispatch)
  }
export default connect(mapStateToProps,mapDispatchToProps)(CustomHeader);