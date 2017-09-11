

import React, { Component } from 'react';


// IMPORT COMPONENT
import DisplayTeams from './add-team-to-division/display-teams';
import DisplayDivision from './add-team-to-division/display-division'

class AddTeamDivision extends Component{
    render(){
        return(
            <div>
                <DisplayTeams />
                <DisplayDivision />
            </div>
        )
    }
}

export default AddTeamDivision;