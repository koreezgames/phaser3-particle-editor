import React, { Component } from 'react';
import { FormGroup } from '@material-ui/core';
import Switch from '../Switch';
import TextField from '../TextField';
import Select from '../Select';
import { blendModes } from '../../constants';
import CompositeProperty from '../CompositeProperty';
import ToggleComplexTextField from '../ToggleComplexTextField';
import Zone from '../Zone';

class EmitterConfig extends Component {
  render() {
    return (
      <FormGroup>
        <Switch configName="active" />
        <TextField configName="frequency" />
        <Select configName="blendMode" options={blendModes} />
        <CompositeProperty configName="angle" />
        <ToggleComplexTextField
          configName="bounds"
          complex={{ x: 0, y: 0, width: 0, height: 0 }}
        />
        <Zone configName="emitZone" types={['edge', 'random']}/>
      </FormGroup>
    );
  }
}

export default EmitterConfig;
