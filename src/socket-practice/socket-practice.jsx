import React from 'react'
import socketIOClient from 'socket.io-client'
import { ListGroup, Button, Modal, Row, Col } from 'react-bootstrap'

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
      serverUrl: 'http://10.0.11.8:3001/',
      lobbyPlayers: {},
      requestReceived: false,
      requestedPlayerName: "",
      errorAck: false,
      errorMsg: "",
      rooms: [],
      roomMesssages: {},
      myRoomMessages: {}
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

    socket.on('new-invite', (data) => {
      if (!this.state.requestReceived) {
        const acceptSocketId = data.socketId
        let requestedPLayerDetails = this.state.lobbyPlayers[acceptSocketId];
        this.setState({ requestReceived: true, requestedPlayerName: requestedPLayerDetails.clientName, requestedSocketId: acceptSocketId })
      } else {
        socket.emit('error-ack', { opponentSocketId: data.socketId, msg: "Player busy please try After Some" });
      }
    });

    socket.on('error-ack', (message) => {
      this.setState({ errorAck: true, errorMsg: message })
    });

    socket.on('player-accepted-room', (data) => {
      socket.emit('join-opponent-accepted-room', data)
    });

    socket.on('new-room', (data) => {
      const { roomName } = data
      this.setState((previousState) => {
        var returnObj = { rooms: [...previousState.rooms, data.roomName] };
        returnObj[roomName] = "sample Message"
        returnObj[roomName + "_messages"] = []
        return returnObj
      });
    });

    socket.on('new-room-msg', (data) => {
      const { roomName } = data;
      var msgObject = { message: data.message, clientName: data.clientName, roomName }
      this.setState((previousState) => {
        var returnObject = {}
        var msgArray = returnObject[roomName + "_messages"] = previousState[roomName + "_messages"]
        msgArray.push(msgObject)
        return returnObject;
      });
    })
    
  }

  sendInvite = (opponentSocketId) => {
    const { socket } = this.state;
    socket.emit('send-invite', {
      opponentSocketId
    });
  }

  closeErrorAck = () => {
    this.setState({ errorAck: false, errorMsg: "" })
  }

  removeRequestModal = () => {
    this.setState({
      requestReceived: false,
      requestedPlayerName: "",
      requestedSocketId: ""
    })
  }

  requestRejected = () => {
    const { socket } = this.state;
    socket.emit('error-ack', {
      opponentSocketId: this.state.requestedSocketId,
      msg: `${this.state.clientName} has rejected your Request`
    })
    this.removeRequestModal();
  }

  acceptPlayerInvitation = () => {
    const { socket } = this.state
    console.log(`${this.state.requestedSocketId} opponent socket id Accepting Request`)
    socket.emit('Accept', { opponentSocketId: this.state.requestedSocketId })
    this.removeRequestModal();
  }

  sendMessage = (roomName, clientName) => {
    const { socket } = this.state
    socket.emit('room-message', { roomName, clientName, message: this.state[roomName] });
    this.setState(() => {
      var returnObj = {}
      returnObj[roomName] = "";
      return returnObj
    })
  }

  handleMessageChange = (context, roomName) => {
    let object = {}
    object[roomName] = context.target.value
    this.setState(
      object
    )
  }

  render() {
    const { lobbyPlayers } = this.state;
    const { rooms } = this.state;
    let className;
    return (
      <div>
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
            <div>
              <h3>Your Identification name is{this.state.clientName}</h3>
              {lobbyPlayers &&
                <ListGroup>
                  {
                    Object.keys(lobbyPlayers).map((key, index) => {
                      return <ListGroup.Item key={index}>
                        <div>
                          <div className="float-left">{lobbyPlayers[key].clientName}</div>
                          <div className="float-right"><Button disabled={lobbyPlayers[key].clientName === this.state.clientName} variant="outline-primary" onClick={() => { this.sendInvite(key) }}>Send Invite</Button></div>
                        </div>
                      </ListGroup.Item>
                    })
                  }
                </ListGroup>
              }
            </div>
          }
          <Modal show={this.state.requestReceived} onHide={this.requestRejected}>
            <Modal.Header closeButton>
              <Modal.Title>Player Invite</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.state.requestedPlayerName} sent you Request</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.acceptPlayerInvitation}>
                Accept
            </Button>
              <Button variant="primary" onClick={this.requestRejected}>
                Reject
            </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={this.state.errorAck} onHide={this.closeErrorAck}>
            <Modal.Header closeButton>
              <Modal.Title>Acknowledgement</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.state.errorMsg}</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.closeErrorAck}>
                OK
            </Button>
            </Modal.Footer>
          </Modal>

          {<br></br>/* Start of Room Chats */}
          {
            rooms && <Row>
              {
                rooms.map((roomName, index) => {
                  return <Col key={index}>
                    <table className="table table-bordered">
                      <thead className='ash-background'>
                        <tr><th><h4>{roomName}</h4></th></tr>
                      </thead>
                      <tbody>
                        {this.state[roomName + "_messages"] &&
                          this.state[roomName + "_messages"].map((msgObject, index) => {
                            if (msgObject.clientName === this.state.clientName) 
                              className = "float-right yellow-border"
                            else 
                              className = "float-left yellow-border"                            
                            return <tr>
                              <td className={className}>
                                {msgObject.message}
                              </td>
                            </tr>
                          })
                        }
                        <tr>
                          <td>
                            <form className="form-inline">
                              <div className="form-group">
                                <input type="text" value={this.state[roomName]} onChange={(event) => { this.handleMessageChange(event, roomName) }} className="form-control" placeholder="Type here and dont hit enter button, click on send" />
                              </div>
                              <button type="button" onClick={() => this.sendMessage(roomName, this.state.clientName)} className="btn btn-default">&#9654;</button>
                            </form>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                })
              }
            </Row>
          }
        </div>
      </div>
    )
  }
}
export default TTT;