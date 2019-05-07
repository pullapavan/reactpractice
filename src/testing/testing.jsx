import React from 'react';
import { Row, Col} from 'react-bootstrap';

class Testing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            suggestions: ["manohar", "sai","Akhilesh", "pavan","pavan1","pavan2"],
            temp:[]
        }
        this.myRef = React.createRef();
    }
    
    
    onChange = (e) => {
        this.myRef.current.hidden = false;
        let newSug =   this.state.suggestions.filter(str =>
            str.indexOf(e.target.value) !== -1
        )        
        this.setState({
            name: e.target.value,
            temp: newSug
        })
    }
    click = (e, str) => {
        this.setState({
            name:str
        })
        this.myRef.current.hidden = true;   
        e.stopPropagation();     
    }
 
    hideAuto = e => {        
        // this.myRef.current.hidden = true;
    }

    render() {
        window.onclick = () => {
            this.myRef.current.hidden = true;
        };
        let { name, temp } = this.state
        return (
            <Row>
                <Col>
                    <div><h5>Input Suggestions</h5></div>
                    <form autoComplete="off" >
                        <input type="text" value={name} onChange={this.onChange} />
                        <div ref={this.myRef}>
                            {
                                temp.length > 0 && name && temp.map(str => (
                                    <div key={str} onClick={(e) => this.click(e, str)} >
                                        {str}
                                    </div>
                                )
                                )
                            }
                        </div>
                    </form>
                </Col>
            </Row>

        )
    }
}
export default Testing;