const pool = require('../../databasePool');
const CorgiTraitTable = require('../corgiTrait/table');
class CorgiTable {
  static storeCorgi(corgi) {
    const {birthdate, nickname, generationId } = corgi;
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO corgi(birthdate, nickname, "generationId") 
         VALUES($1,$2,$3) RETURNING id`, 
         [birthdate, nickname, generationId],
         (error, response) => {
           if (error) return reject(error);
           const corgiId = response.rows[0].id;

           Promise.all( corgi.traits.map(({traitType,traitValue})=> {
            return CorgiTraitTable.storeCorgiTrait({
              corgiId, traitType, traitValue
            });
           }))
            .then(()=> resolve({corgiId}))
            .catch(error=> reject(error));
         }
      )
    });
  }
  static getCorgi({corgiId}) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT birthdate, nickname, "generationId" 
         FROM corgi 
         WHERE corgi.id = $1`,
         [corgiId],
         (error, response) => {
           if(error) return reject(error);
           if (response.rows.length===0) return reject(new Error('no corgi'));
           resolve(response.rows[0]);
         }
      )
    })
  }

}

// CorgiTable.getCorgi({corgiId:1})
//   .then(corgi => console.log(corgi))
//   .catch(error => console.error('error', error));

module.exports = CorgiTable;