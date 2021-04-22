const mongoose = require('mongoose');
const validator = require('validator');
var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");

var userschema = new mongoose.Schema({
    email: {
        type: String,
        required: true, 
        trim:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value))
            throw new Error('enter a valid email');
            if(value.includes('password'))
            throw new Error("entered password field can't contain word: 'password'");
        }
    },
    password: {
        type : String,
        required: true,
        validate(value){
            if (!value.match(strongRegex) )
              throw new Error('Re-Check password policy');
          }
    },
})

const User = mongoose.model('user', userschema);

module.exports = User;