import React, { Component, Fragment } from 'react';
import { EMITTER_STORE } from '../../stores';
import { observer, inject } from 'mobx-react';
import { EmitterStoreProp } from '../../stores/emitterStore';
import MultipleInput from '../MultipleInput';
import _isPlainObject from 'lodash/isPlainObject';
import Switch from '../Switch';
import TextField, { textField } from '../TextField';
import Select from '../Select';
import { hasBoth, hasKey } from '../../utils';
import { Grid } from '@material-ui/core';
import { easing } from '../../constants';

type Props = {
  configName: string;
  label?: string;
};

@inject(EMITTER_STORE)
@observer
class CompositeProperty extends Component<Props & EmitterStoreProp> {
  getBody(isObject: boolean, random: boolean) {
    const { configName, emitterStore } = this.props;
    const {
      currentEmitterConfig,
      toggleRandom,
      changeSelectDropdown,
    } = emitterStore!;
    const value = currentEmitterConfig[configName];

    let start = 'start';
    let end = 'end';

    if (random) {
      start = 'min';
      end = 'max';
    }

    return isObject ? (
      <Fragment>
        <Switch
          checked={random}
          label="Random"
          onChange={() => toggleRandom(configName)}
        />
        <Grid container spacing={16}>
          <Grid item xs={6}>
            <TextField configName={`${configName}>${start}`} label={start} />
          </Grid>
          <Grid item xs={6}>
            <TextField configName={`${configName}>${end}`} label={end} />
          </Grid>
          <Grid item xs={12}>
            <Select
              configName={`${configName}>ease`}
              options={easing}
              value={value.ease || 'Custom'}
              onChange={event =>
                changeSelectDropdown(configName, event.target.value)
              }
            />
          </Grid>
          {hasKey(value, 'steps') ? (
            <Grid item xs={12}>
              <TextField configName={`${configName}>steps`} label="steps" />
            </Grid>
          ) : null}
        </Grid>
      </Fragment>
    ) : (
      <MultipleInput configName={configName}>
        {(params: any) => textField({ ...params, hideLabel: true })}
      </MultipleInput>
    );
  }

  render() {
    const { configName, emitterStore } = this.props;
    const { currentEmitterConfig, changePropertyType } = emitterStore!;
    const value = currentEmitterConfig[configName];
    const random = hasBoth(value, 'min', 'max');
    const isObject = _isPlainObject(value);

    return (
      <Grid container>
        <Grid item xs={12}>
          <Switch
            label="Composite"
            checked={isObject}
            onChange={() => changePropertyType(configName)}
          />
        </Grid>
        <Grid item xs={12}>
          {this.getBody(isObject, random)}
        </Grid>
      </Grid>
    );
  }
}

export default CompositeProperty;
