

import React, { Component } from 'react';


// IMPORT COMPONENT
import DisplayTeams from './add-team-to-division/display-teams';
import DisplayDivision from './add-team-to-division/display-division'

class AddTeamDivision extends Component{
        constructor(){
        super()

        // Component state - Defined in Display-Division dropDownMenu.text
        // Used to filter search to API & Add Teams to a division 

        this.state = {term : ''}
        console.log(`this is the highest level: `, this.state.term)
    }
    render(){
        return(
            
            <div className="container">

             {/* 
                
             */}
                
                <div className="row">
                    <DisplayTeams onStatePassDown={

                        // Component state pass down as props
                        // used to filter - Add Team to Division

                        this.state.term
                        
                        } />
                    <DisplayDivision onCallBackTerm={(term) => {

                        // CallBack passed down to display-division
                        // returns dropDownMenu text value as a term
                        // save term to state
                        
                        console.log(`term:` , term)
                        this.setState({ term: term })
                        
                        //console.log(`this callback works`, this.state.term)
                        }}/>
                </div>
             </div>
        )
    }
}

export default AddTeamDivision;