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
 * @description function to establish mysql connection and retrieve all records
 * @returns {void}
 */
function getAllRecords() {
    // connect to mysql using the connection properties
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connected to mysql!");
        // query to retrieve all records from employee table
        const query = "SELECT * FROM employee";
        // execute query
        connection.query(query, (err, result) => {
            if (err) throw err;
            console.log(result);
        });
        // close the connection
        connection.end();
    });
}

// function call
getAllRecords();