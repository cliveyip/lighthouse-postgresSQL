/*
Implement an add_person.js script that takes in the
first name, last name and date of a famous person as three command line arguments
and uses Knex to perform an insert.
*/
const settings = require("./settings"); // settings.json

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

let   first_name = process.argv[2],
      last_name = process.argv[3],
      date = process.argv[4];

knex('famous_people')
.insert({first_name: process.argv[2], last_name: process.argv[3], birthdate: process.argv[4]})
.then(function() {
   return {inserted: true};
 });

knex.destroy();
