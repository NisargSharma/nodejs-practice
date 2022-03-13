const mysql = require('mysql');

// defining the mysql connection properties
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root@1234"
});

/**
 * @description function to establish mysql connection and create a database
 * @returns {void}
 */
function createDatabase() {
    // connect to mysql using the connection properties
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connected to mysql!");
        // query to create companydb database
        const query = "CREATE DATABASE companydb";
        // execute query
        connection.query(query, (err, result) => {
            if (err) throw err;
            console.log("Database created");
        });
        // close the connection
        connection.end();
    });
}

// function call
createDatabase();