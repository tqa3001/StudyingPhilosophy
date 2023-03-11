const asyncHandler = require('express-async-handler'); 
const Source = require('../models/Source'); 
const User = require('../models/User'); 

/**
 * @desc Create new source
 * @route POST /user/userID
 * @access Private
 */
  
const createSourceAndUpdate = asyncHandler(async (req, res) => {
  const { userID, origin, title, description } = req.body; 
  if (!userID || !origin || !title) {
    return res.json({ 
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
  createSourceAndUpdate
}