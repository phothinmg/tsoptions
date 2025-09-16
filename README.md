
# tsoptions

Get TypeScript compiler options from a config file, and manipulate them programmatically.

## Install

```bash
npm i -D @phothin/tsoptions
```

## Usage

### CommonJS

```js
const TsOptions = require('@phothin/tsoptions');

const tsoptions = new TsOptions(); // Uses tsconfig.json from project root
console.log(tsoptions.options); // Get parsed compiler options

// With custom config path
const custom = new TsOptions('path/to/tsconfig.json');
console.log(custom.options);
```

### ES Module

```js
import TsOptions from '@phothin/tsoptions';

const tsoptions = new TsOptions();
console.log(tsoptions.options);
```

## API

### Constructor

```js
new TsOptions(configPath?)
```

- `configPath` (optional): Path to a TypeScript config file. If omitted, uses the root `tsconfig.json`.

### Methods

- `add(opts)`: Add new options (only if they don’t already exist).
- `remove(opt)`: Remove an option by key.
- `overwrite(opts)`: Overwrite existing options with provided values.
- `overwriteAll(opts)`: Replace all options with the provided object.
- `options`: Get the current compiler options.

## Example

```js
const tsoptions = new TsOptions();
tsoptions.add({ emitDeclarationOnly: true });
console.log(tsoptions.options);
```

## License

[ISC](LICENSE)
