// Need to create the variable of my connection so I can actually make the connection
var connection = require("../config/connection");
//This is where I will need to make sure all the text is pushed in correctly
function createQmarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
    return arr.toString();
  }
  // This is where Ill actually need to translate all the sql information coming in.
  function translateSql(ob) {
    var arr = [];
    for (var key in ob) {
      var value = ob[key];
      if (Object.hasOwnProperty.call(ob, key)) {
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }
    return arr.toString();
  }
  // This is where i will name my orms and write out the indiviudual functions of them, such as displaying all burgers adding a burger and deleteing a burger
  var orm = {
      // This is where I will be able to select and display all burgers
    selectAll: function(table, cb) {
      var dbQuery = "SELECT * FROM " + table + ";";
  
      connection.query(dbQuery, function(err, res) {
        if (err) {
          throw err;
        }
        cb(res);
      });
    },
    // This is where ill build the functionality to add a new burger
    insertOne: function(table, cols, vals, cb) {
      var dbQuery =
        "INSERT INTO " +
        table +
        " (" +
        cols.toString() +
        ") " +
        "VALUES (" +
        createQmarks(vals.length) +
        ") ";
  
      console.log(dbQuery);
      connection.query(dbQuery, vals, function(err, res) {
        if (err) {
          throw err;
        }
        cb(res);
      });
    },
    //This is where ill move the burgers to the pick up section
    updateOne: function(table, objColVals, condition, cb) {
      var dbQuery =
        "UPDATE " +
        table +
        " SET " +
        translateSql(objColVals) +
        " WHERE " +
        condition;
  
      console.log(dbQuery);
  
      connection.query(dbQuery, function(err, res) {
        if (err) {
          throw err;
        }
        cb(res);
      });
    },
    // And here I will build out the functionality to delete or "Devour the burgers"
    deleteOne: function(table, condition, cb) {
      var dbQuery = "DELETE FROM " + table + " WHERE " + condition;
      console.log(dbQuery);
  
      connection.query(dbQuery, function(err, res) {
        if (err) {
          throw err;
        }
        cb(res);
      });
    }
  };
  module.exports = orm;