import React from 'react';
import { SplitButton, MenuItem } from 'react-bootstrap';

class LadderItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: false
    }
  }

  render() {
    const item = this
      .props
      .draw
      .map((x, index) => {
        return (

          <MenuItem onClick={ e => {
                      this.props.onCallback(x);
                      this.setState({
                        term: x,
                        value: true,
                      })
                    } } key={ index }>
          { x }
          </MenuItem>

        )
      })
    return (
      <SplitButton id="2323" className="dropdown-round" disabled={ false } title={ !this.state.value ? this.props.term : this.state.term } pullRight>
        { item }
      </SplitButton>
    )
  }
}

export default LadderItem;