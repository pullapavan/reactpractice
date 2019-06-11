import React from 'react';
import socketIOClient from 'socket.io-client';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

class TicTacToe extends React.Component {
    constructor(props) {
        super(props)
        this.state = { playerA: "", playerB: "", enteredGame: false, name: "", canJoin: false, server: 'http://localhost:4000', moves: [] };

    }
    componentDidMount() {
        console.log("componentDidMount : TicTacToe");
    }
    handleChange = (event) => {
        this.setState({ name: event.target.value.replace(/\s/g, '') }, () => {
            this.setState({ canJoin: this.state.name ? true : false })
        });
    }
    connectToServer = () => {
        const socket = socketIOClient(this.state.server);
        socket.on('playerMove', (response) => {
            console.log(`playerMove ${response}`)
        });
        socket.on('playerAdded', (response) => {
            console.log(`playerAdded ${response}`)
        });
    }
    sendMoveToServer = (move) => {
        console.log(move);
    }
    sendGameFinishToServer = () => {

    }
    render() {
        const { moves } = this.state;
        const joinGame = (           
            <Form>
                <Form.Row>
                    <Form.Group>
                        <Form.Label>Enter Display name</Form.Label>
                        <Form.Control type="text" required value={this.state.name} onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                </Form.Row>
                <Button type="button" disabled={!this.state.canJoin} onClick={this.connectToServer}>Join Game</Button>
            </Form>           
        )
        const startGame = (
            <table className="table">
                <tr>
                    <td><div>{moves[0][0]}</div></td>
                    <td><div>{moves[0][1]}</div></td>
                    <td><div>{moves[0][2]}</div></td>
                </tr>
                <tr>
                    <td>{moves[1][0]}</td>
                    <td>{moves[1][1]}</td>
                    <td>{moves[1][2]}</td>
                </tr>
                <tr>
                    <td>{moves[2][0]}</td>
                    <td>{moves[2][1]}</td>
                    <td>{moves[2][2]}</td>
                </tr>
            </table>
        )


        return (
            <div>
                {!this.state.enteredGame && joinGame}
                {this.state.enteredGame && startGame}
            </div>
        )
    }
}
export default TicTacToe;