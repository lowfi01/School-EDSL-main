import React from 'react';
import {Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';


// Component
import AddDateOther from './add-date-other';

class AddDate extends React.Component{
    constructor(){
        super()

        this.state = { 
            startDate : '',
            endDate : '',
            type : '',
            other : []
        }
    }
    render(){
        return(
            <div>
                <Form onSubmit={(event) => {
                    event.preventDefault();
                    console.log('start Date: ', this.state.startDate)
                    console.log('end Date: ', this.state.endDate)
                    console.log('type: ', this.state.type)
                    {/* const test = this.state.other.map((log) => {
                        return log
                    })
                    console.log(test) */}
                    }} inline>
                <FormGroup controlId="startDate">
                <ControlLabel>Start Date</ControlLabel>
                {' '}
                <FormControl onChange={event => this.setState({
                    startDate: event.target.value
                    })} value={this.state.startDate} type="start" placeholder="12/05/2017" />
                </FormGroup>
                {' '}
                <FormGroup controlId="endDate">
                <ControlLabel>End Date</ControlLabel>
                {' '}
                <FormControl onChange={event => this.setState({
                    endDate: event.target.value
                    })} value={this.state.endDate} type="end" placeholder="12/11/2017" />
                </FormGroup>
                {' '}
                <FormGroup controlId="type">
                <ControlLabel>Type</ControlLabel>
                {' '}
                <FormControl onChange={event => this.setState({
                    type : event.target.value
                    })} value={this.state.type}  type="setup" placeholder="Season Setup" />
                </FormGroup>
                {' '}
                <Button type="submit">
                    Submit
                </Button>
            </Form>
                <div>
                    <AddDateOther handleSubmitCallBack={(value) => {
                        const hold = [ ...this.state.other, value ]
                        this.setState({other: hold});
                        console.log(`CallBack Working: `, hold);
                        }} />
                </div>
            </div>
        )
    }
}


export default AddDate;