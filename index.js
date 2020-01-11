//@ts-check
const { execSync, exec } = require("child_process");
const { ConfigInfo } = require("./lib/configInfo");


const getConfig = (includeGlobal) => {
    return new Promise((res, rer) => {
        exec("npm config list -l", (err, stdout, stderr) => {
            if (err) throw (err);
            if (stderr) throw (stderr);
            if (stdout) return res(new ConfigInfo(stdout.toString(), includeGlobal));
        });
    });
};


const getConfigSync = (includeGlobal) => {
    let val = execSync("npm config list -l", null);
    if (val) return new ConfigInfo(val.toString(), includeGlobal);
};

exports.module = {
    getConfig,
    getConfigSync
};