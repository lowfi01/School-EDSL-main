import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


//IMPORT ACTIONS
import {updateDivision} from './../../action/index';
import {getDivision} from './../../action/index'

class DisplayItem extends Component{

    // Add to division onClick function
    addTeamToDivision(event){
        event.preventDefault();
        const term = this.props.passStateTerm
        
        
        //console.log(`displayItem team.id:  `, this.props.passStateTeamId)
        
        // Update Team detail division.clubCode
        // Requires Action - axios > api > find { $push { value }}
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
                <li>
                <p>{this.props.passStateTeam}</p>
                <Button className="btn" onClick={(event) => {
                    this.addTeamToDivision(event);
                    }}/>
                </li>
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