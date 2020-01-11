const { ConfigInfo } = require("../lib/configInfo");
const fs = require("fs");
const path = require("path");


describe("testing loader", () => {

    test('should deal with empty objects / strings', () => {
        let obj = new ConfigInfo();
        expect(typeof obj).toBe("object");
        expect(typeof obj.config).toBe("object");
        expect(typeof obj.folders).toBe("object");
        expect(typeof obj.author).toBe("object");
        expect(typeof obj.init).toBe("object");
        expect(typeof obj.global).toBe("string");
        expect(obj.global).toBe("getGlobal function not yet called.");
    });

    test('should work with data object', () => {
        let data = fs.readFileSync("./test/mock/npmrc1");
        let obj = new ConfigInfo(data);
        expect(typeof obj).toBe("object");
        // test item from each
        expect(obj.config.prefix).toBe("C:\\Users\\Joe\\AppData\\Roaming\\npm");
        expect(obj.folders.prefix).toBe("C:\\Users\\Joe\\AppData\\Roaming\\npm");
        expect(obj.author.name).toBe("Joe Soap");
        expect(obj.init.author).toBe("Joe Soap <js@somewhere.com> (http://somewhere.com)");
        expect(obj.global).toBe("getGlobal function not yet called.");
        expect(obj.config.version).toBeTruthy();
        expect(obj.config.versions).toBeUndefined();
    });

    test('should work with data string', () => {
        let data = fs.readFileSync("./test/mock/npmrc1").toString();
        let obj = new ConfigInfo(data);
        expect(typeof obj).toBe("object");
        // test item from each
        expect(obj.config.prefix).toBe("C:\\Users\\Joe\\AppData\\Roaming\\npm");
        expect(obj.folders.prefix).toBe("C:\\Users\\Joe\\AppData\\Roaming\\npm");
        expect(obj.author.name).toBe("Joe Soap");
        expect(obj.init.author).toBe("Joe Soap <js@somewhere.com> (http://somewhere.com)");
        expect(obj.global).toBe("getGlobal function not yet called.");
    });
});

let countProps = (prop) => {
    let count = 0;
    for (let key in prop) count++;
    return count;
};

describe("testing without a data object", () => {
    let data = fs.readFileSync("./test/mock/npmrc1");
    let obj = new ConfigInfo(data);


    test('should get tmpFolders', () => {
        expect(typeof obj).toBe("object");
        // test item from each
        expect(obj.folders.tmpuserconfig).toBe("C:\\Users\\Joe\\.npmrc");
        expect(obj.folders.tmpglobalconfig).toBe("C:\\Users\\Joe\\AppData\\Roaming\\npm\\etc\\npmrc");
    });

    test('should get 10 folders', () => {
        expect(countProps(obj.folders)).toBe(11);
        expect(obj.folders.userconfig).toBeTruthy();
        expect(obj.folders.globalconfig).toBeTruthy();
    });

    test('should get 7 init values', () => {
        expect(countProps(obj.init)).toBe(7);
        expect(obj.init.author).toBe("Joe Soap <js@somewhere.com> (http://somewhere.com)");
        expect(obj.init.version).toBe("0.0.1");
    });

    test('should get 4 author values', () => {
        expect(countProps(obj.author)).toBe(4);
        expect(obj.author.url).toBe("http://somewhere.com");
        expect(obj.author.name).toBe("Joe Soap");
    });
    test('should get 19 config values', () => {
        expect(countProps(obj.config)).toBe(21);
        // some props
        expect(obj.config.userconfig).toBe("C:\\Users\\Joe\\.npmrc");
        expect(obj.config.user).toBe(0);
    });
});

