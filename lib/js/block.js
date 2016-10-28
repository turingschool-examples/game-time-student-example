class Block {

  get defaultOptions() {
      return {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        image: ''
      };
  }

  constructor(options) {

    options = this.buildOptions(options);

    for (var prop in options) {
      this[prop] = options[prop];
    }
  }

  buildOptions (options) {

    options = options || {};

    var defaultOptions = this.defaultOptions;

    for (var prop in defaultOptions) {
      if (options.hasOwnProperty(prop) === false) {
        options[prop] = defaultOptions[prop];
      }
    }
    return options;
  }
}

module.exports = Block;
