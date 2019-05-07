import React from 'react';
import { ListGroup } from 'react-bootstrap';
import  { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { removeTask } from '../actions/counterActions';
import { bindActionCreators } from 'redux';

class TaskItem extends React.Component {
    constructor(props){
        super(props);
        this.state={};
    }
    remove = (event)=>{        
        this.props.removeTask(this.props.index);
    }
    render() {

        return (
            <ListGroup.Item key={this.props.index}>
            {this.props.taskName}
            <Button variant="danger" key={this.props.index} className="floatRight btn btn-sm" onClick={this.remove}>X</Button>
            </ListGroup.Item>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ removeTask }, dispatch)
  }
export default connect(null, mapDispatchToProps)(TaskItem);