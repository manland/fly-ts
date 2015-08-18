<div align="center">
  <a href="http://github.com/flyjs/fly">
    <img width=200px  src="https://cloud.githubusercontent.com/assets/8317250/8733685/0be81080-2c40-11e5-98d2-c634f076ccd7.png">
  </a>
</div>

> [Typescript](https://github.com/Microsoft/TypeScript) plugin for _[Fly][fly]_.

[![][fly-badge]][fly]
[![npm package][npm-ver-link]][releases]
[![][dl-badge]][npm-pkg-link]
[![][mit-badge]][mit]

## Usage
> Check out the [documentation](https://github.com/Microsoft/TypeScript) to see the available options.

### Install

```a
npm install -D fly-ts
```

### Example

```js
export function* text () {
  yield this
    .source("./src/**/*.ts")
    .ts({
        module: 'commonjs',
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        sourceMap: true
    })
    .target("dist/")
}
```

# License

[MIT][mit] © [Romain Maneschi][author]


[mit]:          http://opensource.org/licenses/MIT
[author]:       http://romain.maneschi.fr
[releases]:     https://github.com/manland/fly-ts/releases
[fly]:          https://www.github.com/flyjs/fly
[fly-badge]:    https://img.shields.io/badge/fly-JS-05B3E1.svg?style=flat-square
[mit-badge]:    https://img.shields.io/badge/license-MIT-444444.svg?style=flat-square
[npm-pkg-link]: https://www.npmjs.org/package/fly-ts
[npm-ver-link]: https://img.shields.io/npm/v/fly-ts.svg?style=flat-square
[dl-badge]:     http://img.shields.io/npm/dm/fly-ts.svg?style=flat-square