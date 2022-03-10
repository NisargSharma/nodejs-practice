
// array of objects with all the posts
const postsArr = [
    { title: "Post One", body: "This is Post One" },
    { title: "Post Two", body: "This is Post Two" }
];

/**
 * @description function to access and display all the posts
 * @returns {void}
 */
function getPosts() {
    // iterate over the posts array using forEach callback 
    // and print each post on console
    setTimeout(() => postsArr.forEach(post => console.log(`${post.body}`)) , 1000);
}

/**
 * @description function to add a post 
 * @param {Object} post 
 * @returns {Promise}
 */
function addPost(post) {
    return new Promise((resolve, reject) => 
        setTimeout(() => {
            // add the post object in the posts array
            postsArr.push(post);

            // checking and returning state of Promise
            const isError = false;

            if(!isError) {
                console.log(`Post added successfully`);
                resolve();
            } else {
                reject(`Error: Something went wrong!`);
            }
        }, 2000)
    );
}

/**
 * @description wrapper function for async/await task
 * @returns {void}
 */
async function init() {
    try {
        // awaiting response from addPost function before executing getPosts function
        await addPost({ title: "Post Three", body: "This is Post Three" });   
        // function invoked if promise is resolved 
        getPosts();
    } catch (error) {
        // handling error if promise is rejected
        console.error(error);
    }
}

// function call to init function
init();
