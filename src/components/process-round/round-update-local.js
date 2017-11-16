


import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';

class roundUpdateLocal extends Component {
    render() {
        return (
            <Table>
              <thead>
                <tr>
                  <th>
                    .
                  </th>
                  <th>
                    Home
                  </th>
                  <th>
                    Away
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                  </td>
                  <td>
                    <div class="card" style={ { width: "300px" } }>
                      <img class="card-img-top" src='https://cf.geekdo-images.com/images/pic2055255_md.jpg' alt="Card image" style={ { width: '100%' } } />
                      <div class="card-body">
                        <h4 class="card-title">Home Team</h4>
                        <p class="card-text">
                          <input type="text" />
                        </p>
                        <Button class="btn btn-primary">Submit</Button>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="card" style={ { width: "300px" } }>
                      <img class="card-img-top" src='https://cf.geekdo-images.com/images/pic2055255_md.jpg' alt="Card image" style={ { width: '100%' } } />
                      <div class="card-body">
                        <h4 class="card-title">Away Team</h4>
                        <p class="card-text">
                          <input type="text" />
                        </p>
                        <Button class="btn btn-primary">Submit</Button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>

            );
    }
}

export default roundUpdateLocal;