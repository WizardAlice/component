const {createClient} = require('node-impala')
 
function connectImpala(){
  const client = createClient()
  client.connect({
    host: '192.168.12.56',
    port: 21000,
    resultType: 'json-array'
  })
  return client
}
 
exports.connectImpala = connectImpala
// client.query('select distinct tag from warehouse.user')
//   .then(result => console.log(result))
//   .catch(err => console.error(err))
//   .done(() => client.close().catch(err => console.error(err)));