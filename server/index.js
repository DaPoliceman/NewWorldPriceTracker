// server/index.js
var sqlite3 = require('sqlite3').verbose()
const express = require("express");
const cors = require('cors')
const router = express.Router();


// attempt to import the db
let db = new sqlite3.Database('./db/test.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

const PORT = process.env.PORT || 3001;

const app = express();
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// add router in the Express app.
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


app.use(cors());
app.get("/get_table", (req, res) => {
  const table_name = req.query.name;
  sql = `SELECT * FROM ${table_name} ORDER BY TIME ASC`
  db.all(sql, (err, result) => {
    if (err) {
      console.log(err)
      res.json({ message: err });
    } else {
      console.log(result)
      res.json({ message: result });
    }
  })
});


// I hate this, Should fix this at some point, maybe switch from sqlite3
app.get("/get_all_tables", (req, res) => {
  output = {}
  counter = 0
  table_list = []
  db.each("select name from sqlite_master where type='table'",  function (err, table) {
      console.log("name:", table["name"]);
      table_list.push(table["name"])
    }, async function (err, table) {
      console.log(table_list)
      for (table in table_list) {
        sql = `SELECT * FROM ${table_list[table]} ORDER BY TIME ASC`
        current_table = table_list[table]
        console.log("curr",current_table)
        await db.all(sql, (err, result) => {
          if (err) {
            console.log("error:", err)
          } else {
            console.log("res",result)
            output[current_table] = result
            console.log(current_table)
            console.log("output", output)
            counter++;
            if (counter == table_list.length){
              res.json({ message: output });
            }
          }
        })
        await sleep(10)
      }
    })
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.post("/create_table", (req, res) => {

  const table_name = req.body.table;
  sql = `CREATE TABLE ${table_name} (time TIMESTAMP PRIMARY KEY, value smallmoney NOT NULL)`
  db.run(sql, (err) => {
    console.log("Trying to make table", table_name)
    if (err) {
      console.log('ERROR!', err)
      res.json({ message: err });
    }
    else {
      console.log("success")
      res.json({ message: "success" });
    }
    console.log("-----------------------\n\n")
  })

});

app.post('/add_values', function(req, res) {
  const table = req.body.table;
  const time = req.body.time;
  const value = req.body.value;


  sql = `INSERT INTO ${table} (time, value) VALUES (${time}, ${value})`
  db.run(sql, (err) => {
    console.log(`inseting into table ${table}`)
    if (err) {
      console.log('ERROR!', err)
      res.json({ message: err });
    }
    else {
      console.log("success")
      res.json({ message: "success" });
    }
    console.log("-----------------------\n\n")
  })

});


// db.serialize(function () {
//   db.run('CREATE TABLE lorem (info TEXT)')
//   var stmt = db.prepare('INSERT INTO lorem VALUES (?)')
//
//   for (var i = 0; i < 10; i++) {
//     stmt.run('Ipsum ' + i)
//   }
//
//   stmt.finalize()
//
//   db.each('SELECT rowid AS id, info FROM lorem', function (err, row) {
//     console.log(row.id + ': ' + row.info)
//   })
// })
//
// // attempt to close the db
// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });
