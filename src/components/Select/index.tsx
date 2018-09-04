import React, { Component } from 'react';
import { EMITTER_STORE } from '../../stores';
import { observer, inject } from 'mobx-react';
import { Select as MaterialSelect, MenuItem } from '@material-ui/core';
import { EmitterStoreProp } from '../../stores/emitterStore';
import { SelectProps } from '@material-ui/core/Select';

interface Props extends SelectProps {
  configName: string;
  options: any[];
  label?: string;
}

@inject(EMITTER_STORE)
@observer
class Select extends Component<Props & EmitterStoreProp> {
  render() {
    const {
      configName,
      label,
      options,
      emitterStore,
      ...restProps
    } = this.props;
    const { currentEmitterConfig, changeEmitterConfig } = emitterStore!;
    const value = currentEmitterConfig[configName];

    return (
      <MaterialSelect
        fullWidth
        value={value}
        onChange={event => {
          changeEmitterConfig(configName, event.target.value);
        }}
        name={label || configName}
        {...restProps}
      >
        {options.map(({ text, value: option }) => (
          <MenuItem key={text} value={option}>
            {text}
          </MenuItem>
        ))}
      </MaterialSelect>
    );
  }
}

export default Select;
