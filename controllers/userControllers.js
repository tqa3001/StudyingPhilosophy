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
const asyncHandler = require('express-async-handler');  // reduce try-catching. 
const bcrypt = require('bcrypt');  // for hashing password 

/**
 * @desc if isAdmin, Get all users.
 * @route GET /user
 * @access Private
 */
const getAllUsers = asyncHandler(async (req, res) => { // Note: no next(), this is the end of the route. 
  const users = await User.find({})           // ? Why no exec()
                        .select('-password')  // Don't give password back to client
                        .lean();              // Not sending methods like save()
  // If no errors -> the actual case handling begins 
  if (!users?.length) {  // optional chaining -> check if users exist, then if length > 0.
    return res.status(400).json({'msg': 'No user exists'});  // safer than user if-else 
  } 
  res.json(users); 
}); 

/**
 * @desc Create a new user & login afterward.
 * @route POST /user
 * @access Private
 */
const createUser = asyncHandler(async (req, res) => { 
  const { username, password } = req.body; 
  console.log('I LOVE SEX', username, password); 
  // Check data
  if (!username || !password) {
    return res.status(400).json({'msg': 'Invalid input'}); 
  }
  // Check duplicate (if async-await and u want to return a promise -> exec()? Hmm exec() is like quantum measurement)
  const dup = await User.findOne({ username }).select('-password').lean().exec();  
  if (dup) {
    return res.status(400).json({'msg:': 'Username already exists'}); 
  } 
  // Hash password (10 salt rounds, return a promise)
  const hashedPasswd = await bcrypt.hash(password, 10); 
  const newUser = await User.create({ username, "password": hashedPasswd }); 
  if (newUser) {  // ? is this if necessary? yes, user data might be invalid
    return res.status(201).json({'msg': `User <${username}> successfully created`}); 
  }
  console.log('yay!'); 
  return res.status(400).json({'msg': 'Invalid input'}); 
});

/**
 * @desc Update an user 
 * @route PATCH /user
 * @access Private
 */
const updateUser = asyncHandler(async (req, res) => { 
  const { id, username, password, active, isAdmin, sources } = req.body; 
  if (!id || !username || !Array.isArray(sources) || typeof active !== 'boolean' || typeof isAdmin !== 'boolean') {  
    return res.status(400).json({'msg': 'Invalid input'}); 
  } 
  const user = await User.findById(id).exec();  // notice there's no lean()
  if (!user) {
    return res.status(400).json({'msg': 'User does not exist'}); 
  } 
  // Avoid changing name to one that is already exist.
  const dup = await User.findOne({ username }).lean().exec(); 
  if (dup && dup._id.toString() !== id) {  // https://www.javascripttutorial.net/string/javascript-string-equals/
    return res.status(409).json({'msg': 'Cannot change username to an already existing one'});
  }  // 409 Conflict 
  // Update
  user.username = username; 
  user.active = active; 
  user.idAdmin = isAdmin; 
  user.sources = sources; 
  if (password) {  // change password
    user.password = await bcrypt(password, 10); 
  }
  const updatedUser = await user.save(); 
  res.json({'msg': `Updated user ${updatedUser}`}); 
});

/**
 * @desc Delete an user
 * @route DELETE /user
 * @access Private
 */
const deleteUser = asyncHandler(async(req, res) => {  // best practice: set active to false, don't delete?
  const { id } = req.body; 
  if (!id) {
    return res.json({'msg': 'No user id is given'}); 
  } 
  const user = await User.findById(id).exec(); 
  if (!user) {
    return res.status(400).json({'msg': 'No user is found with the given id'}); 
  }
  const result = await user.deleteOne();  // There's another method but for models + options. No documentation for this tho?
  res.json({'msg': `Deleted user ${result.username} with ID ${result._id}`});
}); 

/**
 * @desc Get user dashboard with a list of all sources
 * @route GET /user/userId
 * @access Private
 */
const accessUser = asyncHandler(async (req, res) => { 
  
});

module.exports = {
  getAllUsers, createUser, updateUser, deleteUser, accessUser 
}