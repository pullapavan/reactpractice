import React from 'react';
import { connect } from 'react-redux';
import { ta, tb, addToMainList, removeFromList, removeFromTa, removeFromTb } from '../actions/counterActions';
import { bindActionCreators } from 'redux';
import { Row, Button, Col, CardGroup, Card } from 'react-bootstrap';
import volleyball from '../images/volleyball.png';
import commondp from '../images/commondp.png';
import Preview from '../createteam/preview';
// import backgroung from '../images/backgroundImage.png';
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
        const { ppprops } = this.props;
        return (
            <div>
                <div style={{color:'#990000'}}><h2 className="text-center">Pick Players of your choice</h2></div><br/>
                <Row style={{ backgroundImage: volleyball }}>
                    <Col xs={6}>
                        <ul className="list-unstyled">
                            {ppprops && ppprops.map((player, index) => {
                                return <li style={{
                                    float: "left"
                                }}><Card style={{ width: '15rem' }}>
                                        <Card.Img variant="top" className="commondp" src={commondp} />
                                        <Card.Body>
                                            <Card.Title className="text-center">{player}</Card.Title>
                                            <Card.Text>
                                                <Button variant="info" className="float-left" onClick={() => { this.props.removeFromList(player); this.props.ta(player) }}>Team-A</Button>
                                                <Button variant="warning" className="float-right" onClick={() => { this.props.removeFromList(player); this.props.tb(player) }}>Team-B</Button>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card></li>
                            })}
                        </ul>
                        {ppprops.length === 0 &&
                            <Button variant="info" className="float-left" >Save Team</Button>}
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <Preview teamList={this.props.aprops} addToList={this.props.addToMainList} teamName="A" remove={this.props.removeFromTa} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Preview teamList={this.props.bprops} addToList={this.props.addToMainList} teamName="B" remove={this.props.removeFromTb} />
                            </Col>
                        </Row>
                    </Col>
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
        ppprops: state.playerReducer.processingPlayers

    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ ta, tb, addToMainList, removeFromList, removeFromTa, removeFromTb }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Teams);