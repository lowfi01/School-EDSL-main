import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { ButtonToolbar, SplitButton, MenuItem } from 'react-bootstrap'
import {Panel} from 'react-bootstrap';

//IMPORT ACTIONS
import {getDivision} from './../../action/index'


class DisplayDivision extends Component{
    constructor(){
        super()

        this.state = { term: 'Selection'}
    }
    
    onSplitButton(text){
        let term = text.target.text
        // set term for ux dropdown
        this.setState({term});
        // this will fix ux and still feed API search with correct term
        let div = `div${term}`
        this.props.getDivision(div);
        this.props.onCallBackTerm(div);
    }

    render(){

        const divisionList = this.props.div.map((team, index) => {
            return(
                <Panel style={{marginTop:'25px'}} key={index}>
                <li >
                    {team.teamName}
                </li>
                
                </Panel>
            )
        })

        return(
            <Panel>
                <SplitButton  title={`Division ${this.state.term}`} pullRight id="split-button-pull-right">
                    <MenuItem onClick={(text) => {this.onSplitButton(text)}} eventKey="1">1</MenuItem>
                    <MenuItem onClick={(event) => {this.onSplitButton(event)}} eventKey="2">2</MenuItem>
                    <MenuItem onClick={(event) => {this.onSplitButton(event)}} eventKey="3">3</MenuItem>
                </SplitButton>
                

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

    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayDivision);