describe("testing without default data object", () => {
    let data = fs.readFileSync("./test/mock/npmrc2");
    let obj = new ConfigInfo(data);

    test('should get tmpFolders', () => {
        expect(typeof obj).toBe("object");
        // test item from each
        expect(obj.folders.userconfig).toBe("C:\\Users\\Joe\\.npmrc");
        expect(obj.folders.globalconfig).toBe("C:\\Users\\Joe\\AppData\\Roaming\\npm\\etc\\npmrc");
    });

    test('should get 8 folders', () => {
        expect(countProps(obj.folders)).toBe(8);
        expect(obj.folders.tmpuserconfig).toBeTruthy();
        expect(obj.folders.tmpglobalconfig).toBeTruthy();
    });

    test('should get 7 init values', () => {
        expect(countProps(obj.init)).toBe(7);
        expect(obj.init.author).toBe("");
        expect(obj.init.version).toBe("1.0.0");
        expect(obj.init.license).toBe("ICS");
    });

    test('should get 4 author values', () => {
        expect(countProps(obj.author)).toBe(4);
        expect(obj.author.url).toBe("");
        expect(obj.author.name).toBe("");
    });
    test('should get 6 config values', () => {
        expect(countProps(obj.config)).toBe(6);
        // some props
        expect(obj.config.userconfig).toBeFalsy();
    });
});

describe("testing global initialization", () => {

    test("should initialize with true value (even if no global file is active)", () => {

        let data = fs.readFileSync("./test/mock/npmrc2");
        let obj = new ConfigInfo(data, true);
        expect(obj.globalExist).toBeFalsy();
        expect(obj.global).toBe("can't find configFile.");
    });

    test("getGlobal should be able to be called from outside", () => {

        let obj = new ConfigInfo("", true);
        obj.folders.globalconfig = path.resolve("./test/mock/global testing/dot/etc/npmrc");

        obj.getGlobal();
        expect(obj.globalExist).toBeTruthy();
        expect(obj.global.init.version).toBe("0.1.0");

        obj.folders.globalconfig = "";
        obj.globalExist = undefined;

        obj.getGlobal("./test/mock/global testing/nodot/etc/.npmrc");
        expect(obj.globalExist).toBeTruthy();
        expect(obj.global.init.author).toBe("Jill");


        obj.globalExist = undefined;

        obj.getGlobal("./test/mock/global testing/dot/etc/npmrc");
        expect(obj.globalExist).toBeTruthy();
        expect(obj.global.init.version).toBe("0.1.0");

        obj.globalExist = undefined;

        obj.getGlobal("./test/mock/global testing/nodot/etc/npmrc");
        expect(obj.globalExist).toBeTruthy();
        expect(obj.global.init.author).toBe("Jill");


        obj.globalExist = undefined;

        obj.getGlobal("./test/mock/global testing/dot/etc/.npmrc");
        expect(obj.globalExist).toBeTruthy();
        expect(obj.global.init.version).toBe("0.1.0");

    });

    test("getGlobal should be able to switch to npmrc", () => {
        // from .npmrc to npmrc
        let obj = new ConfigInfo("", true);
        obj.folders.globalconfig = path.resolve("./test/mock/global testing/nodot/etc/.npmrc");

        obj.getGlobal();
        expect(obj.globalExist).toBeTruthy();
        expect(obj.global.init.author).toBe("Jill");

        // from .npmrs to npmrc
        obj.folders.globalconfig = path.resolve("./test/mock/global testing/dot/etc/npmrc");
        obj.global = undefined;
        obj.globalExist = undefined;

        obj.getGlobal();
        expect(obj.globalExist).toBeTruthy();
        expect(obj.global.init.version).toBe("0.1.0");
    });

    test("getGlobal should be able to find npmrc even though it is not specified", () => {

        let obj = new ConfigInfo("", true);
        obj.folders.globalconfig = path.resolve("./test/mock/global testing/nodot/etc/");

        obj.getGlobal();
        expect(obj.globalExist).toBeTruthy();
        expect(obj.global.init.author).toBe("Jill");

        obj.globalExist = undefined;
        obj.folders.globalconfig = path.resolve("./test/mock/global testing/dot/etc/");
        obj.getGlobal();
        expect(obj.globalExist).toBeTruthy();
        expect(obj.global.init.version).toBe("0.1.0");
    });
    test("should be able to search by prefix value", () => {

        let prefix = `prefix=${path.resolve("./test/mock/global testing/dot")}`;
        prefix += `\nglobalconfig=c:\\`;
        let obj = new ConfigInfo(prefix, true);
        expect(obj.globalExist).toBeTruthy();
        expect(obj.global.init.version).toBe("0.1.0");

        obj.globalExist = undefined;
        obj.folders.prefix = "./test/mock/global testing/nodot/etc/";
        obj.getGlobal();
        expect(obj.globalExist).toBeTruthy();
        expect(obj.global.init.author).toBe("Jill");

        obj.globalExist = undefined;
        obj.folders.prefix = "./test/mock/global testing/dot/etc/";
        obj.getGlobal();
        expect(obj.globalExist).toBeTruthy();
        expect(obj.global.init.version).toBe("0.1.0");

        obj.globalExist = undefined;
        obj.folders.prefix = "./test/mock/global testing/nodot/";
        obj.getGlobal();
        expect(obj.globalExist).toBeTruthy();
        expect(obj.global.init.author).toBe("Jill");
    });


});

