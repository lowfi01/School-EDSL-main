import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { ButtonToolbar, SplitButton, MenuItem } from 'react-bootstrap'


//IMPORT ACTIONS
import {getDivision} from './../../action/index'


class DisplayDivision extends Component{

    onSplitButton(text){
        var term = text.target.text
        this.props.getDivision(term);
        this.props.onCallBackTerm(term);
    }

    render(){

        const divisionList = this.props.div.map((team, index) => {
            return(
                <div key={index}>
                <li >
                    {team.teamName}
                </li>
                
                </div>
            )
        })

        return(
            <div>
                <SplitButton  title="Dropdown right" pullRight id="split-button-pull-right">
                    <MenuItem onClick={(text) => {this.onSplitButton(text)}} eventKey="1">div1</MenuItem>
                    <MenuItem  divider />
                    <MenuItem onClick={(event) => {this.onSplitButton(event)}} eventKey="2">div2</MenuItem>
                </SplitButton>
                

                <div>
                    {divisionList}
                </div>
                
            </div>
        
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

    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayDivision);
