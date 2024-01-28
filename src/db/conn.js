const mysql = require('mysql2');

var connection = mysql.createConnection({
    host : "localhost",
    user: "root",
    password: "Sowmya@333",
    database: "details",
    port: "3306" 
})

connection.connect((err) => {
    if(err){
        throw err
    }else{
        console.log("connected successfully")
    }
})

module.exports = connection;