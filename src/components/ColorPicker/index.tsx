import React, { Component } from 'react';
import { EMITTER_STORE } from '../../stores';
import { observer, inject } from 'mobx-react';
import { EmitterStoreProp } from '../../stores/emitterStore';
import _get from 'lodash/get';
import _startCase from 'lodash/startCase';
import { TextField } from '@material-ui/core';
import { ChromePicker } from 'react-color';
import { getPickerColor } from '../../utils';

type Props = {
  configName: string;
};

@inject(EMITTER_STORE)
@observer
class ColorPicker extends Component<Props & EmitterStoreProp> {
  state = {
    showPicker: false,
  };

  render() {
    const { showPicker } = this.state;
    const { configName, emitterStore } = this.props;
    const { currentEmitterConfig, changeEmitterConfig } = emitterStore!;
    const value = _get(currentEmitterConfig, configName.split('>'));
    const valueHex = getPickerColor(value); // `#${value.toString(16)}`;

    return (
      <div>
        <TextField
          value={valueHex}
          onClick={() => this.setState({ showPicker: true })}
          InputProps={{ style: { color: valueHex } }}
        />
        {showPicker ? (
          <div style={{ zIndex: 2, position: 'absolute' }}>
            <div
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
              onClick={() => this.setState({ showPicker: false })}
            />
            <ChromePicker
              disableAlpha
              color={valueHex}
              onChange={({ hex }: { hex: string }) => {
                const colorValue = parseInt(hex.substring(1), 16);
                changeEmitterConfig(configName, colorValue);
              }}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

const colorPicker = (params: any) => {
  return <ColorPicker {...params} />;
};

export { colorPicker };
export default ColorPicker;
