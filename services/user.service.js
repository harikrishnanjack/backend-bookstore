const db = require("../models");
const User = db.user;

// services for getting user details
// username, user profile pic, email etc

// Get user by id

exports.getUserById = async (_userId, projectionParams = {}) => {
    projectionParams = {...projectionParams, password:0};
    return await User.findById(_userId).select(projectionParams);
}  
