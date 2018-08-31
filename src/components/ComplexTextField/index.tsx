import React, { Component } from 'react';
import { EMITTER_STORE } from '../../stores';
import { observer, inject } from 'mobx-react';
import { EmitterStoreProp } from '../../stores/emitterStore';
import TextField from '../TextField';
import _get from 'lodash/get';

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
    return Object.keys(complexObject).map(key => (
      <TextField key={key} configName={`${configName}>${key}`} label={key} />
    ));
  }
}

export default ComplexTextField;
