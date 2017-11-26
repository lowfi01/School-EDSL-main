import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table, Panel } from "react-bootstrap";
import _ from "lodash";

//Import Actions
import { getTeams, getDraw, getDrawSetup, getDrawRound } from "./../../action/index";

//Components
import LadderItem from "./ladder-item";

/// Algorithm to remove double string values
function removeDouble(a, term) {
  var seen = {};
  var out = [];
  var len = a.length;
  var j = 0;
  for (var i = 0; i < len; i++) {
    var item = a[i][`${term}`];
    if (seen[item] !== 1) {
      seen[item] = 1;
      out[j++] = item;
    }
  }
  return out;
}

/// Algorithm to remove double number values
function removeDoubleNumber(a) {
  var seen = {};
  var out = [];
  var len = a.length;
  var j = 0;
  for (var i = 0; i < len; i++) {
    var item = a[i];
    if (seen[item] !== 1) {
      seen[item] = 1;
      out[j++] = item;
    }
  }
  return out;
}

/// this.props.drawRound
//this.state.div1/2/3
class LadderDisplay extends Component {
  constructor() {
    super();

    // State is used for preventing null values in dropdown menu
    this.state = {
      defaultSeason: "2017 - 2018",
      seasonTerm: "Season",
      ladder: {}
    };

    this.setupData = this.setupData.bind(this);
    this.createBaseStateTemplate = this.createBaseStateTemplate.bind(this);
    this.createLadder = this.createLadder.bind(this);
  }

  createBaseStateTemplate(division) {
    this.state[division].map((x, index) => {
      this.setState({
        ...this.state,
        division,
        ladder: {
          ...this.state.ladder,
          ...(this.state.ladder[index] = {
            teamName: x,
            div: division,
            win: 0,
            loss: 0,
            draw: 0,
            points: 0,
            goals: 0,
            percent: 0,
            goalsAgainst: 0
          })
        }
      });
    });
  }

  // MINIMIZE THIS !! this will call a list of team names for you to compare vs & setup data
  // divName1, divName2, divName3
  setupData(array) {
    console.log("array", array);
    let team1 = array;
    let team2 = array;
    let team3 = array;

    console.log("team1", team1);

    const division1 = _.remove(team1, team => {
      return team.division.divCode == "div1" && "div3";
    });

    const div1 = _.map(division1, "teamName");

    const division2 = _.remove(team2, team => {
      return team.division.divCode == "div2" && "div3";
    });

    const div2 = _.map(division2, "teamName");

    const division3 = _.remove(team3, team => {
      return team.division.divCode == "div3" && "div1";
    });

    const div3 = _.map(division3, "teamName");

    this.setState({
      div3,
      div2,
      div1
    });
  }

  componentWillMount() {
    // Get initial draw
    this.props.getDraw();
    this.props.getTeams();
  }

  setupRounds(div) {
    // Get draw data
    let {season, division} = this.state;
    this.props.getDrawSetup(season, div);
  }

  componentWillReceiveProps(nextProp, props) {
    console.log(`props`, this.props);
    console.log(`nextProps`, nextProp);
    console.log("this.state", this.state);

    if (nextProp.teams !== this.props.teams) {
      this.setupData(nextProp.teams.teams);
    }

    if (nextProp.drawRound !== this.props.drawRound) {
      console.log("HELLO WORLD THIS IS DRAWROUND");
      this.createLadder(nextProp.drawRound);
    }
  }

