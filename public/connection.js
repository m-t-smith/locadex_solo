const mysql = require('mysql');
var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Fruitcupeatsj@l@p3n0s",
    database: "uncg_buildings",
    multipleStatements : true
});

mysqlConnection.connect((err)=>{
    if(!err)
        {
            console.log("Connected");
        }
    else
        {
            console.log("Connection Failed");
        }
});

module.exports = mysqlConnection;