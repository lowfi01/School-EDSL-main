import React, { Component } from 'react';

// Import Components
import DisplayLadder from './ladder/ladderDisplay';

class Ladder extends Component {
  render() {
    return (
      <div>
        <DisplayLadder />
      </div>
      );
  }
}

export default Ladder;