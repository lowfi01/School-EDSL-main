import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { ButtonToolbar, SplitButton, MenuItem } from 'react-bootstrap'
import {Panel, Button} from 'react-bootstrap';

//IMPORT ACTIONS
import {getDivision, updateDivision, getTeams} from './../../action/index'


class DisplayDivision extends Component{
    constructor(){
        super()

        this.state = { term: 'Selection'}
        let word = this.state.term;
        
    }

    
    
    onSplitButton(text){
        let term = text.target.text
        // set term for ux dropdown
        this.setState({term});
        // this will fix ux and still feed API search with correct term
        let div = `div${term}`
        this.props.getDivision(div);
        this.props.onCallBackTerm(div);
        this.props.getTeams(`div${term}`);
        console.log(`term in display division: ${this.state.term}`)

    }
  
    // Add to division onClick function
    addTeamToDivision(event, team){
        
        // ADD GET TEAMS - WE NEED TO UPDATE DIVISION ON ADD



        // Prevent button from refreshing screen
        event.preventDefault();


        // Save Prop passed from from display-teams to term
        const term = this.state.term;
        
        
        //console.log(`displayItem team.id:  `, this.props.passStateTeamId)
        
        // Update Team detail division.clubCode
        // Requires Action - axios > api > find { $set { value }}
        this.props.updateDivision(`div0`, team._id);

        // Re-load Division list
        // Updates List with new population 
        console.log(`term 22222`, term);
        this.props.getDivision(`div${term}`);
        console.log(`term in display division: ${term}, team ${team.division.divCode}`)
        
    }
   

    render(){

        const divisionList = this.props.div.map((team, index) => {
            return(
                <Panel style={{marginTop:'25px'}} key={index}>
                <li >
                    {team.teamName}
                    <Button className="btn btn-danger pull-right" bsSize="xsmall" onClick={(event) => {
                                        this.addTeamToDivision(event, team);
                                        }}>Remove
                    </Button>
                </li>
                
                </Panel>
            )
        })

        return(
            <Panel>
                <span>
                <SplitButton  title={`Division ${this.state.term}`} pullRight id="split-button-pull-right">
                    <MenuItem onClick={(text) => {this.onSplitButton(text)}} eventKey="1">1</MenuItem>
                    <MenuItem onClick={(event) => {this.onSplitButton(event)}} eventKey="2">2</MenuItem>
                    <MenuItem onClick={(event) => {this.onSplitButton(event)}} eventKey="3">3</MenuItem>
                    <MenuItem onClick={(event) => {this.onSplitButton(event)}} eventKey="0">0</MenuItem>
                </SplitButton>
                <span className="pull-right">
                {this.props.div.length}
                </span>
                </span>
                

                <div>
                    {divisionList}
                </div>
                
            </Panel>
        
        )
    }
}

{/* <button className="btn" onClick={() => {this.props.getDivision('divCode')}} />
                    {console.log('this.props.div: ', this.props.div)}
                    {divisionList} */}

function mapStateToProps(state){
    return{
        // div holds division state array populated
        // using the value of the drop-down menu
        div: state.divisions.divisions
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        // getDivision will call api to populate division state array
        getDivision,
        updateDivision,
        getTeams
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayDivision);
