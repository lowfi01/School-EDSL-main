import React, { Component } from 'react';


var robin = require('roundrobin');

var draw = [];

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
    
constructor() {
    super()
    this.state = {
        teams,
        draw
    }

}

CreateDraw() {

    const teamNumber = this.state.teams.length;
    this.setState({
        draw: robin(teamNumber, this.state.teams)
    })
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

render() {

    const rounds = roundsArray.map((team, index) => {

        const roundNum = index / this.state.draw[0].length + 1
        if (roundNum % 1 === 0) 
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
        else 
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

export default CreateDraw;