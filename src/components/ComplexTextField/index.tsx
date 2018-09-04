import React, { Component } from 'react';
import { EMITTER_STORE } from '../../stores';
import { observer, inject } from 'mobx-react';
import { EmitterStoreProp } from '../../stores/emitterStore';
import TextField from '../TextField';
import _get from 'lodash/get';
import { Grid } from '@material-ui/core';

type Props = {
  configName: string;
};

@inject(EMITTER_STORE)
@observer
class ComplexTextField extends Component<Props & EmitterStoreProp> {
  render() {
    const { configName, emitterStore } = this.props;
    const { currentEmitterConfig } = emitterStore!;
    const complexObject = _get(currentEmitterConfig, configName.split('>'));
    const keys = Object.keys(complexObject);
    return (
      <Grid container spacing={8}>
        {keys.map(key => (
          // @ts-ignore
          <Grid key={key} item xs={12 / keys.length}>
            <TextField configName={`${configName}>${key}`} label={key} />
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default ComplexTextField;
