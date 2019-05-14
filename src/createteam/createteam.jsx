import React from 'react';
import { connect } from 'react-redux';
import { ta, tb, addToMainList, removeFromList, removeFromTa, removeFromTb } from '../actions/counterActions';
import { bindActionCreators } from 'redux';
import { Row, Button, Col, CardGroup, Card, Modal } from 'react-bootstrap';
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
        return { showNewPlayer: false, newName: '' };
    }

    getInitialState = () => {
        return {
            players: this.props.players,
            playerObjects: []
        }
    }

    openNewPlayer = () => {
        this.setState({ showNewPlayer: true });
    }
    populateName = (event) => {
        this.setState({ newName: event.target.value })
    }
    addNewPlayer = () => {
        const { newName } = this.state;
        if (newName && !this.props.ppprops.includes(newName)) {
            this.props.addToMainList(this.state.newName);
            this.setState({ newName: '' })
        }
    }
    addToTeamA = (player) => {        
        if (this.props.ta.length < 6) {
            this.props.ta(player);
            this.props.removeFromList(player)
        }
    }
    addToTeamB = (player) => {
        if (this.props.bprops.length < 6) {
            this.props.tb(player);
            this.props.removeFromList(player)
        }
    }

    render() {
        const { ppprops } = this.props;
        const { showNewPlayer } = this.state;
        return (
            <div>
                <Row style={{ backgroundImage: volleyball }}>
                    <Col xs={6}>
                        <div style={{ color: '#990000' }}><h2 className="text-center">Pick Players of your choice</h2></div><br />
                        <div style={{ paddingBottom: '10px' }}><Button variant="success" onClick={this.openNewPlayer}>Add New Player</Button></div>                        
                        <ul className="list-unstyled">                            
                            {ppprops && ppprops.map((player, index) => {
                                return <li key={index} style={{
                                    float: "left"
                                }}><Card style={{ width: '15rem' }}>
                                        <Card.Img variant="top" className="commondp" src={commondp} />
                                        <Card.Body>
                                            <Card.Title className="text-center">{player}</Card.Title>
                                            <Card.Text>
                                                <Button variant="info" className="float-left" onClick={() => this.addToTeamA(player)}>Team-A</Button>
                                                <Button variant="warning" className="float-right" onClick={() => this.addToTeamB(player)}>Team-B</Button>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card></li>
                            })}
                        </ul>                                                 
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
                <Modal show={showNewPlayer} onHide={() => this.setState({ showNewPlayer: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Player</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label><b>Player Name</b></label>
                        <input type="text" value={this.state.newName} onChange={this.populateName}
                            name="playername" className="form-control" />
                    </Modal.Body>                                            
                    <Button variant="primary" onClick={this.addNewPlayer}>
                        Add
                    </Button>                    
                </Modal>
            </div>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        players: state.playerReducer.players,
        aprops: state.playerReducer.ta,
        bprops: state.playerReducer.tb,
        ppprops: state.playerReducer.processingPlayers,
        status: state.playerReducer.status

    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ ta, tb, addToMainList, removeFromList, removeFromTa, removeFromTb }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Teams);