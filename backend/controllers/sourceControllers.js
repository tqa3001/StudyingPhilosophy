const asyncHandler = require('express-async-handler'); 
const Source = require('../models/Source'); 
const User = require('../models/User'); 

/**
 * @desc Get all sources (all users)
 * @route GET /sources
 * @access Private
 */
const getAllSources = asyncHandler(async (req, res) => {
  const sources = await Source.find({}); 
  console.log(sources); 
  if (!sources) {
    return res.status(500).json({
      "err": "Internal server error 500"
    })
  }
  res.status(200).json(sources);  // an array of sources which should be normalized by redux's EntityAdapter
});
/**
 * @desc Get sources @ userID
 * @route GET /sources/userID
 * @access Private
 */
const getSourcesFromUserID = asyncHandler(async (req, res) => {
  const { userID } = req.params; 
  if (!userID) {
    return res.status(400).json({"err": "Invalid user ID"}); 
  } 
  const user = await User.findById(userID); 
  if (!user) {
    return res.status(400).json({"err": "Cannot find user with such ID"}); 
  } 
  /**
   * We need promise.all to merge them into one promise to await
   * since otherwise it would return an array of pending promises
   */
  const result = await Promise.all(user.sources.map(async (sourceID) => {
    const source = await Source.findById(sourceID); 
    console.log("bruh", sourceID, source); 
    return source; 
  }));  
  console.log("query result: \n", result); 
  res.status(200).json(result); 
})

/**
 * @desc Create new source @ userID
 * @route POST /sources
 * @access Private
 */
  
const createSourceAndUpdate = asyncHandler(async (req, res) => {
  const { userID, origin, title, description } = req.body; 
  if (!userID || !origin || !title) {
    return res.status(400).json({ 
      "err": `Some info is missing. userID: ${userID} | origin: ${origin} | title: ${title} | desc: ${description}` 
    }); 
  }
  const user = await User.findById(userID); 
  if (!user) {
    return res.status(400).json({
      "err": `Cannot find user with ID ${userID}`
    })
  }
  const newSource = await Source.create({ parentUserID: userID, origin, title, description});  // god bless asyncHandler
  if (!newSource) {
    return res.status(500).json({ "err": "Unable to create source" }); 
  }
  console.log("New source created, updating user..."); 
  user.sources.push(newSource._id); 
  const updatedUser = await user.save(); 
  if (!updatedUser) {
    return res.status(500).json({ "err": "New source is created but is not added to the user "}); 
  }
  res.status(201).json({ "msg": "Successfully added new source to user " }); 
}); 

module.exports = {
  getAllSources, getSourcesFromUserID, createSourceAndUpdate
}