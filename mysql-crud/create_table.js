const mysql = require('mysql');

// defining the mysql connection properties
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root@1234",
    database: "companydb"
});

/**
 * @description function to establish mysql connection and create a table
 * @returns {void}
 */
function createTable() {
    // connect to mysql using the connection properties
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connected to mysql!");
        // query to create a table in companydb database
        const query = "CREATE TABLE employee (empid INT, name VARCHAR(255), address VARCHAR(255))";
        // execute query
        connection.query(query, (err, result) => {
            if (err) throw err;
            console.log("Table created");
        });
        // close the connection
        connection.end();
    });
}

// function call
createTable();