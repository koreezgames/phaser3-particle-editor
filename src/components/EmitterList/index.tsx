import React, { Component, Fragment } from 'react';
import { List, Divider } from '@material-ui/core';
import EmitterItem from '../EmitterItem';

const emitters = [0, 1, 2];

class EmitterList extends Component {
  render() {
    return (
      <List>
        {emitters.map((value, index) => {
          return (
            <Fragment key={value}>
              {index === 0 ? <Divider /> : null}
              <EmitterItem />
              <Divider />
            </Fragment>
          );
        })}
      </List>
    );
  }
}

export default EmitterList;
