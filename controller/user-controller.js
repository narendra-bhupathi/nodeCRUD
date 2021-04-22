const User = require('../model/user-model');
const validator = require('validator');
var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");

exports.userSignup = (req,res)=>{

    console.log(req);

    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    console.log("user",req.body.email);
    console.log("pass",req.body.password);

    // new user
    const user = new User({
                email : req.body.email,
                password : req.body.password
            })

    // save user in the database
    user
        .save(user)
        .then(data => {
            res.send(data)
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a creating user"
            });
        });

}

exports.userEdit = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    if(!validator.validate(req.body.newemail))
    throw new Error('enter a valid email');
    if(!req.body.newpassword.validate('password'))
    throw new Error("entered password field can't contain word: 'password'");
    if (!req.body.newpassword.match(strongRegex) )
    throw new Error('Re-Check password policy');

    

    const filter = { email: req.body.oldemail , password : req.body.oldpassword };
    const newData = { email: req.body.newemail , password : req.body.newpassword  };

    User.findOneAndUpdate(filter, newData,  { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with  Maybe user not found!`})
            }else{
                res.send("User Updated")
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
        
}

// retrieve and return all users/ retrive and return a single user
exports.getUsers = (req, res)=>{
  
        User.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
 
}

// Delete a user with specified password in the request
exports.deleteUser = (req, res)=>{

    User.findOneAndDelete({password: req.body.password})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Not found user with detials`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Not found user with detials"});
        });
}

