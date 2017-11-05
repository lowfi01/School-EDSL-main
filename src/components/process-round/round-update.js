import React, {Component} from 'react';
import {SplitButton, MenuItem, Panel} from 'react-bootstrap';
import {connect} from 'react-redux';

//Actions
import {getDraw, getDrawSetup, getDrawRound} from './../../action';

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
};

class RoundUpdate extends Component {
    constructor() {
        super()

        this.state = ({defaultSeason: "2017 - 2018", seasonTerm: "Season"})

        this.setupRounds = this.setupRounds.bind(this);
        this.getRound = this.getRound.bind(this);
    }

    componentWillMount() {
        this
            .props
            .getDraw();

    }

    setupRounds(div){
        console.log("Hello World");
        console.log(this.state);
        let {season, division} = this.state
        this.props.getDrawSetup(season, div);
    }

    getRound(term){
        let {season, division} = this.state
        this.props.getDrawRound(season,division,term);
    }

    render() {

        return (
            <Panel>
                <center>
                    <div id="id1">
                        <RoundItem
                            onCallback={(season) => {
                            this.setState({season})
                        }}
                            draw={removeDouble(this.props.draw, 'season')}
                            term={this.state.seasonTerm}/>
                    </div>
                    <div>
                        <RoundItem
                            onCallback={(division) => {
                                console.log(`callback div:`, division)
                            this.setState({division});
                            this.setupRounds(division);
                        }}
                            draw={removeDouble(this.props.draw, 'divCode')}
                            term={"Division"}/>
                    </div>
                    <div>
                        <RoundItem
                            onCallback={(term) => {
                            this.getRound(term)
                        }}
                            draw={removeDouble(this.props.drawRound, 'roundNumber')}
                            term={"Round"}/>
                    </div>
                </center>
            </Panel>
        )
    }
}

function mapStateToProps(state) {
    return {
        draw: state.draw.draw,
        drawRound: state.draw.drawSetup
    }
}

export default connect(mapStateToProps, {getDraw, getDrawSetup, getDrawRound})(RoundUpdate);