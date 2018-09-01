import React, { Component } from 'react';
import { EMITTER_STORE } from '../../stores';
import { observer, inject } from 'mobx-react';
import { FormControlLabel, Switch as MaterialSwitch } from '@material-ui/core';
import { EmitterStoreProp } from '../../stores/emitterStore';
import _startCase from 'lodash/startCase';
import { SwitchProps } from '@material-ui/core/Switch';

interface Props extends SwitchProps {
  configName?: string;
  label?: string;
}

@inject(EMITTER_STORE)
@observer
class Switch extends Component<Props & EmitterStoreProp> {
  render() {
    const { configName, label, emitterStore, ...restProps } = this.props;
    const { currentEmitterConfig, changeEmitterConfig } = emitterStore!;
    const checked = currentEmitterConfig[configName!];
    return (
      <FormControlLabel
        control={
          <MaterialSwitch
            checked={checked}
            onChange={() => {
              changeEmitterConfig(configName!, !checked);
            }}
            {...restProps}
          />
        }
        label={label || _startCase(configName)}
      />
    );
  }
}

export default Switch;
