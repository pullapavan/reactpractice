import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../actions/counterActions';
class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="row">
        <div className="col">
        <Button variant="primary" type="button" onClick={this.props.login}>Login</Button><br /><br />
        </div>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch)=>{
  return bindActionCreators({ logout }, dispatch)
}
export default connect(null,mapDispatchToProps)(Logout);