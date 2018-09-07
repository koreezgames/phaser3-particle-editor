# Phaser3 Particle Editor

[![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/koreezgames/phaser3-particle-editor/blob/master/LICENSE)
[![Build Status](https://secure.travis-ci.org/koreezgames/phaser3-particle-editor.svg?branch=master)](https://travis-ci.org/koreezgames/phaser3-particle-editor)
[![codebeat badge](https://codebeat.co/badges/e3792494-1875-4826-be00-2124148b9287)](https://codebeat.co/projects/github-com-koreezgames-phaser3-particle-editor-master)
[![Greenkeeper badge](https://badges.greenkeeper.io/koreezgames/phaser3-particle-editor.svg)](https://greenkeeper.io/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/koreezgames/phaser3-particle-editor/pulls)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

This tool was designed to interactively create particle emitters using [Phaser](http://phaser.io)

View the editor [here](https://koreezgames.github.io/phaser3-particle-editor/).

![Showcase](https://raw.githubusercontent.com/koreezgames/phaser3-particle-editor/master/showcase.gif)

Key features:

- Blazing fast
- No runtime needed
- Easy to use

## Getting Started

First you want to get your project exported via [editor](https://koreezgames.github.io/phaser3-particle-editor/). You can do it by clicking on the menu button right next to the project name.

Exported project structure:

![Project](https://raw.githubusercontent.com/koreezgames/phaser3-particle-editor/master/project.png)

## Usage

```javascript
var config = {
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
  backgroundColor: '#262626',
  parent: 'phaser-example',
  scene: {
    preload: preload,
    create: create,
  },
};

var game = new Phaser.Game(config);

function preload() {
  this.load.atlas('shapes', 'assets/shapes.png', 'assets/shapes.json');
  this.load.json('particle-effect', 'assets/particle-effect.json');
}

function create() {
  this.add.particles('shapes', this.cache.json.get('particle-effect'));
}
```

## Contributing

The main purpose of this repository is to continue to evolve Phaser, making it easier to use. Development of Editor happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving Editor.

### [Code of Conduct](https://github.com/koreezgames/phaser3-particle-editor/blob/master/CODE_OF_CONDUCT.md)

This Code of Conduct is adapted from the Contributor Covenant, version 1.4, available at http://contributor-covenant.org/version/1/4. Please read [the full text](https://github.com/koreezgames/phaser3-particle-editor/blob/master/CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

### [Contributing Guide](https://github.com/koreezgames/phaser3-particle-editor/blob/master/CONTRIBUTING.md)

Read our [contributing guide](https://github.com/koreezgames/phaser3-particle-editor/blob/master/CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to Editor.

## License

Editor is [MIT licensed](./LICENSE).
