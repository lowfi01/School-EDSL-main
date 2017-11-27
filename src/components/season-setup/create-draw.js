import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
let robin = require('roundrobin');
import moment from 'moment';
import _ from 'lodash';
import { Table, ButtonToolbar, SplitButton, MenuItem, Panel } from 'react-bootstrap'

//IMPORT ACTIONS
import { getTeams, postRound, postTable, postDates } from './../../action';

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

        this.setState({
            value: false
        })
        let team1 = this.props.teams.teams;
        let team2 = this.props.teams.teams;
        let team3 = this.props.teams.teams;

        const division1 = _.remove(team1, team => {
            //console.log(`lodash remove:`, team.division.divCode)
            return team.division.divCode == 'div1' && 'div3';
        });

        const divNames1 = _.map(division1, 'teamName')
        let div1 = robin(division1.length, division1)
        console.log(`list of teams:`, divNames1);

        const division2 = _.remove(team2, team => {
            //console.log(`lodash remove:`, team.division.divCode)
            return team.division.divCode == 'div2' && 'div3';
        });

        const divNames2 = _.map(division2, 'teamName')
        let div2 = robin(division2.length, division2)

        const division3 = _.remove(team3, team => {
            // console.log(`lodash remove:`, team.division.divCode)
            return team.division.divCode == 'div3' && 'div1';
        });

        const divNames3 = _.map(division3, 'teamName')
        let div3 = robin(division3.length, division3)

        // console.log(`round robin: `, div1) console.log(`round robin: `, div2)
        // console.log(`round robin: `, div3)

        this.setState({
            draw: {
                div1,
                div2,
                div3
            }
        })

        // logic to add dates to table console.log(`season state:
        // ${this.props.season.season.startDate}`) console.log(`season state:
        // ${this.props.season.season.endDate}`) console.log(`this is the non playing
        // days:`, this.props.season.season.other) console.log(`this is the playing
        // days:`, this.state.dates) console.log(`all rounds = ${this.state.draw},
        // current div passed by drop down menu = ${this.state.draw[`${div}`]}`,) //
        // this.props.season.season.other.map(x => {    console.log(x) })

        let str = this.props.season.season.startDate;
        let res = str.split("-");
        let end = this.props.season.season.endDate;
        let resEnd = end.split("-");
        let year = parseInt(res[0], 10);
        let month = parseInt(res[1], 10);
        let day = parseInt(res[2], 10);
        let endYear = parseInt(resEnd[0], 10);

        // console.log(`state`, this.state)
        let monthCheck = 30;
        let array = [];
        // create fixed index, to prevent null inserts
        var index = 0;
        const starting = moment(`${res[0]}${res[1]}${res[2]}`);
        const ending = moment(`${resEnd[0]}${resEnd[1]}${resEnd[2]}`);
        this.setState({
            startingDate: year,
            endingDate: endYear
        });
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
            let pushMonth;
            let pushDay;
            if (month < 10) {
                pushMonth = `0${month}`
            } else {
                pushMonth = month;
            }
            if (day < 10) {
                pushDay = `0${day}`;
            } else {
                pushDay = day;
            }
            var numDate = `${year}-${pushMonth}-${pushDay}`
            array[index] = numDate;
            // array[index] = date;
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

        // this is the non playing days array console.log("this is bye days:",
        // this.props.season.season.other);
        let otherArr = this.props.season.season.other;
        // console.log(`length:` ,this.props.season.season.other.length )

        for (let p = 0; p < array.length; p++) {
            for (let z = 0; z <= otherArr.length - 1; z++) {
                // console.log(`z: ${z}}`)
                if (array[p] == otherArr[z].startDate) {
                    // console.log(`days`, array[p]); console.log(`otherArr`,
                    // otherArr[z].startDate);
                    array.splice(p, 1);
                }
            }

        }
        // console.log(`length:` ,this.props.season.season.other.length )
        // console.log(`otherArr`, otherArr); console.log(`array`, array);

        this.setState({
            dates: array
        })
        this.props.postDates(array)
    }

    onSplitButton(text) {
        var term = text.target.text
        // console.log(`state`, this.state) logic for fixing dates let datesArr =
        // this.state.dates; let nonPlayArr = this.props.season.season.other; let
        // divisionArr = `div${term}`; console.log(`datesArr`, datesArr);
        // console.log(`nonPlayArr`, nonPlayArr); for (let p = o; p < datesArr.length;
        // p++) {     for (let z = 0; z < nonPlayArr; z++)         if (datesArr[p] ==
        // nonPlayArr[z].startDate){         divisionArr[p]         } }
        let time = '0';

        if (term == 1)
            time = "9:00"
        else if (term == 2)
            time = "11:30"
        else
            time = "3:00"

        this.setState({
            term,
            divTerm: term,
            time
        })
        // console.log(`term`, this.state.draw.div1)


        let div = `div${term}`
        this.setState({
            currentDiv: `div${term}`
        })
        let holdMeBaby = this.state.draw[`${div}`]
        // console.log(`draw`, this.state.draw[`${div}`])

        let roundsArray = [];
        let hold = this.state.draw;
        // console.log(`holdMebaby:`, hold[`${div}`])

        for (var i = 0; i < holdMeBaby.length; i++) {
            for (var o = 0; o < holdMeBaby[0].length; o++) {
                // for(var x = 0; x < 2; x++) { console.log(`holdMeBaby count: ${i} ${o}`,
                // holdMeBaby[i][o])
                roundsArray.push(holdMeBaby[i][o] /*[x]*/ ) // comment will break it up into individual teams

            // }
            }
        }



        let newDraw = [];
        for (var i = 0; i < holdMeBaby.length; i++) {
            for (var o = 0; o < holdMeBaby[0].length; o++) {
                console.log(holdMeBaby[0].length);
                newDraw.push({
                    roundNumber: i + 1,
                    game: o + 1,
                    homeTeam: holdMeBaby[i][o][0].teamName,
                    awayTeam: holdMeBaby[i][o][1].teamName,
                    date: this.state.dates[i],
                    divCode: div,
                    goalsHome: null,
                    goalsAway: null,
                    lock: false,
                    season: `${this.state.startingDate}-${this.state.endingDate}`,
                })
            }
        }

        this.setState({
            currentDraw: newDraw,
            currentSeason: `${this.state.startingDate}-${this.state.endingDate}`
        })
        console.log(`holdMeBaby:`, holdMeBaby);
        console.log(newDraw);

        // this.props.postRound(newDraw[1]) console.log(`roundsArray`, roundsArray)
        this.setState({
            drawTeam: roundsArray,
            holdMeBaby
        })
        console.log('this be draw team', roundsArray);
    // console.log(`drawTeam:`, roundsArray); console.log(`date:`,
    // this.state.dates);
    }

    saveDraw(e) {
        e.preventDefault();
        // CREATE DRAW LOGIC
        this.state.currentDraw.map((x) => {
            this
                .props
                .postRound(x)
        })

        console.log('this.state.time', this.state.time);
        console.log('this.state.dates', this.state.dates);
        this.props.postTable(this.state.holdMeBaby, this.state.currentDiv, this.state.currentSeason, this.state.time, this.state.dates);
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
                //console.log(`draw`, this.state.draw[`div${this.state.term}`][0])
                let roundNum = (index / num + 1);
                // console.log(`result mod`, (roundNum % 1)) for (let x = 0; x <
                // this.props.season.season.other.length; x++) {     const check =
                // this.props.season.season.other;     console.log("hello");     if
                // (this.state.dates[Math.floor(roundNum) - 1] == check[x].startDate) {
                // return (             <tr key={index}>                 <td>
                //  {check[x].startDate}                 </td>             </tr>         )     }
                // }



                if (roundNum % 1 === 0) {
                    return (
                        <tr key={ index }>
                          <td>
                            { this.state.dates[Math.floor(roundNum) - 1] }
                          </td>
                          <td>
                            { this.state.time }
                          </td>
                          <td>
                            { team[0].teamName }
                          </td>
                          <td>
                            <a href={ `https://www.google.com/maps/place/${encodeURI(team[0].club.location).replace(/%20/g,"+")}` }>
                              { team[0].club.location }
                            </a>
                          </td>
                          <td>
                            { team[1].teamName }
                          </td>
                        </tr>
                    )
                } else {
                    return (
                        <tr key={ index }>
                          <td></td>
                          <td>
                          </td>
                          <td>
                            { team[0].teamName }
                          </td>
                          <td>
                            <a href={ `https://www.google.com/maps/place/${encodeURI(team[0].club.location).replace(/%20/g,"+")}` } target="_blank">
                              { team[0].club.location }
                            </a>
                          </td>
                          <td>
                            { team[1].teamName }
                          </td>
                        </tr>
                    )
                }
            })

        return (
            <Panel className="draw-panel">
              <div className="draw-content" style={ { 'padding-left': '1em', 'padding-bottom': '1em' } }>
                <Button className="btn btn-primary" onClick={ this.createDraw
                                                                  .bind(this) } disabled={ !this.state.value }>Create Draw</Button>
                <SplitButton disabled={ this.state.value } title={ `View division ${this.state.divTerm} draw` } pullRight id="split-button-pull-right">
                  <MenuItem onClick={ (event) => {
                                          this.onSplitButton(event)
                                      } } eventKey="1">1</MenuItem>
                  <MenuItem onClick={ (event) => {
                                          this.onSplitButton(event)
                                      } } eventKey="2">2</MenuItem>
                  <MenuItem onClick={ (event) => {
                                          this.onSplitButton(event)
                                      } } eventKey="3">3</MenuItem>
                </SplitButton>
              </div>
              <div className="create-draw">
                <Table striped bordered condensed hover>
                  <tbody>
                    <tr>
                      <th href="https://www.google.com/maps/place/11+San+Martin+Dr,+Croydon+North+VIC+3136">Round</th>
                      <th>Time</th>
                      <th>Home</th>
                      <th>Location</th>
                      <th>Away</th>
                    </tr>
                    { draw }
                  </tbody>
                </Table>
              </div>
              <span className="pull-right">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <Button
                        className="btn pull-right"
                        onClick={ e => {
                                      this
                                          .saveDraw(e)
                                  } }>Save Draw</Button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </span>
            </Panel>
        )
    }
}

function mapStateToProps(state) {
    return {
        teams: state.teams,
        season: state.season
    }
}

export default connect(mapStateToProps, {
    getTeams,
    postRound,
    postTable,
    postDates
})(CreateDraw);
