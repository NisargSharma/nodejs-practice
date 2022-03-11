const readline = require('readline');
const fs = require('fs');

/**
 * @description function to read an input line from the command line
 * @returns {Promise}
 */
function readData() {
    // instance of readline interface for reading input line
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve, reject) => 
        rl.question("Enter any text to add: ", (answer) => {
            resolve(answer);
            rl.close();
        })
    );
}

/**
 * @description function to write the provided data into a text file
 * @param {String} data 
 * @returns {void}
 */
function writeData(data) {
    fs.writeFile("data.txt", data, (err) => {
        if(err) {
            console.error(`Error occured: ${err}`);
        }
        console.log(`The file has been saved`);
    });
}

/**
 * @description wrapper function for async/await job
 * @returns {void}
 */
async function initalizeApp() {
    try {
        // awaiting response from readData function before executing writeData function
        const data = await readData();
        // function invoked if promise is resolved 
        writeData(data);   
    } catch (error) {
        // handling error if promise is rejected
        console.error(error);
    }
}

// function call
initalizeApp();