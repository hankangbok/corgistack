const express = require('express');
const GenerationEngine = require('./generation/newGeneration.js'); 
const corgiRouter = require('./api/corgi');
const generationRouter = require('./api/generation');

const app = express();
const engine = new GenerationEngine();

console.log(engine);
app.locals.engine = engine;
app.use('/corgi', corgiRouter);
app.use('/generation', generationRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    type: 'error', message: err.message
  })
});

engine.start();




module.exports = app;

// const Generation = require('./generation.js');
// const generation = new Generation();
// console.log('generation', generation);
// const gooby = generation.newCorgi();
// console.log('gooby', gooby);

  
// setTimeout(() => {
//   const mimar = generation.newCorgi();
//   console.log('mimar', mimar);

// },15000);

// const Corgi = require('./corgi.js');

// const fooey = new Corgi({
//   birthdate: new Date(), 
//   nickname: 'fooey'
// });
// const baloo = new Corgi({
//   birthdate: new Date(),
//   nickname: 'baloo'
// });

// const popop = new Corgi();
// setTimeout(() => {
//   const gooby = new Corgi();
//   console.log('gooby', gooby);
// },3000);
// console.log('fooey', fooey);
// console.log('baloo', baloo);
// console.log('popop', popop);