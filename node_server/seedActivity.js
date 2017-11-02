const impala = require('./Impala')
const Q = require('q')

function seedActivity(){
  let client = impala.connectImpala()
  let string1 = 'select distinct tag from warehouse.user'
  let deferred = Q.defer()
  client.query(string1)
    .then(result => deferred.resolve(result))
    .catch(err => deferred.reject(err))
    .done(() => client.close().catch(err => console.error(err)))
  return deferred.promise
}

exports.seedActivity = seedActivity