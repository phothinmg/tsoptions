const ts = require("typescript");
const path = require("node:path");
const process = require("node:process");

class TsOptions {
  /**
   *
   * @param {string|undefined} [configPath]
   */
  constructor(configPath) {
    /**
     * @private
     */
    this._configPath = configPath
      ? path.resolve(root, configPath)
      : ts.findConfigFile(root, ts.sys.fileExists);
    this._options = ts.getDefaultCompilerOptions();
    this.#_init();
  }
  #_init() {
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
  /**
   *
   * @param {ts.CompilerOptions} opts
   */
  add(opts) {
    for (const key of Object.keys(opts)) {
      if (!(key in this._options)) {
        this._options[key] = opts[key];
      }
    }
    return this;
  }
  /**
   *
   * @param {string} opt
   */
  remove(opt) {
    if (opt in this._options) {
      delete this._options[opt];
    }
    return this;
  }
  /**
   *
   * @param {ts.CompilerOptions} opts
   */
  overwrite(opts) {
    for (const key of Object.keys(opts)) {
      if (key in this._options) {
        this._options[key] = opts[key];
      }
    }
    return this;
  }
  /**
   *
   * @param {ts.CompilerOptions} opts
   */
  overwriteAll(opts) {
    this._options = opts;
    return this;
  }
}

module.exports = TsOptions;
