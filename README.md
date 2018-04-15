# Multi-Page Architecture

> Using Webpack to build a React based multi-page application, designed to establish a multi-page application architecture thinking model

## Installation

```sh
# Clone / Download git
$ git clone git@github.com:TokeyJerry/react-multi-page.git --depth=1
# Or https
$ git clone https://github.com/TokeyJerry/react-multi-page.git --depth=1

# install
$ npm install
```

## Contents

```sh
.
├── client
│   ├── views ············ .html file
├── docs ················· documentationaa
├── server
│   ├── router ··········· Route file
│   ├── controller ······· Business logic processing layer
│   └── module ··········· Data acquisition
├── config
│   ├── envConfig.js ····· Environment variable configuration file
│   └── fileConfig.js ···· webpack config
├── src
│   ├── commons ·········· Public libraries
│   └── components ······· Global components
├── app.js
├── package.json
├── webpack.config.js
├── .babelrc
├── .gitignore
├── README.md
└── LICENSE
```

## Usage

> Please refer to the package.json file for checking more Command

```sh
# dev 
$ npm run dev

# build 
$ npm run build

```

## License

[MIT](LICENSE) &copy; [铁建文](http://platform.apptie.cn)




