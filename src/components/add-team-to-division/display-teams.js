

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Panel } from 'react-bootstrap';


//IMPORT COMPONENTS
import DisplayItem from './display-teams-item';

//IMPORT ACTIONS
import {getTeams} from './../../action/index';

class DisplayTeams extends Component{
    componentWillMount(){
        this.props.getTeams()
    }


    // Render DisplayItem - That holds add to div button & Team name
    // Render List of Teams - <DisplayItem />
    render(){
        const teamsList = this.props.teams.map((team, index) => {
            return(
    
                
                <div  key={index}>
                <DisplayItem passStateTeam={
                        
    // Component used to clean up code - render teamName & Button Pass down teamName
    // & state term as props Adding Teams to division logic will be there

                    team}

                    passStateTerm={this.props.onStatePassDown} 
                    passStateTeamId={team._id}/>
                </div>
            )
        })

        return(
            <Panel >
                <center><h4 className="display-teams">Teams</h4></center>
                {/* <button onClick={() => {this.props.getTeams()}} /> */}
                {/*console.log('this.props.teams: ', this.props.teams)*/}
                {teamsList}
            </Panel>
        )
    }
}

function mapStateToProps(state){
    return{
        
        // Teams - Will be populated after getTeams();
        teams: state.teams.teams
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({

        // get list of teams from API
        getTeams
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTeams);
