const pool = require('../../databasePool');
const TraitTable = require('../trait/table');

class CorgiTraitTable{
  // Gets the trait id and inserts into the table in the database 
  static storeCorgiTrait({corgiId, traitType, traitValue}) {
    return new Promise((resolve, reject) => {
      TraitTable.getTraitId({traitType,traitValue})
        .then(({traitId})=> {
          pool.query(
            `INSERT INTO corgiTrait("traitId", "corgiId") VALUES($1, $2)`,
            [traitId, corgiId],
            (error, response) => {
              if (error) return reject(error);
              resolve();
            }
          )
        });
    });
  }


}


module.exports = CorgiTraitTable;