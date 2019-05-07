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
        
    } 
    componentDidMount(){
        const newprops = this.props.child
        const code = newprops.match.params.day;
        if(code !== undefined){
            this.getData(code);
            return;
        }
        this.showData =false;        
        
    }
    componentWillReceiveProps(propsnew){
        const newprops = propsnew.child
        const code = newprops.match.params.day;
        this.getData(code);
    }
    getData = (code)=>{
        this.showData =true;      
        Axios.get("https://jsonplaceholder.typicode.com/users/"+code).then(result => {this.setState({data:result.data})}).catch(function (errorobject) {
            console.log(errorobject);
        }); 

    }
    
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
                    <Col xs={2}>
                        <Row><Col><Button variant="outline-info" onClick={() => { child.history.push('/weather/1')}}>User1</Button></Col></Row><br />
                        <Row><Col><Button variant="outline-info" onClick={() => { child.history.push('/weather/2')}}>User2</Button></Col></Row><br />
                        <Row><Col><Button variant="outline-info" onClick={() => { child.history.push('/weather/3')}}>User3</Button></Col></Row><br />
                        <Row><Col><Button variant="outline-info" onClick={() => { child.history.push('/weather/4')}}>User4</Button></Col></Row><br />
                        <Row><Col><Button variant="outline-info" onClick={() => { child.history.push('/weather/5')}}>User5</Button></Col></Row><br />
                    </Col>
                    <Col className="text-left">
                    {this.showData && 
                       <table className="table table-stripped">
                         <tbody>
                           <tr>
                               <th>ID</th>
                               <td>{data.id}</td>
                           </tr>
                           <tr>
                               <th>Name</th>
                               <td>{data.name}</td>
                           </tr>
                           <tr>
                               <th>email</th>
                               <td>{data.email}</td>
                           </tr>
                           <tr>
                               <th>phone</th>
                               <td>{data.phone}</td>
                           </tr>
                           </tbody>
                       </table>
                    }
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Weather;