describe("testing Author", () => {
    let folder = "./test/mock/author";

    test("testing dot seperator instead of -", () => {
        let active = path.resolve(folder, "authordot");
        let obj = new ConfigInfo(fs.readFileSync(active));

        expect(obj.author).toMatchObject({
            name: 'Joe',
            email: 'Joe@soap.com',
            url: 'http://soap.com',
            value: 'Joe'
        });

        active = path.resolve(folder, "userdot");
        obj.getGlobal(active);

        expect(obj.global.author).toMatchObject({
            name: 'Joe',
            email: 'Joe@soap.com',
            url: 'http://soap.com',
            value: 'Joe'
        });
    });

    test("testing no init value but with dot", () => {
        let active = path.resolve(folder, "authorNoInDot");
        let obj = new ConfigInfo(fs.readFileSync(active));

        expect(obj.author).toMatchObject({
            name: 'Joe',
            email: 'Joe@soap.com',
            url: 'http://soap.com',
            value: 'Joe'
        });


        active = path.resolve(folder, "usernoinitDot");
        obj.getGlobal(active);

        expect(obj.global.author).toMatchObject({
            name: 'Joe',
            email: 'Joe@soap.com',
            url: 'http://soap.com',
            value: 'Joe'
        });
    });

    test("testing no init value but author with dash", () => {
        let active = path.resolve(folder, "authorNoInit");
        let obj = new ConfigInfo(fs.readFileSync(active));

        expect(obj.author).toMatchObject({
            name: 'Joe',
            email: 'Joe@soap.com',
            url: 'http://soap.com',
            value: 'Joe <Joe@soap.com> (http://soap.com)'
        });

        active = path.resolve(folder, "usernoinit");
        obj.getGlobal(active);

        expect(obj.global.author).toMatchObject({
            name: 'Joe',
            email: 'Joe@soap.com',
            url: 'http://soap.com',
            value: 'Joe'
        });
    });

    test("testing user - separation", () => {
        let active = path.resolve(folder, "userdash");
        let obj = new ConfigInfo(fs.readFileSync(active));

        expect(obj.author).toMatchObject({
            name: 'Joe',
            email: 'Joe@soap.com',
            url: 'http://soap.com',
            value: 'Joe'
        });
    });

    test("author variable", () => {
        let active = path.resolve(folder, "author");
        let obj = new ConfigInfo(fs.readFileSync(active));

        expect(obj.author).toMatchObject({
            name: 'Joe Soap',
            email: 'js@soap.com',
            url: 'http://soap.com',
            value: 'Joe Soap <js@soap.com> (http://soap.com)'
        });

    });
});

