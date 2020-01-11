# NPM CONFIG INFO

Get the config information stored by npm.   This include the stored user details and folder information of the npm structure.

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
require("npm-config-info").getConfig().then((conf) => {
    configInfo = conf;
});

```

## Global Store

Please note that the global values could also be obtained by calling getGlobal() from the returned object.

We will attempt to figure out where the npmrc file resides.

A string variable of where the global npmrc file could be found could also be provided in getGlobal e.g.:

```js
const configInfo = require("npm-config-info").getConfigSync()

configInfo.getGlobal("/custom/destination/to/npmrc");

if(configInfo.global.globalExist) {
    if(configInfo.global !== "can't find configFile.") {
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

Constributions are welcome.  This was a quick project as I required an easy way to access the stored author creditials from javascript.
