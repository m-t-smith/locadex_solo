const express = require('express');
//needed to read html form parameters 
const bodyParser = require('body-parser');
const Router = express.Router();

//imports db connection from connection.js
const mysqlConnection = require("../connection");
Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({
    extended: false
 }));
Router.get('/', (req, res)=>{
    res.sendfile(index.handlebars);
    var building_name = req.body.building;
    
});
Router.post('/', (req, res)=>{
    console.log(req.body.building);
   
    var building_name = String(req.body.building);
    mysqlConnection.query(`select building_history from buildings where building_name = "${building_name}";`, (err, rows, fields)=>{
        if(!err)
            {
                
                var history = "History: ".concat(rows[0].building_history);
                mysqlConnection.query(`select course_category from courses where (building_id = (select building_id from buildings where building_name = "${building_name}"));`, (err, rows, fields)=>{
                    if(!err)
                        {
                            var courses = rows;
                            mysqlConnection.query(`select * from pettyFaculty where building_name="${building_name}";`, (err, rows, fields)=>{
                                if(!err)
                                    {
                                        var faculty = rows;
                                        mysqlConnection.query(`select utilities from utilities where (building_id = (select building_id from buildings where building_name = "${building_name}"));`, (err, rows, fields)=>{
                                            if(!err)
                                                {
                                                    var utilities = rows;
                                                    //built a data array containing an array of results from the sql queries to use in the res.json command but I need to figure out how to format properly
                                                    var data = {
                                                        history,
                                                        courses,
                                                        faculty,
                                                        utilities
                                                    }
                                                    //res.json(history);
                                                    res.json(data);
                                                    
                                                }
                                            else    {
                                                console.log(err);
                                            }
                                        })
                                        
                                        
                                    }
                                else    {
                                    console.log(err);
                                }
                            })
                            
                            
                        }
                    else    {
                        console.log(err);
                    }
                })
            }   
                
    })
    
    //res.json(String(history).concat(String(courses)));    
        //select course_category from courses where building_id = 1;
});
Router.post('/insertInfo', (req, res) =>{
    mysqlConnection.query(`select * from ${req.body.tableSelected};`, (err, rows, fields)=>{
        if(!err)
        {
           //res.send("hi");
           //res.sendFile(__dirname + "/insert.html");
           switch(req.body.tableSelected){
            case 'buildings':
                res.sendFile(__dirname + "/insertBuildings.html");
                break;
            case 'faculty':
                res.sendFile(__dirname + "/insertFaculty.html");
                break;
            case 'courses':
                res.sendFile(__dirname + "/insertCourses.html");
                break;
            case 'utilities':
                res.sendFile(__dirname + "/insertUtilities.html");
                break;
            default:
                res.send("idk what happened");
        }

        }        
    });    
});
Router.post('/insertBuildings', (req, res) =>{
    var bn = req.body.building_name;
    mysqlConnection.query(`insert into buildings(building_name,building_history) values("${req.body.building_name}", "${req.body.building_history}");`, (err, rows, fields)=>{
        if(!err)
        {
           res.send("Inserted Successfully");
        }
        else {
            console.log(err);
            res.send("Something went wrong");
        }
    });    
});    
Router.post('/insertFaculty', (req, res) =>{

    mysqlConnection.query(`insert into faculty(building_id,name,room_number) values(1,"${req.body.faculty_name}", ${req.body.faculty_roomnum});`, (err, rows, fields)=>{
        if(!err)
        {
           res.send("Inserted Successfully");
        }
        else {
            console.log(err);
            res.send("Something went wrong");
        }
    });    
});    
Router.post('/insertCourses', (req, res) =>{
    
    mysqlConnection.query(`insert into courses(building_id,course_category,course_number,room_number) values(1,"${req.body.course_category}", ${req.body.course_number}, ${req.body.room_number});`, (err, rows, fields)=>{
        if(!err)
        {
           res.send("Inserted Successfully");
        }
        else {
            console.log(err);
            res.send("Something went wrong");
        }
    });    
});    
Router.post('/insertUtilities', (req, res) =>{

    mysqlConnection.query(`insert into utilities(building_id,utilities) values(1,"${req.body.utility_desc}");`, (err, rows, fields)=>{
        if(!err)
        {
           res.send("Inserted Successfully");
        }
        else {
            console.log(err);
            res.send("Something went wrong");
        }
    });    
});    
/*Router.post('/insertInfo', (req, res) =>{
    var table = req.body.tableSelected;
    
    res.send(req.body.tableSelected);
});*/
module.exports = Router;