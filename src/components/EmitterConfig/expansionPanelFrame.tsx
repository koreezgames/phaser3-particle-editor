import React, { Component } from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Grid,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { inject, observer } from 'mobx-react';
import { EMITTER_STORE, EmitterStoreProp } from 'src/stores';
import Switch from '../Switch';
import TextField from '../TextField';
import MultipleInput from '../MultipleInput';
import { selectComponent } from '../Select';
import { frames } from 'src/constants';
import _get from 'lodash/get';

@inject(EMITTER_STORE)
@observer
class ExpansionPanelFrame extends Component<EmitterStoreProp> {
  render() {
    const { emitterStore } = this.props;
    const { currentEmitterConfig } = emitterStore!;
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Frame</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={16}>
            <Grid item xs={6}>
              <Switch
                configName="frame>cycle"
                label="Cycle"
                disabled={currentEmitterConfig.frame.frames.length < 2}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                configName="frame>quantity"
                type="number"
                label="Quantity"
                disabled={!currentEmitterConfig.frame.cycle}
              />
            </Grid>
            <Grid item xs={12}>
              <MultipleInput configName="frame>frames">
                {(params: any) => {
                  const { configName } = params;
                  return selectComponent({
                    ...params,
                    options: frames,
                    value: _get(currentEmitterConfig, configName.split('>')),
                  });
                }}
              </MultipleInput>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default ExpansionPanelFrame;
