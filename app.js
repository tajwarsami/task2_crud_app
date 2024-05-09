

require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bcript = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const db = require('./database.js');

app.post('/user', (req, res)=>{
     try {
        const u_name = req.body.u_name;
        const email = req.body.email;
        const _password = req.body._password;
        //const role = req.body.role;

        console.log(req.body)

        if ((u_name == null) || (email == null) || (_password == null)) {
            res.send('u_name, email and password is required !');
            return;
        }
        const sqlInsert = "INSERT INTO tbl_users (u_name,email,_password,role) VALUES ('" + req.body.u_name + "','" + req.body.email + "','" + req.body._password + "','" + "regular_user'); ";
        db.query(sqlInsert, (err, result) => {
            res.status(201).send(result)
        })
     } catch (error) {
        console.log(error)
     }
})

app.get('/user',  (req, res) => {
   
    const selectsql = "SELECT * FROM tbl_users ;";
    db.query(selectsql, (err, result) => {
        res.send(result);
    })
})



app.get('/user/',  (req, res) => {
   
    const selectsql = "SELECT * FROM tbl_users ;";
    db.query(selectsql, (err, result) => {
        res.send(result);
    })
})


app.get('/user/:u_id',  (req, res) => {
   
    const u_id = req.params.u_id;
    const selectsql = "SELECT * FROM tbl_users where u_id = '"+u_id+"';";
    db.query(selectsql, (err, result) => {
        res.send(result);
    })
})


app.post('/tasks', (req, res)=>{

    // const u_id = req.body.u_id;
    // const t_id = req.body.t_id;
    // const title = req.body.title;
    // const description = req.body.description;
    // const _status = req.body._status;

    // console.log(req.body)

    const sqlInsert = "INSERT INTO tbl_task (u_id, t_id, title, description, _status) VALUES ('" + req.body.u_id + "','" + req.body.t_id + "','" + req.body.title +"','" +req.body.description + "','"+ req.body._status+ "'); ";
    db.query(sqlInsert, (err, result) => {
        res.send(result);
    })

})

app.delete('/tasks/:u_id/:t_id', (req, res)=>{

    const u_id = req.params.u_id;
     const t_id = req.params.t_id;
    // const title = req.body.title;
    // const description = req.body.description;
    // const _status = req.body._status;

    // console.log(req.body)


    const sqlDelete = "DELETE FROM tbl_task where u_id =" + `${u_id}` + "&& t_id = "+ `${t_id}`;
    db.query(sqlDelete, (err, result) => {
        res.send(result);
    })

})

app.put('/tasks/:u_id/:t_id', (req, res)=>{

    const u_id = req.params.u_id;
    const t_id = req.params.t_id;
   
    const _status = req.body._status;


    const sqlUpdate = "UPDATE tbl_task SET _status= '" + _status +  "' where u_id =" + `${u_id}` + "&& t_id = "+ `${t_id}`;
    db.query(sqlUpdate, (err, result) => {
        res.send(result);
    })

})

app.get('/tasks',  (req, res) => {
   
    const selectsql = "SELECT * FROM tbl_task ;";
    db.query(selectsql, (err, result) => {
        res.send(result);
    })
})

app.get('/tasks/user/:u_id',  (req, res) => {

    const u_id = req.params.u_id;
   
    const selectsql = "SELECT * FROM tbl_task where u_id = '"+ u_id + "' ;";
    db.query(selectsql, (err, result) => {
        res.send(result);
    })
})




app.listen(8000, ()=>{
    console.log("app running on port 8000")
})