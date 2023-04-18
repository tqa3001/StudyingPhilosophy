const asyncHandler = require('express-async-handler'); 
const Source = require('../models/Source'); 
const User = require('../models/User'); 

/**
 * @desc Get all sources (all users)
 * @route GET /sources
 * @access Public
 */
const getPublicSources = asyncHandler(async (req, res) => {
  const sources = await Source.find({}); 
  console.log(sources); 
  if (!sources) {
    return res.status(500).json({
      "msg": "Error: Internal server error 500"
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
    return res.status(400).json({"msg": "Error: Invalid user ID"}); 
  } 
  const user = await User.findById(userID); 
  if (!user) {
    return res.status(400).json({"msg": "Error: find user with such ID"}); 
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
      "msg": `Error: Some info is missing. userID: ${userID} | origin: ${origin} | title: ${title} | desc: ${description}` 
    }); 
  }
  const user = await User.findById(userID); 
  if (!user) {
    return res.status(400).json({
      "msg": `Error: Cannot find user with ID ${userID}`
    })
  }
  const newSource = await Source.create({ parentUserID: userID, origin, title, description});  // god bless asyncHandler
  if (!newSource) {
    return res.status(500).json({ "msg": "Error: Unable to create source" }); 
  }
  console.log("New source created, updating user..."); 
  user.sources.push(newSource._id); 
  const updatedUser = await user.save(); 
  if (!updatedUser) {
    return res.status(500).json({ "msg": "Error: New source is created but is not added to the user "}); 
  }
  res.status(201).json({ "msg": `Success: Added new source to user <${updatedUser.username}>` }); 
}); 

/**
 * @desc Update source with a given ID
 * @route PATCH /sources 
 * @access Private
 */
const updateSource = asyncHandler(async (req, res) => {
  const { sourceID, newParentUserID, newTitle, newOrigin, newDescription, newUrl } = req.body; 
  if (!sourceID) {
    return res.status(400).json({"msg": "Error: ID for source is not given"});
  } 
  const source = await Source.findById(sourceID); 
  if (!source) {
    return res.status(500).json({"msg": "Error: Cannot find a source with that ID"}); 
  }
  if (newParentUserID)
    source.parentUserID = newParentUserID; 
  if (newTitle) 
    source.title = newTitle; 
  if (newOrigin)
    source.origin = newOrigin; 
  if (newUrl)
    source.url = newUrl;  
  if (newDescription)
    source.description = newDescription; 
  const updateSource = await source.save(); 
  if (!updateSource) {
    return res.status(500).json({"msg": `Error updating source ${sourceID}`}); 
  } 
  res.status(200).json({"msg": "Success: Updated source"}); 
}); 

/**
 * @desc Delete a source given ID 
 * @route DELETE /sources
 * @access Private
 */ 
const deleteSource = asyncHandler(async (req, res) => {
  const { sourceID } = req.body;
  if (!sourceID) {
    return res.status(400).json({"msg": "Error: Source ID is not given"}); 
  }
  const source = await Source.findById(sourceID); 
  if (!source) {
    return res.status(400).json({"msg": "Error: No source is found with the given ID"}); 
  } 
  const sourceInfo = await source.delete(); 
  if (!sourceInfo) {
    return res.status(500).json({"msg": "Error: Couldn't delete the source"}); 
  }
  res.status(200).json({"msg": "Success: Deleted the source"});  
}); 

module.exports = { 
  getPublicSources, getSourcesFromUserID, createSourceAndUpdate, updateSource, deleteSource
}