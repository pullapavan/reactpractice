import React from 'react'
import { ListGroup } from 'react-bootstrap'

class LobbyPlayers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lobbyPlayers: {}
        }
    }
    componentDidMount(){
        console.log("Inside Component Did mount")
        console.log(this.props.lobbyPlayers)
        this.setState({lobbyPlayers:this.props.lobbyPlayers})
    }
    render() {
        const { lobbyplayers } = this.state
        return (
            <>             
                <ListGroup>
                    {
                        // Object.keys(lobbyplayers).map((key, index) => {
                        //     return <ListGroup.Item>
                        //         {lobbyplayers[key].clientName}
                        //     </ListGroup.Item>
                        // })
                    }
                </ListGroup>
            </>
        )
    }
}
export default  LobbyPlayers;