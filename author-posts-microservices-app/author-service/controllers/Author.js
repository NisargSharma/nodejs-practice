const AuthorModel = require('../models/author');

// create and save a new user
// exports.create = async (req, res) => {

//     // error handling for empty object
//     if (!req.body || !req.body.email || !req.body.firstName || !req.body.lastName) {
//         res
//         .status(400)
//         .send({ message: `User details cannot be empty!` });
//     }

//     // create user model with req body
//     const user = new AuthorModel({
//         email: req.body.email,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         phone: req.body.phone
//     });

//     // save user model in the db
//     await user.save()
//     .then(data => { 
//         res
//         .status(200)
//         .send({
//             message: `User created successfully!`,
//             user: data
//         });
//     })
//     .catch(err => {
//         res
//         .status(500)
//         .send({ message: err.message || `Something went wrong!` });
//     });
// }

// // retrieve all users
// exports.findAll = async (req, res) => {
//     try {
//         const users = await AuthorModel.find();
//         res
//         .status(200)
//         .json(users);
//     } catch (error) {
//         res
//         .status(404)
//         .json({ message: error.message });
//     }
// }

// // retrieve a single user by id
// exports.findOne = async (req, res) => {
//     try {
//         const user = await AuthorModel.findById(req.params.id);
//         if (!user) {
//             res
//             .status(404)
//             .json({ message: `User not found!` });
//         } else {
//             res
//             .status(200)
//             .json(user);
//         }
//     } catch (error) {
//         res
//         .status(500)
//         .json({ message: err.message || `Something went wrong!` });
//     }
// }

// // update a single user by id
// exports.update = async (req, res) => {  
//     if(!req.body) {
//         res
//         .status(400)
//         .send({ message: `User details cannot be empty!` });
//     }

//     await AuthorModel.findByIdAndUpdate(req.params.id, req.body, { 
//         userFindAndModify: false 
//     })
//     .then(data => {
//         if(!data) {
//             res
//             .status(404)
//             .send(`User not found!`)
//         } else {
//             res
//             .status(200)
//             .send({ message: `User updated successfully!` });
//         }
//     })
//     .catch(err => {
//         res
//         .status(500)
//         .send({ message: err.message || `Something went wrong!` });    
//     });
// }

// // delete a single user by id
// exports.delete = async (req, res) => {
//     await AuthorModel.findByIdAndRemove(req.params.id)
//     .then(data => {
//         if(!data) {
//             res
//             .status(404)
//             .send({ message: `User not found` });
//         } else {
//             res
//             .status(200)
//             .send({ message: `User deleted successfully!` });
//         }
//     })
//     .catch(err => {
//         res
//         .status(500)
//         .send({ message: err.message || `Something went wrong!` });
//     });
// }