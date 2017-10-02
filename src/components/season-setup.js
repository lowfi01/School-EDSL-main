import React, { Component } from 'react';

// COMPONENTS
import AddDate from './season-setup/add-date';
import CreateDraw from './season-setup/create-draw';



class SeasonSetup extends Component{
    render(){
        return(
        <div>
            <AddDate />
            <CreateDraw />
        </div>
        )
    }
}


export default SeasonSetup;