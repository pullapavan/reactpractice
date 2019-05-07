import React from 'react';
import { Alert } from 'react-bootstrap';

function Message(props) {
    return (
        <Alert variant={ props.variant}>{props.description}</Alert>
    )

}
export default Message;