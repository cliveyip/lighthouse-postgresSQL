const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const arg = process.argv[2];
/*
heroku-postgres-6689e6b6::SILVER=> SELECT * FROM famous_people
heroku-postgres-6689e6b6::SILVER-> ;
 id | first_name | last_name | birthdate
----+------------+-----------+------------
  1 | Abraham    | Lincoln   | 1809-02-12

  2 | Mahatma    | Gandhi    | 1869-10-02
  3 | Paul       | Rudd      | 1969-04-06
(3 rows)
*/

/*
node lookup_people.js Lincoln
Searching ...
Found 1 person(s) by the name 'Lincoln':
- 1: Abraham Lincoln, born '1809-02-12'
*/

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE last_name = $1", [arg], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log('Searching ...');
    result.rows.forEach(function (elm, index, array){
      console.log(`Found 1 person(s) by the name ${elm.last_name}`);
      console.log(`- ${elm.id}: ${elm.first_name} ${elm.last_name}, born ${elm.birthdate}`);
    })
    client.end();
  });
});
