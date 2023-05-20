const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// id, fullname, dni, email, phone, password, gender.
const userSchema = new Schema(
    
);

const User = mongoose.model('User', userSchema);

module.exports = User;