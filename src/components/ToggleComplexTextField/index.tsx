import React, { Component, Fragment } from 'react';
import { EMITTER_STORE } from '../../stores';
import { observer, inject } from 'mobx-react';
import { EmitterStoreProp } from '../../stores/emitterStore';
import _startCase from 'lodash/startCase';
import { SwitchProps } from '@material-ui/core/Switch';
import Switch from '../Switch';
import ComplexTextField from '../ComplexTextField';

interface Props extends SwitchProps {
  configName: string;
  complex: any;
}

@inject(EMITTER_STORE)
@observer
class ToggleComplexTextField extends Component<Props & EmitterStoreProp> {
  render() {
    const { configName, complex, emitterStore } = this.props;
    const { currentEmitterConfig, changeEmitterConfig } = emitterStore!;

    return (
      <Fragment>
        <Switch
          label="Enable"
          onChange={event => {
            const configValue = event.target.checked ? complex : undefined;
            changeEmitterConfig(configName, configValue);
          }}
        />
        {currentEmitterConfig[configName] ? (
          <ComplexTextField configName={configName} />
        ) : null}
      </Fragment>
    );
  }
}

export default ToggleComplexTextField;
