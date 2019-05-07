import React from 'react';
import { Button, Form, Card} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login,logout } from '../actions/counterActions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    };
  }
  render() {
    let content = "";
    const { userName, password } = this.state;

    content = <h4>Welcome you are LoggedIn</h4>

    return (
      <div className="row">
        <div className="col">
          {this.props.loggedIn !== "Y" &&
            <Form validate="false">
              <Form.Row>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control onChange={e => this.setState({ userName: e.target.value })} className={!userName && 'has-error'} type="text" required value={userName} />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control onChange={e => this.setState({ password: e.target.value })} className={!password && 'has-error'} type="password" required value={password} />
                </Form.Group>
              </Form.Row>
              <Button variant="primary" type="button" onClick={this.props.login}>Login</Button>
            </Form>
          }
          {this.props.loggedIn === "Y" && <Card>
          <Card.Header>Ace2Three</Card.Header>
            <Card.Body>
              <Card.Title></Card.Title>
              <Card.Text>
                Welcome You are loggedIn
              </Card.Text>
              
            </Card.Body>
          </Card>}
        </div>
      </div>
    )


  }
}
const mapStateToProps = (state) => {
  return {
    loggedIn: state.loginReducer.loggedIn
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ login,logout }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);