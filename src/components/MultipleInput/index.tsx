import _range from 'lodash/range';
import _uniqueId from 'lodash/uniqueId';
import React, { Component } from 'react';
import { EMITTER_STORE } from '../../stores';
import { observer, inject } from 'mobx-react';
import { EmitterStoreProp } from '../../stores/emitterStore';
import TextField from '../TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import { Grid, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { emitterConfig } from '../../constants';

type Props = {
  configName: string;
  type: 'TextField' | 'ColorPicker';
};

@inject(EMITTER_STORE)
@observer
class MultipleInput extends Component<Props & EmitterStoreProp> {
  getInputComponent = (length: number) => {
    const { type, configName, emitterStore } = this.props;
    const { currentEmitterConfig, changeEmitterConfig } = emitterStore!;
    const values: any[] = currentEmitterConfig[configName];

    return type === 'TextField'
      ? _range(length).map(value => {
          const last = value === length - 1;
          const addBtn = last ? (
            <Grid item xs={2}>
              <IconButton
                aria-label="Add"
                color="primary"
                onClick={() =>
                  changeEmitterConfig(configName, [
                    ...values,
                    emitterConfig[configName][0],
                  ])
                }
              >
                <AddIcon />
              </IconButton>
            </Grid>
          ) : null;

          return (
            <Grid container spacing={0} key={_uniqueId()}>
              <Grid item xs={last ? 8 : 10}>
                <TextField configName={`${configName}>${value}`} hideLabel />
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  aria-label="Delete"
                  disabled={length === 1}
                  onClick={() => {
                    values.splice(value, 1);
                    changeEmitterConfig(configName, values);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
              {addBtn}
            </Grid>
          );
        })
      : null;
  };

  render() {
    const { configName, emitterStore } = this.props;
    const { currentEmitterConfig } = emitterStore!;
    const values = currentEmitterConfig[configName];
    const length = values.length;

    return this.getInputComponent(length);
  }
}

export default MultipleInput;
