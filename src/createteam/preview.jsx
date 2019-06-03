import React from 'react';
// import { connect } from 'redux';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import backgroung from '../images/backgroung.png';
import pavan from '../images/pavan.png'
import reddy from '../images/reddy.png'

class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images:{}
        }
    }
    componentDidMount(){
        const images = [];
        this.props.teamList.map((player)=>{
          images[player] = "../images/"+player+".png";
        })
        this.setState({images})
        console.log(this.state.images)
    }
    render() {
        const { teamList } = this.props;
        const { teamName } = this.props;
        return (
            <div>
                {/* {!teamList || teamList.length === 0 && <h3>Team {teamName} not Finalised</h3>} */}
                {teamList.length >0 &&  
                <div>
                    <table responsive="sm"><thead><tr><th><h3>Team {teamName}</h3></th></tr></thead>
                        <tbody>
                            {teamList.length > 0 &&
                                teamList.map((name, index) => {
                                    return <td><Card key={index} style={{ width: '8em' }}>
                                        <Card.Img variant="top" src={`/images/${name}.png`}/>
                                        <Card.Body style={{ height: '4em' }}>
                                            <Card.Title>{name}</Card.Title>
                                        </Card.Body>
                                        <ListGroup className="list-group-flush">
                                            <Button variant="danger" onClick={()=>{this.props.remove(name);this.props.addToList(name)}}>Remove</Button>
                                        </ListGroup>
                                    </Card></td>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                }
            </div>
        )
    }
}

export default Preview;