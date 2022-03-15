
/**
 * @description function to log the memory used by the script
 * @returns {void}
 */
module.exports = function() {
    // using the process module to get the memory usage of script
    const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(memoryUsage * 100) / 100} MB`);
}