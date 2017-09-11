

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';


//IMPORT ACTIONS
import {getTeams} from './../../action/index'

class DisplayTeams extends Component{
    render(){
        const teamsList = this.props.teams.map((team, index) => {
            return(
                <div key={index}>
                <li >
                    <span>    </span>
                    
                </li>
                {team.division.divCode}
                </div>
            )
        })

        return(
            <div>
                <button onClick={() => {this.props.getTeams()}} />
                {console.log('this.props.teams: ', this.props.teams)}
                {teamsList}
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        teams: state.teams.teams
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getTeams
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTeams);
