import React from 'react'
import socketIOClient from 'socket.io-client'
import { playerReducer } from '../reducers/counterReducer';
import LobbyPlayers from './lobbyplayers';
import { ListGroup, Button } from 'react-bootstrap'

class TTT extends React.Component {
  constructor(props) {
    super();
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    return {
      demo: 'demo',
      clientName: '',
      isValidClientName: false,
      clientId: '',
      enteredLobby: false,
      enteredRoom: false,
      roomName: '',
      opponentClientName: '',
      opponentClientId: '',
      socket: {},
      serverUrl: 'http://localhost:3000/',
      lobbyPlayers: {}
    }
  }
  clientNameChange = (event) => {
    this.setState({
      clientName: event.target.value.trim(),
      isValidClientName: event.target.value.trim() ? true : false
    })

  }
  enterGameLobby = () => {
    let socket = socketIOClient(this.state.serverUrl);
    console.log(socket)
    this.setState({ socket })
    this.registerForServerSentEvent(socket);
  }
  registerForServerSentEvent = (socket) => {
    socket.on('server-requires-client-name', (data) => {
      socket.emit('client-name', { clientName: this.state.clientName });
    })
    socket.on('client-name-ack', (received) => {
      console.log("Ack received for client name %s", received)
      this.setState({ enteredLobby: received })
    });
    socket.on('lobby-players-list', (data) => {
      this.setState({ lobbyPlayers: data })
    });
  }
  sendInvite = (socketId)=>{
    // const {socket} = this.state;
    // socket.emit('send-invite',{
    //     socketId
    // });
  }

  render() {
    const { lobbyPlayers } = this.state;
    return (
      <>
        <div className="container text-center">
          {!this.state.enteredLobby &&
            <form className="form-inline">
              <div className="form-group">
                <input type="text" value={this.state.clientName} className="form-control" onChange={this.clientNameChange} placeholder="Display name" name="clientName" />
              </div>
              <button type="button" onClick={this.enterGameLobby} className="btn btn-default" disabled={!this.state.isValidClientName}>Enter Game lobby</button>
            </form>
          }

          {this.state.enteredLobby &&
            <>
              <h3>You have entered Game Lobby with name {this.state.clientName}</h3>
              {lobbyPlayers &&
                <ListGroup>
                  {
                    Object.keys(lobbyPlayers).map((key, index) => {
                      return <ListGroup.Item key={index}>
                        <div>
                          <div className="float-left">{lobbyPlayers[key].clientName}</div>
                          <div className="float-right"><Button disabled={lobbyPlayers[key].clientName === this.state.clientName} variant="info" onClick={this.sendInvite(key)}>Send Invite</Button></div>                          
                        </div>
                      </ListGroup.Item>
                    })
                  }
                </ListGroup>
              }
            </>
          }

        </div>
      </>
    )
  }
}
export default TTT;