import path from "node:path";
import ts from "typescript";
import process from "node:process";

class TsOptions {
  private _root: string;
  private _configPath: string;
  private _options: ts.CompilerOptions;
  constructor(configPath?: string) {
    this._root = process.cwd();
    this._configPath = configPath
      ? path.resolve(this._root, configPath)
      : ts.findConfigFile(this._root, ts.sys.fileExists);
    this._options = ts.getDefaultCompilerOptions();
    this._options["configFilePath"] = this._configPath ?? undefined;
    this._init();
  }
  private _init() {
    if (this._configPath) {
      const config = ts.readConfigFile(this._configPath, ts.sys.readFile);
      const basePath = path.dirname(this._configPath);
      const parsed = ts.parseJsonConfigFileContent(
        config.config,
        ts.sys,
        basePath
      );
      this._options = parsed.options;
    }
  }
  add(opts: ts.CompilerOptions) {
    for (const key of Object.keys(opts)) {
      if (!(key in this._options)) {
        this._options[key] = opts[key];
      }
    }
    return this;
  }

  remove(opt: string) {
    if (opt in this._options) {
      delete this._options[opt];
    }
    return this;
  }
  overwrite(opts: ts.CompilerOptions) {
    for (const key of Object.keys(opts)) {
      if (key in this._options) {
        this._options[key] = opts[key];
      }
    }
    return this;
  }
  overwriteAll(opts: ts.CompilerOptions) {
    this._options = opts;
    return this;
  }
  get options() {
    return this._options;
  }
}

export default TsOptions;
