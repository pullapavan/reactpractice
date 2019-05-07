import React from 'react';
import { ListGroup } from 'react-bootstrap';
import TaskItem from './taskitem';
import Messages from '../alerts/messages';
import { connect } from 'react-redux';


class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }    
    render() {
        const { tasks } = this.props;
        if (tasks.length === 0) {
            return <Messages variant="primary" description="No Tasks found to Display"></Messages>
        }
        return (
            <ListGroup className="width100">
                {
                    tasks.map((task, index) => {
                        return <TaskItem index={index} taskName={task} key={index}></TaskItem>
                    })
                }
            </ListGroup>
        )
    }
}
const mapStateToProps = (state) => {    
    return {
        tasks: state.taskReducer
    }
}

export default connect(mapStateToProps)(TaskList)