  createLadder(drawRound) {
    var newLadder = this.state.ladder;
    for (var o = 0; o < drawRound.length; o++) {
      // console.log("First for loop");
      // Iterate over parent array
      console.log("LENGTH", drawRound.length);

      // enter each round array
      // console.log("Second for loop");

      // Home team wins
      if (drawRound[o].goalsHome > drawRound[o].goalsAway) {
        //compares scores
        const {homeTeam, awayTeam, goalsHome, divcode, goalsAway} = drawRound[
          o
        ];

        this.state[this.state.division].map((x, index) => {
          console.log("XX", x);
          if (this.state.ladder[`${index}`].teamName == homeTeam) {
            this.setState({
              ...this.state,
              ladder: {
                ...this.state.ladder,
                ...(this.state.ladder[index] = {
                  ...this.state.ladder[index],
                  win: this.state.ladder[index].win + 1,
                  points: this.state.ladder[index].points + 4,
                  goals: this.state.ladder[index].goals + goalsHome,
                  goalsAgainst: this.state.ladder[index].goalsAgainst + goalsAway
                })
              }
            });

            console.log("this.state", this.state);
          }

          if (this.state.ladder[`${index}`].teamName == awayTeam) {
            console.log("ADD LOSS TO FCKING TEAM:");
            this.setState({
              ...this.state,
              ladder: {
                ...this.state.ladder,
                ...(this.state.ladder[index] = {
                  ...this.state.ladder[index],
                  loss: this.state.ladder[index].loss + 1,
                  goals: this.state.ladder[index].goals + goalsAway,
                  goalsAgainst: this.state.ladder[index].goalsAgainst + goalsHome
                })
              }
            });
          }
        });
      } else if (drawRound[o].goalsHome < drawRound[o].goalsAway) {
        //Away team WINS

        this.state[this.state.division].map((x, index) => {
          const {homeTeam, awayTeam, goalsAway, goalsHome, divcode, goalsAgainst} = drawRound[o];

          if (this.state.ladder[`${index}`].teamName == awayTeam) {
            this.setState({
              ...this.state,
              ladder: {
                ...this.state.ladder,
                ...(this.state.ladder[index] = {
                  ...this.state.ladder[index],
                  win: this.state.ladder[index].win + 1,
                  points: this.state.ladder[index].points + 4,
                  goals: this.state.ladder[index].goals + goalsAway,
                  goalsAgainst: this.state.ladder[index].goalsAgainst + goalsHome
                })
              }
            });

            console.log("AWAY TEAM this.state", this.state);
          }

          if (this.state.ladder[`${index}`].teamName == homeTeam) {
            console.log("ADD LOSS TO FCKING TEAM:");
            this.setState({
              ...this.state,
              ladder: {
                ...this.state.ladder,
                ...(this.state.ladder[index] = {
                  ...this.state.ladder[index],
                  loss: this.state.ladder[index].loss + 1,
                  goals: this.state.ladder[index].goals + goalsHome,
                  goalsAgainst: this.state.ladder[index].goalsAgainst + goalsAway
                })
              }
            });
          }
        });
      } else {
        // DRAWS
        this.state[this.state.division].map((x, index) => {
          const {homeTeam, awayTeam, goalsAway, goalsHome, divcode, goalsAgainst} = drawRound[o];

          if (this.state.ladder[`${index}`].teamName == awayTeam) {
            this.setState({
              ...this.state,
              ladder: {
                ...this.state.ladder,
                ...(this.state.ladder[index] = {
                  ...this.state.ladder[index],
                  draw: this.state.ladder[index].draw + 1,
                  points: this.state.ladder[index].points + 2,
                  goals: this.state.ladder[index].goals + goalsAway,
                  goalsAgainst: this.state.ladder[index].goalsAgainst + goalsHome
                })
              }
            });

            console.log("AWAY TEAM this.state", this.state);
          }

          if (this.state.ladder[`${index}`].teamName == homeTeam) {
            console.log("ADD A DRAW");
            this.setState({
              ...this.state,
              ladder: {
                ...this.state.ladder,
                ...(this.state.ladder[index] = {
                  ...this.state.ladder[index],
                  draw: this.state.ladder[index].draw + 1,
                  points: this.state.ladder[index].points + 2,
                  goals: this.state.ladder[index].goals + goalsHome,
                  goalsAgainst: this.state.ladder[index].goalsAgainst + goalsAway
                })
              }
            });
          }
        });
      }
    }
    newLadder = this.state.ladder;

    // Calculates percentage
    for (var i = 0; i < this.state[this.state.division].length; i++) {
      newLadder[`${i}`].percent = (newLadder[`${i}`].goals /
      newLadder[`${i}`].goalsAgainst *
      100).toFixed(2);
    }
    //sorting algorithm by points

    for (var i = 1; i < this.state[this.state.division].length; i++) {
      var j = i;
      while (j > 0 && newLadder[`${j - 1}`].points < newLadder[`${j}`].points) {
        var temp = newLadder[`${j}`];
        newLadder[`${j}`] = newLadder[`${j - 1}`];
        newLadder[`${j - 1}`] = temp;
        j -= 1;
      }
    }

    this.setState({
      ladder: newLadder
    });

  //sorts the ladder
  }

  renderLadder() {
    console.log(this.state.ladder);
    if (!_.isEmpty(this.state.ladder)) {
      console.log("not empty");
      return this.state[this.state.division].map((team, index) => {
        return (
          <tr key={ index }>
            <td>
              { index + 1 }
            </td>
            <td>
              { this.state.ladder[index].teamName }
            </td>
            <td>
              { this.state.ladder[index].points }
            </td>
            <td>
              { this.state.ladder[index].win }
            </td>
            <td>
              { this.state.ladder[index].loss }
            </td>
            <td>
              { this.state.ladder[index].goals }
            </td>
            <td>
              { this.state.ladder[index].goalsAgainst }
            </td>
            <td>
              { this.state.ladder[index].percent }
            </td>
          </tr>
          );
      });
    }
  }

  render() {
    return (
      <div>
        <center>
          <h4>Ladder</h4></center>
        <div id="id1">
          <label htmlFor="">Select Season: </label>
          <LadderItem onCallback={ season => {
                                     this.setState({
                                       season
                                     });
                                   } } draw={ removeDouble(this.props.draw, "season") } term={ this.state.seasonTerm } />
          <label htmlFor="">Select Division: </label>
          <LadderItem onCallback={ division => {
                                     this.setState({
                                       ...this.state,
                                       division
                                     });
                                     this.setupRounds(division);
                                     this.createBaseStateTemplate(division);
                                     console.log("division", division);
                                   } } draw={ removeDouble(this.props.draw, "divCode") } term={ "Division" } />
        </div>
        <div>
          <Table striped bordered condensed hover>
            <tbody>
              <tr>
                <th>Position</th>
                <th>Team</th>
                <th>points</th>
                <th>win</th>
                <th>Loss</th>
                <th>Goals</th>
                <th>Goals Against</th>
                <th>%</th>
              </tr>
              { this.renderLadder() }
            </tbody>
          </Table>
        </div>
      </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    draw: state.draw.draw,
    drawRound: state.draw.drawSetup,
    teams: state.teams
  };
}

export default connect(mapStateToProps, {
  getDraw,
  getDrawSetup,
  getDrawRound,
  getTeams
})(LadderDisplay);
