const path = require('path');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const mysqlConnection = require("./connection");
const PeopleRoutes = require("./routes/buildings");
var app = express();
app.use(bodyParser.urlencoded({
    extended: false
 }));
app.use(bodyParser.json());
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.get('/', (req, res) => res.render('index', {title: 'Locadex', PeopleRoutes}));

app.post('/', (req, res) =>{
    mysqlConnection.query(`select * from ${req.body.building};`, (err, rows, fields)=>{
        if(!err)
        {
           /* var f = document.createElement("form");
            f.setAttribute('method',"post");
            f.setAttribute('action','/');

            var i = document.createElement("input");
            i.type="text";
            i.name="user_name";
            i.id="user_name1";

            f.appendChild(i)
            document.getElementsByTagName('body')[0].appendChild(f);
            */    
            //fields.forEach(element => )
        }        
    });    
});
app.use("/buildings", PeopleRoutes);

//handlebars middleware







app.listen(3000);