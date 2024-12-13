const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email :{
    type : String , 
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  
 
}, { timestamps: true });

const User = mongoose.model('Userdetails', UserSchema);

module.exports = User;
