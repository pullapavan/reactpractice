import React from 'react';
import { connect } from 'react-redux';
import { ta, tb, addToMainList, removeFromList,removeFromTa, removeFromTb } from '../actions/counterActions';
import { bindActionCreators } from 'redux';
import { Row, Button, Col } from 'react-bootstrap';
import volleyball from '../images/volleyball.png'
class Teams extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.initiateObjects();
    }

    initiateObjects = () => {

    }

    getInitialState = () => {
        return {
            players: this.props.players,
            playerObjects: []
        }
    }

    ta = () => {
        this.props.ta("name");
    }

    render() {
        return (
                <div>
                <Row className="text-center">
                    <h3>SELECT YOUR TEAMS</h3>
                    main players --- {this.props.players}<br/>
                    processing players --- {this.props.ppprops}<br/>
                    ta players -- {this.props.aprops}<br/>
                    tb players -- {this.props.bprops}<br/>
                    <div>
                    <Button variant="success" type="button" onClick={()=>this.props.ta("ta")}>Add to ta</Button><br/>
                    <Button variant="success" type="button" onClick={()=>this.props.tb("tb")}>Add to tb</Button><br/>
                    <Button variant="success" type="button" onClick={()=>this.props.removeFromList("tb")}>Remove from processing</Button><br/>
                    <Button variant="success" type="button" onClick={()=>this.props.addToMainList("tb")}>add to processing</Button><br/>
                    <Button variant="success" type="button" onClick={()=>this.props.removeFromTa("ta")}>Remove from TA</Button><br/>
                    <Button variant="success" type="button" onClick={()=>this.props.removeFromTb("tb")}>Remove from TB</Button><br/>
                    </div>
                </Row>
                
                <Row>
                    <Col>A</Col>
                    <Col><img src={volleyball}/></Col>
                    <Col>B</Col>
                </Row>
                </div>
            
        )
    }
}
const mapStateToProps = (state) => {
    return {
        players: state.playerReducer.players,
        aprops: state.playerReducer.ta,
        bprops: state.playerReducer.tb,
        ppprops:state.playerReducer.processingPlayers

    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ ta, tb, addToMainList, removeFromList,removeFromTa, removeFromTb }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Teams);