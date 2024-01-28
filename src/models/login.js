const mysql = require('mysql2');

// create a connection pool
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Sowmya@333",
    database: "details",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// get a connection from the pool
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }

    console.log('Connected to MySQL database with connection ID ' + connection.threadId);

    // create a table if it doesn't exist
    const createTable = `CREATE TABLE IF NOT EXISTS form (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        registration_number VARCHAR(255) UNIQUE NOT NULL,
        date VARCHAR(255)
    )`;

    connection.query(createTable, (err, results, fields) => {
        if (err) throw err;
        console.log('Table created successfully!');
        connection.release(); // release the connection back to the pool
    });
});

module.exports = pool;
