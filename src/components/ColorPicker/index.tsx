import React, { Component } from 'react';
import { EMITTER_STORE } from '../../stores';
import { observer, inject } from 'mobx-react';
import { EmitterStoreProp } from '../../stores/emitterStore';
import _get from 'lodash/get';
import _startCase from 'lodash/startCase';
import MaterialColorPicker from 'material-ui-color-picker';

type Props = {
  configName: string;
};

@inject(EMITTER_STORE)
@observer
class ColorPicker extends Component<Props & EmitterStoreProp> {
  render() {
    const { configName, emitterStore } = this.props;
    const { currentEmitterConfig, changeEmitterConfig } = emitterStore!;
    const value = _get(currentEmitterConfig, configName.split('>'));
    const valueHex = `#${value.toString(16)}`;

    return (
      <MaterialColorPicker
        defaultValue={valueHex}
        onChange={(color: string) => {
          changeEmitterConfig(configName, parseInt(color.substring(1), 16));
        }}
      />
    );
  }
}

const colorPicker = (params: any) => {
  return <ColorPicker {...params} />;
};

export { colorPicker };
export default ColorPicker;
