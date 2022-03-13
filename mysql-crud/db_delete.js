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
 * @description function to establish mysql connection and delete a record
 * @returns {void}
 */
function deleteRecord() {
    // connect to mysql using the connection properties
    connection.connect((err) => {
        if (err) throw err;
        console.log("Connected to mysql!");
        // query to delete a row in employee table
        const query = "DELETE FROM employee WHERE address = 'Ohana'";
        // execute query
        connection.query(query, (err, result) => {
            if (err) throw err;
            console.log("Record deleted");
        });
        // close the connection
        connection.end();
    });
}

// function call
deleteRecord();