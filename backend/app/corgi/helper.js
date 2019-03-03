const pool = require('../../databasePool');
const CorgiTable = require('./table');
const Corgi = require('./index');

getCorgiWithTraits = ({corgiId}) => {
  return Promise.all([
    CorgiTable.getCorgi({corgiId}),
    new Promise((resolve,reject) => {
      pool.query(
        `SELECT "traitType", "traitValue" 
         FROM trait
         INNER JOIN corgitrait
         ON trait.id = corgiTrait."traitId"
         WHERE corgiTrait."corgiId" = $1`,
         [corgiId],
         (error,response) => {
           if (error) return reject(error);

           resolve(response.rows);
         }
      )
    })
  ])
    .then(([corgi, corgiTraits]) => {
      return new Corgi({...corgi, corgiId, traits: corgiTraits})
    })
    .catch(error=> console.error(error));
};

// getCorgiWithTraits({corgiId: 2})
// .then(corgi => console.log('corgi', corgi))
// .catch(error => console.error('error', error));

module.exports = {getCorgiWithTraits};
