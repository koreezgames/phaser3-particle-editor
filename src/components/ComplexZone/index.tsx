import React, { Component, Fragment } from 'react';
import { EMITTER_STORE } from '../../stores';
import { observer, inject } from 'mobx-react';
import { EmitterStoreProp } from '../../stores/emitterStore';
import Zone from '../Zone';
import TextField from '../TextField';
import Switch from '../Switch';
import { edgeZoneComplexProps } from '../../constants';

interface Props {
  configName: string;
  types: [string, string];
  options: any;
}

@inject(EMITTER_STORE)
@observer
class ComplexZone extends Component<Props & EmitterStoreProp> {
  onEnable = (zoneValue: any) => {
    const zoneValueCopy = { ...zoneValue };
    if (zoneValue && zoneValue.type === this.props.types[0]) {
      Object.assign(zoneValueCopy, edgeZoneComplexProps);
    }
    return zoneValueCopy;
  };

  onTypeChange = (zoneValue: any, type: string) => {
    const zoneValueCopy = { ...zoneValue };
    if (type === this.props.types[1]) {
      Object.keys(edgeZoneComplexProps).forEach(
        propName => delete zoneValueCopy[propName],
      );
    } else if (type === this.props.types[0]) {
      Object.assign(zoneValueCopy, edgeZoneComplexProps);
    }
    return zoneValueCopy;
  };

  render() {
    const { configName, types, emitterStore, options } = this.props;
    const { currentEmitterConfig } = emitterStore!;
    const zone = currentEmitterConfig[configName];

    return (
      <Fragment>
        <Zone
          configName={configName}
          types={types}
          onEnable={this.onEnable}
          onTypeChange={this.onTypeChange}
          options={options}
        />
        {zone && zone.type === types[0] ? (
          <Fragment>
            <TextField configName={`${configName}>quantity`} label="quantity" />
            <TextField configName={`${configName}>stepRate`} label="stepRate" />
            <Switch configName={`${configName}>yoyo`} label="yoyo" />
            <Switch configName={`${configName}>seamless`} label="seamless" />
          </Fragment>
        ) : null}
      </Fragment>
    );
  }
}

export default ComplexZone;
