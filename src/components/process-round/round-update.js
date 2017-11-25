import React, { Component } from 'react';
import { Badge, Table, SplitButton, MenuItem, Panel, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import _ from 'lodash';

//Actions
import { getDraw, getDrawSetup, getDrawRound, patchRound, patchRoundLock } from './../../action';

//Components
import RoundItem from './round-item';

function removeDouble(a, term) {
    // a = draw term = drop down menu item
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
;

function removeDoubleNumber(a) {
    // a = draw term = drop down menu item
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
;


class RoundUpdate extends Component {
    constructor() {
        super()


        this.state = ({
            submit: true,
            defaultSeason: "2017 - 2018",
            seasonTerm: "Season",
            wait: true,
            currentRound: [],
            time: "  Loading...",
            data: {
                0: {
                    home: null,
                    away: null
                },
                1: {
                    home: null,
                    away: null
                },
                2: {
                    home: null,
                    away: null
                },
                3: {
                    home: null,
                    away: null
                },
                4: {
                    home: null,
                    away: null
                },
                5: {
                    home: null,
                    away: null
                },
                6: {
                    home: null,
                    away: null
                },
                7: {
                    home: null,
                    away: null
                },
                8: {
                    home: null,
                    away: null
                },
                9: {
                    home: null,
                    away: null
                },
            },


        })

        this.setupRounds = this.setupRounds.bind(this);
        this.getRound = this.getRound.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.setData = this.setData.bind(this);
        this.lockRound = this.lockRound.bind(this);
        this.findLock = this.findLock.bind(this);
        this.disableSubmit = this.disableSubmit.bind(this);
    }

    componentWillMount() {
        this
            .props
            .getDraw();

    }

    componentWillReceiveProps(nextProps) {
        console.log('this.nextProps.round: ', nextProps.round)
        console.log('this.props', this.props)
        console.log('this.nextProps:', nextProps)

        if (this.props.drawRound != nextProps.drawRound) {
            this.findLock(nextProps.drawRound)
        }

        if (nextProps.round.length > 1) {
            this.setData(nextProps.round)
            this.disableSubmit(nextProps.round)
        }

    }

    findLock(roundArray) {
        let holdArray = [];
        roundArray.map((x) => {
            if (x.lock == true) {
                console.log(`we have found a lock true!!:`, x.roundNumber)
                holdArray.push(x.roundNumber);
            }
        })

        const lockResult = removeDoubleNumber(holdArray);
        let drawResult = removeDouble(roundArray, 'roundNumber');
        drawResult = drawResult.filter((x) => {
            return lockResult.indexOf(x) < 0;
        })

        this.setState({
            lockTermRound: drawResult[0],
            getRoundTerm: drawResult[0]
        });

        this.getRound(drawResult[0]);
    }


    disableSubmit(data) {
        data.map((x, index) => {
            const {home, away} = this.state.data[index];
            if (home == 0 && away == 0) {
                console.log(`VALUE IS  = to 0`);
                this.setState({
                    submit: true
                })
            } else if (home !== 0 && away !== 0) {
                // console.log(`away:`, away);
                // console.log(`home:`, home);
                console.log(`VALUE IS = to null`);
                this.setState({
                    submit: false
                })
            }
        })
    }

    setData(data) {
        data.map((x, index) => {
            this.setState({
                time: x.date,
                data: {
                    ...this.state.data,
                    ...this.state.data[index] = {
                        ...this.state.data[index],
                        _id: x._id,
                        home: x.goalsHome,
                        away: x.goalsAway,
                        lock: x.lock
                    }
                }
            })
        })
    }

    setupRounds(div) {
        console.log(this.state);
        let {season, division} = this.state
        this.props.getDrawSetup(season, div);
    }

    getRound(term) {
        let {season, division} = this.state
        console.log(`division: ${division}`)
        this.props.getDrawRound(season, division, term);

    }

    handleSubmit(e, term) {
        console.log(`state!!!!!!!!!:`, this.state)

        e.preventDefault();

        for (let i = 0; i < this.props.round.length; i++) {
            let {home, away, _id} = this.state.data[i];
            console.log(this.state.data[i])
            this.props.patchRound(home, away, _id);
        }

        this.getRound(this.state.getRoundTerm);

    }

    onChangeHandler = (e, index, term, id) => {

        this.setState({
            data: {
                ...this.state.data,
                ...this.state.data[`${index}`] = {
                    ...this.state.data[`${index}`],
                    _id: `${id}`,
                    [`${term}`]: e.target.value,
                }
            },
        });

        // console.log('e.target.value: ', e.target.value);
        console.log(`state`, this.state);
    }


    lockRound(e) {
        e.preventDefault();

        for (let i = 0; i < this.props.round.length; i++) {
            let {lock, _id} = this.state.data[i];

            const value = true;
            if (lock == false) {
                value == true
            } else {
                value == false
            }

            console.log(`lockRound: ${value} ${_id} `)
            this.props.patchRoundLock(true, _id);

        }
        this.getRound(this.state.getRoundTerm);
    }

    lockRoundSingle(e, _id, lock) {
        e.preventDefault();

        this.props.patchRoundLock(!lock, _id);
        this.getRound(this.state.lockTermRound);

    }

    renderForms() {


        return (
        this.props.round.map((x, index) => {



            const classNameHome = `${this.state.data[`${index}`].home? `success`: `error`}`;
            const classNameAway = `${this.state.data[`${index}`].away? `success`: `error`}`;
            const className = x.lock ? `btn-success glyphicon glyphicon-remove-sign btn-xs` : `btn btn-danger glyphicon glyphicon-lock btn-xs`;
            const lockGame = x.lock ? `Unlock game` : `lock game`;
            let disable = false;
            let lockPad = x.goalsHome && x.awayTeam ? false : true;
            if (x.lock) {
                disable = true;
            }
            return (

                <tr key={ index }>
                  <td>
                    { x.homeTeam }
                  </td>
                  <td>
                    <FormGroup validationState={ classNameHome }>
                      <ControlLabel>Goals</ControlLabel>
                      <FormControl id={ `${x.homeTeam}-home` } name={ `${x.homeTeam}-home` } type="text" placeholder={ x.goalsHome } value={ this.state.data[`${index}`].home || " " } disabled={ disable }
                        style={ { width: "50px" } } onChange={ e => {
                                                                   this.onChangeHandler(e, index, `home`, x._id)
                                                                   console.log(this.state)
                                                               } } />
                    </FormGroup>
                  </td>
                  <td>
                    { x.awayTeam }
                  </td>
                  <td>
                    <FormGroup validationState={ classNameAway }>
                      <ControlLabel>Goals</ControlLabel>
                      <FormControl id={ `${x.awayTeam}-away` } name={ `${x.awayTeam}-away` } type="text" placeholder={ x.goalsAway } value={ this.state.data[`${index}`].away || " " } disabled={ disable }
                        style={ { width: "50px" } } onChange={ e => {
                                                                   this.onChangeHandler(e, index, `away`, x._id);
                                                               } } />
                    </FormGroup>
                  </td>
                  <td>
                    <label>
                      { lockGame } </label>
                    <span>{ " " }  </span>
                    <Button onClick={ (e) => {
                                          this.lockRoundSingle(e, x._id, x.lock);
                                      } } className={ className } value="" disabled={ lockPad } />
                  </td>
                </tr>

            )
        })
        )


    }



    render() {

        return (
            <Panel>
              <center>
                <h2>Update Round</h2>
              </center>
              { /* <div style={ { width: "800px" } }> */ }
              <div id="id1">
                <label htmlFor="">Select Season: </label>
                <RoundItem onCallback={ (season) => {
                                            this.setState({
                                                season
                                            })
                                        } } draw={ removeDouble(this.props.draw, 'season') } term={ this.state.seasonTerm } />
              </div>
              <div>
                <label htmlFor="">Select Division: </label>
                <RoundItem onCallback={ (division) => {
                                            //console.log(`callback div:`, division)
                                            this.setState({
                                                division
                                            });
                                        
                                            //make get request for a filtered draw of division & season
                                            this.setupRounds(division);
                                        } } draw={ removeDouble(this.props.draw, 'divCode') } term={ "Division" } />
              </div>
              <div>
                <label htmlFor="">Select Round: </label>
                <RoundItem onCallback={ (getRoundTerm) => {
                                            //make get request for a single round using division, season & round number
                                            {
                                                /* console.log('this click is working') */
                                            }
                                            this.setState({
                                                getRoundTerm,
                                                lockTermRound: getRoundTerm,
                                                wait: true
                                            })
                                            this.getRound(getRoundTerm);
                                        
                                        } } draw={ removeDouble(this.props.drawRound, 'roundNumber') } term={ "Round" } />
                <span> { " " }  </span>
                <Badge>
                  { this.state.time }
                </Badge>
              </div>
              <div>
              </div>
              <Form onSubmit={ e => {
                                   this.handleSubmit(e);
                               } }>
                <Table>
                  <thead>
                    <tr>
                      <th>Home Team</th>
                      <th>Score</th>
                      <th>Away Team</th>
                      <th>Score</th>
                      <th>Round #
                        { this.state.lockTermRound }
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    { this.renderForms() }
                  </tbody>
                </Table>
                <Button type="submit" className="btn btn-success pull-right">
                  Save
                </Button>
                <Button disabled={ this.state.submit } onClick={ e => {
                                                                     this.lockRound(e)
                                                                 } } className="btn btn-danger glyphicon glyphicon-lock pull-left">Lock</Button>
                <span> { ' ' } </span>
                <Button onClick={ e => {
                                      e.preventDefault();
                                      this.setData(this.props.round);
                                  } } className="btn btn-info glyphicon glyphicon-refresh pull-left">Cancel</Button>
              </Form>
            </Panel>
        )
    }
}

function mapStateToProps(state) {
    return {
        draw: state.draw.draw,
        drawRound: state.draw.drawSetup,
        round: state.draw.round
    }
}

export default connect(mapStateToProps, {
    getDraw,
    getDrawSetup,
    getDrawRound,
    patchRound,
    patchRoundLock,
})(RoundUpdate);