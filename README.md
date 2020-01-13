# NPM CONFIG INFO

[![Build Status](https://travis-ci.org/DaClan008/npm-config-info.svg?branch=master)](https://travis-ci.org/DaClan008/npm-config-info.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/DaClan008/npm-config-info/badge.svg?branch=master)](https://coveralls.io/github/DaClan008/npm-config-info?branch=master)
[![codecov](https://codecov.io/gh/DaClan008/npm-config-info/branch/master/graph/badge.svg)](https://codecov.io/gh/DaClan008/npm-config-info)
[![npm](https://img.shields.io/npm/v/npm-config-info)](https://img.shields.io/npm/v/npm-config-info)
![npm](https://img.shields.io/npm/dw/npm-config-info)

Get the config information stored by npm. This include the stored user details and folder information of the npm structure.

## Install

```console
    npm install npm-config-info
```

## Usage

```js
const configInfo = require("npm-config-info").getConfigSync();

let config = configInfo.config;
let user = configInfo.author.name;
let email = configInfo.author.email;
let npmFolder = configInfo.folders.prefix;
```

The code could also run asynchronously:

```js
let configInfo;
require("npm-config-info")
	.getConfig()
	.then(conf => {
		configInfo = conf;
	});
```

## Global Store

Please note that the global values could also be obtained by calling getGlobal() from the returned object.

We will attempt to figure out where the npmrc file resides.

A string variable of where the global npmrc file could be found could also be provided in getGlobal e.g.:

```js
const configInfo = require("npm-config-info").getConfigSync();

configInfo.getGlobal("/custom/destination/to/npmrc");

if (!configInfo.global.globalExist) {
	if (configInfo.global !== "can't find configFile.") {
		let author = configInfo.global.author;
	}
}
```

The global variables can also be created by the constructor:

```js
const configInfo = require("npm-conif-info").getConfigSync(true);
console.loe(configInfo.globalExist);
```

## NPMRC

> Please have a look at [npm]("http://npm.github.io/installation-setup-docs/customizing/the-npmrc-file.html#files") of how the data is usually resolved.

## Contributions

Contributions are welcome. This was a quick project as I required an easy way to access the stored author creditials from javascript.

## Fixes

-   Fixed Readme spelling errors.
