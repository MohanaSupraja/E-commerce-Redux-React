const mongoose = require('mongoose'); // Erase if already required
const bcrypt=require('bcrypt');
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    id:{
        type:Number
    },
    name:{
        type:String,
        required:true,
        unique:true,
      
    },
    email:{
        type:String,
        required:true,
        //unique:true,
    },
    mobile:{
        type:String,
        required:true,
        //unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmpassword:{
        type:String,
        required:true,
    },
    
});

  // Mongoose-like userSchema.pre middleware (but not connected to a database)

module.exports = mongoose.model('User', userSchema);
