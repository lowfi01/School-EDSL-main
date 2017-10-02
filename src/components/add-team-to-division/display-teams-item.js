import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Panel } from 'react-bootstrap';

//IMPORT ACTIONS
import {updateDivision} from './../../action/index';
import {getDivision, Row, Col, Grid} from './../../action/index'

class DisplayItem extends Component{
  
    // Add to division onClick function
    addTeamToDivision(event){
        
        // ADD GET TEAMS - WE NEED TO UPDATE DIVISION ON ADD



        // Prevent button from refreshing screen
        event.preventDefault();


        // Save Prop passed from from display-teams to term
        const term = this.props.passStateTerm
        
        
        //console.log(`displayItem team.id:  `, this.props.passStateTeamId)
        
        // Update Team detail division.clubCode
        // Requires Action - axios > api > find { $set { value }}
        this.props.updateDivision(term, this.props.passStateTeamId);

        // Re-load Division list
        // Updates List with new population 
        this.props.getDivision(term)
    }


    // Render 
    // Team Name passed as prop, 
    // Button to add team to division
    
    render(){
        return(
                <Panel>

                                    <p><strong>Team:</strong> {this.props.passStateTeam.teamName} <span>   
                                    <Button className="btn btn-success pull-right" bsSize="xsmall" onClick={(event) => {
                                        this.addTeamToDivision(event);
                                        }}>Add
                                    </Button></span>
                                    </p>
                                    <p><strong>Club:</strong> {this.props.passStateTeam.club} <strong>Division:</strong> {this.props.passStateTeam.division.divCode}</p>
                                    {console.log(`this is the state of passStateTeam: `, this.props.passStateTeam)}
                                
                 </Panel>
        )
    }

}


function mapDispatchToProps(dispatch){
    return bindActionCreators({
        // Patch Request to API - update division.CodeName
        updateDivision,
        // Get Division - used purely to keep component live
        getDivision
    }, dispatch)
}

export default  connect(null, mapDispatchToProps)(DisplayItem);