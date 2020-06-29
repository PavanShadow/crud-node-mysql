const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
const cors = require('cors');

//db connection
var mysqlcon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodeangular'
});

mysqlcon.connect((err) => {
    if (!err)
        console.log('DB connected');
    else
        console.log('DB connection failed \n' + JSON.stringify(err))
});

//server
app.listen(3000, () => console.log('Server running'));

//allow cross origin
app.use(cors({ origin: 'http://localhost:4200' }));

//get employees
app.get('/employees', (req, res) => {
    mysqlcon.query('select * from employee', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//get one employee
app.get('/employees/:id', (req, res) => {
    mysqlcon.query('select * from employee where EmpId = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//delete one employee
app.delete('/employees/:id', (req, res) => {
    mysqlcon.query('delete from employee where EmpId = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//create an employee
app.post('/employees', (req, res) => {
    mysqlcon.query('insert into employee(EmpId, EmpName,EmpCity,EmpSalary) values(?,?,?,?)', [req.body.eid, req.body.ename, req.body.ecity, req.body.esalary], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//update an employeee
app.put('/employees/:id', (req, res) => {
    mysqlcon.query('update employee set EmpName = ?, EmpCity = ?, EmpSalary = ? where EmpId = ?', [req.body.ename, req.body.ecity, req.body.esalary, req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//admin login
app.post('/admins', (req, res) => {
    mysqlcon.query('select * from admin where AdminUname = ? and AdminPwd = ?', [req.body.uname, req.body.password], (err, rows, fields) => {
        if (!err) {
            if (rows.length > 0)
                res.send({code: 'Success'});
            else
                res.send({code: 'Error'});
        }
        else
            console.log(err);
    })
});
