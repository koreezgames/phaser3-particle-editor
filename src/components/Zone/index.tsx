import React, { Component, Fragment } from 'react';
import { EMITTER_STORE } from '../../stores';
import { observer, inject } from 'mobx-react';
import { EmitterStoreProp } from '../../stores/emitterStore';
import Switch from '../Switch';
import { getZoneShapeProps } from '../../utils';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '../Select';
import TextField from '../TextField';
import { zoneEdgeShapes } from '../../constants';
import ComplexTextField from '../ComplexTextField';

interface Props {
  configName: string;
  types: [string, string];
}

const edgeZoneComplexProps = {
  quantity: 10,
  stepRate: 0,
  yoyo: false,
  seamless: false
};

@inject(EMITTER_STORE)
@observer
class Zone extends Component<Props & EmitterStoreProp> {
  getZoneTypeRadioButtons() {
    const { configName, types, emitterStore } = this.props;
    const { currentEmitterConfig, changeEmitterConfig } = emitterStore!;
    const zone = currentEmitterConfig[configName];

    return (
      <RadioGroup
        value={zone.type}
        onChange={(e, value) => {
          const zoneValue =  { ...zone, type: value };

          // ?
          if (value === 'random') {
            Object.keys(edgeZoneComplexProps).forEach(propName => delete zoneValue[propName]);
          } else if (value === 'edge') {
            Object.assign(zoneValue, edgeZoneComplexProps);
          }

          changeEmitterConfig(configName, zoneValue);
        }}
      >
        <FormControlLabel value={types[0]} control={<Radio/>} label={types[0]} />
        <FormControlLabel value={types[1]} control={<Radio/>} label={types[1]} />
      </RadioGroup>
    );
  }

  render() {
    const { configName, types, emitterStore } = this.props;
    const { currentEmitter, currentEmitterConfig, changeEmitterConfig, changeDebugMode } = emitterStore!;
    const zone = currentEmitterConfig[configName];

    return (
      <Fragment>
        <Switch
          checked={zone !== undefined}
          label="Enable"
          onChange={event => {
            const zoneValue = event.target.checked ?
              { ...getZoneShapeProps('Rectangle'), type: types[0] } : undefined;

            // ?
            if (zoneValue && zoneValue.type === 'edge') {
              Object.assign(zoneValue, edgeZoneComplexProps);
            }

            changeEmitterConfig(configName, zoneValue);
          }}
        />
        {zone ?
          <Fragment>
            {this.getZoneTypeRadioButtons()}
            <Switch
              checked={currentEmitter.debugModes[configName]}
              label="Debug mode"
              onChange={event => {
                changeDebugMode(configName, event.target.checked);
              }}
            />
            <Select
              configName={`${configName}>source`}
              options={zoneEdgeShapes}
              value={zone.shapeType}
              onChange={event => {
                const zoneValue = { ...zone, ...getZoneShapeProps(event.target.value) };
                changeEmitterConfig(configName, zoneValue);
              }}
            />
            <ComplexTextField configName={`${configName}>source`} />

            {/* ?? */}
            {zone.type === 'edge' ?
              <Fragment>
                <TextField configName={`${configName}>quantity`} label="quantity"/>
                <TextField configName={`${configName}>stepRate`} label="stepRate"/>
                <Switch configName={`${configName}>yoyo`} label="yoyo"/>
                <Switch configName={`${configName}>seamless`} label="seamless"/>
              </Fragment>
            : null}

          </Fragment>
        : null}
      </Fragment>
    );
  }
}

export default Zone;
