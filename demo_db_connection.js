var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Fruitcupeatsj@l@p3n0s"
});

con.connect(function(err) {
	if (err) throw err;
  	console.log("Connected!");
  	con.query("select building_name from uncg_buildings.buildings", function(err, result,fields) {
   	if (err) throw err;
   	console.log(result);
   	});
});
