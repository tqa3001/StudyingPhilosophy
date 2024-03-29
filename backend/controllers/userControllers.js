/**
 * User -> a list of sources 
 *   Source -> a list of notes
 * 
 * POST /user/userId/create -> if authorized, return create + display info
 * GET /user/userId/SourceId -> if authorized, return view all comments. 
 * POST /user/userId/SourceId/addnote -> if authorized, create new note, return new note. 
 */

const User = require('../models/User'); 
const Source = require('../models/Source'); 
const asyncHandler = require('express-async-handler');  // reduce try-catching and findAll promises and replace with async await syntax (more concise)
const bcrypt = require('bcrypt');  // for hashing password 

/**
 * @desc get all users.
 * @route GET /users
 * @access Private
 */
const getAllUsers = asyncHandler(async (req, res) => { // Note: no next(), this is the end of the route. 
  const users = await User.find({})           // ? Why no exec()
                        .select('-password')  // Don't give password back to client
                        .lean();              // Not sending methods like save()
  // If no errors -> the actual case handling begins 
  if (!users?.length) {  // optional chaining -> check if users exist, then if length > 0.
    return res.status(400).json({"msg": "No user exists"});  // safer than user if-else 
  } 
  res.json(users); 
}); 

/**
 * @desc Create a new user & login afterward.
 * @route POST /users
 * @access Private
 */
const createUser = asyncHandler(async (req, res) => { 
  const { username, email, password } = req.body; 
  // Check data
  if (!username || !email || !password) {
    return res.status(400).json({"msg": "Invalid input"}); 
  }
  // Check duplicate (if async-await and u want to return a promise -> exec()? Hmm exec() is like quantum measurement)
  const dupUsername = await User.findOne({ username }).select('-password').lean();  
  if (dupUsername) {
    return res.status(400).json({"msg": "Username already exists"}); 
  } 
  const dupEmail = await User.findOne({ email }).select('-password').lean(); 
  if (dupEmail) {
    return res.status(400).json({"msg": "An user with this email already exists"}); 
  }
  // Hash password (10 salt rounds, return a promise)
  const hashedPassword = await bcrypt.hash(password, 10); 
  const newUser = await User.create({ username, password: hashedPassword, email }); 
  if (newUser) {  // ? is this if necessary? yes, user data might be invalid
    return res.status(201).json({"msg": `User <${username}> successfully created`}); 
  } 
  return res.status(400).json({"msg": "Invalid input"}); 
});

/**
 * @desc Update an user 
 * @route PATCH /users
 * @access Private
 */
const updateUser = asyncHandler(async (req, res) => { 
  const { id, username, password, active, isAdmin, sources } = req.body; 
  if (!id || !username || !Array.isArray(sources) || typeof active !== 'boolean' || typeof isAdmin !== 'boolean') {  
    return res.status(400).json({"msg": "Invalid input"}); 
  } 
  const user = await User.findById(id).exec();  // notice there's no lean()
  if (!user) {
    return res.status(400).json({"msg": "User does not exist"}); 
  } 
  // Avoid changing name to one that is already exist.
  const dup = await User.findOne({ username }).lean().exec(); 
  if (dup && dup._id.toString() !== id) {  // https://www.javascripttutorial.net/string/javascript-string-equals/
    return res.status(409).json({"msg": "Cannot change username to an already existing one"});
  }  // 409 Conflict 
  // Update
  user.username = username; 
  user.active = active; 
  user.isAdmin = isAdmin; 
  user.sources = sources; 
  if (password) {  // change password
    user.password = await bcrypt(password, 10); 
  }
  const updatedUser = await user.save(); 
  res.json({"msg": `Updated user ${updatedUser}`}); 
});

/**
 * @desc Delete an user
 * @route DELETE /users
 * @access Private
 */
const deleteUser = asyncHandler(async(req, res) => {  // best practice: set active to false, don't delete?
  const { id } = req.body; 
  if (!id) {
    return res.json({"msg": "No user id is given"}); 
  } 
  const user = await User.findById(id).exec(); 
  if (!user) {
    return res.status(400).json({"msg": "No user is found with the given id"}); 
  }
  const result = await user.deleteOne();  // There's another method but for models + options. No documentation for this tho?
  res.json({"msg": `Deleted user ${result.username} with ID ${result._id}`});
}); 

/**
 * @desc Get user dashboard with a list of all sources
 * @route GET /users/userID
 * @access Private
 */
const accessUser = asyncHandler(async (req, res) => { 
  
});

module.exports = {
  getAllUsers, createUser, updateUser, deleteUser
}