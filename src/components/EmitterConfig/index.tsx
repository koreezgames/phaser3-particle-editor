import React, { Component } from 'react';
import {
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  FormLabel,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import TextField from '../TextField';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Switch from '../Switch';
import Select from '../Select';
import { blendModes, frames } from '../../constants';
import CompositeProperty from '../CompositeProperty';
import ToggleComplexTextField from '../ToggleComplexTextField';
import MultipleInput from '../MultipleInput';
import { colorPicker } from '../ColorPicker';
import Zone from '../Zone';
import ComplexZone from '../ComplexZone';

const styles = {
  root: {
    height: 'calc(100vh - 48px)',
    overflow: 'auto',
  },
};

class EmitterConfig extends Component<WithStyles<typeof styles>> {
  render() {
    return (
      <div className={this.props.classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Options</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={16}>
              <Grid item xs={4}>
                <TextField configName="frequency" />
              </Grid>
              <Grid item xs={4}>
                <TextField configName="maxParticles" />
              </Grid>
              <Grid item xs={4}>
                <TextField configName="timeScale" />
              </Grid>
              <Grid item xs={6}>
                <Switch configName="active" />
              </Grid>
              <Grid item xs={6}>
                <Switch configName="on" />
              </Grid>
              <Grid item xs={6}>
                <Switch configName="particleBringToTop" label="Top" />
              </Grid>
              <Grid item xs={6}>
                <Switch configName="radial" />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Gravity</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={16}>
              <Grid item xs={6}>
                <TextField configName="gravityX" label="X" />
              </Grid>
              <Grid item xs={6}>
                <TextField configName="gravityY" label="Y" />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Frame</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={16}>
              <Grid item xs={6}>
                <Select configName="blendMode" options={blendModes} />
              </Grid>
              <Grid item xs={6}>
                <Select configName="frame" options={frames} />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Tint</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={40}>
              <Grid item xs={12}>
                <MultipleInput configName="tint">{colorPicker}</MultipleInput>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Acceleration</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={40}>
              <Grid item xs={6}>
                <FormLabel component="legend">X</FormLabel>
                <CompositeProperty configName="accelerationX" />
              </Grid>
              <Grid item xs={6}>
                <FormLabel component="legend">Y</FormLabel>
                <CompositeProperty configName="accelerationY" />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Max Velocity</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={40}>
              <Grid item xs={6}>
                <FormLabel component="legend">X</FormLabel>
                <CompositeProperty configName="maxVelocityX" />
              </Grid>
              <Grid item xs={6}>
                <FormLabel component="legend">Y</FormLabel>
                <CompositeProperty configName="maxVelocityY" />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Move To</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={40}>
              <Grid item xs={6}>
                <FormLabel component="legend">X</FormLabel>
                <CompositeProperty configName="moveToX" />
              </Grid>
              <Grid item xs={6}>
                <FormLabel component="legend">Y</FormLabel>
                <CompositeProperty configName="moveToY" />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Position</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={40}>
              <Grid item xs={6}>
                <FormLabel component="legend">X</FormLabel>
                <CompositeProperty configName="x" />
              </Grid>
              <Grid item xs={6}>
                <FormLabel component="legend">Y</FormLabel>
                <CompositeProperty configName="y" />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Lifespan</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={40}>
              <Grid item xs={12}>
                <CompositeProperty configName="lifespan" />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Quantity</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={40}>
              <Grid item xs={12}>
                <CompositeProperty configName="quantity" />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Transform</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={40}>
              <Grid item xs={6}>
                <FormLabel component="legend">Scale</FormLabel>
                <CompositeProperty configName="scale" />
              </Grid>
              <Grid item xs={6}>
                <FormLabel component="legend">Rotate</FormLabel>
                <CompositeProperty configName="rotate" />
              </Grid>
              <Grid item xs={12}>
                <FormLabel component="legend">Alpha</FormLabel>
                <CompositeProperty configName="alpha" />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Bounce</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={40}>
              <Grid item xs={12}>
                <CompositeProperty configName="bounce" />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Delay</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={40}>
              <Grid item xs={12}>
                <CompositeProperty configName="delay" />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Angle</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={40}>
              <Grid item xs={12}>
                <CompositeProperty configName="angle" />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Speed</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={40}>
              <Grid item xs={12}>
                <CompositeProperty configName="speed" />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Bounds</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={40}>
              <Grid item xs={12}>
                <ToggleComplexTextField
                  configName="bounds"
                  complex={{ x: 0, y: 0, width: 0, height: 0 }}
                />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Death Zone</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={40}>
              <Grid item xs={12}>
                <Zone configName="deathZone" types={['onEnter', 'onLeave']} />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Emit Zone</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={40}>
              <Grid item xs={12}>
                <ComplexZone configName="emitZone" types={['edge', 'random']} />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(EmitterConfig);
