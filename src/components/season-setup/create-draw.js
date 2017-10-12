import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
let robin = require('roundrobin');
import _ from 'lodash';
import {Table, ButtonToolbar, SplitButton, MenuItem, Panel} from 'react-bootstrap'

//IMPORT ACTIONS
import {getTeams} from './../../action';

class CreateDraw extends Component{
    constructor(){
        super()

this.state = {
    term: 'default',
    divTerm: '',
    drawTeam: [],
    value: true
}
    }
    
    componentWillMount(){
        this.props.getTeams();
    }   
    
    
    createDraw(event){
        event.preventDefault();
        this.setState({value: false})
        let team1 = this.props.teams.teams;
        let team2 = this.props.teams.teams;
        let team3 = this.props.teams.teams;
        
        const division1 = _.remove(team1, team => {
        //console.log(`lodash remove:`, team.division.divCode)
        return team.division.divCode == 'div1' && 'div3';
        });

        const divNames1 = _.map(division1, 'teamName')
        let div1 = robin(divNames1.length, divNames1)

        const division2 = _.remove(team2, team => {
        //console.log(`lodash remove:`, team.division.divCode)
        return team.division.divCode == 'div2' && 'div3';
        });

        const divNames2 = _.map(division2, 'teamName')
        let div2 = robin(divNames2.length, divNames2)

        const division3 = _.remove(team3, team => {
        //console.log(`lodash remove:`, team.division.divCode)
        return team.division.divCode == 'div3' && 'div2';
        });

        const divNames3 = _.map(team3, 'teamName')
        let div3 = robin(divNames3.length, divNames3)
        

        console.log(`round robin: `, div1)
        console.log(`round robin: `, div2)
        console.log(`round robin: `, div3)

        this.setState({
            draw: { div1, div2, div3 }
        })

        console.log(`state`, this.state)
        
    }

    onSplitButton(text){
        var term = text.target.text
        console.log(`state`, this.state)

        this.setState({term, divTerm: term})
        console.log(`term`, this.state.draw.div1)
        
        let div = `div${term}`
        let holdMeBaby = this.state.draw[`${div}`]
        console.log(`draw`, this.state.draw[`${div}`])
        
        let roundsArray = [];
        
        for (var i = 0; i < holdMeBaby.length; i++) {
            for (var o = 0; o < holdMeBaby[0].length; o++) {
                // for(var x = 0; x < 2; x++) {
                // console.log(`holdMeBaby count: ${i} ${o}`, holdMeBaby[i][o])
                roundsArray.push(holdMeBaby[i][o]/*[x]*/) // comment will break it up into individual teams

                // }
            }
        }

        console.log(`roundsArray`, roundsArray)
        this.setState({
            drawTeam: roundsArray
        })
    }
    


    render(){
        const draw = this.state.drawTeam.map((team, index) => {
                //  console.log('index', index) console.log(`team.length`, team ) 
                // console.log(`this is the current count index`, index);
                // console.log(`this is the team being displayed`, team);
                // console.log(`this is the roundNum % 1, should be 0 or 1`, roundNum % 1)

                const num = this.state.draw[`div${this.state.term}`][0].length
                console.log(`drawTeam`, this.state.drawTeam)
                let roundNum = (index / num + 1);
                console.log(`result mod`, (roundNum % 1))
            if (roundNum % 1 === 0) {
                return (
                    <tr key={index}>
                        <td>
                            {Math.floor(roundNum)}
                        </td>
                        <td>
                            {team[0]}
                        </td>
                        <td>
                            {team[1]}
                        </td>
                    </tr>
                )
                }else{ 
                    return (
                        <tr key={index}>
                            <td></td>
                            <td>
                                {team[0]}
                            </td>
                            <td>
                                {team[1]}
                            </td>
                        </tr>
                    )
                }
                        })
            
        return (
            <Panel className="draw-panel">
                <center> <div className="draw-content">
                <Button className="btn btn-primary" onClick={this.createDraw.bind(this)}  disabled={!this.state.value}>Create Division Draws</Button>
                 <SplitButton disabled={this.state.value}  title={`View division ${this.state.divTerm} draw`} pullRight id="split-button-pull-right">
                    <MenuItem onClick={(event) => {this.onSplitButton(event)}} eventKey="1">1</MenuItem>
                    <MenuItem onClick={(event) => {this.onSplitButton(event)}} eventKey="2">2</MenuItem>
                    <MenuItem onClick={(event) => {this.onSplitButton(event)}} eventKey="3">3</MenuItem>
                </SplitButton>
                
                </div>
                <div className="create-draw">
                <Table striped bordered condensed hover>
                    <tbody>
                        <tr>
                            <th>Round</th>
                            <th>Home</th>
                            <th>Away</th>
                        </tr>
                        {draw}

                    </tbody>
                </Table>
                </div>
                </center>
            </Panel>
        )
    }
}

function mapStateToProps(state){
    return{
        teams: state.teams
    }
}


export default connect(mapStateToProps, {getTeams})(CreateDraw);