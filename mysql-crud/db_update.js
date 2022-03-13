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
 * @description function to establish mysql connection and update a record
 * @returns {void}
 */
function updaterecord() {
    // connect to mysql using the connection properties
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connected to mysql!");
        // query to update a record in employee table
        const query = "UPDATE employee SET address = 'Valley 345' WHERE address = 'Ohana'";
        // execute query
        connection.query(query, (err, result) => {
            if (err) throw err;
            console.log("Record updated");
        });
        // close the connection
        connection.end();
    });
}

// function call
updaterecord();