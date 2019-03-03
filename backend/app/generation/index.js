const Corgi = require("../corgi/index.js");
const { REFRESH_RATE, SECONDS } = require("../config");

const refreshRate = REFRESH_RATE * SECONDS;

// Creates a new generation object when the previous one expires
class Generation {
  constructor() {
    this.expiration = this.calculateExpiration();
    this.generationId = undefined;
  }
  calculateExpiration() {
    this.expiration = null;

    const expirationPeriod = Math.floor(Math.random() * (refreshRate / 2));

    const msUntilExpiration =
      Math.random() < 0.5
        ? refreshRate - expirationPeriod
        : refreshRate + expirationPeriod;
    return new Date(Date.now() + msUntilExpiration);
  }

  newCorgi() {
    if (Date.now() > this.expiration) {
      throw new Error(`This generation expired on ${this.expiration}`);
    }
    return new Corgi({generationId: this.generationId});
  }
}
// module.exports = { Generation, GenerationEngine };
// module.exports = Generation, GenerationEngine;
module.exports = Generation;
