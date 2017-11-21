import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


//Import Actions
import { getTeams, getDraw, getDrawSetup, getDrawRound } from './../../action/index';


//Components
import LadderItem from './ladder-item';


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

class LadderDisplay extends Component {
  constructor() {
    super()

    // State is used for preventing null values in dropdown menu
    this.state = ({
      defaultSeason: "2017 - 2018",
      seasonTerm: "Season"
    });

    this.setupData = this.setupData.bind(this);
  }

  // MINIMIZE THIS !! this will call a list of team names for you to compare vs & setup data
  // divName1, divName2, divName3
  setupData() {
    let team1 = this.props.teams.teams;
    let team2 = this.props.teams.teams;
    let team3 = this.props.teams.teams;

    console.log(`team1`, team1);
    const division1 = _.remove(team1, team => {
      return team.division.divCode == 'div1' && 'div3';
    });

    const divNames1 = _.map(division1, 'teamName')
    console.log(`list of teams:`, divNames1);

    const division2 = _.remove(team2, team => {
      return team.division.divCode == 'div2' && 'div3';
    });

    const divNames2 = _.map(division2, 'teamName')

    const division3 = _.remove(team3, team => {
      return team.division.divCode == 'div3' && 'div1';
    });

    const divNames3 = _.map(division3, 'teamName')

    this.setState({
      divNames3,
      divNames2,
      divNames1
    })

  }


  componentWillMount() {
    // Get initial draw
    this.props.getDraw();
    this.props.getTeams();
  }


  setupRounds(div) {
    // Get draw data
    let {season, division} = this.state
    this.props.getDrawSetup(season, div);
  }

  componentWillReceiveProps(nextProp, props) {
    console.log(`props`, this.props);
    console.log(`nextProps`, nextProp);
    console.log('this.state', this.state);

    if (nextProp.drawRound !== this.props.drawRound) {
      this.setupData();
    }
  }


  render() {
    return (
      <div id="id1">
        <label htmlFor="">Select Season: </label>
        <LadderItem onCallback={ (season) => {
                                   this.setState({
                                     season
                                   })
                                 } } draw={ removeDouble(this.props.draw, 'season') } term={ this.state.seasonTerm } />
        <label htmlFor="">Select Division: </label>
        <LadderItem onCallback={ (division) => {
                                   this.setState({
                                     division
                                   });
                                   this.setupRounds(division);
                                 } } draw={ removeDouble(this.props.draw, 'divCode') } term={ "Division" } />
      </div>

      );
  }
}


function mapStateToProps(state) {
  return {
    draw: state.draw.draw,
    drawRound: state.draw.drawSetup,
    teams: state.teams
  }
}

export default connect(mapStateToProps, {
  getDraw,
  getDrawSetup,
  getDrawRound,
  getTeams
})(LadderDisplay);