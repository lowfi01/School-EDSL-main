import React, {Component} from 'react'
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
let robin = require('roundrobin');
import moment from 'moment';
import _ from 'lodash';
import {Table, ButtonToolbar, SplitButton, MenuItem, Panel} from 'react-bootstrap'

//IMPORT ACTIONS
import {getTeams} from './../../action';

class CreateDraw extends Component {
    constructor() {
        super()

        this.state = {
            term: 'default',
            divTerm: '',
            drawTeam: [],
            value: true
        }
    }

    componentWillMount() {
        this
            .props
            .getTeams();
    }

    createDraw(event) {
        event.preventDefault();

        // console.log(`season state: ${this.props.season.season.startDate}`)

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
            return team.division.divCode == 'div3' && 'div1';
        });

        const divNames3 = _.map(division3, 'teamName')
        let div3 = robin(divNames3.length, divNames3)

        console.log(`round robin: `, div1)
        console.log(`round robin: `, div2)
        console.log(`round robin: `, div3)

        this.setState({
            draw: {
                div1,
                div2,
                div3
            }
        })

        //logic to add dates to table
        console.log(`season state: ${this.props.season.season.startDate}`)
        console.log(`season state: ${this.props.season.season.endDate}`)
        // this.props.season.season.other.map(x => {     console.log(x) })

        let str = this.props.season.season.startDate;
        let res = str.split("-");
        let end = this.props.season.season.endDate;
        let resEnd = end.split("-");
        let year = parseInt(res[0], 10);
        let month = parseInt(res[1], 10);
        let day = parseInt(res[2], 10);

        // console.log(`state`, this.state)
        let monthCheck = 30;
        let array = [];
        // create fixed index, to prevent null inserts
        var index = 0;
        const starting = moment(`${res[0]}${res[1]}${res[2]}`);
        const ending = moment(`${resEnd[0]}${resEnd[1]}${resEnd[2]}`);
        // console.log(`a: ${starting}, b: ${ending}, props:
        // ${this.props.season.season.endDate}  starting: ${res[0]}${res[1]}${res[2]}
        // ending :${resEnd[0]}${resEnd[1]}${resEnd[2]}`);
        let diff = ending.diff(starting, 'days');
        // console.log(`count ${diff}`); count number of weeks between start & end date
        const count = diff / 7;

        for (let i = 0; i < count; i++) {

            //    console.log(index);
            var date = `${year}-${month}-${day}`;
            if (date == end) {
                break;
            }
            // check to create off days add current date
            array[index] = date;
            index += 1;

            // add 1 week
            day += 7;

            // check if date is greater then current month
            if (day > monthCheck) {
                month += 1;

                // set correct date
                day = day % monthCheck;
                if (month == 12) {
                    // set days to 31, if december
                    monthCheck = 31;

                } else { // calculate all other months
                    if (month % 2 == 1) {
                        monthCheck = 31;
                    }
                    if (month % 2 == 0) {
                        monthCheck = 30;
                    }
                }

                if (month == 2) {
                    //set days to 28, if feb
                    monthCheck == 28;
                }
                // console.log(`modulas after month check:`, day); console.log(`month`, month)
                // increase years if month is 13
                if (month > 12) {
                    month = 1;
                    year += 1;
                }
            }
        } // end loop
        console.log(this.props.season.season.other);
        this.setState({dates: array})
    }

    onSplitButton(text) {
        var term = text.target.text
        // console.log(`state`, this.state)

        this.setState({term, divTerm: term})
        // console.log(`term`, this.state.draw.div1)

        let div = `div${term}`
        let holdMeBaby = this.state.draw[`${div}`]
        // console.log(`draw`, this.state.draw[`${div}`])

        let roundsArray = [];
        let hold = this.state.draw;
        console.log(`holdMebaby:`, hold[`${div}`])

        for (var i = 0; i < holdMeBaby.length; i++) {
            for (var o = 0; o < holdMeBaby[0].length; o++) {
                // for(var x = 0; x < 2; x++) { console.log(`holdMeBaby count: ${i} ${o}`,
                // holdMeBaby[i][o])
                roundsArray.push(holdMeBaby[i][o]/*[x]*/) // comment will break it up into individual teams

                // }
            }
        }

        let test = [];
        for (var i = 0; i < holdMeBaby.length; i++) {
            // for(var x = 0; x < 2; x++) { console.log(`holdMeBaby count: ${i} ${o}`,
            // holdMeBaby[i][o])
            test.push(holdMeBaby[i][0]/*[x]*/) // comment will break it up into individual teams
            test.push(holdMeBaby[i][1]/*[x]*/)
            // }

        }
        console.log(`test array`, test);

        console.log(`roundsArray`, roundsArray)
        this.setState({drawTeam: roundsArray})

        console.log(`drawTeam:`, roundsArray);
        console.log(`date:`, this.state.dates);
    }

    render() {
        const draw = this
            .state
            .drawTeam
            .map((team, index) => {
                //  console.log('index', index) console.log(`team.length`, team )
                // console.log(`this is the current count index`, index); console.log(`this is
                // the team being displayed`, team); console.log(`this is the roundNum % 1,
                // should be 0 or 1`, roundNum % 1)

                const num = this.state.draw[`div${this.state.term}`][0].length
                // console.log(`drawTeam`, this.state.drawTeam)
                let roundNum = (index / num + 1);
                // console.log(`result mod`, (roundNum % 1)) for(let x = 0; x <
                // this.props.season.season.other.length; x++){     const check =
                // this.props.season.season.other;     console.log("hello");
                // if(this.state.dates[Math.floor(roundNum) -1] == check[x].startDate){
                // return (         <tr key={index}>             <td>
                // {check[x].startDate}             </td>         </tr>     )     } }
                if (roundNum % 1 === 0) {
                    return (
                        <tr key={index}>
                            <td>
                                {this.state.dates[Math.floor(roundNum) - 1]}
                            </td>
                            <td>
                                {team[0]}
                            </td>
                            <td>
                                {team[1]}
                            </td>
                        </tr>
                    )
                } else {
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
                <center>
                    <div className="draw-content">
                        <Button
                            className="btn btn-primary"
                            onClick={this
                            .createDraw
                            .bind(this)}
                            disabled={!this.state.value}>Create Division Draws</Button>
                        <SplitButton
                            disabled={this.state.value}
                            title={`View division ${this.state.divTerm} draw`}
                            pullRight
                            id="split-button-pull-right">
                            <MenuItem
                                onClick={(event) => {
                                this.onSplitButton(event)
                            }}
                                eventKey="1">1</MenuItem>
                            <MenuItem
                                onClick={(event) => {
                                this.onSplitButton(event)
                            }}
                                eventKey="2">2</MenuItem>
                            <MenuItem
                                onClick={(event) => {
                                this.onSplitButton(event)
                            }}
                                eventKey="3">3</MenuItem>
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

function mapStateToProps(state) {
    return {teams: state.teams, season: state.season}
}

export default connect(mapStateToProps, {getTeams})(CreateDraw);


// import React, { Component } from 'react';
// import {connect} from 'react-redux';
// import _ from 'lodash';


// //IMPORT ACTIONS
// import { getTeams } from './../../action';
 
// var robin = require('roundrobin');

// var draw = [];

// var count;

// var roundsArray = [];

// var teams = [
//     'Richmond',
//     'Geelong',
//     'Adelaide',
//     'GWS',
//     'Bulldogs',
//     'James',
//     'DylanIsAGirl',
//     'hey',
//     'Penis',
//     '^Standard',
//     'NalinJayIsSexy'
// ]


// class CreateDraw extends Component{
// componentWillMount() {
//     this
//         .props
//         .getTeams();

// }
// constructor() {
//     super()

    
//     this.state = {
//         teams,
//         draw,
//     }

// }



// CreateDraw() {

    
//     //const teamNumber = this.state.teams.length;
//     // Get teams from APP state & saves only team names into array
    
//     // logic for pulling names from array
//     //const teamsList = _.map(this.props.teams.teams, 'teamName')

//     // create logic for making round robin based off 

//     // Create an array list for div 1 teams
//     const division2 = _.remove(this.props.teams.teams, team => {
//         //console.log(`lodash remove:`, team.division.divCode)
//         return team.division.divCode == 'div1';
//     });

    
//     //console.log('pull lodash: ', division1)

//     // Create an array list for div2 teams
//     const division1 = _.remove(this.props.teams.teams, team => {
//         //console.log(`lodash remove:`, team.division.divCode)
//         return team.division.divCode == 'div2';
//     });

//     // add to state as it's own object
//     const div2Team = _.map(division2, 'teamName')
//     let div2 = robin(div2Team.length, div2Team)
//     const div1Team = _.map(division1, 'teamName')
//     let div1 = robin(div1Team.length, div1Team)

//     //console.log(`robin:`, div2);
//     this.setState({
//     div: {div2, div1}
//     })
    

//     console.log(`state: `, this.state);


//     //console.log('pull lodash: ', division1)

//     //console.log(`this is the props state`, this.props.teams.teams)
//     //console.log(teams);

//     // this.setState({
//     //     draw: robin(teamsList.length, teamsList)
//     // })
//     const teamsList = _.map(division1, 'teamName')
//     let test = robin(teamsList.length, teamsList)
//     console.log(`testing:`, test)

//     // this.setState({
//     //     draw: robin(teamNumber, this.state.teams)
//     // })

//     this.setState({
//         draw: robin(teamsList.length, teamsList)
//     })
//     console.log(`checking draw state:`, this.state)

//     count = this.state.draw[0].length
    
//     if (roundsArray.length === 0) 
//         for (var i = 0; i < this.state.draw.length; i++) {
//             for (var o = 0; o < this.state.draw[0].length; o++) {
//                 // for(var x = 0; x < 2; x++) {
//                 roundsArray.push(this.state.draw[i][o]/*[x]*/) // comment will break it up into individual teams

//                 // }
//             }
//         }
//     // console.log("this is the new array", roundsArray); console.log("this is the
//     // draw array", this.state.draw);

// }

// CreateDraw() {

//     const teamNumber = this.state.teams.length;
//     this.setState({
//         draw: robin(teamNumber, this.state.teams)
//     })

//     console.log(`draw state`, this.state)
//     if (roundsArray.length === 0) 
//         for (var i = 0; i < this.state.draw.length; i++) {
//             for (var o = 0; o < this.state.draw[0].length; o++) {
//                 // for(var x = 0; x < 2; x++) {
//                 roundsArray.push(this.state.draw[i][o]/*[x]*/) // comment will break it up into individual teams

//                 // }
//             }
//         }
//     // console.log("this is the new array", roundsArray); console.log("this is the
//     // draw array", this.state.draw);

// }

// render() {

//     const rounds = roundsArray.map((team, index) => {

//         const roundNum = index / this.state.draw[0].length + 1
//         console.log('index', index)
//         console.log(`team.length`, team )
//         console.log( `roundNum`, roundNum ) 
        
//         if (roundNum % 1 === 0) 
//             return (
//                 <tr key={index}>
//                     <td>
//                         {Math.floor(roundNum)}
//                     </td>
//                     <td>
//                         {team[0]}
//                     </td>
//                     <td>
//                         {team[1]}
//                     </td>
//                 </tr>
//             )
//         else 
//             return (
//                 <tr key={index}>
//                     <td></td>
//                     <td>
//                         {team[0]}
//                     </td>
//                     <td>
//                         {team[1]}
//                     </td>
//                 </tr>
//             )

//     })

//     return (
//         <div>
//             <button onClick={this
//                 .CreateDraw
//                 .bind(this)}>CreateDraw</button>
//             <table>
//                 <tbody>
//                     <tr>
//                         <th>Round</th>
//                         <th>Home</th>
//                         <th>Away</th>
//                     </tr>

//                     {rounds}

//                 </tbody>
//             </table>
//         </div>

//     )
// }
// }


render() {
    
    const rounds = roundsArray.map((team, index) => {
        //console.log(`rounds, team,`, team)
        if(!team){
            return 
        } else {
        const roundNum = index / count + 1
        // console.log('index', index)
        // console.log(`team.length`, team )
        // console.log( `roundNum`, roundNum ) 
        
        if (roundNum % 1 === 0) {
            return (
                <tr key={index}>
                    <td>
                        {Math.floor(roundNum)}
                        {/* {console.log(`math.floor ${Math.floor(roundNum)}`)} */}
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
    }
    })


    return (
        <div>
            <button onClick={this
                .CreateDraw
                .bind(this)}>CreateDraw</button>
            <table>
                <tbody>
                    <tr>
                        <th>Round</th>
                        <th>Home</th>
                        <th>Away</th>
                    </tr>

                    {rounds}

                </tbody>
            </table>
        </div>

    )
}
}

function mapStateToProps(state){
    return{
        teams: state.teams
    }
}

export default connect(mapStateToProps, { getTeams})(CreateDraw);