import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
const date = moment();

// Component
import AddDateOther from './add-date-other';

// Actions
import { postSeasonSetup } from './../../action/index';

class AddDate extends React.Component{
    constructor(){
        super()

        this.state = { 
            startDate : '2017-11-04',
            endDate : '2018-02-24',
            other : [{
                startDate: '2017-12-16', 
                type: 'Christmas Break'
                },{
                    startDate: '2017-12-23', 
                    type: 'Christmas Break'
                },{
                    startDate: '2017-12-30',
                    type: 'Christmas Break'
                }],
            dateValidate : 'Saturday',
        }

        this.validateDate = this.validateDate.bind(this);
    }

    componentDidMount(){
        document.getElementById(`test`).value = "2014-02-09"; 
    }

    validateDate(date){
        console.log(`date check: ${date}`);
        console.log(`state: ${this.state.dateValidate}`);
        if(date == this.state.dateValidate){
            return true;
        }
        return false;
    }

    render(){
        return(
            <div className="button-season-setup">
                <Form onSubmit={(event) => {
                    event.preventDefault();
                    {/* console.log('start Date: ', this.state.startDate)
                    console.log('end Date: ', this.state.endDate)
                    console.log('type: ', this.state.type) */}
                    {/* const test = this.state.other.map((log) => {
                        return log
                    })
                    */}
                    console.log(this.state) ;
                    this.props.postSeasonSetup(this.state);
                    }} inline>
                <FormGroup controlId="startDate">
                <ControlLabel>Start Date</ControlLabel>
                {' '}
                <FormControl onChange={(event) => {
                    let day = event.target.value;
                    var check = moment(day).format('dddd');
                    console.log(check)
                    this.setState({startDate: day, dateValidate: check});
                    }} 
                    value={this.state.startDate} type="date" placeholder="12/05/2017" />
                </FormGroup>
                {' '}
                <FormGroup controlId="endDate">
                <ControlLabel>End Date</ControlLabel>
                {' '}
                <FormControl onChange={event => {
                    const date = event.target.value;
                    
                    // validate end date is = to start date day
                    if(this.validateDate(moment(`${date}`).format('dddd'))){
                        console.log("hello world")
                        this.setState({endDate: date})
                    }else{
                        console.log(`else is running`)
                        alert(`date does not match ${this.state.dateValidate}`);
                    }
                    }
                    } 
                    
                    value={this.state.endDate} type="date" placeholder="12/11/2017" />
                </FormGroup>
                {' '}
                {/* <FormGroup controlId="type">
                <ControlLabel>Type</ControlLabel>
                {' '}
                <FormControl onChange={event => this.setState({
                    type : event.target.value
                    })} value={this.state.type}  type="setup" placeholder="Season Setup" />
                </FormGroup> */}
                {' '}
                <Button className="btn btn-primary" bsSize="small" type="submit">
                    Submit
                </Button>
            </Form>
                <div>
                    <AddDateOther handleSubmitCallBack={(value) => {
                        const hold = [ ...this.state.other, value ]
                        {/* console.log(`calbavk value:`, value) */}
                        const date = value.startDate;
                        console.log(date);
                        // validate end date is = to start date day
                        if(this.validateDate(moment(`${date}`).format('dddd'))){
                            this.setState({other: hold});
                        }else{
                            alert(`date does not match ${this.state.dateValidate}`);
                        }

                        {/* if(hold.startDate !== ""){
                            this.setState({other: hold});
                            console.log("validation check works", hold)
                        } */}
                        
                        {/* console.log(`CallBack Working: `, hold); */}
                        }} />
                </div>
            </div>
        )
    }
}


export default connect(null, {postSeasonSetup})(AddDate);