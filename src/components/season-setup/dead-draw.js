import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';


//IMPORT ACTIONS
import { getTeams } from './../../action';
 
var robin = require('roundrobin');

var draw = [];

var count;

var roundsArray = [];

var teams = [
    'Richmond',
    'Geelong',
    'Adelaide',
    'GWS',
    'Bulldogs',
    'James',
    'DylanIsAGirl',
    'hey',
    'Penis',
    '^Standard',
    'NalinJayIsSexy'
]


class CreateDraw extends Component{
componentWillMount() {
    this
        .props
        .getTeams();

}
constructor() {
    super()

    
    this.state = {
        teams,
        draw,
    }

}



CreateDraw() {

    
    //const teamNumber = this.state.teams.length;
    // Get teams from APP state & saves only team names into array
    
    // logic for pulling names from array
    //const teamsList = _.map(this.props.teams.teams, 'teamName')

    // create logic for making round robin based off 

    // Create an array list for div 1 teams
    const division2 = _.remove(this.props.teams.teams, team => {
        //console.log(`lodash remove:`, team.division.divCode)
        return team.division.divCode == 'div1';
    });

    
    //console.log('pull lodash: ', division1)

    // Create an array list for div2 teams
    const division1 = _.remove(this.props.teams.teams, team => {
        //console.log(`lodash remove:`, team.division.divCode)
        return team.division.divCode == 'div2';
    });

    // add to state as it's own object
    const div2Team = _.map(division2, 'teamName')
    let div2 = robin(div2Team.length, div2Team)
    const div1Team = _.map(division1, 'teamName')
    let div1 = robin(div1Team.length, div1Team)

    //console.log(`robin:`, div2);
    this.setState({
    div: {div2, div1}
    })
    

    console.log(`state: `, this.state);


    //console.log('pull lodash: ', division1)

    //console.log(`this is the props state`, this.props.teams.teams)
    //console.log(teams);

    // this.setState({
    //     draw: robin(teamsList.length, teamsList)
    // })
    const teamsList = _.map(division1, 'teamName')
    let test = robin(teamsList.length, teamsList)
    console.log(`testing:`, test)

    // this.setState({
    //     draw: robin(teamNumber, this.state.teams)
    // })

    this.setState({
        draw: robin(teamsList.length, teamsList)
    })
    console.log(`checking draw state:`, this.state)

    count = this.state.draw[0].length
    
    if (roundsArray.length === 0) 
        for (var i = 0; i < this.state.draw.length; i++) {
            for (var o = 0; o < this.state.draw[0].length; o++) {
                // for(var x = 0; x < 2; x++) {
                roundsArray.push(this.state.draw[i][o]/*[x]*/) // comment will break it up into individual teams

                // }
            }
        }
    // console.log("this is the new array", roundsArray); console.log("this is the
    // draw array", this.state.draw);

}

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