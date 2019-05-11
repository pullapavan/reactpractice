import React from 'react';
import { connect } from 'redux';

class Preview extends React.Component{
    constructor(props){
     super(props);
     this.state={}
    }
    render(){
        return(
            <div></div>
        )
    }
}

export default connect(mapStateToProps)(preview)