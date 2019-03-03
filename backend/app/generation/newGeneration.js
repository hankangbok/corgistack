const Generation = require('./index.js');
const GenerationTable = require('./table');

class GenerationEngine {
  constructor() {
    // This.generation will be the current generation
    this.generation = null;
    this.timer = null;
  }
  start() {
    this.buildNewGeneration();
  }

  stop() {
    clearTimeout(this.timer);
  }
  // calculate
  buildNewGeneration() {
    const generation = new Generation();


    GenerationTable.storeGeneration(generation)
      .then(({generationId})=>{
        this.generation = generation;
        this.generation.generationId = generationId;
        console.log('new generation', this.generation);
        // Should create a new generation
        this.timer = setTimeout(
          () => this.buildNewGeneration(), 
          this.generation.expiration.getTime() - Date.now()
        );
      })
      .catch(error=> console.error(error));

  }
}

module.exports = GenerationEngine;