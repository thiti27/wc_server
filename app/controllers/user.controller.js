const config = require('../../config/config');
const bcrypt = require("bcryptjs");
const user = require("../models/user");

exports.login = async(req, res) => {
    try{      
        const{username, password} = req.body;
        const result = await user.findOne({where: {username: username}})
        if (result){
          if(bcrypt.compareSync(password, result.password)){
             res.json(result)
          }else{
             res.json({ message: "Invalid password"} )        
          }
        }else{
         res.json({ message: "Invalid username"} )   
        }       
     }catch(error){
         res.json({ message: JSON.stringify(error)} )
     }
};


exports.register = async(req, res) => {
    try{
        req.body.password = bcrypt.hashSync(req.body.password, 8);
        const result = await user.create(req.body)
        res.json({message: JSON.stringify(result)} )
    }catch(error){
        res.json({ message: JSON.stringify(error)} )
    }
}