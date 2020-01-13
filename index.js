const { execSync, exec } = require("child_process");
const { ConfigInfo, globState } = require("./lib/configInfo");

// adding a testing comment
/**
 * Compile the data available from npm config and returns a promise. (Async)
 * @param {boolean} includeGlobal Include the building of globals object.
 * @returns {Promise<ConfigInfo>}
 */
function getConfig(includeGlobal) {
    return new Promise((res, rer) => {
        exec("npm config list -l", (err, stdout, stderr) => {
            if (err) throw (err);
            if (stderr) throw (stderr);
            if (stdout) return res(new ConfigInfo(stdout.toString(), includeGlobal));
        });
    });
}

/**
 * Compile the data availabe from npm config and returns the object.
 * @param {boolean} includeGlobal Include the building of global object.
 * @returns {ConfigInfo}
 */
function getConfigSync(includeGlobal) {
    let val = execSync("npm config list -l", null);
    if (val) return new ConfigInfo(val.toString(), includeGlobal);
}

exports.getConfig = getConfig;
exports.getConfigSync = getConfigSync;
exports.globState = globState;