const { Router }= require('express');
const CorgiTable = require('../corgi/table');

const router = new Router();

router.get('/new', (req,res, next)=> {
  const corgi = req.app.locals.engine.generation.newCorgi();
  CorgiTable.storeCorgi(corgi)
    .then(({corgiId}) => {
      console.log('corgiId', corgiId);
      corgi.corgiId = corgiId;
      res.json({corgi});
    })
    .catch((error)=> next(error));
  
}); 

module.exports = router;