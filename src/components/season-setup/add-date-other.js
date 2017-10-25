

import React from 'react';
import {Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';

class AddDateOther extends React.Component{
    constructor(){
        super()

        this.state = {
            startDate : '2018-02-17',
            type: 'Public-Holiday'
        }

        
    }

    ComponentWillMount(){
        document.getElementById("test").defaultValue = "2018-02-17"; 
    }

    render(){
        return(
                <Form onSubmit={ (event) => {
                    event.preventDefault();
                    this.props.handleSubmitCallBack(this.state);
                    this.setState({
                        startDate: '',
                        type: ''
                    })

                    }} inline>
                    <FormGroup controlId="startDate">
                    <ControlLabel>Date</ControlLabel>
                    {' '}
                    <FormControl onChange={event => this.setState({
                    startDate: event.target.value
                    })} value={this.state.startDate}  id="test" type="date" />
                    </FormGroup>
                    {' '}
                    <FormGroup controlId="Setup">
                    <ControlLabel>Type</ControlLabel>
                    {' '}
                    <FormControl onChange={event => this.setState({
                    type: event.target.value
                    })} value={this.state.type} type="setup" placeholder="Public Holiday" />
                    </FormGroup>
                    {' '}
                    <Button className="btn btn-success" bsSize="small" type="submit">
                    +
                    </Button>
            </Form>
        )
    }
}


export default AddDateOther;