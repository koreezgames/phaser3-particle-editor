import React, { Component } from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { inject, observer } from 'mobx-react';
import { EMITTER_STORE, EmitterStoreProp } from 'src/stores';
import Select from '../Select';
import { blendModes } from 'src/constants';

@inject(EMITTER_STORE)
@observer
class ExpansionPanelBlendMode extends Component<EmitterStoreProp> {
  render() {
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Blend Mode</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Select configName="blendMode" options={blendModes} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default ExpansionPanelBlendMode;
