import React, { Component } from 'react';
import { Container} from 'react-bootstrap';
import './App.css';
import AddTask from './taskmanager/addtask';
import Counter from './counter-store/counter'
import CustomHeader from './header/header';
import { Route, Switch} from 'react-router-dom';
import Login from './login/login';
import Testing from './testing/testing';
import NotFound from './error';
import { connect } from 'react-redux';
import { authenticate } from './Hoc/aunthenticate';
import FetchJson from './httpclient/httpdemo';
import weather from './nestedrouting/weather';
import Teams from './createteam/createteam';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    //Access local Storage to check login Attribute is there or not.
  }
  render() {
    
    return (
      <div>
        <CustomHeader /><br />
        <Container>
          {/* <Row >
            <Col> */}
              <Switch>
                <Route exact path='/' component={authenticate(AddTask)} />
                <Route path='/addtask' component={authenticate(AddTask)} />
                <Route path='/counterstore' component={authenticate(Counter)} />
                <Route path='/test' component={authenticate(Testing)} />
                <Route path='/http' component={authenticate(FetchJson)}/>
                <Route path='/weather/:day?' component={authenticate(weather)}/>
                <Route path='/createteam' component={Teams}/>
                <Route path='/login' component={Login} />
                <Route path ='/logout' component={Login}/>
                <Route path='**' component={NotFound} />
              </Switch>
            {/* </Col>
          </Row> */}
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { loggedIn } = state.loginReducer;
  return {
    loggedIn
  }
}
export default connect(mapStateToProps)(App);