//@ts-check
const fs = require("fs");
const path = require("path");

/**
 * Build an object from an ini type file.  The main data component
 * @private
 * @private
 * @param {string|Buffer} iniStr The data received from the console.  
 * @returns {import ("../typings/objects").configObject}
 */
function buildIni(iniStr) {
    if (!iniStr) return {};
    if (typeof iniStr !== "string") iniStr = iniStr.toString();

    iniStr = iniStr.replace(/\\?"/g, "");
    //fix Slashes
    iniStr = iniStr.replace(/\\+/g, "\\");
    // split lines
    let lines = iniStr.split("\n"), resultObj = {};
    lines.forEach(line => {
        let match = /^\s*;\s*(userconfig|globalconfig)/.exec(line);
        if (match) {
            line = line.replace(/^\s*;\s*(userconfig|globalconfig)/, "tmp" + match[1]);
            line = line.trim().replace(/ /, "=");
        }
        if (line === "" || line.indexOf("=") === -1) return;

        // remove comments
        if (line.search(/^\s*;/) > -1) return;
        // get prop:values
        let props = line.split("=");
        // there will always be properteis with mulitple values i.e. array with 2 items.  
        // props without = is being deleted
        /** @type {any} */
        let val = props[1].trim();
        // booleans
        if (val === "true") val = true;
        else if (val === "false") val = false;
        // null
        else if (val === "null") val = null;
        // undefined
        else if (val === "undefined") val = undefined;
        // numbers
        else if (!isNaN(val)) val = Number(val);
        // set value
        resultObj[props[0].trim()] = (val);
    });
    return resultObj;
}
/**
 * Returns the folders for this object.
 * @private
 * @param {import("../typings/objects").configObject} config The config object  
 * @returns {import('../typings/objects').folderInformation}
 */
function getFolders(config) {
    /** @type {import("../typings/objects").folderInformation } from "./typings/objects";} */
    let resultObj = {};

    if (config.cache) resultObj.cache = config.cache;
    if (config.globalconfig) resultObj.globalconfig = config.globalconfig;
    if (config.globalignorefile) resultObj.globalignorefile = config.globalignorefile;
    if (config["init-module"]) resultObj.initModule = config["init-module"];
    if (config["metrics-registry"]) resultObj["metrics-registry"] = config["metrics-registry"];
    if (config.prefix) resultObj.prefix = config.prefix;
    if (config.shell) resultObj.shell = config.shell;
    if (config.tmp) resultObj.tmp = config.tmp;
    if (config.userconfig) resultObj.userconfig = config.userconfig;
    if (config.tmpuserconfig) resultObj.tmpuserconfig = config.tmpuserconfig;
    if (config.tmpglobalconfig) resultObj.tmpglobalconfig = config.tmpglobalconfig;

    // fix tmps
    if (!resultObj.userconfig && resultObj.tmpuserconfig) resultObj.userconfig = resultObj.tmpuserconfig;
    if (!resultObj.globalconfig && resultObj.tmpglobalconfig) resultObj.globalconfig = resultObj.tmpglobalconfig;

    return resultObj;
}
/**
 * Returns the Author information.
 * @private
 * @param {import("../typings/objects").configObject} config The config Object
 * @returns {import ("../typings/objects").authorInformation}
 */
function getAuthor(config) {
    /**@type {import("../typings/objects").authorInformation} */
    let author = {
        name: "",
        email: "",
        url: "",
        value: ""
    };
    // name
    if (config["init-author-name"]) author.name = config["init-author-name"];
    else if (config["init.author.name"]) author.name = config["init.author.name"];
    else if (config["init.user.name"]) author.name = config["init.user.name"];
    else if (config["init-user-name"]) author.name = config["init-user-name"];
    else if (config["author.name"]) author.name = config["author.name"];
    else if (config["author-name"]) author.name = config["author-name"];
    else if (config["user.name"]) author.name = config["user.name"];
    else if (config["user-name"]) author.name = config["user-name"];


    if (config["init-author"]) author.value = config["init-author"];
    else if (config["init.author"]) author.value = config["init.author"];
    else if (config.author) author.value = config.author;
    else if (config["init-user"]) author.value = config["init-user"];
    else if (config["init.user"]) author.value = config["init.user"];
    else if (config.user) author.value = config.user;

    // email
    if (config["init-author-email"]) author.email = config["init-author-email"];
    else if (config["init.author.email"]) author.email = config["init.author.email"];
    else if (config["init.user.email"]) author.email = config["init.user.email"];
    else if (config["init-user-email"]) author.email = config["init-user-email"];
    else if (config["author.email"]) author.email = config["author.email"];
    else if (config["author-email"]) author.email = config["author-email"];
    else if (config["user.email"]) author.email = config["user.email"];
    else if (config["user-email"]) author.email = config["user-email"];

    // url
    if (config["init-author-url"]) author.url = config["init-author-url"];
    else if (config["init.author.url"]) author.url = config["init.author.url"];
    else if (config["init.user.url"]) author.url = config["init.user.url"];
    else if (config["init-user-url"]) author.url = config["init-user-url"];
    else if (config["author.url"]) author.url = config["author.url"];
    else if (config["author-url"]) author.url = config["author-url"];
    else if (config["user.url"]) author.url = config["user.url"];
    else if (config["user-url"]) author.url = config["user-url"];


    // finish of
    if ((!author.name || !author.email) && author.value) {
        let test, email, name, url;
        test = author.value.match(/^[^<(]*/);
        if (test && test.length > 0) name = test[0].trim();
        test = author.value.match(/(?<=<).*(?=>)/);
        if (test && test.length > 0) email = test[0].trim();
        test = author.value.match(/(?<=\().*(?=\))/);
        if (test && test.length > 0) url = test[0].trim();

        if (!author.name && name) author.name = name;
        if (!author.email && email) author.email = email;
        if (!author.url && url) author.url = url;
    } else if (!author.value || author === undefined) {
        let str = author.name ? author.name : "";
        if (author.email) str += ` <${author.email}>`;
        if (author.url) str += ` (${author.url})`;
        author.value = str;
    }

    return author;
}

/**
 * Gets the initial values for the provided object
 * @private
 * @param {import("../typings/objects").configObject} config the Config object.
 * @param {import("../typings/objects").authorInformation} author the Author information.
 * @returns {import("../typings/objects").initObject}
 */
function getInitValues(config, author) {
    /** @type {import ("../typings/objects").initObject} */
    let init = {}, pat = /^init(\.|-).+/;
    for (let key in config) {
        let match = pat.test(key);
        if (match) {
            let name = key.substr(5).trim();
            if (name) init[name] = config[key];
        }
    }
    // see author
    if (!init.author && author) init.author = author.value;
    if (!init["author-email"]) init["author-email"] = author.email;
    if (!init["author-name"]) init["author-name"] = author.name;
    if (!init["author-url"]) init["author-url"] = author.url;
    if (!init.version) init.version = "1.0.0";
    if (!init.license) init.license = "ICS";

    return init;
}
/**
 * See if a file exists.
 * @private
 * @param {string} file The destination of the file to confirm.
 * @returns {boolean} true if the file exists else false.
 */
function fileExist(file) {
    file = path.resolve(file);
    try {
        if (fs.existsSync(file)) {
            return !fs.lstatSync(file).isDirectory();
        }
    } catch (error) { }
    return false;
}

class ConfigInfo {

    /**
     * Construct the ConfigInfo object.
     * @param {string|Buffer} data Data that needs to be parsed.
     * @param {boolean} [includeGlobal] If the global variables should be created at construction time.
     */
    constructor(data, includeGlobal) {
        /**
         * All the information to get from the current data object.  There may be more OR less properties availaable 
         * @type {import("../typings/objects").configObject} 
         */
        this.config = buildIni(data);
        /** 
         * Get all the relevant folders.
         * @type {import("../typings/objects").folderInformation} */
        this.folders = getFolders(this.config);
        /**
         * Get only the author related details.  If no author details is stored, will also look at user variables.
         * @type {import("../typings/objects").authorInformation} */
        this.author = getAuthor(this.config);
        /** 
         * Get the the init default values which is stored by means of npm set init-author-name etc.
         * @type {import ("../typings/objects").initObject} */
        this.init = getInitValues(this.config, this.author);
        if (includeGlobal) this.getGlobal();
        else if (includeGlobal === undefined) {
            /** 
             * The general placeholder of the global npmrc file data.  Or string:
             * - "getGlobal function not yet called" is displayed if getGlobal has not yet been called.
             * - can't find config is displayed if we can't find the npmrc file.
             * @type {ConfigInfo|string} */
            this.global = "getGlobal function not yet called.";
        }
    }

    /**
     * Updates the global variable.
     * @param {string} [configFile] An optional location to the global config file.
     * @returns {boolean} True if a global object was created, else false.
     */
    getGlobal(configFile) {
        if (this.folders.globalconfig || configFile) {
            // see if file exist
            let data, file = configFile || this.folders.globalconfig, success = true;
            if (!fileExist(file)) {
                success = false;
                // see if folder ends with npmrc or .npmrc
                if (/\.npmrc$/.test(file)) {
                    // try npmrc
                    file = file.replace(/\.npmrc$/, "npmrc");
                    if (fileExist(file)) success = true;
                } else if (/npmrc$/.test(file)) {
                    // try .npmrc
                    file = file.replace(/npmrc$/, ".npmrc");

                    if (fileExist(file)) success = true;
                } else {
                    // no npmrc file identified
                    file = path.join(file, "npmrc");
                    if (fileExist(file)) success = true;
                    if (!success) {
                        file = file.replace(/npmrc$/, ".npmrc");
                        if (fileExist(file)) success = true;
                    }
                }
                if (!success && this.folders.prefix && !configFile) {
                    file = path.join(this.folders.prefix, "npmrc");
                    if (fileExist(file)) success = true;
                    else {
                        file = path.join(this.folders.prefix, ".npmrc");
                        if (fileExist(file)) success = true;
                        else {
                            file = path.join(this.folders.prefix, "etc");
                            if (this.folders.globalconfig.search(file) === -1) {
                                // we have a new folder that was not yet tested
                                file = path.join(file, "npmrc");
                                if (fileExist(file)) success = true;
                                else {
                                    file = path.join(this.folders.prefix, "etc", ".npmrc");
                                    if (fileExist(file)) success = true;
                                    // else we can't find global object;

                                }
                            }
                        }
                    }
                }
            }
            if (success) {
                /**
                 * Determine if a global npmrc file exist (according to the standard searches).
                 * @type {boolean}
                 */
                this.globalExist = true;
                data = fs.readFileSync(file);
                this.global = new ConfigInfo(data.toString(), false);
                return true;
            } else {
                this.globalExist = false;
                this.global = "can't find configFile.";
                return false;
            }
        }
    }
}

exports.ConfigInfo = ConfigInfo;