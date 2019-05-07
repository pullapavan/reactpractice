import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
// import { store } from '../index';
// import { reverseCounterReducer } from '../reducers/counterReducer';
import { increment, decrement, refresh } from '../actions/counterActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {
        // store.replaceReducer(reverseCounterReducer);
    }
    
    render() {
        const { count } = this.props;
        
        return (
            <div>
                <div className="text-center"><h5>Counter example using Redux libriary</h5></div><br />
                <Row className="text-center">
                    <Col>
                        <Button variant="primary" className="btn btn-sm" onClick={this.props.increment}>+</Button>
                    </Col>
                    <Col>{count}</Col>
                    <Col>
                        <Button variant="primary" className="btn btn-sm" onClick={this.props.decrement}>-</Button>
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col><Button variant="primary" className="btn btn-sm" onClick={this.props.refresh}>Refresh</Button></Col>
                </Row>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        count: state.counterReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ increment, decrement, refresh }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Counter);