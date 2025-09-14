const { describe, it } = require("node:test");
const assert = require("node:assert");
const TsOptions = require("../src/index.js");

const isObj = (input) =>
  Object.prototype.toString.call(input) === "[object Object]";
function except(entry) {
  const looseEqualObject = (input) => {
    let bool = false;
    if (isObj(entry) && isObj(input)) {
      bool = Object.keys(entry).every(
        (key) => key in input && entry[key] === input[key]
      );
    }
    assert.ok(bool);
  };
  const notEqual = (input) => {
    assert.ok(entry !== input);
  };
  return { looseEqualObject, notEqual };
}

describe("Test with custom config", function () {
  const config = "test/custom-config.json";
  const tsoptions = new TsOptions(config);
  it("Get Options", function () {
    const excepted = {
      declaration: true,
      outDir: "/home/ptm/Documents/tsoptions/test/dist",
      configFilePath: "/home/ptm/Documents/tsoptions/test/custom-config.json",
    };
    const result = tsoptions.options;
    except(excepted).looseEqualObject(result);
  });
});
describe("Test with config from root", function () {
  const tsoptions = new TsOptions();
  it("Get Options", function () {
    const excepted = {
      allowJs: true,
      declaration: true,
      outDir: "/home/ptm/Documents/tsoptions/dist",
      configFilePath: "/home/ptm/Documents/tsoptions/tsconfig.json",
    };
    const result = tsoptions.options;
    except(excepted).looseEqualObject(result);
  });
});
describe("Methods Test", function () {
  const tsoptions = new TsOptions();
  it("Should add if current options do not already exist", function () {
    const excepted = {
      allowJs: true,
      declaration: true,
      outDir: "/home/ptm/Documents/tsoptions/dist",
      configFilePath: "/home/ptm/Documents/tsoptions/tsconfig.json",
      emitDeclarationOnly: true,
    };
    const result = tsoptions.add({ emitDeclarationOnly: true }).options;
    except(excepted).looseEqualObject(result);
  });
  it("Should not add if current options already exist", function () {
    const excepted = {
      allowJs: false,
      declaration: true,
      outDir: "/home/ptm/Documents/tsoptions/dist",
      configFilePath: "/home/ptm/Documents/tsoptions/tsconfig.json",
    };
    const result = tsoptions.add({ allowJs: false }).options;
    except(excepted).notEqual(result);
  });
  it("Should remove if current options already exist", function () {
    const excepted = {
      declaration: true,
      outDir: "/home/ptm/Documents/tsoptions/dist",
      configFilePath: "/home/ptm/Documents/tsoptions/tsconfig.json",
    };
    const result = tsoptions.remove("allowJs").options;
    except(excepted).notEqual(result);
  });
});
