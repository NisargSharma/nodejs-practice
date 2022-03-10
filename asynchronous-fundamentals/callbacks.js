
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
 * @param {function} callback 
 * @returns {void}
 */
function addPost(post, callback) {
    setTimeout(() => {
        // add the post object in the posts array
        postsArr.push(post);
        console.log(`Post added successfully`);
        // callback function executed after the addPost function is completed
        callback();
    }, 2000);
}

// passing getPosts function as a parameter in addPost function call
addPost({ title: "Post Three", body: "This is Post Three" }, getPosts);