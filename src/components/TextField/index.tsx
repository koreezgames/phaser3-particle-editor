import React, { Component } from 'react';
import { EMITTER_STORE } from '../../stores';
import { observer, inject } from 'mobx-react';
import { TextField as MaterialTextField } from '@material-ui/core';
import { EmitterStoreProp } from '../../stores/emitterStore';
import _get from 'lodash/get';
import _startCase from 'lodash/startCase';

type Props = {
  configName: string;
  hideLabel?: boolean;
  label?: string;
} & Partial<DefaultProps>;

type DefaultProps = Readonly<typeof defaultProps>;

const defaultProps = {
  type: 'number' as 'number' | 'text',
  hideLabel: false,
};

@inject(EMITTER_STORE)
@observer
class TextField extends Component<Props & EmitterStoreProp> {
  static defaultProps = defaultProps;

  render() {
    const { configName, label, type, hideLabel, emitterStore } = this.props;
    const { currentEmitterConfig, changeEmitterConfig } = emitterStore!;
    const value = _get(currentEmitterConfig, configName.split('>'));
    const textFieldLabel = !hideLabel ? label || _startCase(configName) : null;
    const textFieldError = value === '';

    return (
      <MaterialTextField
        error={textFieldError}
        defaultValue={value}
        label={textFieldLabel}
        type={type}
        onChange={event => {
          const newValue = event.target.value;
          const configValue =
            type === 'number' && newValue !== '' ? +newValue : newValue;
          changeEmitterConfig(configName, configValue);
        }}
      />
    );
  }
}

export default TextField;
