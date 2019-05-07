import React from 'react';
import { Button, Row, Col} from 'react-bootstrap';
import Axios from 'axios';
// Render method gets called for every change in the URL parameters
class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{}
        };
        this.userData = {};
    } 
    componentWillReceiveProps(props){
        const newprops = this.props.child
        const code = newprops.match.params.day;  
        console.log(newprops);  
        Axios.get("https://jsonplaceholder.typicode.com/users/"+code).then(result => {this.setState({data:result.data})}).catch(function (errorobject) {
            console.log(errorobject);
        });
    } 
    // getData = ()=>{        
    //     const newprops = this.props.child
    //     const code = newprops.match.params.day;       
    //     Axios.get("https://jsonplaceholder.typicode.com/users/"+code).then(result => {this.setState({data:result.data})}).catch(function (errorobject) {
    //         console.log(errorobject);
    //     });
    // }
    render() {   
       const {data} = this.state;
       const { child } = this.props;
        return (
            <div>
                <Row className="text-center">
                    <Col><h4>UserDetails</h4></Col>
                </Row>
                <hr/>
                <Row>
                    <Col>
                        <Row><Col><Button variant="outline-info" onClick={() => { child.history.push('/weather/1')}}>User1</Button></Col></Row><br />
                        <Row><Col><Button variant="outline-info" onClick={() => { child.history.push('/weather/2')}}>User2</Button></Col></Row><br />
                        <Row><Col><Button variant="outline-info" onClick={() => { child.history.push('/weather/3')}}>User3</Button></Col></Row><br />
                        <Row><Col><Button variant="outline-info" onClick={() => { child.history.push('/weather/4')}}>User4</Button></Col></Row><br />
                        <Row><Col><Button variant="outline-info" onClick={() => { child.history.push('/weather/5')}}>User5</Button></Col></Row><br />
                    </Col>
                    <Col className="text-left">
                       {data.id}
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Weather;