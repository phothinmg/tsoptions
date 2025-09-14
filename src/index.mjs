/*! *****************************************************************************
Copyright (c) Pho Thin Mg <phothinmg@disroot.org>

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
***************************************************************************** */
import ts from "typescript";
import path from "node:path";
import process from "node:process";

class TsOptions {
  /**
   *
   * @param {string|undefined} [configPath]
   */
  constructor(configPath) {
    this._root = process.cwd();
    /**
     * @private
     */
    this._configPath = configPath
      ? path.resolve(this._root, configPath)
      : ts.findConfigFile(this._root, ts.sys.fileExists);
    this._options = ts.getDefaultCompilerOptions();
    this.#_init();
    this._options["configFilePath"] = this._configPath ?? undefined;
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
   * Adds new options to the internal options object.
   * Only adds keys that do not already exist in the current options.
   *
   * @param {ts.CompilerOptions} opts - An object containing options to add.
   * @returns {this} Returns the instance for chaining.
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
   * Removes the specified option from the internal options object.
   *
   * @param {string} opt - The key of the option to remove.
   * @returns {this} Returns the instance for method chaining.
   */
  remove(opt) {
    if (opt in this._options) {
      delete this._options[opt];
    }
    return this;
  }
  /**
   * Overwrites existing options with the provided values.
   *
   * Iterates over the keys in the given `opts` object and updates the corresponding
   * properties in the internal `_options` object if they exist.
   *
   * @param {ts.CompilerOptions} opts - An object containing option key-value pairs to overwrite.
   * @returns {this} Returns the current instance for chaining.
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
   * Overwrites all current options with the provided options object.
   *
   * @param {ts.CompilerOptions} opts - The new options to set.
   * @returns {this} The current instance for chaining.
   */
  overwriteAll(opts) {
    this._options = opts;
    return this;
  }
  get options() {
    return this._options;
  }
}

export default TsOptions;
