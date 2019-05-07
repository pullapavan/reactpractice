import React from 'react';
import Axios from 'axios';
import { Row, Col } from 'react-bootstrap';

class FetchJson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            search: ""            
        };
    }
    componentDidMount() {
        Axios.get("https://jsonplaceholder.typicode.com/users").then(result => { this.setState({ tableData: result.data, processedTable: result.data }); console.log(result.data) }).catch(function (errorobject) {
            console.log(errorobject);
        });
    }    
    render() {
        const { search, tableData } = this.state;
        const processedTable = tableData.filter(object => {if(search)return object.name.indexOf(search)>0;else return true;} ).map(object => {
            return <tr key={object.id}>
                <td>{object.id}</td>
                <td>{object.name}</td>
                <td>{object.username}</td>
                <td>{object.email}</td>
                <td>{object.address.city}</td>
            </tr>
        })
        return (
            <div>
                <Row>
                    <Col className="text-center"><h4>AXIOS Library</h4></Col>
                </Row>
                <Row>
                    <Col>
                        <input type="text" className="form-control" placeholder="search Using Name" value={search} onChange={ event=>this.setState({ search: event.target.value })} />
                    </Col>
                </Row><hr />
                <Row>
                    <Col>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>s.no</th>
                                    <th>Name</th>
                                    <th>username</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    processedTable
                                }
                            </tbody>

                        </table>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default FetchJson;