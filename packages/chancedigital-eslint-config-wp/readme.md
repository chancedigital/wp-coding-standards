# @chancedigital/eslint-config-wp

Chance Digital WordPress coding standards for JavaScript. This is a fork of the similar repository from [Human Made](https://github.com/chancedigital/wp-coding-standards).

We highly recommend using this [via the `chancedigital/wp-coding-standards` Composer package.](https://github.com/chancedigital/wp-coding-standards).

## Installation

This package is an ESLint shareable configuration, and requires `babel-eslint`, `eslint`, `eslint-config-react-app`, `eslint-plugin-flowtype`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react`.

To install this config and the peerDependencies:

```
npm info "@chancedigital/eslint-config-wp@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "@chancedigital/eslint-config-wp@latest"
```

(Thanks to [Airbnb's package](https://www.npmjs.com/package/eslint-config-airbnb) for the command.)

You can then use it directly on the command line:

```
eslint -c chancedigital MyFile.js
```

Alternatively, you can create your own configuration and extend these rules:
```yaml
extends:
- chancedigital
```

While It is always encouraged to write modern Javascript that is properly processed and bundled to meet your project's browser/device support requirements. However in some rare cases you may be required to write in ES5, and you can set your configuration in `index.js` accordingly by setting the `es6` variable to `false`.

Please note that the standards' tests and CLI tools are not set up to support this, but this will help suppress warnings in your editor.

## Global Installation

**We do not recommend installing these standards globally.** If you must, however, you need to ensure the peer dependencies are also installed globally. Run the same command as above, but with `-g` added:

```
npm info "@chancedigital/eslint-config-wp@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "@chancedigital/eslint-config-wp@latest"
```

This allows you to use `eslint -c chancedigital MyFile.js` anywhere on your filesystem.
