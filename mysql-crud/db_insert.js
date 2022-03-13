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
 * @description function to establish mysql connection and insert a record
 * @returns {void}
 */
function insertRecord() {
    // connect to mysql using the connection properties
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connected to mysql!");
        // query to insert a row in employee table
        const query = "INSERT INTO employee (empid, name, address) VALUES (3, 'Benedict Cumberbatch', 'Ohana')";
        // execute query
        connection.query(query, (err, result) => {
            if (err) throw err;
            console.log("Record inserted");
        });
        // close the connection
        connection.end();
    });
}

// function call
insertRecord();