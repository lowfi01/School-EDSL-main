import React, { Component } from 'react';
import { connect } from "react-redux";
import { Table } from 'react-bootstrap';
import TableItem from './table-item';

// ACTIONS
import { getTable, getSeasonTable, getDate } from './../../action';


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


class TableDisplay extends Component {
  constructor() {
    super()

    this.state = {
      seasonTerm: "Season"
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.setupData = this.setupData.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    // console.log(`render button`, this.state)
    // console.log(`props`, this.props)

  }
  componentWillMount() {
    this.props.getSeasonTable();
    this.props.getDate();
  //this.props.getTable("2017-2018");
  }

  componentWillReceiveProps(nextProps) {
    console.log(`nextProps`, nextProps)
    if (this.props.tables !== nextProps.tables) {
      this.setupData(nextProps.tables);
    }
  }

  setupData(arr) {
    // arr.map((array, index) => {
    //   this.setState({
    //     [array.table[0][0].division.divCode]: array
    //   })
    // // console.log('ARRAY', array.table);
    // // console.log('state', this.state);
    // })
  }

  renderTable(data, i) {
    console.log(data);

    return (
    data.map((x, index) => {
      const num = data.length;
      let roundNum = (index / num + 1);



      if (roundNum % 1 === 0) {
        return (
          <tr key={ index }>
            <td>
              { this.props.dates.dates[i] }
            </td>
            <td>
              { x[0].teamName }
            </td>
            <td>
              <a href={ `https://www.google.com/maps/place/${encodeURI(x[0].club.location).replace(/%20/g,"+")}` }>
                { x[0].club.location }
              </a>
            </td>
            <td>
              { x[1].teamName }
            </td>
          </tr>
        )
      } else {
        return (
          <tr key={ index }>
            <td></td>
            <td>
              { x[0].teamName }
            </td>
            <td>
              <a href={ `https://www.google.com/maps/place/${encodeURI(x[0].club.location).replace(/%20/g,"+")}` }>
                { x[0].club.location }
              </a>
            </td>
            <td>
              { x[1].teamName }
            </td>
          </tr>
        )
      }

    })
    )
  }




  render() {
    return (
      <div>
        <div>
          <label htmlFor="">Select Season: </label>
          <TableItem onCallback={ (season) => {
                                    this.setState({
                                      season
                                    });
                                  
                                  } } draw={ removeDouble(this.props.tableSeason, 'currentSeason') } term={ this.state.seasonTerm } />
          <TableItem onCallback={ (division) => {
                                    this.setState({
                                      division
                                    });
                                    this.props.getTable(this.state.season, division);
                                  } } draw={ removeDouble(this.props.tableSeason, 'division') } term={ "Division" } />
        </div>
        <Table bordered condensed hover>
          <thead>
            <tr>
              <th>Round</th>
              <th>Home</th>
              <th>Location</th>
              <th>Away</th>
            </tr>
          </thead>
          <tbody>
            { this.props.tables.map(this.renderTable.bind(this)) }
          </tbody>
        </Table>
      </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    tables: state.table.table,
    tableSeason: state.table.tableSeason,
    dates: state.dates.dates
  }
}

export default connect(mapStateToProps, {
  getTable,
  getSeasonTable,
  getDate
})(TableDisplay);