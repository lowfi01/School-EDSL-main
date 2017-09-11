import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';


//IMPORT ACTIONS
import {getDivision} from './../../action/index'

class DisplayDivision extends Component{
    render(){
        const divisionList = this.props.div.map((team, index) => {
            return(
                <div key={index}>
                <li >
                    {team.division.divCode}
                </li>
                
                </div>
            )
        })

        return(
            <div>
                <button onClick={() => {this.props.getDivision('divCode')}} />
                    {console.log('this.props.div: ', this.props.div)}
                    {divisionList}
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        div: state.divisions.divisions
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getDivision
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayDivision);
