import React, { Component, Fragment } from 'react';
import {
  List,
  Divider,
  Button,
  withStyles,
  WithStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import EmitterItem from '../EmitterItem';
import { EmitterStoreProp, EMITTER_STORE } from '../../stores';
import { inject, observer } from 'mobx-react';
import AddIcon from '@material-ui/icons/Add';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      height: '100vh',
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    },
  });

@inject(EMITTER_STORE)
@observer
class EmitterList extends Component<
  WithStyles<typeof styles> & EmitterStoreProp
> {
  render() {
    const { emitterStore, classes } = this.props;
    const { emitters, addEmitter } = emitterStore!;

    return (
      <div className={classes.root}>
        <List>
          {emitters.map((value: any, index: number) => {
            return (
              <Fragment key={value.name}>
                {index === 0 ? <Divider /> : null}
                <EmitterItem index={index} />
                <Divider />
              </Fragment>
            );
          })}
        </List>
        <Button
          variant="fab"
          color="primary"
          className={classes.fab}
          onClick={() => addEmitter()}
        >
          <AddIcon />
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(EmitterList);
