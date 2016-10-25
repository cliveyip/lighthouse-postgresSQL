const pg = require("pg");
const settings = require("./settings"); // settings.json

const arg = process.argv[2];
let counter = 0;

var knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

knex.select('*').from('famous_people').where('last_name', arg).asCallback(function(err, rows){
  //console.log(rows);
  rows.forEach(function (elm, index, array){
    counter++;
    console.log(`Found ${counter} person(s) by the name ${elm.last_name}`);
    console.log(`- ${elm.id}: ${elm.first_name} ${elm.last_name}, born ${elm.birthdate}`);
  })
  knex.destroy();
});

// use promise
// knex.select('*')
// .from('famous_people')
// .then(function(rows){
//   console.log(rows);
//   knex.destroy();
// })
