import React, { Component } from 'react';
import { withStyles, WithStyles } from '@material-ui/core';
import { deathZoneEdgeShapes, emitZoneEdgeShapes } from '../../constants';
import ExpansionPanelXY from './expansionPanelXY';
import ExpansionPanelCompositeProperty from './expansionPanelCompositeProperty';
import ExpansionPanelZone from './expansionPanelZone';
import ExpansionPanelOptions from './expansionPanelOptions';
import ExpansionPanelFrame from './expansionPanelFrame';
import ExpansionPanelColorPicker from './expansionPanelColorPicker';
import ExpansionPanelTransform from './expansionPanelTransform';
import ExpansionPanelBounds from './expansionPanelBounds';

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
        <ExpansionPanelOptions />

        <ExpansionPanelXY
          composite={false}
          typography="Gravity"
          configNameX="gravityX"
          configNameY="gravityY"
        />

        <ExpansionPanelFrame />

        <ExpansionPanelColorPicker />

        <ExpansionPanelXY
          composite
          typography="Acceleration"
          configNameX="accelerationX"
          configNameY="accelerationY"
        />

        <ExpansionPanelXY
          composite
          typography="Max Velocity"
          configNameX="maxVelocityX"
          configNameY="maxVelocityY"
        />

        <ExpansionPanelXY
          composite
          typography="Move To"
          configNameX="moveToX"
          configNameY="moveToY"
        />

        <ExpansionPanelXY
          composite
          typography="Position"
          configNameX="x"
          configNameY="y"
        />

        <ExpansionPanelCompositeProperty
          typography="Lifespan"
          configName="lifespan"
        />

        <ExpansionPanelCompositeProperty
          typography="Quantity"
          configName="quantity"
        />

        <ExpansionPanelTransform />

        <ExpansionPanelCompositeProperty
          typography="Bounce"
          configName="bounce"
        />

        <ExpansionPanelCompositeProperty
          typography="Delay"
          configName="delay"
        />

        <ExpansionPanelCompositeProperty
          typography="Angle"
          configName="angle"
        />

        <ExpansionPanelCompositeProperty
          typography="Speed"
          configName="speed"
        />

        <ExpansionPanelBounds />

        <ExpansionPanelZone
          typography="Death Zone"
          configName="deathZone"
          types={['onEnter', 'onLeave']}
          options={deathZoneEdgeShapes}
          zone="simple"
        />

        <ExpansionPanelZone
          typography="Emit Zone"
          configName="emitZone"
          types={['edge', 'random']}
          options={emitZoneEdgeShapes}
          zone="complex"
        />
      </div>
    );
  }
}

export default withStyles(styles)(EmitterConfig);
