import React from 'react';
import { Form, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import TaskList from './tasklist';
// import Messages from '../alerts/messages';
import { connect } from 'react-redux';
import { addTask } from '../actions/counterActions';
import { bindActionCreators } from 'redux'

class AddTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }
    getInitialState = () => (
        {
            data: '',
            message: '',
            isValid: false,            
            success: false
        }
    )
    addTask = () => {
        if (this.state.data === '') {
            this.setState({
                isValid: false,
                message: "Task Cannot be Empty",
                success: false
            })
            return;
        }
        if (this.props.tasks.indexOf(this.state.data) > -1) {
            this.setState({
                isValid: true,
                message: "Duplicate task cannot be Added",
                success: true
            })
            return;
        }
        this.props.addTask(this.state.data);
        this.setState({            
            data: '',
            success: true,
            message: "Task Added Successfully"
        })
        return;
    }
    handleChange = (event) => {
        this.setState({
            data: event.target.value.replace(/\s/g, ''),
            isValid: true,
            success: false
        })
    }    
    render() {
        const {  message, isValid, data } = this.state;
        const popover = (
            <Popover title="Add Tasks to the List">
                Enter your desired and add it to the todo list.
             </Popover>
        )
        return (
            <div>
                <div className="text-center">
                    <h4>Task Manager</h4>
                </div>
                
                <form>
                    <Form.Group controlId="taskName">
                        <Form.Label>Add Task</Form.Label>
                        <Form.Control size="lg" type="text" name="task" value={data} onChange={this.handleChange} />
                        <span className="eror-block">{
                            !isValid && message
                        }</span>
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={this.addTask}>Add</Button><br /><br />
                    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                        <Button variant="success" type="button">click to know more</Button>
                    </OverlayTrigger>
                </form>
                <hr />
                <TaskList></TaskList>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        tasks: state.taskReducer
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addTask }, dispatch)
  }

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
